// June A: practical young farmer with straw hat, berry basket and field apron.
export default function (THREE) {
  const g=new THREE.Group(), C={shirt:0xd59b55,denim:0x547b78,skin:0xa96f50,hair:0x5b3828,boot:0x514536,straw:0xd9b85f,berry:0x9f3f58,leaf:0x4e7848,wood:0x7a5635};
  const M=Object.fromEntries(Object.entries(C).map(([k,v])=>[k,new THREE.MeshStandardMaterial({color:v,roughness:.86,flatShading:true})]));
  const orb=new THREE.SphereGeometry(1,10,7), add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,M[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m};
  add(orb,'boot',[-.16,.1,.02],[.15,.1,.22]); add(orb,'boot',[.16,.1,.02],[.15,.1,.22]);
  add(new THREE.CylinderGeometry(.24,.29,.62,9),'denim',[0,.49,0]); add(orb,'shirt',[0,.78,0],[.32,.27,.23]);
  add(new THREE.BoxGeometry(.38,.42,.055),'denim',[0,.59,.245]); add(new THREE.BoxGeometry(.055,.45,.045),'denim',[-.14,.79,.24],[1,1,1],[0,0,-.12]); add(new THREE.BoxGeometry(.055,.45,.045),'denim',[.14,.79,.24],[1,1,1],[0,0,.12]);
  const arm=new THREE.CylinderGeometry(.07,.085,.4,8); add(arm,'shirt',[-.34,.71,0],[1,1,1],[0,0,-.2]); add(arm,'shirt',[.34,.71,0],[1,1,1],[0,0,.2]); add(orb,'skin',[-.38,.51,0],[.09,.1,.09]); add(orb,'skin',[.38,.51,0],[.09,.1,.09]);
  add(orb,'skin',[0,1.12,.01],[.23,.25,.21]); add(orb,'hair',[0,1.16,-.16],[.24,.22,.12]);
  add(new THREE.CylinderGeometry(.35,.35,.055,12),'straw',[0,1.36,0]); add(new THREE.CylinderGeometry(.2,.24,.16,10),'straw',[0,1.46,-.01]); add(new THREE.TorusGeometry(.21,.025,6,12),'berry',[0,1.39,0],[1,1,.86],[Math.PI/2,0,0]);
  add(new THREE.BoxGeometry(.34,.23,.18),'wood',[.35,.45,-.19]); add(new THREE.TorusGeometry(.19,.022,6,12,Math.PI),'wood',[.35,.61,-.19],[1,1,.72],[0,0,0]);
  for(const p of [[.27,.57,-.2],[.36,.58,-.2],[.43,.55,-.2]]) add(orb,'berry',p,[.055,.055,.055]);
  add(new THREE.ConeGeometry(.06,.15,6),'leaf',[.29,.65,-.2],[1,1,.55],[0,0,-.55]); add(new THREE.BoxGeometry(.12,.09,.04),'berry',[0,.57,.285]);
  return g;
}
