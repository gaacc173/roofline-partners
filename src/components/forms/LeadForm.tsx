"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/submit-lead";
import { contactMethods, type LeadSource } from "@/features/leads/lead-schema";

const initialState: LeadFormState = {};

interface LeadFormProps {
  source: LeadSource;
  selectedPackage?: string;
  submitLabel: string;
}

function FieldError({ errors }: { errors?: string[] }) {
  return errors?.[0] ? (
    <p className="mt-1 text-sm text-red-700 dark:text-red-300">{errors[0]}</p>
  ) : null;
}

export function LeadForm({ source, selectedPackage, submitLabel }: LeadFormProps) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const startFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.error) {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    }
  }, [state.error]);

  const fieldClassName =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/15 aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-white";

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-5"
      onFocusCapture={() => {
        if (startFieldRef.current && !startFieldRef.current.value) {
          startFieldRef.current.value = String(Date.now());
        }
      }}
    >
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="selectedPackage" value={selectedPackage ?? ""} />
      <input ref={startFieldRef} type="hidden" name="formStartedAt" defaultValue="" />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200"
        >
          {state.error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Full name
          <input
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(state.fieldErrors?.name)}
            className={fieldClassName}
          />
          <FieldError errors={state.fieldErrors?.name} />
        </label>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Work email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(state.fieldErrors?.email)}
            className={fieldClassName}
          />
          <FieldError errors={state.fieldErrors?.email} />
        </label>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Phone number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(state.fieldErrors?.phone)}
            className={fieldClassName}
          />
          <FieldError errors={state.fieldErrors?.phone} />
        </label>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Username <span className="font-normal text-slate-500">(optional)</span>
          <input name="username" type="text" autoComplete="username" className={fieldClassName} />
          <FieldError errors={state.fieldErrors?.username} />
        </label>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Company name
          <input
            name="companyName"
            type="text"
            autoComplete="organization"
            required
            aria-invalid={Boolean(state.fieldErrors?.companyName)}
            className={fieldClassName}
          />
          <FieldError errors={state.fieldErrors?.companyName} />
        </label>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Service area
          <input
            name="serviceArea"
            type="text"
            autoComplete="address-level2"
            required
            aria-invalid={Boolean(state.fieldErrors?.serviceArea)}
            placeholder="Cities, counties, or ZIP codes"
            className={fieldClassName}
          />
          <FieldError errors={state.fieldErrors?.serviceArea} />
        </label>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Preferred contact method
          <select
            name="preferredContactMethod"
            defaultValue="email"
            required
            aria-invalid={Boolean(state.fieldErrors?.preferredContactMethod)}
            className={fieldClassName}
          >
            {contactMethods.map((method) => (
              <option key={method} value={method}>
                {method === "sms" ? "SMS" : method.charAt(0).toUpperCase() + method.slice(1)}
              </option>
            ))}
          </select>
          <FieldError errors={state.fieldErrors?.preferredContactMethod} />
        </label>
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Best time to contact
          <input
            name="bestContactTime"
            type="text"
            required
            aria-invalid={Boolean(state.fieldErrors?.bestContactTime)}
            placeholder="e.g. Weekdays after 2 PM"
            className={fieldClassName}
          />
          <FieldError errors={state.fieldErrors?.bestContactTime} />
        </label>
      </div>
      <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
        Notes for our review
        <textarea
          name="notes"
          required
          aria-invalid={Boolean(state.fieldErrors?.notes)}
          rows={5}
          placeholder="Tell us about your roofing focus, coverage, and what you would like to achieve."
          className={fieldClassName}
        />
        <FieldError errors={state.fieldErrors?.notes} />
      </label>
      <label className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        <input
          name="consent"
          type="checkbox"
          required
          aria-invalid={Boolean(state.fieldErrors?.consent)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950"
        />
        <span>
          I agree that Roofline Partners may use these details to review my request and contact me
          about next steps.
        </span>
      </label>
      <FieldError errors={state.fieldErrors?.consent} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 dark:focus-visible:outline-white"
      >
        {pending ? "Sending request…" : submitLabel}
      </button>
      <p className="text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
        We review requests before confirming availability, final terms, or payment. Do not send
        sensitive financial information through this form.
      </p>
    </form>
  );
}
