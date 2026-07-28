interface AppointmentFlowProps {
  labels: readonly string[];
}

/** Self-authored visual that explains the appointment flow without stock imagery. */
export function AppointmentFlow({ labels }: AppointmentFlowProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900 p-5 shadow-2xl shadow-slate-950/30 sm:p-7">
      <div className="absolute -top-20 -right-16 h-52 w-52 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-sky-400/15 blur-3xl" />
      <div className="relative">
        <div className="mb-8 flex items-center justify-between">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-slate-100 uppercase">
            Appointment flow
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-300 text-lg font-bold text-slate-950">
            ↗
          </span>
        </div>
        <div className="space-y-3">
          {labels.map((label, index) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/12 text-xs font-bold text-amber-200">
                0{index + 1}
              </span>
              <span className="text-sm font-medium text-white">{label}</span>
              <span className="ml-auto text-amber-200" aria-hidden="true">
                {index === labels.length - 1 ? "✓" : "→"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-7 rounded-2xl bg-white p-4 text-slate-900 shadow-lg">
          <p className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">
            Built for clarity
          </p>
          <p className="mt-1 text-sm font-semibold">Every request starts with a human review.</p>
        </div>
      </div>
    </div>
  );
}
