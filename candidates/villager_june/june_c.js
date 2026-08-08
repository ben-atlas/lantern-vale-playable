// June C: sturdy field grower with leaf bonnet, patched overalls and harvest fork.
export default function (THREE) {
  const g=new THREE.Group(), C={tunic:0xc98555,overall:0x4f716d,skin:0xa76d4e,hair:0x553629,boot:0x453d35,green:0x66844d,cream:0xe0cf9c,wood:0x765033,steel:0x899696,berry:0xa1415c};
  const M=Object.fromEntries(Object.entries(C).map(([k,v])=>[k,new THREE.MeshStandardMaterial({color:v,roughness:k==='steel'?.5:.88,metalness:k==='steel'?.3:0,flatShading:true})]));
  const orb=new THREE.SphereGeometry(1,10,7), add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,M[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m};
  add(orb,'boot',[-.17,.1,.03],[.16,.1,.23]); add(orb,'boot',[.17,.1,.03],[.16,.1,.23]); add(new THREE.CylinderGeometry(.26,.31,.65,9),'overall',[0,.5,0]); add(orb,'tunic',[0,.81,0],[.34,.29,.25]);
  add(new THREE.BoxGeometry(.42,.43,.06),'overall',[0,.62,.265]); add(new THREE.BoxGeometry(.13,.11,.035),'cream',[.1,.58,.305],[1,1,1],[0,0,.18]);
  const arm=new THREE.CylinderGeometry(.075,.095,.42,8); add(arm,'tunic',[-.36,.74,0],[1,1,1],[0,0,-.18]); add(arm,'tunic',[.36,.74,0],[1,1,1],[0,0,.18]); add(orb,'skin',[-.4,.53,0],[.095,.105,.095]); add(orb,'skin',[.4,.53,0],[.095,.105,.095]);
  add(orb,'skin',[0,1.18,.01],[.24,.26,.22]); add(orb,'hair',[0,1.2,-.17],[.25,.22,.13]);
  add(new THREE.CylinderGeometry(.31,.34,.1,9),'green',[0,1.41,0]); add(new THREE.ConeGeometry(.23,.2,8),'green',[0,1.54,-.03]); add(new THREE.ConeGeometry(.12,.28,7),'cream',[.16,1.48,-.03],[1,.4,1],[0,0,-.8]);
  add(new THREE.CylinderGeometry(.028,.03,.88,7),'wood',[.38,.73,-.15],[1,1,1],[0,0,-.18]); add(new THREE.BoxGeometry(.3,.055,.055),'steel',[.46,1.15,-.15],[1,1,1],[0,0,-.18]);
  for(const x of [.36,.46,.56]) add(new THREE.BoxGeometry(.025,.2,.025),'steel',[x,1.24,-.15],[1,1,1],[0,0,-.18]);
  add(new THREE.BoxGeometry(.3,.24,.15),'cream',[-.31,.5,-.2]); add(new THREE.TorusGeometry(.18,.022,6,12,Math.PI),'wood',[-.31,.66,-.2]); add(orb,'berry',[-.34,.59,-.29],[.06,.06,.06]); add(orb,'berry',[-.24,.57,-.29],[.06,.06,.06]);
  return g;
}
