// Sol A: broad village smith with leather apron, ember beard, hammer and tongs.
export default function (THREE) {
  const g = new THREE.Group();
  const colors = { shirt:0x55716d, apron:0x79513b, skin:0xa96f4f, hair:0x6f3428, boot:0x353a36, iron:0x596568, brass:0xd29a45, ember:0xd76538 };
  const mats = Object.fromEntries(Object.entries(colors).map(([k,v]) => [k,new THREE.MeshStandardMaterial({color:v,roughness:k==='iron'?.55:.86,metalness:k==='iron'?.45:0,flatShading:true})]));
  const orb = new THREE.SphereGeometry(1,10,7);
  const add = (geo,mat,p,s=[1,1,1],r=[0,0,0]) => { const m=new THREE.Mesh(geo,mats[mat]); m.position.set(...p); m.scale.set(...s); m.rotation.set(...r); g.add(m); return m; };
  add(orb,'boot',[-.2,.11,.03],[.18,.11,.26]); add(orb,'boot',[.2,.11,.03],[.18,.11,.26]);
  add(new THREE.CylinderGeometry(.31,.36,.72,9),'shirt',[0,.52,0]); add(orb,'shirt',[0,.83,0],[.39,.31,.28]);
  add(new THREE.BoxGeometry(.48,.58,.07),'apron',[0,.59,.285]);
  const arm=new THREE.CylinderGeometry(.085,.115,.48,8); add(arm,'skin',[-.42,.7,0],[1,1,1],[0,0,-.24]); add(arm,'skin',[.42,.7,0],[1,1,1],[0,0,.24]);
  add(orb,'skin',[-.48,.47,0],[.105,.11,.1]); add(orb,'skin',[.48,.47,0],[.105,.11,.1]);
  add(orb,'skin',[0,1.25,.02],[.27,.28,.245]); add(orb,'hair',[0,1.31,-.17],[.28,.23,.14]);
  add(new THREE.ConeGeometry(.2,.28,9),'hair',[0,1.08,.235],[1,1,.72],[Math.PI,0,0]);
  add(new THREE.TorusGeometry(.19,.035,6,12,Math.PI),'hair',[0,1.23,.225],[1,.8,.65],[0,0,Math.PI]);
  add(new THREE.BoxGeometry(.16,.12,.06),'brass',[0,.7,.335]);
  // Matching diagonal tools keep the footprint centred and read on both profiles.
  add(new THREE.CylinderGeometry(.032,.032,.7,7),'iron',[-.42,.78,-.19],[1,1,1],[0,0,-.42]);
  add(new THREE.BoxGeometry(.27,.12,.14),'iron',[-.56,1.08,-.19],[1,1,1],[0,0,-.12]);
  add(new THREE.CylinderGeometry(.025,.025,.72,7),'iron',[.42,.78,-.19],[1,1,1],[0,0,.42]);
  add(new THREE.TorusGeometry(.11,.025,6,10,Math.PI),'iron',[.56,1.08,-.19],[1,1,1],[0,0,Math.PI/2]);
  add(orb,'ember',[0,.93,.3],[.045,.045,.035]);
  return g;
}
