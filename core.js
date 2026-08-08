export const CROPS = Object.freeze({
  turnip: { seedPrice: 20, growDays: 2, sell: 45 },
  radish: { seedPrice: 30, growDays: 3, sell: 70 },
  carrot: { seedPrice: 35, growDays: 3, sell: 80 },
  potato: { seedPrice: 40, growDays: 4, sell: 100 },
  bean: { seedPrice: 50, growDays: 4, sell: 125 },
  strawberry: { seedPrice: 65, growDays: 5, sell: 165 },
  pumpkin: { seedPrice: 80, growDays: 6, sell: 220 },
  starbloom: { seedPrice: 120, growDays: 7, sell: 360 },
});

export const ITEMS = Object.freeze({
  pond_carp: { name: 'Pond Carp', sell: 55, kind: 'fish' },
  river_dace: { name: 'River Dace', sell: 70, kind: 'fish' },
  mushroom: { name: 'Mosscap Mushroom', sell: 24, kind: 'forage' },
  berry: { name: 'Sunberry', sell: 18, kind: 'forage' },
  herb: { name: 'Vale Herb', sell: 22, kind: 'forage' },
  river_reed: { name: 'River Reed', sell: 12, kind: 'forage' },
});

export const FORAGE_NODES = Object.freeze([
  { id: 'mosswood-mushroom', item: 'mushroom', x: -31, z: 8 },
  { id: 'mosswood-berry', item: 'berry', x: -35, z: -8 },
  { id: 'mosswood-herb', item: 'herb', x: -27, z: 18 },
  { id: 'river-reed-west', item: 'river_reed', x: -8, z: 31 },
  { id: 'river-reed-east', item: 'river_reed', x: 20, z: 32 },
]);

export const VILLAGERS = Object.freeze({
  mara: { name: 'Mara', loved: 'river_reed', schedule: { morning: 'old-lantern', day: 'village-square', evening: 'old-lantern' } },
  pip: { name: 'Pip', loved: 'turnip', schedule: { morning: 'village-shop', day: 'village-shop', evening: 'village-square' } },
  rowan: { name: 'Rowan', loved: 'mushroom', schedule: { morning: 'forest-edge', day: 'pond-pier', evening: 'village-square' } },
  neri: { name: 'Neri', loved: 'river_dace', schedule: { morning: 'pond-pier', day: 'river-dock', evening: 'river-dock' } },
  sol: { name: 'Sol', loved: 'starbloom', schedule: { morning: 'village-square', day: 'smithy', evening: 'old-lantern' } },
  june: { name: 'June', loved: 'berry', schedule: { morning: 'farm-gate', day: 'village-square', evening: 'farm-gate' } },
});

export const QUESTS = Object.freeze([
  { id: 'mara_reeds', villager: 'mara', needs: { river_reed: 3 }, reward: {} },
  { id: 'pip_turnips', villager: 'pip', needs: { turnip: 3 }, reward: { money: 120, carrot_seed: 3 } },
  { id: 'rowan_forage', villager: 'rowan', needs: { mushroom: 1, berry: 1, herb: 1 }, reward: { resin: 1 } },
  { id: 'neri_catch', villager: 'neri', needs: { pond_carp: 1, river_dace: 1 }, reward: { silver_thread: 1 } },
  { id: 'sol_lens', villager: 'sol', needs: { resin: 1, silver_thread: 1, starbloom: 1 }, reward: {} },
]);

const ACTION_COST = Object.freeze({ till: 2, plant: 1, water: 2, harvest: 1 });

export function weatherForDay(seed, day) {
  if (!Number.isInteger(day) || day < 1) throw new RangeError('day must be positive');
  const roll = ((seed * 29 + day * 47 + day * day * 11) >>> 0) % 10;
  return roll < 5 ? 'clear' : roll < 8 ? 'rain' : 'mist';
}

export function createState(seed = 404) {
  const forecast = Array.from({ length: 14 }, (_, index) => weatherForDay(seed, index + 1));
  return {
    version: 3, seed, day: 1, minute: 360, weather: forecast[0], forecast,
    player: { x: 0, z: 0, stamina: 100, maxStamina: 100, money: 250 },
    inventory: { turnip_seed: 4 }, discovered: { fish: [], forage: [] },
    collectedForage: {}, fishing: null, fishingCasts: 0,
    villagers: Object.fromEntries(Object.keys(VILLAGERS).map(id => [id, { friendship: 0, talkedDay: 0, giftedDay: 0 }])),
    story: { questIndex: 0, completed: [], donationPaid: false, ceremonyComplete: false },
    plots: Array.from({ length: 24 }, (_, id) => ({ id, tilled: false, watered: false, crop: null })),
  };
}

export function dayPeriod(minute) {
  if (minute < 720) return 'morning';
  if (minute < 1080) return 'day';
  return 'evening';
}

export function villagerLocation(villagerId, minute) {
  const villager = VILLAGERS[villagerId];
  return villager?.schedule[dayPeriod(minute)] || null;
}

