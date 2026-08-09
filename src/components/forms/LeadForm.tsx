"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/submit-lead";

const initialState: LeadFormState = {};

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return errors?.[0] ? (
    <p id={id} className="mt-1 text-sm text-red-700 dark:text-red-300">
      {errors[0]}
    </p>
  ) : null;
}

export function LeadForm({ submitLabel }: { submitLabel: string }) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const startFieldRef = useRef<HTMLInputElement>(null);
  const timezoneFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!state.error) return;
    const invalidField = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
    if (invalidField) {
      invalidField.focus();
    } else {
      formRef.current?.querySelector<HTMLElement>("[role='alert']")?.focus();
    }
  }, [state.error]);

  const fieldClassName =
    "mt-2 w-full rounded-xl border border-slate-400 bg-white px-3 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/15 aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600/15 dark:border-slate-500 dark:bg-slate-950 dark:text-white dark:focus:border-white";

  return (
    <form
      ref={formRef}
      action={formAction}
      aria-busy={pending}
      aria-label="Schedule a call form"
      className="space-y-5"
      onFocusCapture={() => {
        if (startFieldRef.current && !startFieldRef.current.value) {
          startFieldRef.current.value = String(Date.now());
        }
      }}
      onSubmit={() => {
        if (timezoneFieldRef.current) {
          timezoneFieldRef.current.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
      }}
    >
      <input ref={startFieldRef} type="hidden" name="formStartedAt" defaultValue="" />
      <input ref={timezoneFieldRef} type="hidden" name="requestedContactTimezone" defaultValue="" />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.error && (
        <div
          role="alert"
          tabIndex={-1}
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200"
        >
          {state.error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Name *
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            required
            aria-invalid={Boolean(state.fieldErrors?.name)}
            aria-describedby={state.fieldErrors?.name ? "lead-name-error" : undefined}
            className={fieldClassName}
          />
          <FieldError id="lead-name-error" errors={state.fieldErrors?.name} />
        </label>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Company name *
          <input
            id="lead-company-name"
            name="companyName"
            type="text"
            autoComplete="organization"
            placeholder="Your roofing company"
            required
            aria-invalid={Boolean(state.fieldErrors?.companyName)}
            aria-describedby={
              state.fieldErrors?.companyName ? "lead-company-name-error" : undefined
            }
            className={fieldClassName}
          />
          <FieldError id="lead-company-name-error" errors={state.fieldErrors?.companyName} />
        </label>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          ZIP code{" "}
          <span className="font-normal text-slate-600 dark:text-slate-400">(optional)</span>
          <input
            id="lead-zip-code"
            name="zipCode"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="e.g. 90210"
            aria-invalid={Boolean(state.fieldErrors?.zipCode)}
            aria-describedby={state.fieldErrors?.zipCode ? "lead-zip-code-error" : undefined}
            className={fieldClassName}
          />
          <FieldError id="lead-zip-code-error" errors={state.fieldErrors?.zipCode} />
        </label>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Email *
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@yourcompany.com"
            required
            aria-invalid={Boolean(state.fieldErrors?.email)}
            aria-describedby={state.fieldErrors?.email ? "lead-email-error" : undefined}
            className={fieldClassName}
          />
          <FieldError id="lead-email-error" errors={state.fieldErrors?.email} />
        </label>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Phone *
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 000-0000"
            required
            aria-invalid={Boolean(state.fieldErrors?.phone)}
            aria-describedby={state.fieldErrors?.phone ? "lead-phone-error" : undefined}
            className={fieldClassName}
          />
          <FieldError id="lead-phone-error" errors={state.fieldErrors?.phone} />
        </label>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Username{" "}
          <span className="font-normal text-slate-600 dark:text-slate-400">(optional)</span>
          <input
            id="lead-username"
            name="username"
            type="text"
            autoComplete="username"
            aria-invalid={Boolean(state.fieldErrors?.username)}
            aria-describedby={state.fieldErrors?.username ? "lead-username-error" : undefined}
            className={fieldClassName}
          />
          <FieldError id="lead-username-error" errors={state.fieldErrors?.username} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Best date and time for a call *
          <input
            id="lead-requested-contact-at"
            name="requestedContactAt"
            type="datetime-local"
            required
            aria-invalid={Boolean(state.fieldErrors?.requestedContactAt)}
            aria-describedby={
              state.fieldErrors?.requestedContactAt ? "lead-requested-contact-at-error" : undefined
            }
            className={fieldClassName}
          />
          <FieldError
            id="lead-requested-contact-at-error"
            errors={state.fieldErrors?.requestedContactAt}
          />
        </label>
        <p className="self-end text-sm leading-6 text-slate-600 dark:text-slate-300">
          We will use your browser timezone so the requested time is clear to our team.
        </p>
      </div>

      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
        Message *
        <textarea
          id="lead-notes"
          name="notes"
          required
          aria-invalid={Boolean(state.fieldErrors?.notes)}
          aria-describedby={state.fieldErrors?.notes ? "lead-notes-error" : undefined}
          rows={5}
          placeholder="Tell us about your roofing focus, ZIP codes, and what you would like to achieve."
          className={fieldClassName}
        />
        <FieldError id="lead-notes-error" errors={state.fieldErrors?.notes} />
      </label>

      <label className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        <input
          id="lead-consent"
          name="consent"
          type="checkbox"
          required
          aria-invalid={Boolean(state.fieldErrors?.consent)}
          aria-describedby={state.fieldErrors?.consent ? "lead-consent-error" : undefined}
          className="mt-1 h-4 w-4 rounded border-slate-400 text-slate-950 focus:ring-slate-950"
        />
        <span>
          I agree that LeadbyLead may use these details to review my request and contact me about
          next steps.
        </span>
      </label>
      <FieldError id="lead-consent-error" errors={state.fieldErrors?.consent} />

      {pending && (
        <p
          role="status"
          aria-live="polite"
          className="text-center text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          Sending request...
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 dark:focus-visible:outline-white"
      >
        {pending ? "Sending request..." : submitLabel}
      </button>
      <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
        We&apos;ll respond within 24 hours. No spam, ever.
      </p>
    </form>
  );
}
