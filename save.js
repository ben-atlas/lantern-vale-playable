import { createState, CROPS, VILLAGERS } from './core.js';
export const SAVE_KEY='lantern-vale.save', SETTINGS_KEY='lantern-vale.settings';
export const DEFAULT_SETTINGS=Object.freeze({reducedMotion:false,cameraShake:true,music:70,effects:80,master:80});
const finite=(v,f)=>Number.isFinite(v)?v:f;
const integer=(v,f,min,max)=>Number.isInteger(v)?Math.min(max,Math.max(min,v)):f;
export function migrateState(input){
 if(!input||typeof input!=='object'||Array.isArray(input))throw new TypeError('Save data is not an object.');
 const seed=Number.isInteger(input.seed)?input.seed:404,fresh=createState(seed),state=structuredClone(fresh);
 state.day=integer(input.day,1,1,14);state.minute=Math.min(1440,Math.max(0,finite(input.minute,360)));
 if(Array.isArray(input.forecast)&&input.forecast.length===14&&input.forecast.every(x=>['clear','rain','mist'].includes(x)))state.forecast=[...input.forecast];
 state.weather=['clear','rain','mist'].includes(input.weather)?input.weather:state.forecast[state.day-1];
 for(const key of ['x','z','stamina','maxStamina','money'])state.player[key]=finite(input.player?.[key],fresh.player[key]);
 state.player.maxStamina=Math.max(1,state.player.maxStamina);state.player.stamina=Math.max(0,Math.min(state.player.maxStamina,state.player.stamina));state.player.money=Math.max(0,Math.floor(state.player.money));
 state.inventory={};for(const [key,value] of Object.entries(input.inventory||{}))if(/^[a-z_]+$/.test(key)&&Number.isInteger(value)&&value>=0)state.inventory[key]=value;
 state.discovered.fish=Array.isArray(input.discovered?.fish)?[...new Set(input.discovered.fish.filter(x=>typeof x==='string'))]:[];
 state.discovered.forage=Array.isArray(input.discovered?.forage)?[...new Set(input.discovered.forage.filter(x=>typeof x==='string'))]:[];
 state.collectedForage=Object.fromEntries(Object.entries(input.collectedForage||{}).filter(([,v])=>Number.isInteger(v)&&v>0));
 state.fishingCasts=integer(input.fishingCasts,0,0,1e7);state.fishing=null;
 for(const id of Object.keys(VILLAGERS)){const old=input.villagers?.[id]||{};state.villagers[id]={friendship:integer(old.friendship,0,0,100),talkedDay:integer(old.talkedDay,0,0,14),giftedDay:integer(old.giftedDay,0,0,14)}}
 const completed=Array.isArray(input.story?.completed)?input.story.completed.filter(x=>typeof x==='string').slice(0,5):[];
 state.story={questIndex:integer(input.story?.questIndex,completed.length,0,5),completed,donationPaid:input.story?.donationPaid===true,ceremonyComplete:input.story?.ceremonyComplete===true};
 if(Array.isArray(input.plots))for(let i=0;i<24;i++){const old=input.plots[i];if(!old||typeof old!=='object')continue;const crop=old.crop&&CROPS[old.crop.id]?{id:old.crop.id,age:integer(old.crop.age,0,0,CROPS[old.crop.id].growDays)}:null;state.plots[i]={id:i,tilled:old.tilled===true,watered:old.watered===true,crop}}
 state.version=3;return state;
}
export function encodeSave(state){return JSON.stringify({savedAt:new Date().toISOString(),state:migrateState(state)})}
export function decodeSave(text){let parsed;try{parsed=JSON.parse(text)}catch{throw new TypeError('Save data is not valid JSON.')}return migrateState(parsed?.state||parsed)}
export function saveGame(storage,state){storage.setItem(SAVE_KEY,encodeSave(state))}export function loadGame(storage){const raw=storage.getItem(SAVE_KEY);return raw===null?null:decodeSave(raw)}export function hasSave(storage){return storage.getItem(SAVE_KEY)!==null}
export function normalizeSettings(value={}){const percent=key=>integer(value[key],DEFAULT_SETTINGS[key],0,100);return{reducedMotion:value.reducedMotion===true,cameraShake:value.cameraShake!==false,music:percent('music'),effects:percent('effects'),master:percent('master')}}
export function loadSettings(storage){try{return normalizeSettings(JSON.parse(storage.getItem(SETTINGS_KEY)||'{}'))}catch{return{...DEFAULT_SETTINGS}}}export function saveSettings(storage,settings){const clean=normalizeSettings(settings);storage.setItem(SETTINGS_KEY,JSON.stringify(clean));return clean}
