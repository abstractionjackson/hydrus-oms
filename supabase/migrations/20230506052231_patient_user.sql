alter table "public"."patient" alter column "user" set default auth.uid();

alter table "public"."patient" enable row level security;

create policy "Enable read access to authenticated users for corresponding pat"
on "public"."patient"
as permissive
for select
to authenticated
using ((auth.uid() = "user"));


create policy "Enable write access for authenticated users"
on "public"."patient"
as permissive
for insert
to authenticated
with check (true);



