"use client";
import { useState, type FormEvent } from "react";
import { apiFetch } from "@/lib/api/client";
import { routes } from "@/constants/routes";

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);
    setStatus("");
    try {
      await apiFetch(routes.contact, {
        method: "POST",
        body: Object.fromEntries(new FormData(form)),
      });
      form.reset();
      setStatus("✔️ Message sent successfully");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <div className="contact-form">
      <h2 className="mb-6">Have a project in mind? Let&apos;s talk.</h2>
      <form onSubmit={submit}>
        <div className="portfolio-row">
          <div className="portfolio-column min-[992px]:w-1/2">
            <input
              required
              type="text"
              className="contact-input"
              name="name"
              placeholder="Your Name"
              aria-label="Your Name"
              maxLength={100}
              autoComplete="name"
            />
          </div>
          <div className="portfolio-column min-[992px]:w-1/2">
            <input
              required
              type="email"
              className="contact-input"
              name="email"
              placeholder="Email"
              aria-label="Email"
              maxLength={254}
              autoComplete="email"
            />
          </div>
          <div className="portfolio-column">
            <textarea
              required
              name="message"
              rows={6}
              className="contact-input"
              placeholder="Message"
              aria-label="Message"
              maxLength={5000}
            />
          </div>
          <div className="hidden" aria-hidden="true">
            <input name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="portfolio-column min-[992px]:ml-auto min-[992px]:w-5/12">
            <input
              type="submit"
              className="contact-input submit-btn disabled:cursor-wait"
              disabled={pending}
              value={pending ? "Sending…" : "Send Message"}
            />
          </div>
          <span className="rounded p-1" role="status">
            {status}
          </span>
        </div>
      </form>
    </div>
  );
}
