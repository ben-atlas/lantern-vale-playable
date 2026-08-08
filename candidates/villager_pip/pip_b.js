// Pip B: compact mechanic silhouette with goggles, rolled sleeves, and wrench.
export default function (THREE) {
  const g=new THREE.Group();
  const colors={tee:0xe1a340,overall:0x356f78,skin:0xd99869,hair:0x5c392a,boot:0x40342d,leather:0x8d5535,metal:0xa9b3ad,lens:0x74c4c5,scarf:0xc85b42};
  const mats=Object.fromEntries(Object.entries(colors).map(([k,v])=>[k,new THREE.MeshStandardMaterial({color:v,roughness:.86,metalness:k==='metal'?.35:0,flatShading:true})]));
  const add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,mats[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m}, orb=new THREE.SphereGeometry(1,10,7);
  add(orb,'boot',[-.17,.1,.045],[.16,.1,.24]);add(orb,'boot',[.17,.1,.045],[.16,.1,.24]);
  add(new THREE.CylinderGeometry(.24,.31,.63,9),'overall',[0,.5,0]); add(orb,'tee',[0,.8,0],[.31,.3,.24]);
  add(new THREE.BoxGeometry(.36,.36,.07),'overall',[0,.78,.235]);
  add(new THREE.TorusGeometry(.28,.045,6,12),'scarf',[0,.98,.01],[1,1,.78],[Math.PI/2,0,0]);
  const arm=new THREE.CylinderGeometry(.08,.095,.38,8);add(arm,'tee',[-.33,.73,0],[1,1,1],[0,0,-.22]);add(arm,'tee',[.33,.73,0],[1,1,1],[0,0,.22]);
  add(orb,'skin',[-.37,.55,.01],[.095,.105,.095]);add(orb,'skin',[.37,.55,.01],[.095,.105,.095]);
  add(orb,'skin',[0,1.2,.02],[.245,.255,.225]);add(orb,'hair',[0,1.25,-.16],[.245,.21,.12]);
  for(const x of[-.18,-.06,.07,.18]) add(new THREE.ConeGeometry(.075,.18,6),'hair',[x,1.4,-.04],[1,1,1],[0,0,x*1.4]);
  add(new THREE.TorusGeometry(.09,.025,6,12),'leather',[-.1,1.28,.205]);add(new THREE.TorusGeometry(.09,.025,6,12),'leather',[.1,1.28,.205]);
  add(orb,'lens',[-.1,1.28,.21],[.07,.07,.025]);add(orb,'lens',[.1,1.28,.21],[.07,.07,.025]);
  add(new THREE.BoxGeometry(.17,.28,.1),'leather',[-.3,.5,-.03]);
  // Chunky wrench, tilted across the right side for an unmistakable trade prop.
  add(new THREE.CylinderGeometry(.025,.025,.48,7),'metal',[.43,.73,.02],[1,1,1],[0,0,-.28]);
  add(new THREE.TorusGeometry(.065,.025,6,10,.0,Math.PI*1.55),'metal',[.49,.95,.02],[1,1,1],[0,0,-.28]);
  g.position.set(-.056,0,-.01);
  return g;
}