function friendshipBand(value) {
  if (value >= 75) return 'dear friend';
  if (value >= 40) return 'friend';
  return 'neighbor';
}

export function talkToVillager(state, villagerId) {
  const villager = VILLAGERS[villagerId], social = state.villagers[villagerId];
  if (!villager || !social) return { ok: false, reason: 'No one answers.' };
  const firstToday = social.talkedDay !== state.day;
  social.talkedDay = state.day;
  const active = QUESTS[state.story.questIndex];
  const topic = state.story.ceremonyComplete ? 'The lantern is shining again.'
    : state.story.donationPaid ? 'Meet us by the river after 18:00.'
    : active?.villager === villagerId ? `I still need help with ${active.id.replaceAll('_', ' ')}.`
    : state.weather === 'rain' ? 'The rain makes the whole vale smell green.'
    : `${dayPeriod(state.minute)[0].toUpperCase()}${dayPeriod(state.minute).slice(1)} light suits the vale.`;
  return { ok: true, firstToday, text: `${villager.name} calls you ${friendshipBand(social.friendship)}. ${topic}` };
}

export function offerGift(state, villagerId, itemId) {
  const villager = VILLAGERS[villagerId], social = state.villagers[villagerId];
  if (!villager || !social) return { ok: false, reason: 'No one to give that to.' };
  if (social.giftedDay === state.day) return { ok: false, reason: `${villager.name} has already received a gift today.` };
  if (!itemId || (state.inventory[itemId] || 0) < 1 || itemId.endsWith('_seed')) return { ok: false, reason: 'You are not carrying that gift.' };
  state.inventory[itemId]--;
  social.giftedDay = state.day;
  const loved = itemId === villager.loved, gained = loved ? 25 : 10;
  social.friendship = Math.min(100, social.friendship + gained);
  return { ok: true, loved, gained, friendship: social.friendship };
}

export function turnInQuest(state, villagerId) {
  const quest = QUESTS[state.story.questIndex];
  if (!quest) return { ok: false, reason: 'Every repair task is complete.' };
  if (quest.villager !== villagerId) return { ok: false, reason: `${VILLAGERS[quest.villager].name} is waiting for you.` };
  for (const [item, count] of Object.entries(quest.needs)) if ((state.inventory[item] || 0) < count) return { ok: false, reason: 'You do not have everything yet.' };
  for (const [item, count] of Object.entries(quest.needs)) state.inventory[item] -= count;
  for (const [item, count] of Object.entries(quest.reward)) item === 'money' ? state.player.money += count : addInventory(state, item, count);
  state.story.completed.push(quest.id);
  state.story.questIndex++;
  return { ok: true, quest: quest.id, storyReady: state.story.questIndex === QUESTS.length };
}

export function donateLanternSupplies(state) {
  if (state.story.questIndex < QUESTS.length) return { ok: false, reason: 'The lens must be repaired first.' };
  if (state.story.donationPaid) return { ok: false, reason: 'The supplies are already gathered.' };
  if (state.player.money < 500) return { ok: false, reason: 'The village still needs 500g of supplies.' };
  state.player.money -= 500;
  state.story.donationPaid = true;
  return { ok: true, cost: 500 };
}

export function beginLanternCeremony(state) {
  if (!state.story.donationPaid) return { ok: false, reason: 'The lantern is not ready.' };
  if (state.minute < 1080) return { ok: false, reason: 'Return after 18:00 for the lighting.' };
  if (state.story.ceremonyComplete) return { ok: false, reason: 'The lantern already shines.' };
  state.story.ceremonyComplete = true;
  return { ok: true };
}

function addInventory(state, itemId, count = 1) {
  state.inventory[itemId] = (state.inventory[itemId] || 0) + count;
}

export function collectForage(state, nodeId) {
  const node = FORAGE_NODES.find(candidate => candidate.id === nodeId);
  if (!node) return { ok: false, reason: 'Nothing to gather here.' };
  if (state.collectedForage[nodeId] === state.day) return { ok: false, reason: 'This patch is bare until tomorrow.' };
  state.collectedForage[nodeId] = state.day;
  addInventory(state, node.item);
  if (!state.discovered.forage.includes(node.item)) state.discovered.forage.push(node.item);
  return { ok: true, item: node.item };
}

export function castLine(state, spot) {
  if (!['pond', 'river'].includes(spot)) return { ok: false, reason: 'You need fishable water.' };
  if (state.fishing) return { ok: false, reason: 'The line is already cast.' };
  if (state.player.stamina < 3) return { ok: false, reason: 'Too exhausted.' };
  state.player.stamina -= 3;
  const roll = (state.seed * 17 + state.day * 31 + state.fishingCasts * 13 + (spot === 'river' ? 7 : 0)) % 9;
  state.fishingCasts++;
  const mistGrace = state.weather === 'mist' ? 2 : 0;
  state.fishing = { spot, readyMinute: state.minute + 2 + roll / 3, expiresMinute: state.minute + 7 + roll / 3 + mistGrace };
  return { ok: true, wait: state.fishing.readyMinute - state.minute };
}

