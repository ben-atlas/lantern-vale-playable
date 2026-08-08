export const PLAYER_RADIUS = 0.36;

export const WORLD_BOUNDS = Object.freeze({ minX: -42, maxX: 42, minZ: -48, maxZ: 42 });

export const ZONES = Object.freeze([
  { id: 'farm', name: 'Lantern Farm', minX: -22, maxX: 10, minZ: -22, maxZ: 24 },
  { id: 'village', name: 'Willow Street', minX: 10, maxX: 42, minZ: -35, maxZ: 18 },
  { id: 'forest', name: 'Mosswood', minX: -42, maxX: -22, minZ: -30, maxZ: 24 },
  { id: 'pond', name: 'Mirror Pond', minX: -42, maxX: -18, minZ: 24, maxZ: 42 },
  { id: 'riverside', name: 'Lantern Riverside', minX: -18, maxX: 42, minZ: 18, maxZ: 42 },
]);

// Static collision is deliberately authored as unrotated ground-plane AABBs.
// Rendering modules may decorate these footprints but never redefine them.
export const COLLIDERS = Object.freeze([
  { id: 'farmhouse', minX: -14.2, maxX: -7.8, minZ: -14.1, maxZ: -8.1 },
  { id: 'pond-water', minX: -39, maxX: -22, minZ: 28, maxZ: 40 },
  { id: 'river-water', minX: -18, maxX: 42, minZ: 35, maxZ: 42 },
  { id: 'village-shop', minX: 20, maxX: 28, minZ: -17, maxZ: -9 },
  { id: 'village-hall', minX: 29, maxX: 38, minZ: 1, maxZ: 10 },
]);

export const INTERACTIONS = Object.freeze([
  { id: 'farm-bed', kind: 'sleep', x: -10.8, z: -8.0, radius: 1.4, label: 'Sleep until morning' },
  { id: 'village-shop-door', kind: 'shop', x: 24, z: -8.2, radius: 1.5, label: 'Visit Rowan & Root' },
  { id: 'pond-pier', kind: 'fish', x: -21, z: 32, radius: 2.0, label: 'Fish at Mirror Pond' },
  { id: 'river-dock', kind: 'fish', x: 8, z: 33.5, radius: 2.0, label: 'Fish by the river' },
  { id: 'old-lantern', kind: 'story', x: 32, z: 24, radius: 1.8, label: 'Inspect the old lantern' },
]);

export function zoneAt(x, z) {
  return ZONES.find(zone => x >= zone.minX && x <= zone.maxX && z >= zone.minZ && z <= zone.maxZ) || null;
}

export function interactionAt(x, z) {
  let nearest = null;
  let distance = Infinity;
  for (const item of INTERACTIONS) {
    const d = Math.hypot(item.x - x, item.z - z);
    if (d <= item.radius && d < distance) { nearest = item; distance = d; }
  }
  return nearest;
}

function blocked(x, z, radius, colliders) {
  return colliders.some(box =>
    x + radius > box.minX && x - radius < box.maxX &&
    z + radius > box.minZ && z - radius < box.maxZ);
}

export function resolveMovement(fromX, fromZ, toX, toZ, radius = PLAYER_RADIUS, colliders = COLLIDERS) {
  const x = Math.max(WORLD_BOUNDS.minX + radius, Math.min(WORLD_BOUNDS.maxX - radius, toX));
  const z = Math.max(WORLD_BOUNDS.minZ + radius, Math.min(WORLD_BOUNDS.maxZ - radius, toZ));
  if (!blocked(x, z, radius, colliders)) return { x, z };
  // Axis fallbacks produce predictable wall sliding and prevent corner tunneling
  // at the core's fixed, tightly capped movement step.
  if (!blocked(x, fromZ, radius, colliders)) return { x, z: fromZ };
  if (!blocked(fromX, z, radius, colliders)) return { x: fromX, z };
  return { x: fromX, z: fromZ };
}
