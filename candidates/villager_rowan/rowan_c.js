// Rowan C: veteran woodward with acorn hood, bark apron, and mushroom basket.
export default function (THREE) {
  const g = new THREE.Group();
  const colors = { tunic:0x6f8444, hood:0x9b6840, apron:0x765137, shirt:0xd3b978, skin:0xad704d, hair:0x514032, boot:0x3f352d, basket:0xb98248, mushroom:0xd8c39c, red:0xa94c3c };
  const mats = Object.fromEntries(Object.entries(colors).map(([k,v]) => [k,new THREE.MeshStandardMaterial({ color:v, roughness:.9, flatShading:true })]));
  const orb = new THREE.SphereGeometry(1,10,7);
  const add = (geo,mat,p,s=[1,1,1],r=[0,0,0]) => { const m=new THREE.Mesh(geo,mats[mat]); m.position.set(...p); m.scale.set(...s); m.rotation.set(...r); g.add(m); return m; };
  add(orb,'boot',[-.18,.1,.045],[.17,.1,.25]); add(orb,'boot',[.18,.1,.045],[.17,.1,.25]);
  add(new THREE.CylinderGeometry(.27,.32,.68,9),'tunic',[0,.5,0]); add(orb,'shirt',[0,.82,0],[.33,.28,.24]);
  add(new THREE.BoxGeometry(.42,.48,.07),'apron',[0,.58,.235]);
  const arm = new THREE.CylinderGeometry(.085,.105,.42,8);
  add(arm,'shirt',[-.35,.72,0],[1,1,1],[0,0,-.22]); add(arm,'shirt',[.35,.72,0],[1,1,1],[0,0,.22]);
  add(orb,'skin',[-.39,.51,.01],[.1,.11,.1]); add(orb,'skin',[.39,.51,.01],[.1,.11,.1]);
  add(orb,'skin',[0,1.23,.025],[.25,.265,.23]); add(orb,'hair',[0,1.27,-.17],[.25,.23,.13]);
  add(new THREE.ConeGeometry(.31,.36,9),'hood',[0,1.52,-.03]); add(new THREE.CylinderGeometry(.035,.055,.18,7),'apron',[0,1.76,-.03]);
  add(new THREE.TorusGeometry(.19,.05,6,12,Math.PI),'hair',[0,1.15,.2],[1,1,.6],[0,0,Math.PI]);
  // Rear basket and paired mushrooms provide a readable back view.
  add(new THREE.CylinderGeometry(.24,.2,.32,10),'basket',[0,.67,-.29]);
  add(new THREE.TorusGeometry(.2,.025,6,12,Math.PI),'basket',[0,.88,-.29],[1,1,.7]);
  for (const x of [-.12,.12]) { add(new THREE.CylinderGeometry(.025,.035,.18,7),'mushroom',[x,.92,-.3]); add(orb,x<0?'red':'mushroom',[x,1.03,-.3],[.11,.055,.1]); }
  add(new THREE.ConeGeometry(.08,.24,7),'tunic',[-.18,.93,.19],[1,1,.7],[0,0,-.2]);
  add(new THREE.ConeGeometry(.08,.24,7),'tunic',[.18,.93,.19],[1,1,.7],[0,0,.2]);
  g.position.z = .105;
  return g;
}
