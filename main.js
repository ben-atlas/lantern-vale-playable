// Keep the browser build self-contained. The previous package-relative import
// worked in the development repo but was unavailable on static deployments.
import * as THREE from './vendor/three.module.js';
import { createState, advanceClock, movePlayer, actOnPlot, buySeeds, castLine, collectForage, reelLine, sellItem, sleep as sleepCore, CROPS, FORAGE_NODES, ITEMS, VILLAGERS, QUESTS, villagerLocation, talkToVillager, offerGift, turnInQuest, donateLanternSupplies, beginLanternCeremony } from './core.js';
import makePlayer from './assets/player.js';
import makeHouse from './assets/farmhouse.js';
import makePlot from './assets/farm_plot.js';
import makeVillageStreet from './assets/village_street.js';
import makeForestPond from './assets/forest_pond.js';
import makeRiversideLantern from './assets/riverside_lantern.js';
import makeMara from './assets/villager_mara.js';
import makePip from './assets/villager_pip.js';
import makeRowan from './assets/villager_rowan.js';
import makeNeri from './assets/villager_neri.js';
import makeSol from './assets/villager_sol.js';
import makeJune from './assets/villager_june.js';
import { resolveMovement, zoneAt, interactionAt } from './world.js';
import { hasSave, loadGame, loadSettings, saveGame, saveSettings } from './save.js';

const canvas = document.querySelector('#world');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8ac3bd);
scene.fog = new THREE.Fog(0x8ac3bd, 55, 100);
const camera = new THREE.OrthographicCamera(-16, 16, 9, -9, .1, 160);
camera.position.set(18, 22, 22); camera.lookAt(0, 0, 0);

scene.add(new THREE.HemisphereLight(0xffe8bd, 0x315f58, 2.2));
const sun = new THREE.DirectionalLight(0xffd58e, 3.2); sun.position.set(-15, 24, 16); sun.castShadow = true;
sun.shadow.mapSize.set(2048,2048); Object.assign(sun.shadow.camera,{left:-35,right:35,top:35,bottom:-35}); scene.add(sun);
const ground = new THREE.Mesh(new THREE.CircleGeometry(58, 64), new THREE.MeshStandardMaterial({color:0x739355,roughness:1}));
ground.rotation.x=-Math.PI/2; ground.receiveShadow=true; scene.add(ground);
const path = new THREE.Mesh(new THREE.PlaneGeometry(12,75),new THREE.MeshStandardMaterial({color:0xb99b70,roughness:1}));
path.rotation.x=-Math.PI/2; path.rotation.z=-.08; path.position.set(14,.012,-13); path.receiveShadow=true; scene.add(path);

const house=makeHouse(THREE); house.position.set(-11,0,-11); house.rotation.y=.08; scene.add(house);
const villageStreet=makeVillageStreet(THREE); villageStreet.position.set(24,0,-13); scene.add(villageStreet);
const forestPond=makeForestPond(THREE); forestPond.position.set(-30.5,0,28); scene.add(forestPond);
const riversideLantern=makeRiversideLantern(THREE); riversideLantern.position.set(32,0,24); scene.add(riversideLantern);
const lanternGlow=new THREE.PointLight(0xffbd55,12,13,2);lanternGlow.position.set(32,5.1,24);scene.add(lanternGlow);
let state=createState(); state.player.x=0; state.player.z=13;
const player=makePlayer(THREE); player.position.set(state.player.x,0,state.player.z); player.rotation.y=Math.PI; scene.add(player);
const villagerAnchors={'old-lantern':[29.7,22.6],'village-square':[15,-1],'village-shop':[18.5,-7.5],'forest-edge':[-24,3],'pond-pier':[-20.5,29.5],'river-dock':[6.5,31.5],smithy:[30,-2],'farm-gate':[7,14]};
const villagerFactories={mara:makeMara,pip:makePip,rowan:makeRowan,neri:makeNeri,sol:makeSol,june:makeJune};
const villagerOffsets={mara:[-2.4,0],pip:[2.4,0],rowan:[0,-2.4],neri:[0,2.4],sol:[-1.7,1.7],june:[1.7,1.7]};
const villagers=new Map(Object.entries(villagerFactories).map(([id,factory])=>{const model=factory(THREE);model.userData.villagerId=id;scene.add(model);return[id,model]}));
for(const root of [house,player,villageStreet,forestPond,riversideLantern]) root.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});

