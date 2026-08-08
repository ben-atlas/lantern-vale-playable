// Sol C: tall lantern-smith with heavy gloves, shoulder guard and lens frame.
export default function (THREE) {
  const g=new THREE.Group();
  const colors={coat:0x31595d,apron:0x704a36,skin:0xb97955,hair:0x49352e,boot:0x333b3a,glove:0x9b6a3d,iron:0x657476,brass:0xd6a34c,glass:0x78bdb4};
  const mats=Object.fromEntries(Object.entries(colors).map(([k,v])=>[k,new THREE.MeshStandardMaterial({color:v,roughness:k==='iron'||k==='brass'?.5:.85,metalness:k==='iron'?.42:k==='brass'?.22:0,flatShading:true})]));
  const orb=new THREE.SphereGeometry(1,10,7), add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,mats[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m};
  add(orb,'boot',[-.18,.11,.02],[.17,.11,.25]); add(orb,'boot',[.18,.11,.02],[.17,.11,.25]);
  add(new THREE.CylinderGeometry(.275,.33,.78,9),'coat',[0,.56,0]); add(orb,'coat',[0,.88,0],[.35,.29,.25]); add(new THREE.BoxGeometry(.43,.58,.07),'apron',[0,.65,.26]);
  const arm=new THREE.CylinderGeometry(.08,.105,.48,8); add(arm,'coat',[-.37,.76,0],[1,1,1],[0,0,-.16]); add(arm,'coat',[.37,.76,0],[1,1,1],[0,0,.16]);
  add(orb,'glove',[-.41,.51,.01],[.11,.12,.1]); add(orb,'glove',[.41,.51,.01],[.11,.12,.1]);
  add(orb,'skin',[0,1.31,.02],[.25,.27,.225]); add(orb,'hair',[0,1.36,-.17],[.255,.22,.13]);
  add(new THREE.CylinderGeometry(.23,.27,.12,10),'hair',[0,1.55,-.01]); add(new THREE.BoxGeometry(.4,.055,.31),'hair',[0,1.49,.01]);
  add(new THREE.ConeGeometry(.16,.25,8),'hair',[0,1.13,.22],[1,1,.7],[Math.PI,0,0]);
  add(new THREE.SphereGeometry(.23,8,6,0,Math.PI*2,0,Math.PI/2),'iron',[-.2,1.0,0],[1,.85,1],[0,0,-.25]);
  // A repaired-lens motif balances the hammer and makes Sol story-specific.
  add(new THREE.CylinderGeometry(.025,.025,.7,7),'apron',[-.39,.76,-.16],[1,1,1],[0,0,-.36]); add(new THREE.BoxGeometry(.24,.12,.13),'iron',[-.5,1.07,-.16]);
  add(new THREE.TorusGeometry(.16,.028,7,14),'brass',[.42,.84,-.14],[1,1,.72],[Math.PI/2,0,0]); add(new THREE.CylinderGeometry(.11,.11,.025,14),'glass',[.42,.84,-.17],[1,1,1],[Math.PI/2,0,0]);
  add(new THREE.BoxGeometry(.15,.11,.05),'brass',[0,.72,.31]);
  return g;
}
