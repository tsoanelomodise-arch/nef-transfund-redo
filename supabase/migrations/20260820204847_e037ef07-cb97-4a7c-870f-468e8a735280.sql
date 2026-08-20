-- remove previous combined Access menu
delete from public.nav_items where parent_id in (select id from public.nav_items where label = 'Access to Capability' and parent_id is null);
delete from public.nav_items where label = 'Access to Capability' and parent_id is null;

update public.nav_items set position = position + 1 where parent_id is null and position >= 3;

with cap as (
  insert into public.nav_items (label, href, position, visible)
  values ('Access to Capability', '/access-to-capability', 2, true) returning id
)
insert into public.nav_items (parent_id, label, href, position, visible)
select id, 'Capability Journey', '/access-to-capability#capability-journey', 0, true from cap
union all select id, 'Support Interventions', '/access-to-capability#support-interventions', 1, true from cap
union all select id, 'Required Documents', '/access-to-capability#documents-section', 2, true from cap;

with mkt as (
  insert into public.nav_items (label, href, position, visible)
  values ('Access to Markets', '/access-to-markets', 3, true) returning id
)
insert into public.nav_items (parent_id, label, href, position, visible)
select id, 'How it Works', '/access-to-markets#markets-journey', 0, true from mkt
union all select id, 'Market Opportunities', '/access-to-markets#markets-opportunities', 1, true from mkt;