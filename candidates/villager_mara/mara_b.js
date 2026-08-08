export default function (THREE) {
  const g=new THREE.Group();
  const colors={coat:0x425f64,shawl:0xb44f39,skirt:0x6c5875,skin:0xd29265,hair:0xded6c5,boot:0x49352c,brass:0xc98c35,glow:0xffc75b};
  const mats=Object.fromEntries(Object.entries(colors).map(([k,v])=>[k,new THREE.MeshStandardMaterial({color:v,roughness:.9,flatShading:true,emissive:k==='glow'?0x8a4300:0,emissiveIntensity:k==='glow'?.4:0})]));
  const add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,mats[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m}, orb=new THREE.SphereGeometry(1,10,7);
  add(orb,'boot',[-.18,.1,.04],[.17,.1,.27]);add(orb,'boot',[.18,.1,.04],[.17,.1,.27]);
  add(new THREE.CylinderGeometry(.29,.42,.82,9),'skirt',[0,.61,0]);add(orb,'coat',[0,.98,0],[.35,.36,.25]);
  add(new THREE.TorusGeometry(.31,.07,6,14),'shawl',[0,1.1,.01],[1,1,.8],[Math.PI/2,0,0]);
  const arm=new THREE.CylinderGeometry(.09,.11,.45,8);add(arm,'coat',[-.36,.9,0],[1,1,1],[0,0,-.18]);add(arm,'coat',[.36,.9,0],[1,1,1],[0,0,.18]);
  add(orb,'skin',[-.4,.69,.02],[.1,.11,.1]);add(orb,'skin',[.4,.69,.02],[.1,.11,.1]);add(orb,'skin',[0,1.39,.02],[.26,.28,.24]);
  add(orb,'hair',[0,1.45,-.17],[.26,.25,.12]);add(orb,'hair',[0,1.68,-.08],[.18,.16,.16]);
  for(const x of[-.2,-.1,0,.1,.2])add(orb,'hair',[x,1.48,-.2],[.065,.13,.065]);
  add(new THREE.CylinderGeometry(.025,.03,1.2,7),'brass',[.5,.81,0]);add(new THREE.BoxGeometry(.25,.31,.2),'glow',[.5,1.35,0]);
  add(new THREE.ConeGeometry(.17,.12,8),'brass',[.5,1.565,0]);add(new THREE.TorusGeometry(.12,.018,5,10),'brass',[.5,1.61,0],[1,1,1],[Math.PI/2,0,0]);
  add(new THREE.BoxGeometry(.18,.28,.14),'shawl',[-.48,.75,-.04]);
  return g;
}
