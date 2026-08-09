alter table public.leads
  drop column if exists preferred_contact_method,
  drop column if exists service_area,
  drop column if exists selected_package,
  drop column if exists best_contact_time;

update public.leads set source = 'contact' where source <> 'contact';

alter table public.leads drop constraint if exists leads_source_check;
alter table public.leads add constraint leads_source_check check (source = 'contact');

alter table public.leads
  add column if not exists zip_code text,
  add column if not exists requested_contact_at text not null default '',
  add column if not exists requested_contact_timezone text not null default 'UTC';

comment on column public.leads.requested_contact_at is 'Visitor-selected local date/time without timezone context.';
comment on column public.leads.requested_contact_timezone is 'Visitor IANA timezone used to interpret requested_contact_at.';
