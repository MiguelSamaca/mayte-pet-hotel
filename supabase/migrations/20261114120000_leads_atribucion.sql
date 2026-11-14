-- Origen de cada lead: código corto de la campaña (META-M1-A5, GOOGLE-G1, WEB)
-- y los parámetros con los que llegó (UTM, fbclid, gclid), para saber qué campaña trae
-- los contactos que terminan en reserva y devolverle esa información a Meta y Google.
alter table public.leads
  add column if not exists ref text,
  add column if not exists atribucion jsonb;

comment on column public.leads.ref is 'Código de origen: fuente-campaña-anuncio (ej. META-M1-A5) o WEB si llegó sin campaña.';
comment on column public.leads.atribucion is 'Parámetros de llegada: utm_*, fbclid, gclid, landing y fecha.';
