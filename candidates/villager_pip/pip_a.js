// Pip A: eager village tinkerer with a broad cap, tool belt, and wind-up bird.
export default function (THREE) {
  const g = new THREE.Group();
  const palette = { shirt:0xe0a23b, overall:0x39758a, skin:0xd99a6c, hair:0x6b3e29, boot:0x44362e, cap:0xc55b3f, brass:0xd3a33d, wood:0x815331 };
  const mats = Object.fromEntries(Object.entries(palette).map(([k,v]) => [k,new THREE.MeshStandardMaterial({color:v,roughness:.88,flatShading:true})]));
  const add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,mats[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m};
  const orb=new THREE.SphereGeometry(1,9,6);
  add(orb,'boot',[-.16,.09,.04],[.15,.09,.23]); add(orb,'boot',[.16,.09,.04],[.15,.09,.23]);
  add(new THREE.CylinderGeometry(.25,.3,.62,8),'overall',[0,.48,0]);
  add(orb,'shirt',[0,.79,0],[.3,.3,.23]);
  add(new THREE.BoxGeometry(.34,.35,.06),'overall',[0,.79,.22]);
  const arm=new THREE.CylinderGeometry(.075,.09,.39,7); add(arm,'shirt',[-.32,.72,0],[1,1,1],[0,0,-.25]); add(arm,'shirt',[.32,.72,0],[1,1,1],[0,0,.25]);
  add(orb,'skin',[-.37,.52,.01],[.09,.1,.09]); add(orb,'skin',[.37,.52,.01],[.09,.1,.09]);
  add(orb,'skin',[0,1.13,.02],[.235,.245,.22]); add(orb,'hair',[0,1.18,-.16],[.23,.2,.11]);
  add(new THREE.CylinderGeometry(.28,.28,.11,10),'cap',[0,1.36,0]); add(new THREE.BoxGeometry(.31,.045,.2),'cap',[0,1.34,.22]);
  add(new THREE.TorusGeometry(.3,.035,5,12),'wood',[0,.58,0],[1,1,.85],[Math.PI/2,0,0]);
  add(new THREE.BoxGeometry(.09,.2,.05),'brass',[-.22,.55,.25]); add(new THREE.BoxGeometry(.08,.17,.055),'wood',[.2,.55,.25]);
  // Little wind-up bird reads from front and side, balanced by the belt tools.
  add(orb,'brass',[.43,.84,.02],[.13,.1,.09]); add(new THREE.ConeGeometry(.07,.14,6),'brass',[.56,.85,.02],[1,1,1],[0,0,-Math.PI/2]);
  add(new THREE.CylinderGeometry(.018,.018,.25,6),'wood',[.39,.66,.02]);
  // Counterbalance the bird so the assembled footprint remains placement-centred.
  g.position.x=-.085;
  return g;
}
