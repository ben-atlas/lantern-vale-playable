// Rowan B: gentle woodland ranger with fern mantle, knit cap, and forage pack.
export default function (THREE) {
  const g = new THREE.Group();
  const colors = { coat:0x587748, mantle:0x839747, linen:0xe0c98b, skin:0xc4875b, hair:0x68442d, boot:0x453a30, leather:0x875a38, cap:0xb66b3f, herb:0x4f7d42, berry:0xb84c58 };
  const mats = Object.fromEntries(Object.entries(colors).map(([k,v]) => [k,new THREE.MeshStandardMaterial({ color:v, roughness:.9, flatShading:true })]));
  const orb = new THREE.SphereGeometry(1,10,7);
  const add = (geo,mat,p,s=[1,1,1],r=[0,0,0]) => { const m=new THREE.Mesh(geo,mats[mat]); m.position.set(...p); m.scale.set(...s); m.rotation.set(...r); g.add(m); return m; };
  add(orb,'boot',[-.17,.1,.05],[.16,.1,.24]); add(orb,'boot',[.17,.1,.05],[.16,.1,.24]);
  add(new THREE.CylinderGeometry(.25,.31,.7,10),'coat',[0,.5,0]); add(orb,'linen',[0,.82,.02],[.32,.28,.24]);
  add(new THREE.TorusGeometry(.3,.08,7,12),'mantle',[0,1.0,0],[1,1,.8],[Math.PI/2,0,0]);
  for (const x of [-.22,0,.22]) add(new THREE.ConeGeometry(.11,.34,7),'mantle',[x,.89,-.16],[1,1,.75],[0,0,x]);
  const arm = new THREE.CylinderGeometry(.08,.1,.42,8);
  add(arm,'coat',[-.34,.72,0],[1,1,1],[0,0,-.2]); add(arm,'coat',[.34,.72,0],[1,1,1],[0,0,.2]);
  add(orb,'skin',[-.38,.52,.01],[.095,.105,.095]); add(orb,'skin',[.38,.52,.01],[.095,.105,.095]);
  add(orb,'skin',[0,1.25,.03],[.25,.265,.23]); add(orb,'hair',[0,1.31,-.16],[.25,.22,.13]);
  add(new THREE.CylinderGeometry(.255,.28,.18,10),'cap',[0,1.48,-.015]); add(new THREE.SphereGeometry(1,10,6,0,Math.PI*2,0,Math.PI/2),'cap',[0,1.57,-.015],[.255,.19,.24]);
  add(new THREE.TorusGeometry(.19,.045,6,12,Math.PI),'hair',[0,1.17,.2],[1,1,.55],[0,0,Math.PI]);
  add(new THREE.BoxGeometry(.45,.38,.17),'leather',[0,.71,-.25]);
  add(new THREE.CylinderGeometry(.17,.21,.34,9),'leather',[0,.39,-.24]);
  add(new THREE.ConeGeometry(.07,.28,6),'herb',[-.12,.62,-.36],[1,1,1],[0,0,-.22]);
  add(new THREE.ConeGeometry(.07,.3,6),'herb',[.12,.63,-.36],[1,1,1],[0,0,.22]);
  add(orb,'berry',[-.08,.48,.25],[.04,.04,.04]); add(orb,'berry',[.08,.48,.25],[.04,.04,.04]);
  return g;
}
