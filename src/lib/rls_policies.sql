-- Postgres RLS policies for the public schema

-- Patient table
CREATE POLICY surgeons_can_select_own_patients ON public.patients
  FOR SELECT
  TO authenticated
  WITH CHECK (surgeon_id = auth.uid());
