export default function (THREE) {
  const g=new THREE.Group();
  const colors={dress:0x6b5574,cape:0x315d62,skin:0xbd7953,hair:0xeee2ca,boot:0x49352c,rope:0xd49a3d,glow:0xf6bd54};
  const mats=Object.fromEntries(Object.entries(colors).map(([k,v])=>[k,new THREE.MeshStandardMaterial({color:v,roughness:.86,flatShading:true,emissive:k==='glow'?0x743900:0,emissiveIntensity:k==='glow'?.35:0})]));
  const add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,mats[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m}, orb=new THREE.SphereGeometry(1,9,6);
  add(orb,'boot',[-.17,.1,.05],[.16,.1,.26]);add(orb,'boot',[.17,.1,.05],[.16,.1,.26]);
  add(new THREE.ConeGeometry(.39,.9,8),'dress',[0,.65,0]);add(orb,'cape',[0,1.02,-.08],[.39,.34,.22]);
  add(new THREE.ConeGeometry(.31,.48,8),'cape',[0,1.02,-.22],[1,1,.45],[Math.PI,0,0]);
  const arm=new THREE.CylinderGeometry(.085,.105,.44,7);add(arm,'dress',[-.35,.91,0],[1,1,1],[0,0,-.22]);add(arm,'dress',[.35,.91,0],[1,1,1],[0,0,.22]);
  add(orb,'skin',[-.4,.7,.02],[.1,.11,.1]);add(orb,'skin',[.4,.7,.02],[.1,.11,.1]);add(orb,'skin',[0,1.41,.02],[.25,.28,.235]);
  add(orb,'hair',[0,1.48,-.18],[.27,.26,.12]);add(new THREE.TorusGeometry(.19,.07,6,12),'hair',[0,1.69,-.05],[1,1,.75],[Math.PI/2,0,0]);
  add(new THREE.CylinderGeometry(.025,.035,1.25,6),'rope',[.49,.82,0]);add(new THREE.CylinderGeometry(.16,.12,.31,8),'glow',[.49,1.38,0]);
  add(new THREE.TorusGeometry(.14,.025,5,10),'rope',[.49,1.57,0],[1,1,1],[Math.PI/2,0,0]);add(new THREE.BoxGeometry(.18,.3,.14),'rope',[-.47,.74,-.03]);
  return g;
}
