"use client";

import type { FormEvent } from "react";
import type { LocaleMessages } from "@/shared/types/locale";

type ContactQuickFormProps = {
  form: LocaleMessages["pages"]["contact"]["form"];
  whatsappHref: string;
};

function buildPrefilledWhatsAppHref(baseHref: string, message: string): string {
  try {
    const url = new URL(baseHref);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    return baseHref;
  }
}

export default function ContactQuickForm({ form, whatsappHref }: ContactQuickFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const projectType = String(formData.get("projectType") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();

    const message = form.whatsapp_message_template
      .replace("{name}", name)
      .replace("{projectType}", projectType)
      .replace("{description}", description);

    const targetHref = buildPrefilledWhatsAppHref(whatsappHref, message);
    window.open(targetHref, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">{form.name_label}</span>
        <input
          type="text"
          name="name"
          required
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-brand focus:border-brand focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
          {form.business_type_label}
        </span>
        <input
          type="text"
          name="projectType"
          required
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-brand focus:border-brand focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
          {form.description_label}
        </span>
        <textarea
          name="description"
          rows={5}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-brand focus:border-brand focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      </label>

      <button
        type="submit"
        className="inline-flex min-h-11 items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand"
      >
        {form.submit_label}
      </button>
    </form>
  );
}
