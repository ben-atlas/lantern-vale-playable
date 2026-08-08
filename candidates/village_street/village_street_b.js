export default function (THREE) {
  const g=new THREE.Group(), colors={plaster:0xf0cf92,timber:0x69432d,roof:0x3f716b,door:0xb64d39,glass:0x9acfc5,stone:0x81786b,green:0x607f48,gold:0xe7ad3d,awning:0xd8794c};
  const m=Object.fromEntries(Object.entries(colors).map(([k,c])=>[k,new THREE.MeshStandardMaterial({color:c,roughness:.88,flatShading:true})]));
  const a=(geo,mat,p,r=[0,0,0])=>{const q=new THREE.Mesh(geo,m[mat]);q.position.set(...p);q.rotation.set(...r);g.add(q)};
  a(new THREE.BoxGeometry(8,.22,5.8),'stone',[0,.11,0]); a(new THREE.BoxGeometry(6.7,3.4,4.4),'plaster',[0,1.82,0]);
  a(new THREE.CylinderGeometry(3.65,3.65,7.4,3),'roof',[0,3.85,0],[0,0,Math.PI/2]);
  for(const x of [-2.7,0,2.7]) a(new THREE.BoxGeometry(.2,3.35,.2),'timber',[x,1.82,2.3]);
  a(new THREE.BoxGeometry(1.35,2.15,.16),'door',[0,1.18,2.28]); a(new THREE.BoxGeometry(5.5,.18,1.35),'roof',[0,2.75,2.7],[.18,0,0]);
  for(const x of [-2.05,2.05]){a(new THREE.BoxGeometry(1.35,1,.12),'glass',[x,1.7,2.27]);a(new THREE.BoxGeometry(.12,1.2,.18),'timber',[x,1.7,2.36]);a(new THREE.BoxGeometry(1.55,.12,.18),'timber',[x,1.7,2.36])}
  for(const [x,z,ry] of [[-3.38,0,Math.PI/2],[3.38,0,Math.PI/2],[-1.8,-2.25,0],[1.8,-2.25,0]]){a(new THREE.BoxGeometry(1.15,.82,.13),'glass',[x,1.65,z],[0,ry,0]);}
  // Market crates and dual lamps keep every approach lively.
  for(const x of [-2.5,2.5]){a(new THREE.BoxGeometry(1.15,.55,.8),'timber',[x,.42,3]);for(const dx of [-.35,0,.35])a(new THREE.SphereGeometry(.14,7,5),'green',[x+dx,.8,3])}
  for(const x of [-3.3,3.3]){a(new THREE.CylinderGeometry(.09,.13,2.7,8),'timber',[x,1.35,-2.65]);a(new THREE.BoxGeometry(.42,.52,.42),'gold',[x,2.55,-2.65]);a(new THREE.ConeGeometry(.34,.3,4),'roof',[x,2.95,-2.65])}
  a(new THREE.BoxGeometry(2.5,.6,.12),'awning',[0,3.2,2.45]);
  return g;
}
