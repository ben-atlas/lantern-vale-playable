export default function (THREE) {
  const g=new THREE.Group(), mats={wall:0xe8bd82,beam:0x65412f,roof:0x416d68,red:0xa94b38,glass:0x9bd0c2,stone:0x81786b,leaf:0x587746,gold:0xe2a83d,cloth:0xd9874e};
  const m=Object.fromEntries(Object.entries(mats).map(([k,c])=>[k,new THREE.MeshStandardMaterial({color:c,roughness:.9,flatShading:true})]));
  const add=(geo,mat,x,y,z,rx=0,ry=0,rz=0)=>{const q=new THREE.Mesh(geo,m[mat]);q.position.set(x,y,z);q.rotation.set(rx,ry,rz);g.add(q);return q};
  add(new THREE.BoxGeometry(8,.24,5.6),'stone',0,.12,0); add(new THREE.BoxGeometry(6.8,3.5,4.5),'wall',0,1.87,0);
  add(new THREE.CylinderGeometry(3.8,3.8,7.6,3),'roof',0,4,0,0,0,Math.PI/2);
  for(const x of [-2.5,0,2.5]) add(new THREE.BoxGeometry(.18,3.45,.18),'beam',x,1.9,2.31);
  add(new THREE.BoxGeometry(2.1,2.25,.16),'red',0,1.22,2.33); add(new THREE.BoxGeometry(6.5,.65,.22),'cloth',0,3,2.44,-.15);
  for(const x of [-2.35,2.35]){add(new THREE.BoxGeometry(1.35,1.15,.12),'glass',x,1.85,2.34);add(new THREE.BoxGeometry(1.55,.12,.2),'beam',x,1.85,2.4);add(new THREE.BoxGeometry(.12,1.35,.2),'beam',x,1.85,2.4)}
  for(const [x,z,ry] of [[-3.46,0,Math.PI/2],[3.46,0,Math.PI/2],[-2,-2.27,0],[2,-2.27,0]]) add(new THREE.BoxGeometry(1.1,.95,.12),'glass',x,1.85,z,0,ry);
  for(const x of [-2.8,2.8]){add(new THREE.CylinderGeometry(.1,.14,2.6,8),'beam',x,1.3,3);add(new THREE.BoxGeometry(.45,.55,.45),'gold',x,2.5,3);add(new THREE.ConeGeometry(.34,.25,4),'roof',x,2.9,3)}
  for(const x of [-2.7,-2.15,2.15,2.7]){add(new THREE.CylinderGeometry(.22,.28,.55,8),'stone',x,.4,-2.65);add(new THREE.SphereGeometry(.34,8,6),'leaf',x,.82,-2.65)}
  // Balance the projecting awning and front lamps around the asset origin.
  for(const child of g.children) child.position.z-=.405;
  return g;
}