const plots=[];
for(let i=0;i<24;i++){
  const p=makePlot(THREE), col=i%6,row=Math.floor(i/6);
  p.scale.setScalar(.72); p.position.set(-8.6+col*3.05,0,-2.5+row*3.05); p.userData.id=i;
  p.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.material=o.material.clone()}});
  plots.push(p); scene.add(p);
}
const forageMarkers=new Map();
for(const node of FORAGE_NODES){
  const color=node.item==='river_reed'?0xd1b45d:node.item==='berry'?0xc9504a:node.item==='herb'?0x86b85c:0xd8b17b;
  const marker=new THREE.Mesh(new THREE.OctahedronGeometry(.28,1),new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.18,roughness:.8}));
  marker.position.set(node.x,.48,node.z); marker.castShadow=true; marker.userData.node=node; forageMarkers.set(node.id,marker); scene.add(marker);
}
const tools=['till','plant','water','harvest']; let toolIndex=0, seed='turnip', transitioning=false;
const cropIds=Object.keys(CROPS); const keys=new Set(); let started=false, frame=0, fps=60, last=performance.now(), accumulator=0, toastTimer=0;
let currentZone=zoneAt(state.player.x,state.player.z)?.id;
const ui={day:document.querySelector('#day'),clock:document.querySelector('#clock'),weather:document.querySelector('#weather'),money:document.querySelector('#money'),stamina:document.querySelector('#stamina'),tool:document.querySelector('#tool-name'),seeds:document.querySelector('#seed-count'),prompt:document.querySelector('#prompt'),toast:document.querySelector('#toast'),shop:document.querySelector('#shop'),shopMoney:document.querySelector('#shop-money'),shopStock:document.querySelector('#shop-stock'),inventory:document.querySelector('#inventory'),questTitle:document.querySelector('#quest-title'),questProgress:document.querySelector('#quest-progress'),social:document.querySelector('#social'),socialName:document.querySelector('#social-name'),socialText:document.querySelector('#social-text'),socialFriendship:document.querySelector('#social-friendship'),giftStock:document.querySelector('#gift-stock'),ceremony:document.querySelector('#ceremony')};
let activeVillager=null;
const transition=document.querySelector('#day-transition');
const pause=document.querySelector('#pause'); let settings=loadSettings(localStorage);
function applySettings(){document.body.classList.toggle('reduced-motion',settings.reducedMotion);for(const input of pause.querySelectorAll('[data-setting]'))input.type==='checkbox'?input.checked=settings[input.dataset.setting]:input.value=settings[input.dataset.setting]}
function persistSettings(){settings=saveSettings(localStorage,settings);applySettings()}
function restoreState(next){state=next;player.position.set(state.player.x,0,state.player.z);currentZone=zoneAt(state.player.x,state.player.z)?.id;for(const p of plots)refreshPlot(p);for(const marker of forageMarkers.values())marker.visible=state.collectedForage[marker.userData.node.id]!==state.day;updateAtmosphere();updateUI()}
function togglePause(force){const open=force??!pause.classList.contains('show');pause.classList.toggle('show',open);started=!open;keys.clear()}
function sleep(stateArg,day,passedOut){const result=sleepCore(stateArg,day,passedOut);saveGame(localStorage,stateArg);return result}

