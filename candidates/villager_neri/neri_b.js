// Neri B: river fisher with teal waders, bobber cap, creel, and balanced rod.
export default function (THREE) {
  const g=new THREE.Group();
  const colors={shirt:0xe0b45c,wader:0x36777a,skin:0x9d6045,hair:0x263b3b,boot:0x38433d,leather:0x8b603c,reed:0xc8aa67,red:0xc85444,line:0xced7c5,silver:0xa9c8c4};
  const mats=Object.fromEntries(Object.entries(colors).map(([k,v])=>[k,new THREE.MeshStandardMaterial({color:v,roughness:.85,metalness:k==='silver'?.2:0,flatShading:true})]));
  const orb=new THREE.SphereGeometry(1,10,7), add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,mats[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m};
  add(orb,'boot',[-.17,.1,.04],[.16,.1,.25]); add(orb,'boot',[.17,.1,.04],[.16,.1,.25]);
  add(new THREE.CylinderGeometry(.245,.3,.7,9),'wader',[0,.51,0]); add(orb,'shirt',[0,.81,0],[.32,.28,.235]);
  add(new THREE.BoxGeometry(.34,.42,.065),'wader',[0,.72,.235]);
  const arm=new THREE.CylinderGeometry(.075,.095,.42,8); add(arm,'shirt',[-.34,.72,0],[1,1,1],[0,0,-.2]); add(arm,'shirt',[.34,.72,0],[1,1,1],[0,0,.2]);
  add(orb,'skin',[-.38,.52,.01],[.095,.105,.095]); add(orb,'skin',[.38,.52,.01],[.095,.105,.095]);
  add(orb,'skin',[0,1.2,.02],[.245,.265,.225]); add(orb,'hair',[0,1.25,-.16],[.25,.22,.13]);
  add(new THREE.CylinderGeometry(.27,.3,.1,12),'wader',[0,1.43,0]); add(new THREE.CylinderGeometry(.08,.08,.08,10),'red',[0,1.52,0]); add(orb,'red',[0,1.58,0],[.045,.045,.045]);
  add(new THREE.TorusGeometry(.19,.028,6,12,Math.PI),'hair',[0,1.15,.19],[1,.85,.55],[0,0,Math.PI]);
  // Creel supplies useful rear detail without hiding the body silhouette.
  add(new THREE.BoxGeometry(.48,.32,.22),'leather',[0,.68,-.26]);
  for(const y of[.57,.67,.77]) add(new THREE.CylinderGeometry(.012,.012,.43,5),'reed',[0,y,-.38],[1,1,1],[0,0,Math.PI/2]);
  add(new THREE.TorusGeometry(.22,.025,6,12,Math.PI),'leather',[0,.86,-.24],[1,1,.7],[0,0,Math.PI]);
  // Short diagonal rod is duplicated symmetrically by the line and bobber mass.
  add(new THREE.CylinderGeometry(.018,.026,1.15,7),'reed',[.42,.92,0],[1,1,1],[0,0,-.24]);
  add(new THREE.CylinderGeometry(.009,.009,.8,6),'line',[-.42,.88,.01],[1,1,1],[0,0,.3]);
  add(orb,'red',[-.53,.51,.01],[.055,.075,.055]); add(orb,'silver',[0,.95,.25],[.05,.04,.025]);
  return g;
}
