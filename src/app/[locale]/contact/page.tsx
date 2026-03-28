"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      company: formData.get("company") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    const newErrors: Record<string, string> = {};
    if (!data.company) newErrors.company = t("validation.companyRequired");
    if (!data.name) newErrors.name = t("validation.nameRequired");
    if (!data.email) newErrors.email = t("validation.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      newErrors.email = t("validation.emailInvalid");
    if (!data.message) newErrors.message = t("validation.messageRequired");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <>
        <section className="bg-navy text-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold">{t("pageTitle")}</h1>
          </div>
        </section>
        <section className="py-20">
          <div className="mx-auto max-w-xl px-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-gray-700 leading-relaxed">{t("success")}</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-navy text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{t("pageTitle")}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 leading-relaxed mb-10">
            {t("description")}
          </p>

          {status === "error" && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {t("error")}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Field
              label={t("form.company")}
              name="company"
              placeholder={t("form.companyPlaceholder")}
              error={errors.company}
              required
              requiredLabel={t("form.required")}
            />
            <Field
              label={t("form.name")}
              name="name"
              placeholder={t("form.namePlaceholder")}
              error={errors.name}
              required
              requiredLabel={t("form.required")}
            />
            <Field
              label={t("form.email")}
              name="email"
              type="email"
              placeholder={t("form.emailPlaceholder")}
              error={errors.email}
              required
              requiredLabel={t("form.required")}
            />
            <Field
              label={t("form.phone")}
              name="phone"
              type="tel"
              placeholder={t("form.phonePlaceholder")}
            />
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                {t("form.message")}
                <span className="ml-2 text-xs text-orange font-normal">
                  {t("form.required")}
                </span>
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder={t("form.messagePlaceholder")}
                className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue/50 ${
                  errors.message ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-600">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-orange text-white py-3 rounded-lg font-semibold hover:bg-orange/90 transition-colors disabled:opacity-60"
            >
              {status === "sending" ? t("form.sending") : t("form.submit")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  required,
  requiredLabel,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  requiredLabel?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy mb-2">
        {label}
        {required && (
          <span className="ml-2 text-xs text-orange font-normal">
            {requiredLabel}
          </span>
        )}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue/50 ${
          error ? "border-red-400" : "border-gray-200"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
