// Rowan A: broad-shouldered forester with leaf cape, field hat, and hand axe.
export default function (THREE) {
  const g = new THREE.Group();
  const colors = { moss:0x657936, fern:0x3f6843, shirt:0xd8b96e, skin:0xb97850, hair:0x4b3225, boot:0x40362c, bark:0x765032, iron:0x8b9993, berry:0xb94f43 };
  const mats = Object.fromEntries(Object.entries(colors).map(([k,v]) => [k,new THREE.MeshStandardMaterial({ color:v, roughness:.88, metalness:k==='iron'?.28:0, flatShading:true })]));
  const orb = new THREE.SphereGeometry(1,10,7);
  const add = (geo,mat,p,s=[1,1,1],r=[0,0,0]) => { const m=new THREE.Mesh(geo,mats[mat]); m.position.set(...p); m.scale.set(...s); m.rotation.set(...r); g.add(m); return m; };
  add(orb,'boot',[-.18,.11,.035],[.17,.11,.25]); add(orb,'boot',[.18,.11,.035],[.17,.11,.25]);
  add(new THREE.CylinderGeometry(.27,.33,.68,9),'moss',[0,.52,0]);
  add(orb,'shirt',[0,.82,0],[.34,.29,.25]);
  add(new THREE.ConeGeometry(.48,.72,9,1,true),'fern',[0,.76,-.13],[1,1,.72]);
  const arm = new THREE.CylinderGeometry(.085,.105,.43,8);
  add(arm,'shirt',[-.35,.72,0],[1,1,1],[0,0,-.22]); add(arm,'shirt',[.35,.72,0],[1,1,1],[0,0,.22]);
  add(orb,'skin',[-.39,.51,.01],[.1,.11,.1]); add(orb,'skin',[.39,.51,.01],[.1,.11,.1]);
  add(orb,'skin',[0,1.24,.025],[.255,.27,.235]); add(orb,'hair',[0,1.3,-.17],[.26,.23,.13]);
  add(new THREE.CylinderGeometry(.31,.35,.12,12),'bark',[0,1.49,0]);
  add(new THREE.ConeGeometry(.27,.25,10),'moss',[0,1.67,-.02]);
  add(new THREE.TorusGeometry(.205,.035,6,12,Math.PI),'hair',[0,1.17,.19],[1,.9,.55],[0,0,Math.PI]);
  // Balanced axe across the back keeps the silhouette centred.
  add(new THREE.CylinderGeometry(.025,.03,.72,7),'bark',[0,1.0,-.28],[1,1,1],[0,0,Math.PI/2]);
  add(new THREE.BoxGeometry(.18,.17,.055),'iron',[-.34,1.0,-.28],[1,1,1],[0,0,.22]);
  add(new THREE.BoxGeometry(.18,.17,.055),'iron',[.34,1.0,-.28],[1,1,1],[0,0,-.22]);
  add(orb,'berry',[-.14,.67,.255],[.035,.035,.035]); add(orb,'berry',[0,.64,.265],[.035,.035,.035]); add(orb,'berry',[.14,.67,.255],[.035,.035,.035]);
  g.position.z = .052;
  return g;
}
