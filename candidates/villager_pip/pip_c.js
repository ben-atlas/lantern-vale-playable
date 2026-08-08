// Pip C: apprentice inventor with a floppy cap, backpack, and pinwheel staff.
export default function (THREE) {
  const g=new THREE.Group();
  const colors={tunic:0xd98b37,apron:0x477d72,skin:0xda9b6c,hair:0x69412d,boot:0x44342d,cap:0x547b91,pack:0x8a5939,brass:0xd4a641,red:0xc95543};
  const mats=Object.fromEntries(Object.entries(colors).map(([k,v])=>[k,new THREE.MeshStandardMaterial({color:v,roughness:.9,flatShading:true})]));
  const add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,mats[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m}, orb=new THREE.SphereGeometry(1,9,7);
  add(orb,'boot',[-.16,.09,.04],[.15,.09,.23]);add(orb,'boot',[.16,.09,.04],[.15,.09,.23]);
  add(new THREE.CylinderGeometry(.25,.31,.66,8),'tunic',[0,.51,0]);add(new THREE.BoxGeometry(.36,.48,.08),'apron',[0,.67,.225]);
  add(orb,'tunic',[0,.82,0],[.3,.26,.22]);
  const arm=new THREE.CylinderGeometry(.075,.09,.4,7);add(arm,'tunic',[-.32,.74,0],[1,1,1],[0,0,-.2]);add(arm,'tunic',[.32,.74,0],[1,1,1],[0,0,.2]);
  add(orb,'skin',[-.36,.56,.01],[.09,.1,.09]);add(orb,'skin',[.36,.56,.01],[.09,.1,.09]);
  add(orb,'skin',[0,1.17,.02],[.24,.25,.22]);add(orb,'hair',[0,1.22,-.16],[.24,.21,.12]);
  add(new THREE.ConeGeometry(.29,.28,9),'cap',[0,1.43,-.03],[1,1,1],[0,0,.14]);add(orb,'cap',[.04,1.53,-.02],[.075,.075,.075]);
  add(new THREE.BoxGeometry(.38,.48,.17),'pack',[0,.73,-.23]);add(new THREE.CylinderGeometry(.06,.06,.48,7),'brass',[.45,.76,0]);
  // Four broad pinwheel sails remain legible from the back as well as the front.
  for(let i=0;i<4;i++) add(new THREE.BoxGeometry(.055,.22,.035),i%2?'red':'brass',[.45+Math.sin(i*Math.PI/2)*.09,1.04+Math.cos(i*Math.PI/2)*.09,.01],[1,1,1],[0,0,-i*Math.PI/2]);
  add(orb,'brass',[.45,1.04,.02],[.055,.055,.04]);
  g.position.set(-.101,0,.002);
  return g;
}
