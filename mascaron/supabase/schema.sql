-- Mascaron : base de données Supabase (comptes joueurs facultatifs)
-- À coller une fois dans Supabase → SQL Editor → Run. Le relancer ne casse rien.

-- Lieux trouvés par chaque joueur connecté (sans compte, tout reste sur le téléphone)
create table if not exists public.found (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  place_id text not null,
  found_at timestamptz not null default now(),
  primary key (user_id, place_id)
);

-- Sécurité : chaque joueur ne voit et ne modifie que son propre carnet
alter table public.found enable row level security;

grant select, insert, update, delete on public.found to authenticated;

drop policy if exists "Lire son carnet" on public.found;
create policy "Lire son carnet" on public.found
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Ajouter à son carnet" on public.found;
create policy "Ajouter à son carnet" on public.found
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "Modifier son carnet" on public.found;
create policy "Modifier son carnet" on public.found
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "Retirer de son carnet" on public.found;
create policy "Retirer de son carnet" on public.found
  for delete to authenticated using ((select auth.uid()) = user_id);
