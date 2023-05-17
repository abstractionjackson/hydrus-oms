alter table "public"."patient" drop constraint "patient_user_fkey";

alter table "public"."patient" alter column "user" drop default;

alter table "public"."patient" add constraint "patient_user_fkey" FOREIGN KEY ("user") REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."patient" validate constraint "patient_user_fkey";


