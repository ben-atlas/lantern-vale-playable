export default function (THREE) {
  const g=new THREE.Group();
  const mats={coat:0x5a566f,apron:0xd5b56d,skin:0xc98558,hair:0xe7dfcf,boot:0x49352c,wood:0x6b4327,glow:0xf6bd54,teal:0x315d62};
  for(const k in mats)mats[k]=new THREE.MeshStandardMaterial({color:mats[k],roughness:.88,flatShading:true,emissive:k==='glow'?0x6b3600:0,emissiveIntensity:k==='glow'?.35:0});
  const add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,mats[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m};
  const orb=new THREE.SphereGeometry(1,9,6), limb=new THREE.CylinderGeometry(.085,.1,.4,7);
  add(orb,'boot',[-.17,.1,.03],[.16,.1,.25]);add(orb,'boot',[.17,.1,.03],[.16,.1,.25]);
  add(limb,'coat',[-.15,.36,0]);add(limb,'coat',[.15,.36,0]);add(new THREE.ConeGeometry(.38,.82,9),'coat',[0,.78,0]);
  add(new THREE.BoxGeometry(.38,.38,.04),'apron',[0,.77,.25]);
  add(limb,'coat',[-.34,.88,0],[1,1,1],[0,0,-.3]);add(limb,'coat',[.34,.88,0],[1,1,1],[0,0,.3]);
  add(orb,'skin',[-.41,.68,.01],[.1,.11,.1]);add(orb,'skin',[.41,.68,.01],[.1,.11,.1]);
  add(orb,'skin',[0,1.28,.02],[.25,.27,.23]);add(orb,'hair',[0,1.5,-.04],[.19,.18,.18]);
  for(let i=0;i<5;i++)add(orb,'hair',[-.2+i*.1,1.34,-.19],[.075,.13,.07]);
  add(new THREE.TorusGeometry(.26,.03,5,12),'teal',[0,1.25,.02],[1,1,1],[Math.PI/2,0,0]);
  add(new THREE.CylinderGeometry(.025,.035,1.45,6),'wood',[.48,.83,0]);add(new THREE.BoxGeometry(.22,.28,.18),'glow',[.48,1.42,0]);
  add(new THREE.CylinderGeometry(.13,.13,.035,8),'wood',[.48,1.58,0]);add(new THREE.BoxGeometry(.2,.28,.13),'teal',[-.43,.82,-.08]);
  return g;
}
