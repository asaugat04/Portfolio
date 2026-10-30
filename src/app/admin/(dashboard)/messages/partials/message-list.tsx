"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { apiFetch } from "@/lib/api/client";
import { routes } from "@/constants/routes";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  readAt: string | null;
  createdAt: string;
  emailSentAt: string | null;
  emailError: boolean;
};
export function MessageList({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  async function action(url: string, method: string, body?: unknown) {
    setPending(true);
    setError("");
    try {
      await apiFetch(url, { method, body });
      setDeleting(null);
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Request failed");
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="space-y-4">
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      {!messages.length && (
        <Card>
          <CardContent className="py-12 text-center text-sm text-neutral-500">
            No messages here yet.
          </CardContent>
        </Card>
      )}
      {messages.map((message) => (
        <Card key={message.id}>
          <CardContent className="space-y-4 pt-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{message.name}</h2>
                <a
                  href={`mailto:${message.email}`}
                  className="text-sm text-neutral-500 underline"
                >
                  {message.email}
                </a>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={message.readAt ? "outline" : "default"}>
                  {message.readAt ? "Read" : "Unread"}
                </Badge>
                <Badge variant={message.emailSentAt ? "secondary" : "outline"}>
                  {message.emailSentAt
                    ? "Email sent"
                    : message.emailError
                      ? "Email failed"
                      : "Email pending"}
                </Badge>
              </div>
            </div>
            <p className="text-sm leading-6 break-words whitespace-pre-wrap">
              {message.message}
            </p>
            <p className="text-xs text-neutral-500">
              {new Intl.DateTimeFormat("en-GB", {
                dateStyle: "medium",
                timeStyle: "short",
                timeZone: "Asia/Kathmandu",
              }).format(new Date(message.createdAt))}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={pending}
                onClick={() =>
                  void action(routes.message(message.id), "PATCH", {
                    read: !message.readAt,
                  })
                }
              >
                {message.readAt ? "Mark unread" : "Mark read"}
              </Button>
              {!message.emailSentAt && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={pending}
                  onClick={() =>
                    void action(routes.retryEmail(message.id), "POST")
                  }
                >
                  Retry notification
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                disabled={pending}
                onClick={() => setDeleting(message.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <AlertDialog
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open && !pending) setDeleting(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this message?</AlertDialogTitle>
            <AlertDialogDescription>
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={pending}
              onClick={(event) => {
                event.preventDefault();
                if (deleting) void action(routes.message(deleting), "DELETE");
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
