// June B: orchard farmer with kerchief, broad sunhat, pruning shears and berry satchel.
export default function (THREE) {
  const g=new THREE.Group(), C={blouse:0xeee0b8,skirt:0x54796d,skin:0xb97b59,hair:0x6b402c,boot:0x4a4035,straw:0xe0bd62,red:0xb64c48,berry:0x913b5b,leaf:0x527c4b,steel:0x89999a,leather:0x80563a};
  const M=Object.fromEntries(Object.entries(C).map(([k,v])=>[k,new THREE.MeshStandardMaterial({color:v,roughness:k==='steel'?.5:.86,metalness:k==='steel'?.35:0,flatShading:true})]));
  const orb=new THREE.SphereGeometry(1,10,7), add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,M[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m};
  add(orb,'boot',[-.15,.1,.03],[.14,.1,.22]); add(orb,'boot',[.15,.1,.03],[.14,.1,.22]);
  add(new THREE.CylinderGeometry(.23,.33,.63,10),'skirt',[0,.49,0]); add(orb,'blouse',[0,.8,0],[.33,.28,.24]); add(new THREE.BoxGeometry(.42,.39,.055),'skirt',[0,.61,.255]);
  const arm=new THREE.CylinderGeometry(.07,.09,.43,8); add(arm,'blouse',[-.35,.73,0],[1,1,1],[0,0,-.2]); add(arm,'blouse',[.35,.73,0],[1,1,1],[0,0,.2]); add(orb,'skin',[-.39,.52,0],[.09,.1,.09]); add(orb,'skin',[.39,.52,0],[.09,.1,.09]);
  add(orb,'skin',[0,1.16,.01],[.235,.255,.215]); add(orb,'hair',[0,1.19,-.16],[.25,.22,.13]); add(orb,'hair',[0,1.06,-.22],[.13,.16,.1]);
  add(new THREE.CylinderGeometry(.38,.38,.055,12),'straw',[0,1.41,0]); add(new THREE.CylinderGeometry(.19,.25,.15,10),'straw',[0,1.51,-.02]); add(new THREE.BoxGeometry(.44,.045,.035),'red',[0,1.43,.11]);
  add(new THREE.TorusGeometry(.27,.027,6,12),'leather',[0,.7,0],[1,1,.88],[Math.PI/2,0,0]); add(new THREE.BoxGeometry(.27,.32,.16),'leather',[-.34,.58,-.17]);
  for(const p of [[-.4,.65,-.26],[-.31,.68,-.26],[-.36,.58,-.26]]) add(orb,'berry',p,[.055,.055,.055]); add(new THREE.ConeGeometry(.065,.15,6),'leaf',[-.29,.76,-.23],[1,1,.55],[0,0,-.6]);
  add(new THREE.TorusGeometry(.1,.025,6,10,Math.PI),'steel',[.4,.7,-.13],[1,1,.65],[0,.3,1.1]); add(new THREE.BoxGeometry(.27,.035,.035),'steel',[.46,.57,-.12],[1,1,1],[0,0,-.55]);
  add(new THREE.BoxGeometry(.14,.1,.04),'berry',[0,.6,.29]); return g;
}
