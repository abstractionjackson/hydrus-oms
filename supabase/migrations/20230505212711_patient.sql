alter table "public"."patient" add column "case_date" date;

alter table "public"."patient" add column "od_os" text[];

alter table "public"."patient" add column "pre_op_iop" smallint;

alter table "public"."patient" add column "pre_op_meds_count" smallint;

create policy "Enable insert for authenticated users only"
on "public"."patient"
as permissive
for all
to authenticated
using (true)
with check (true);