function nearestPlot(){let best=null,dist=Infinity;for(const p of plots){const d=Math.hypot(p.position.x-state.player.x,p.position.z-state.player.z);if(d<dist){dist=d;best=p}}return dist<2.65?best:null}
function showToast(text){ui.toast.textContent=text;ui.toast.classList.add('show');toastTimer=2.4}
function nearbyForage(){let best=null,dist=1.45;for(const marker of forageMarkers.values()){if(!marker.visible)continue;const d=Math.hypot(marker.position.x-state.player.x,marker.position.z-state.player.z);if(d<dist){dist=d;best=marker}}return best}
function updateVillagers(){for(const [id,model] of villagers){const anchor=villagerAnchors[villagerLocation(id,state.minute)],offset=villagerOffsets[id];model.position.set(anchor[0]+offset[0],0,anchor[1]+offset[1]);model.rotation.y=Math.atan2(32-model.position.x,24-model.position.z);model.visible=Math.hypot(model.position.x-state.player.x,model.position.z-state.player.z)<18}}
function nearbyVillager(){let best=null,dist=2.1;for(const [id,model] of villagers){const d=Math.hypot(model.position.x-state.player.x,model.position.z-state.player.z);if(d<dist){dist=d;best=id}}return best}
function itemName(id){return CROPS[id]?id[0].toUpperCase()+id.slice(1):ITEMS[id]?.name||id.replaceAll('_',' ')}
function questCopy(){const quest=QUESTS[state.story.questIndex];if(quest){const needs=Object.entries(quest.needs).map(([id,n])=>`${Math.min(state.inventory[id]||0,n)}/${n} ${itemName(id)}`).join(' · ');return[`Help ${VILLAGERS[quest.villager].name}`,needs]}if(!state.story.donationPaid)return['Gather village supplies',`${Math.min(state.player.money,500)}/500g · offer at old lantern`];if(!state.story.ceremonyComplete)return['Light the river lantern',state.minute<1080?'Return after 18:00':'Meet everyone at the old lantern'];return['The Vale Alight','The river lantern shines again']}
function renderSocial(){if(!activeVillager)return;const v=VILLAGERS[activeVillager],social=state.villagers[activeVillager];ui.socialName.textContent=v.name;ui.socialFriendship.textContent=`Friendship ${social.friendship}/100 · Loves ${itemName(v.loved)}`;const gifts=[...Object.keys(CROPS),...Object.keys(ITEMS)].filter(id=>(state.inventory[id]||0)>0);ui.giftStock.innerHTML=gifts.length?gifts.map(id=>`<button data-gift="${id}">${itemName(id)}<small>${state.inventory[id]} in satchel</small></button>`).join(''):'<p>Your satchel has no gifts.</p>';ui.social.querySelector('[data-turnin]').disabled=QUESTS[state.story.questIndex]?.villager!==activeVillager}
function openSocial(id){activeVillager=id;ui.socialText.textContent=`${VILLAGERS[id].name} smiles as you approach.`;renderSocial();ui.social.classList.add('show');keys.clear()}
function closeSocial(){ui.social.classList.remove('show');activeVillager=null}
function useStory(){if(state.story.questIndex<QUESTS.length)return showToast(`${VILLAGERS[QUESTS[state.story.questIndex].villager].name} can help with the next repair.`);const result=state.story.donationPaid?beginLanternCeremony(state):donateLanternSupplies(state);if(!result.ok)return showToast(result.reason);if(result.cost)showToast('The village supply fund is complete.');else{ui.ceremony.classList.add('show');lanternGlow.color.set(0xffe08a);lanternGlow.intensity=28}updateUI()}
function updateAtmosphere(){const daylight=Math.max(.12,Math.sin((state.minute-300)/840*Math.PI));const wet=state.weather==='rain',mist=state.weather==='mist';scene.background.set(wet?0x668985:mist?0xa7b8a8:0x8ac3bd).multiplyScalar(.55+.45*daylight);scene.fog.color.copy(scene.background);scene.fog.near=mist?24:55;scene.fog.far=mist?68:100;sun.intensity=(wet?1.5:3.2)*daylight;lanternGlow.intensity=(state.story.ceremonyComplete?18:7)+10*(1-daylight);document.body.classList.toggle('rain',wet);document.body.classList.toggle('mist',mist)}
function endDay(passedOut){if(transitioning)return;transitioning=true;keys.clear();const result=sleep(state,undefined,passedOut);transition.querySelector('strong').textContent=result.seasonComplete?'Season complete':`Day ${state.day}`;transition.querySelector('span').textContent=passedOut?`You passed out · ${result.penalty}g recovery fee`:`${state.weather[0].toUpperCase()+state.weather.slice(1)} skies`;transition.classList.add('show');for(const p of plots)refreshPlot(p);updateAtmosphere();updateUI();setTimeout(()=>{transition.classList.remove('show');transitioning=false},900)}
function useTool(){const villager=nearbyVillager();if(villager)return openSocial(villager);const interaction=interactionAt(state.player.x,state.player.z);if(interaction?.kind==='shop')return openShop();if(interaction?.kind==='sleep')return endDay(false);if(interaction?.kind==='story')return useStory();const marker=nearbyForage();if(marker){const result=collectForage(state,marker.userData.node.id);if(result.ok)marker.visible=false;return showToast(result.ok?`Gathered ${ITEMS[result.item].name}.`:result.reason)}const p=nearestPlot();if(!p)return showToast(interaction?.label||'Nothing to use here.');const result=actOnPlot(state,p.userData.id,tools[toolIndex],seed);showToast(result.ok?`${tools[toolIndex][0].toUpperCase()+tools[toolIndex].slice(1)} complete.`:result.reason);refreshPlot(p)}
function fish(){const interaction=interactionAt(state.player.x,state.player.z);if(!state.fishing){if(interaction?.kind!=='fish')return showToast('Move to a pier or dock to fish.');const result=castLine(state,interaction.id==='pond-pier'?'pond':'river');showToast(result.ok?'Line cast… watch for the golden prompt.':result.reason)}else{const result=reelLine(state);showToast(result.ok?`Caught ${ITEMS[result.item].name}!`:result.reason)}}
function renderShop(){ui.shopMoney.textContent=`Purse: ${state.player.money}g`;ui.shopStock.innerHTML=cropIds.map(id=>`<button data-buy="${id}">${id}<small>${CROPS[id].seedPrice}g seed</small></button>`).join('');const saleIds=[...Object.keys(CROPS),...Object.keys(ITEMS)].filter(id=>(state.inventory[id]||0)>0);ui.inventory.innerHTML=saleIds.length?saleIds.map(id=>`<button data-sell="${id}">${CROPS[id]?id:ITEMS[id].name}<small>${state.inventory[id]} owned · ${CROPS[id]?.sell||ITEMS[id].sell}g</small></button>`).join(''):'<p>Your sell basket is empty.</p>'}
function openShop(){renderShop();ui.shop.classList.add('show')}
function closeShop(){ui.shop.classList.remove('show')}
function refreshPlot(p){const data=state.plots[p.userData.id];p.traverse(o=>{if(o.isMesh){const base=o.userData.base||(o.userData.base=o.material.color.clone());o.material.color.copy(base);if(data.watered)o.material.color.multiplyScalar(.72);else if(data.tilled)o.material.color.offsetHSL(0,.08,-.07)}})}
function updateUI(){const h=Math.floor(state.minute/60)%24,m=Math.floor(state.minute%60);ui.day.textContent=`Day ${state.day}`;ui.clock.textContent=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;ui.weather.textContent=state.weather[0].toUpperCase()+state.weather.slice(1);ui.money.textContent=`${state.player.money}g`;ui.stamina.textContent=`Stamina ${Math.ceil(state.player.stamina)}`;ui.tool.textContent=tools[toolIndex][0].toUpperCase()+tools[toolIndex].slice(1);ui.seeds.textContent=tools[toolIndex]==='plant'?`${seed} seeds: ${state.inventory[seed+'_seed']||0}`:'Q to cycle';const [title,progress]=questCopy();ui.questTitle.textContent=title;ui.questProgress.textContent=progress;updateVillagers();const villager=nearbyVillager(),interaction=interactionAt(state.player.x,state.player.z),marker=nearbyForage(),p=nearestPlot();const fishingReady=state.fishing&&state.minute>=state.fishing.readyMinute&&state.minute<=state.fishing.expiresMinute;ui.prompt.textContent=fishingReady?'F · Reel now!':villager?`E · Talk to ${VILLAGERS[villager].name}`:marker?`E · Gather ${ITEMS[marker.userData.node.item].name}`:interaction?`${interaction.kind==='fish'?'F':'E'} · ${interaction.label}`:p?`E · ${ui.tool.textContent} plot ${p.userData.id+1}`:'';ui.prompt.classList.toggle('show',!!(fishingReady||villager||marker||interaction||p));ui.prompt.classList.toggle('bite',!!fishingReady)}
function step(dt){if(!started||transitioning||ui.shop.classList.contains('show')||ui.social.classList.contains('show')||ui.ceremony.classList.contains('show'))return;let dx=0,dz=0;if(keys.has('ArrowLeft')||keys.has('KeyA'))dx-=1;if(keys.has('ArrowRight')||keys.has('KeyD'))dx+=1;if(keys.has('ArrowUp')||keys.has('KeyW'))dz-=1;if(keys.has('ArrowDown')||keys.has('KeyS'))dz+=1;const ox=state.player.x,oz=state.player.z;movePlayer(state,dx,dz,dt,keys.has('ShiftLeft')||keys.has('ShiftRight'));const resolved=resolveMovement(ox,oz,state.player.x,state.player.z);state.player.x=resolved.x;state.player.z=resolved.z;const vx=state.player.x-ox,vz=state.player.z-oz;if(Math.hypot(vx,vz)>.001)player.rotation.y=Math.atan2(vx,vz);player.position.set(state.player.x,0,state.player.z);const zone=zoneAt(state.player.x,state.player.z);if(zone&&zone.id!==currentZone){currentZone=zone.id;showToast(zone.name)}if(advanceClock(state,dt))return endDay(true);updateAtmosphere();for(const marker of forageMarkers.values())marker.visible=state.collectedForage[marker.userData.node.id]!==state.day;if(toastTimer>0){toastTimer-=dt;if(toastTimer<=0)ui.toast.classList.remove('show')}updateUI()}
function render(now){const real=Math.max(.001,(now-last)/1000);last=now;fps=THREE.MathUtils.lerp(fps,1/real,.08);accumulator+=Math.min(real,.1);while(accumulator>=1/60){step(1/60);accumulator-=1/60}const target=new THREE.Vector3(state.player.x,0,state.player.z);camera.position.lerp(new THREE.Vector3(target.x+18,22,target.z+22),.055);camera.lookAt(target);renderer.render(scene,camera);frame++;window.__GAME__={frame,fps:Math.round(fps),speed:keys.size?3.5:0,pos:[state.player.x,state.player.z],zone:currentZone,interaction:interactionAt(state.player.x,state.player.z)?.id||null,score:state.player.money,over:false,draws:renderer.info.render.calls,tris:renderer.info.render.triangles,minute:state.minute,activeVillager,story:{...state.story},friendship:Object.fromEntries(Object.entries(state.villagers).map(([id,value])=>[id,value.friendship]))};requestAnimationFrame(render)}
function resize(){renderer.setSize(innerWidth,innerHeight,false);const aspect=innerWidth/innerHeight,view=18;camera.left=-view*aspect;camera.right=view*aspect;camera.top=view;camera.bottom=-view;camera.updateProjectionMatrix()}addEventListener('resize',resize);resize();
addEventListener('keydown',e=>{if(e.code==='Escape'){if(ui.shop.classList.contains('show'))closeShop();else if(ui.social.classList.contains('show'))closeSocial();else if(ui.ceremony.classList.contains('show'))ui.ceremony.classList.remove('show');else togglePause();e.preventDefault();return}keys.add(e.code);if(e.repeat)return;if(e.code==='KeyQ'){toolIndex=(toolIndex+1)%tools.length;updateUI()}if(e.code==='KeyE')useTool();if(e.code==='KeyF')fish();if(/^Digit[1-8]$/.test(e.code)){seed=cropIds[+e.code.slice(-1)-1];toolIndex=1;updateUI()}e.preventDefault()});addEventListener('keyup',e=>keys.delete(e.code));
ui.shop.addEventListener('click',e=>{const buy=e.target.closest('[data-buy]'),sell=e.target.closest('[data-sell]');if(buy){const result=buySeeds(state,buy.dataset.buy);showToast(result.ok?'Seeds added to your satchel.':result.reason);renderShop()}if(sell){const result=sellItem(state,sell.dataset.sell);showToast(result.ok?`Sold for ${result.earned}g.`:result.reason);renderShop()}if(e.target.matches('[data-close]'))closeShop()});
ui.social.addEventListener('click',e=>{if(e.target.closest('[data-social-close]'))return closeSocial();if(e.target.closest('[data-talk]')){const result=talkToVillager(state,activeVillager);ui.socialText.textContent=result.ok?result.text:result.reason;return renderSocial()}if(e.target.closest('[data-turnin]')){const result=turnInQuest(state,activeVillager);ui.socialText.textContent=result.ok?'Thank you—the lantern repair moves forward!':result.reason;renderSocial();return updateUI()}const gift=e.target.closest('[data-gift]');if(gift){const result=offerGift(state,activeVillager,gift.dataset.gift);ui.socialText.textContent=result.ok?`${VILLAGERS[activeVillager].name} ${result.loved?'loves':'kindly accepts'} it. Friendship +${result.gained}.`:result.reason;renderSocial();updateUI()}});
ui.ceremony.addEventListener('click',e=>{if(e.target.closest('[data-ceremony-close]'))ui.ceremony.classList.remove('show')});
pause.addEventListener('click',e=>{if(e.target.matches('[data-resume]'))togglePause(false);if(e.target.matches('[data-save]')){saveGame(localStorage,state);pause.querySelector('[data-load]').disabled=false;showToast('Game saved.')}if(e.target.matches('[data-load]')){try{const loaded=loadGame(localStorage);if(loaded){restoreState(loaded);togglePause(false);showToast('Save loaded.')}else showToast('No save found.')}catch{showToast('That save could not be loaded.')}}});
pause.addEventListener('input',e=>{const key=e.target.dataset.setting;if(!key)return;settings[key]=e.target.type==='checkbox'?e.target.checked:Number(e.target.value);persistSettings()});
function start(){started=true;document.querySelector('#intro').classList.add('hidden');updateAtmosphere();updateUI()}window.__START__=start;if(window.__START_REQUESTED__)start();
const touchControls=document.querySelector('#touch-controls');
touchControls.addEventListener('pointerdown',e=>{const button=e.target.closest('button');if(!button)return;e.preventDefault();button.setPointerCapture?.(e.pointerId);if(button.dataset.key)keys.add(button.dataset.key);if(button.dataset.action==='tool'){toolIndex=(toolIndex+1)%tools.length;updateUI()}if(button.dataset.action==='interact')useTool();if(button.dataset.action==='fish')fish()});
for(const eventName of ['pointerup','pointercancel','pointerleave'])touchControls.addEventListener(eventName,e=>{const button=e.target.closest('button');if(button?.dataset.key)keys.delete(button.dataset.key)});
// A narrow deterministic seam for the browser acceptance routes. Gameplay still
// travels through the real keyboard handlers, panels, and core story actions.
window.__HARNESS__={
  prepareStory(){Object.assign(state.inventory,{river_reed:4,turnip:4,mushroom:2,berry:2,herb:2,pond_carp:2,river_dace:2,starbloom:2});state.player.money=800;updateUI()},
  visitVillager(id,minute){if(!VILLAGERS[id])throw new Error(`Unknown villager ${id}`);state.minute=minute;updateVillagers();const model=villagers.get(id);state.player.x=model.position.x;state.player.z=model.position.z+.8;player.position.set(state.player.x,0,state.player.z);currentZone=zoneAt(state.player.x,state.player.z)?.id;updateAtmosphere();updateUI()},
  visitLantern(minute){state.minute=minute;state.player.x=32;state.player.z=24;player.position.set(32,0,24);currentZone=zoneAt(32,24)?.id;updateAtmosphere();updateUI()},
};
window.__READY__=true;applySettings();pause.querySelector('[data-load]').disabled=!hasSave(localStorage);updateAtmosphere();updateUI();requestAnimationFrame(render);
