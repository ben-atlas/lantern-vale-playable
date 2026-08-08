// Sol: compact master smith with forge cap, split apron, hammer and lens loupe.
export default function (THREE) {
  const g = new THREE.Group();
  const colors={tunic:0x405f62,leather:0x8a5637,skin:0x87543f,hair:0x2d3434,boot:0x303635,steel:0x87999a,brass:0xd4a344,red:0xb94f3b,glass:0x83c7bd};
  const mats=Object.fromEntries(Object.entries(colors).map(([k,v])=>[k,new THREE.MeshStandardMaterial({color:v,roughness:k==='steel'||k==='brass'?.48:.86,metalness:k==='steel'?.5:k==='brass'?.25:0,flatShading:true})]));
  const orb=new THREE.SphereGeometry(1,10,7), add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,mats[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m};
  add(orb,'boot',[-.17,.1,.04],[.16,.1,.24]); add(orb,'boot',[.17,.1,.04],[.16,.1,.24]);
  add(new THREE.CylinderGeometry(.27,.31,.68,9),'tunic',[0,.5,0]); add(orb,'tunic',[0,.78,0],[.34,.28,.25]);
  add(new THREE.BoxGeometry(.4,.48,.065),'leather',[0,.58,.255]);
  add(new THREE.BoxGeometry(.17,.34,.07),'leather',[-.11,.33,.25],[1,1,1],[0,0,-.08]); add(new THREE.BoxGeometry(.17,.34,.07),'leather',[.11,.33,.25],[1,1,1],[0,0,.08]);
  const arm=new THREE.CylinderGeometry(.075,.095,.42,8); add(arm,'tunic',[-.35,.68,0],[1,1,1],[0,0,-.2]); add(arm,'tunic',[.35,.68,0],[1,1,1],[0,0,.2]);
  add(orb,'skin',[-.39,.48,.01],[.095,.105,.095]); add(orb,'skin',[.39,.48,.01],[.095,.105,.095]);
  add(orb,'skin',[0,1.16,.02],[.245,.26,.22]); add(orb,'hair',[0,1.2,-.16],[.25,.21,.13]);
  add(new THREE.CylinderGeometry(.26,.28,.1,10),'red',[0,1.39,0]); add(new THREE.ConeGeometry(.2,.22,9),'red',[.06,1.52,-.02],[1,1,.8],[0,0,-.12]);
  add(new THREE.TorusGeometry(.175,.03,6,12,Math.PI),'hair',[0,1.1,.205],[1,.75,.6],[0,0,Math.PI]);
  add(new THREE.TorusGeometry(.28,.032,6,12),'leather',[0,.68,0],[1,1,.88],[Math.PI/2,0,0]);
  add(new THREE.CylinderGeometry(.027,.027,.68,7),'leather',[-.37,.73,-.12],[1,1,1],[0,0,-.34]); add(new THREE.BoxGeometry(.25,.13,.14),'steel',[-.48,1.03,-.12]);
  add(new THREE.CylinderGeometry(.09,.11,.24,8),'leather',[.39,.55,-.13]); add(new THREE.TorusGeometry(.105,.022,6,12),'brass',[.39,.69,-.13],[1,1,.65],[Math.PI/2,0,0]);
  add(new THREE.CylinderGeometry(.04,.04,.035,12),'glass',[.39,.69,-.205],[1,1,1],[Math.PI/2,0,0]);
  add(new THREE.BoxGeometry(.12,.1,.04),'brass',[0,.65,.3]);
  return g;
}
