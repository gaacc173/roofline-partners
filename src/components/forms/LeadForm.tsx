"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/submit-lead";
import { computeRequestedContactAt, daysInMonth } from "@/lib/contact-time";

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
  const requestedContactTimezoneRef = useRef<HTMLInputElement>(null);
  const startFieldRef = useRef<HTMLInputElement>(null);
  const [dateState, setDateState] = useState<{
    month: number;
    day: number;
    hour: number;
    minute: number;
    ampm: string;
    timezone: string;
  }>({
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    hour: new Date().getHours() % 12 || 12,
    minute: new Date().getMinutes(),
    ampm: new Date().getHours() >= 12 ? "PM" : "AM",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

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

  const updateDate = (partial: Partial<typeof dateState>) => {
    setDateState((prev) => ({
      ...prev,
      ...partial,
    }));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const now = new Date();
    const selectedYear =
      dateState.month < now.getMonth() + 1 ||
      (dateState.month === now.getMonth() + 1 && dateState.day < now.getDate())
        ? now.getFullYear() + 1
        : now.getFullYear();
    const val = Math.max(
      1,
      Math.min(daysInMonth(selectedYear, dateState.month), parseInt(e.target.value) || 1),
    );
    updateDate({ day: val });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value);
    const now = new Date();
    const selectedYear =
      val < now.getMonth() + 1 || (val === now.getMonth() + 1 && dateState.day < now.getDate())
        ? now.getFullYear() + 1
        : now.getFullYear();
    updateDate({ month: val, day: Math.min(dateState.day, daysInMonth(selectedYear, val)) });
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 12;
    val = Math.max(1, Math.min(12, val));
    updateDate({ hour: val });
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 0;
    val = Math.max(0, Math.min(59, val));
    updateDate({ minute: val });
  };

  const handleAMPMChange = (ampm: string) => {
    updateDate({ ampm });
  };

  const handleFormSubmit = () => {
    if (requestedContactTimezoneRef.current) {
      requestedContactTimezoneRef.current.value = dateState.timezone;
    }
  };

  const requestedContactAt = computeRequestedContactAt({
    month: dateState.month,
    day: dateState.day,
    hour: dateState.hour,
    minute: dateState.minute,
    ampm: dateState.ampm as "AM" | "PM",
  });

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
      onSubmit={handleFormSubmit}
    >
      <input ref={startFieldRef} type="hidden" name="formStartedAt" defaultValue="" />
      <input type="hidden" name="requestedContactAt" value={requestedContactAt} />
      <input
        ref={requestedContactTimezoneRef}
        type="hidden"
        name="requestedContactTimezone"
        defaultValue=""
      />
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
        <div className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          Best date and time for a call *
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[120px]">
              <label htmlFor="lead-month" className="block text-xs font-medium text-slate-500 mb-1">
                Month
              </label>
              <select
                id="lead-month"
                value={dateState.month}
                onChange={handleMonthChange}
                className={fieldClassName}
                aria-invalid={Boolean(state.fieldErrors?.requestedContactAt)}
                aria-describedby={
                  state.fieldErrors?.requestedContactAt
                    ? "lead-requested-contact-at-error"
                    : undefined
                }
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {new Date(2025, m - 1, 1).toLocaleString("en-US", { month: "long" })}
                  </option>
                ))}
              </select>
              <FieldError
                id="lead-requested-contact-at-error"
                errors={state.fieldErrors?.requestedContactAt}
              />
            </div>

            <div className="flex-1 min-w-[100px]">
              <label htmlFor="lead-day" className="block text-xs font-medium text-slate-500 mb-1">
                Day
              </label>
              <input
                id="lead-day"
                type="number"
                min="1"
                max="31"
                value={dateState.day}
                onChange={handleDayChange}
                className={fieldClassName}
                aria-invalid={Boolean(state.fieldErrors?.requestedContactAt)}
                aria-describedby={
                  state.fieldErrors?.requestedContactAt
                    ? "lead-requested-contact-at-error"
                    : undefined
                }
              />
            </div>

            <div className="flex-1 min-w-[110px]">
              <label htmlFor="lead-hour" className="block text-xs font-medium text-slate-500 mb-1">
                Hour
              </label>
              <input
                id="lead-hour"
                type="number"
                min="1"
                max="12"
                value={dateState.hour}
                onChange={handleHourChange}
                className={fieldClassName}
                aria-invalid={Boolean(state.fieldErrors?.requestedContactAt)}
                aria-describedby={
                  state.fieldErrors?.requestedContactAt
                    ? "lead-requested-contact-at-error"
                    : undefined
                }
              />
            </div>

            <div className="flex-1 min-w-[80px]">
              <label
                htmlFor="lead-minute"
                className="block text-xs font-medium text-slate-500 mb-1"
              >
                Minute
              </label>
              <input
                id="lead-minute"
                type="number"
                min="0"
                max="59"
                value={dateState.minute}
                onChange={handleMinuteChange}
                className={fieldClassName}
                aria-invalid={Boolean(state.fieldErrors?.requestedContactAt)}
                aria-describedby={
                  state.fieldErrors?.requestedContactAt
                    ? "lead-requested-contact-at-error"
                    : undefined
                }
              />
            </div>

            <div className="flex-1 min-w-[70px]">
              <span className="block text-xs font-medium text-slate-500 mb-1">AM/PM</span>
              <div className="flex gap-1" role="radiogroup" aria-label="AM or PM">
                <button
                  type="button"
                  onClick={() => handleAMPMChange("AM")}
                  className={`min-h-11 min-w-11 rounded border px-3 py-2 text-sm ${dateState.ampm === "AM" ? "border-slate-950 bg-slate-950 text-white" : "border-slate-400 bg-white text-slate-950"}`}
                  role="radio"
                  aria-checked={dateState.ampm === "AM"}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => handleAMPMChange("PM")}
                  className={`min-h-11 min-w-11 rounded border px-3 py-2 text-sm ${dateState.ampm === "PM" ? "border-slate-950 bg-slate-950 text-white" : "border-slate-400 bg-white text-slate-950"}`}
                  role="radio"
                  aria-checked={dateState.ampm === "PM"}
                >
                  PM
                </button>
              </div>
            </div>
          </div>
          <p className="mt-1 text-xs text-slate-500">Timezone: {dateState.timezone}</p>
        </div>
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
