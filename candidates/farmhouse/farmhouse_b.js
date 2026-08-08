export default function (THREE) {
  const g=new THREE.Group(), m={}; for(const [k,c] of Object.entries({wall:0xe8c88f,wood:0x70452c,roof:0x47746f,red:0xb84e35,blue:0x93c9bd,stone:0x82796a,green:0x607d43,gold:0xe5aa39}))m[k]=new THREE.MeshStandardMaterial({color:c,roughness:.9,flatShading:true});
  const a=(geo,mat,p,r=[0,0,0])=>{const q=new THREE.Mesh(geo,m[mat]);q.position.set(...p);q.rotation.set(...r);g.add(q)};
  a(new THREE.BoxGeometry(5.6,.25,4.1),'stone',[0,.125,0]); a(new THREE.BoxGeometry(5,2.6,3.5),'wall',[0,1.55,0]);
  // Steep storybook roof and broad porch distinguish this candidate.
  a(new THREE.CylinderGeometry(2.75,2.75,5.8,3),'roof',[0,3,0],[0,0,Math.PI/2]);
  a(new THREE.BoxGeometry(4.4,.16,1.05),'wood',[0,.35,2.05]); a(new THREE.BoxGeometry(4.5,.18,1.15),'roof',[0,2.55,2.05],[.18,0,0]);
  for(const x of [-2,2]) a(new THREE.CylinderGeometry(.11,.14,2.15,8),'wood',[x,1.42,2.18]);
  a(new THREE.BoxGeometry(1.1,1.85,.13),'red',[0,1.17,1.82]); a(new THREE.CylinderGeometry(.06,.06,.08,8),'gold',[.34,1.15,1.92],[Math.PI/2,0,0]);
  for(const [x,z,ry] of [[-1.55,1.81,0],[1.55,1.81,0],[-2.51,0,Math.PI/2],[2.51,0,Math.PI/2],[0,-1.81,0]]) {a(new THREE.BoxGeometry(.9,.78,.1),'blue',[x,1.55,z],[0,ry,0]);a(new THREE.BoxGeometry(1.05,.11,.16),'wood',[x,1.55,z],[0,ry,0]);a(new THREE.BoxGeometry(.11,.92,.16),'wood',[x,1.55,z],[0,ry,0]);}
  a(new THREE.BoxGeometry(.65,1.3,.65),'stone',[1.5,3.55,-.6]); a(new THREE.BoxGeometry(.82,.14,.82),'stone',[1.5,4.26,-.6]);
  for(const x of [-2.15,-1.55,1.55,2.15]) {a(new THREE.ConeGeometry(.3,.65,8),'green',[x,.65,-1.95]);a(new THREE.SphereGeometry(.065,7,5),'gold',[x,.87,-2.2]);}
  return g;
}
