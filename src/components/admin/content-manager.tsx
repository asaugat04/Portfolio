"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { EntryForm, type EditorField } from "@/components/admin/entry-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { sections } from "@/constants/content";
import { routes } from "@/constants/routes";
import { apiFetch } from "@/lib/api/client";
import type { Section, ContentEntry } from "@/schemas/content";

export function ContentManager({
  section,
  entries,
  fields,
}: {
  section: Section;
  entries: ContentEntry[];
  fields: EditorField[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<ContentEntry | "new" | null>(null);
  const [deleting, setDeleting] = useState<ContentEntry | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  function saved() {
    setBusy(false);
    setEditing(null);
    router.refresh();
  }
  async function remove() {
    if (!deleting) return;
    setPending(true);
    setError("");
    try {
      await apiFetch(routes.entry(section, deleting.id), { method: "DELETE" });
      setDeleting(null);
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to delete");
    } finally {
      setPending(false);
    }
  }
  if (sections[section].singleton)
    return (
      <Card>
        <CardContent className="pt-6">
          <EntryForm
            key={JSON.stringify(entries[0])}
            section={section}
            entry={entries[0]}
            fields={fields}
            position={0}
            onBusyChange={setBusy}
            onSaved={() => {
              setIsSaved(true);
              router.refresh();
            }}
          />
          <p role="status" className="mt-4 text-xs text-neutral-500">
            {isSaved
              ? "Changes saved."
              : "Saved content is applied directly to the website."}
          </p>
        </CardContent>
      </Card>
    );
  return (
    <div className="space-y-4">
      <Button onClick={() => setEditing("new")}>
        <Plus />
        Add entry
      </Button>
      {!entries.length && (
        <Card>
          <CardContent className="py-12 text-center text-sm text-neutral-500">
            No entries yet. Add your first one above.
          </CardContent>
        </Card>
      )}
      <div className="space-y-3">
        {entries.map((entry) => {
          const data = entry.data as Record<string, unknown>;
          return (
            <Card key={entry.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4 py-5">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h2 className="font-medium">
                      {String(data.title ?? data.name ?? "Entry")}
                    </h2>
                    <Badge variant={entry.visible ? "secondary" : "outline"}>
                      {entry.visible ? "Visible" : "Hidden"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    Order {entry.position}
                    {data.subtitle
                      ? ` · ${data.subtitle}`
                      : data.organization
                        ? ` · ${data.organization}`
                        : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditing(entry)}
                  >
                    <Pencil />
                    Edit
                  </Button>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    aria-label={`Delete ${data.title ?? "entry"}`}
                    onClick={() => {
                      setError("");
                      setDeleting(entry);
                    }}
                  >
                    <Trash2 className="text-red-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Dialog
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open && !busy) setEditing(null);
        }}
      >
        <DialogContent
          showCloseButton={!busy}
          className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl"
        >
          <DialogHeader>
            <DialogTitle>
              {editing === "new" ? "Add entry" : "Edit entry"}
            </DialogTitle>
            <DialogDescription>
              Update your {sections[section].title.toLowerCase()} content.
            </DialogDescription>
          </DialogHeader>
          {editing && (
            <EntryForm
              key={editing === "new" ? "new" : editing.id}
              section={section}
              entry={editing === "new" ? undefined : editing}
              fields={fields}
              position={entries.reduce(
                (max, entry) => Math.max(max, entry.position + 1),
                0,
              )}
              onSaved={saved}
              onBusyChange={setBusy}
            />
          )}
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open && !pending) setDeleting(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from the website permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={pending}
              onClick={(event) => {
                event.preventDefault();
                void remove();
              }}
            >
              {pending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