export function reelLine(state) {
  if (!state.fishing) return { ok: false, reason: 'Cast the line first.' };
  const cast = state.fishing;
  state.fishing = null;
  if (state.minute < cast.readyMinute) return { ok: false, reason: 'Too soon—the water is still.' };
  if (state.minute > cast.expiresMinute) return { ok: false, reason: 'The fish slipped away.' };
  const item = cast.spot === 'pond' ? 'pond_carp' : 'river_dace';
  addInventory(state, item);
  if (!state.discovered.fish.includes(item)) state.discovered.fish.push(item);
  return { ok: true, item };
}

export function advanceClock(state, seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) throw new RangeError('seconds must be non-negative');
  state.minute = Math.min(1440, state.minute + seconds);
  return state.minute >= 1440;
}

export function movePlayer(state, dx, dz, seconds, jogging = false) {
  const length = Math.hypot(dx, dz);
  if (!length || seconds <= 0) return 0;
  const speed = jogging && state.player.stamina > 0 ? 6 : 3.5;
  const distance = speed * Math.min(seconds, 0.1);
  state.player.x += dx / length * distance;
  state.player.z += dz / length * distance;
  if (jogging) state.player.stamina = Math.max(0, state.player.stamina - 4 * seconds);
  return distance;
}

function spend(state, action) {
  const cost = ACTION_COST[action];
  if (state.player.stamina < cost) return false;
  state.player.stamina -= cost;
  return true;
}

export function actOnPlot(state, plotId, action, cropId) {
  const plot = state.plots[plotId];
  if (!plot) return { ok: false, reason: 'No plot here.' };
  if (action === 'till') {
    if (plot.tilled) return { ok: false, reason: 'Already tilled.' };
    if (!spend(state, action)) return { ok: false, reason: 'Too exhausted.' };
    plot.tilled = true;
  } else if (action === 'plant') {
    if (!plot.tilled || plot.crop) return { ok: false, reason: 'This plot cannot be planted.' };
    if (!CROPS[cropId]) return { ok: false, reason: 'Unknown seed.' };
    const key = `${cropId}_seed`;
    if (!(state.inventory[key] > 0)) return { ok: false, reason: 'No seeds.' };
    if (!spend(state, action)) return { ok: false, reason: 'Too exhausted.' };
    state.inventory[key]--;
    plot.crop = { id: cropId, age: 0 };
  } else if (action === 'water') {
    if (!plot.tilled || plot.watered) return { ok: false, reason: 'This plot does not need water.' };
    if (!spend(state, action)) return { ok: false, reason: 'Too exhausted.' };
    plot.watered = true;
  } else if (action === 'harvest') {
    if (!plot.crop || plot.crop.age < CROPS[plot.crop.id].growDays) return { ok: false, reason: 'Not ready to harvest.' };
    if (!spend(state, action)) return { ok: false, reason: 'Too exhausted.' };
    state.inventory[plot.crop.id] = (state.inventory[plot.crop.id] || 0) + 1;
    plot.crop = null;
    plot.watered = false;
  } else return { ok: false, reason: 'Unknown action.' };
  return { ok: true };
}

export function sleep(state, nextWeather = state.forecast?.[state.day] || weatherForDay(state.seed, state.day + 1), passedOut = false) {
  if (!['clear', 'rain', 'mist'].includes(nextWeather)) throw new RangeError('unknown weather');
  for (const plot of state.plots) {
    if (plot.crop && (plot.watered || state.weather === 'rain')) plot.crop.age++;
    plot.watered = false;
  }
  state.day++;
  state.minute = 360;
  state.weather = nextWeather;
  state.player.stamina = state.player.maxStamina;
  state.fishing = null;
  const penalty = passedOut ? Math.min(100, Math.floor(state.player.money * .1)) : 0;
  state.player.money -= penalty;
  return { seasonComplete: state.day > 14, penalty };
}

export function buySeeds(state, cropId, count = 1) {
  const crop = CROPS[cropId];
  if (!crop || !Number.isInteger(count) || count < 1) return { ok: false, reason: 'Invalid order.' };
  const cost = crop.seedPrice * count;
  if (state.player.money < cost) return { ok: false, reason: 'Not enough money.' };
  state.player.money -= cost;
  const key = `${cropId}_seed`;
  state.inventory[key] = (state.inventory[key] || 0) + count;
  return { ok: true, cost };
}

export function sellItem(state, itemId, count = 1) {
  const sale = CROPS[itemId] || ITEMS[itemId];
  if (!sale || !Number.isInteger(count) || count < 1 || (state.inventory[itemId] || 0) < count) return { ok: false, reason: 'Nothing to sell.' };
  state.inventory[itemId] -= count;
  const earned = sale.sell * count;
  state.player.money += earned;
  return { ok: true, earned };
}
