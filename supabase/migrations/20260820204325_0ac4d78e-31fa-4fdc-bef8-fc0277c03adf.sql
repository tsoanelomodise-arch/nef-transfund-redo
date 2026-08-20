update public.nav_items set position = position + 1 where parent_id is null and position >= 2;

with parent as (
  insert into public.nav_items (label, href, position, visible)
  values ('Access to Capability', '/access-to-capability', 2, true)
  returning id
)
insert into public.nav_items (parent_id, label, href, position, visible)
select id, 'Access to Capability', '/access-to-capability', 0, true from parent
union all
select id, 'Access to Markets', '/access-to-markets', 1, true from parent;