create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'reviewing', 'contacted', 'qualified', 'converted', 'closed')),
  source text not null check (source in ('package', 'trial', 'contact')),
  name text not null,
  email text not null,
  phone text not null,
  username text,
  preferred_contact_method text not null check (preferred_contact_method in ('whatsapp', 'telegram', 'email', 'sms')),
  company_name text not null,
  service_area text not null,
  selected_package text,
  best_contact_time text not null,
  notes text not null,
  consent_timestamp timestamptz not null,
  assigned_to uuid,
  lifecycle_stage text,
  last_contacted_at timestamptz,
  conversion_value numeric(12, 2)
);

alter table public.leads enable row level security;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_created_at_idx on public.leads (status, created_at desc);
create index if not exists leads_assigned_to_idx on public.leads (assigned_to) where assigned_to is not null;

comment on table public.leads is 'Website lead requests. Public clients have no direct access; the server stores rows using a service role.';
comment on column public.leads.status is 'Operational status for future admin inbox filtering.';
comment on column public.leads.lifecycle_stage is 'Reserved CRM lifecycle stage.';
