export default function (THREE) {
  const g = new THREE.Group();
  const M = (c) => new THREE.MeshStandardMaterial({color:c,roughness:.82,flatShading:true});
  const add = (geometry,color,p,r=[0,0,0],s=[1,1,1]) => { const o=new THREE.Mesh(geometry,M(color)); o.position.set(...p); o.rotation.set(...r); o.scale.set(...s); g.add(o); return o; };
  const ball = new THREE.SphereGeometry(1,9,6);
  const skin=0xd99a67, cream=0xe8d6b5, teal=0x237e8f, brown=0x704124, straw=0xdca12e, rust=0xb94b24;
  // Angular storybook variant: cuffed boots, flared overalls, rolled sleeves.
  add(new THREE.BoxGeometry(.29,.16,.39,2,1,2),brown,[-.18,.08,.055]); add(new THREE.BoxGeometry(.29,.16,.39,2,1,2),brown,[.18,.08,.055]);
  add(new THREE.CylinderGeometry(.13,.15,.12,8),0x55351f,[-.18,.22,0]); add(new THREE.CylinderGeometry(.13,.15,.12,8),0x55351f,[.18,.22,0]);
  add(new THREE.CylinderGeometry(.10,.13,.35,8),teal,[-.17,.425,0]); add(new THREE.CylinderGeometry(.10,.13,.35,8),teal,[.17,.425,0]);
  add(new THREE.CylinderGeometry(.29,.34,.47,8),teal,[0,.79,0]);
  add(new THREE.BoxGeometry(.44,.25,.31,2,2,2),cream,[0,1.01,0]);
  for (const side of [-1,1]) {
    add(new THREE.CylinderGeometry(.12,.13,.19,8),cream,[side*.34,.98,0],[0,0,side*.34]);
    add(new THREE.CylinderGeometry(.085,.10,.24,8),skin,[side*.385,.77,0],[0,0,side*.13]);
    add(ball,skin,[side*.40,.62,.015],[0,0,0],[.11,.12,.10]);
  }
  add(new THREE.CylinderGeometry(.105,.105,.12,8),skin,[0,1.18,0]);
  add(ball,skin,[0,1.38,.02],[0,0,0],[.27,.285,.24]);
  // Low-poly hair cap plus side and rear locks.
  add(new THREE.SphereGeometry(1,10,5,0,Math.PI*2,0,Math.PI/2),brown,[0,1.48,-.005],[0,0,0],[.275,.20,.25]);
  for (const [x,z,a] of [[-.22,-.15,-.45],[.22,-.15,.45],[-.12,-.225,-.15],[.12,-.225,.15]]) add(new THREE.ConeGeometry(.075,.23,7),brown,[x,1.34,z],[0,0,a]);
  add(new THREE.ConeGeometry(.15,.25,7),rust,[0,1.105,.265],[Math.PI,0,0]);
  add(new THREE.CylinderGeometry(.43,.43,.05,18),straw,[0,1.61,0]);
  add(new THREE.CylinderGeometry(.24,.29,.18,12),0xe4ae3c,[0,1.715,0]);
  add(new THREE.TorusGeometry(.265,.026,5,12),rust,[0,1.64,0],[Math.PI/2,0,0]);
  return g;
}
