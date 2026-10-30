"use client";
import { useState, type FormEvent } from "react";
import { apiFetch } from "@/lib/api/client";
import { routes } from "@/constants/routes";

const inputClassName =
  "my-4 block w-full rounded-[2px] border border-[#ced4da] bg-transparent px-3 py-[6px] text-[16px] leading-[1.5] font-bold text-[#495057] [box-shadow:none] outline-none placeholder:text-[#6c757d] placeholder:opacity-100 hover:border-[#ffc200] focus:border-[#ffc200] portfolio-dark:placeholder:text-[#ccc] [&:is(input)]:h-12 portfolio-dark:[&:not([type=submit])]:text-white";

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
    <div className="relative max-[992px]:mt-[2em]">
      <h2 className="mb-6">Have a project in mind? Let&apos;s talk.</h2>
      <form onSubmit={submit}>
        <div className="-mx-[15px] flex flex-wrap">
          <div className="relative w-full px-[15px] min-[992px]:w-1/2">
            <input
              required
              type="text"
              className={inputClassName}
              name="name"
              placeholder="Your Name"
              aria-label="Your Name"
              maxLength={100}
              autoComplete="name"
            />
          </div>
          <div className="relative w-full px-[15px] min-[992px]:w-1/2">
            <input
              required
              type="email"
              className={inputClassName}
              name="email"
              placeholder="Email"
              aria-label="Email"
              maxLength={254}
              autoComplete="email"
            />
          </div>
          <div className="relative w-full px-[15px]">
            <textarea
              required
              name="message"
              rows={6}
              className={inputClassName}
              placeholder="Message"
              aria-label="Message"
              maxLength={5000}
            />
          </div>
          <div className="hidden" aria-hidden="true">
            <input
              className="portfolio-dark:text-white"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="relative w-full px-[15px] min-[992px]:ml-auto min-[992px]:w-5/12">
            <input
              type="submit"
              className="my-4 block w-full cursor-pointer rounded-[50px] border-0 border-current bg-[#ffc200] px-3 py-[6px] text-[16px] leading-[1.5] font-bold text-black [box-shadow:none] transition-all duration-400 ease-[ease] outline-none placeholder:text-[#6c757d] placeholder:opacity-100 hover:border-[#ffc200] hover:bg-[#474559] hover:text-white focus:border-[#ffc200] disabled:cursor-wait portfolio-dark:placeholder:text-[#ccc] [&:is(input)]:h-12 portfolio-dark:[&:not([type=submit])]:text-white"
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
