drop policy "Enable insert for authenticated users only" on "public"."patient";

alter table "public"."patient" add column "user" uuid;

alter table "public"."patient" disable row level security;

alter table "public"."patient" add constraint "patient_user_fkey" FOREIGN KEY ("user") REFERENCES auth.users(id) not valid;

alter table "public"."patient" validate constraint "patient_user_fkey";


