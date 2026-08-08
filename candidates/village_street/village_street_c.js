export default function (THREE) {
  const g=new THREE.Group(), colors={wall:0xe6c087,wood:0x68442f,roof:0x46716d,red:0xaa4a39,blue:0x94c8c0,stone:0x81776a,leaf:0x577746,gold:0xe3aa3c,cream:0xf1dfb6};
  const m=Object.fromEntries(Object.entries(colors).map(([k,c])=>[k,new THREE.MeshStandardMaterial({color:c,roughness:.92,flatShading:true})]));
  const a=(geo,mat,x,y,z,rx=0,ry=0,rz=0)=>{const q=new THREE.Mesh(geo,m[mat]);q.position.set(x,y,z);q.rotation.set(rx,ry,rz);g.add(q)};
  a(new THREE.BoxGeometry(8,.24,5.8),'stone',0,.12,0);a(new THREE.BoxGeometry(6.5,3.25,4.5),'wall',0,1.75,0);
  a(new THREE.CylinderGeometry(3.65,3.65,7.2,3),'roof',0,3.75,0,0,0,Math.PI/2);
  a(new THREE.BoxGeometry(1.45,2.15,.15),'red',0,1.2,2.3);a(new THREE.BoxGeometry(3.8,.75,.18),'cream',0,3,2.38);
  for(const x of [-2.25,2.25]){a(new THREE.BoxGeometry(1.25,1,.12),'blue',x,1.75,2.3);a(new THREE.BoxGeometry(.12,1.2,.17),'wood',x,1.75,2.38);a(new THREE.BoxGeometry(1.45,.12,.17),'wood',x,1.75,2.38)}
  for(const [x,z,ry] of [[-3.28,0,Math.PI/2],[3.28,0,Math.PI/2],[-1.8,-2.3,0],[1.8,-2.3,0]])a(new THREE.BoxGeometry(1.1,.85,.12),'blue',x,1.7,z,0,ry);
  // Rounded corner planters and hanging lanterns give this version a cottage feel.
  for(const x of [-3.35,3.35]){a(new THREE.CylinderGeometry(.38,.48,.55,10),'stone',x,.4,2.55);a(new THREE.ConeGeometry(.5,1.15,9),'leaf',x,1.18,2.55);a(new THREE.CylinderGeometry(.07,.07,.8,8),'wood',x,3.25,-2.5);a(new THREE.SphereGeometry(.27,8,6),'gold',x,2.75,-2.5)}
  for(const x of [-2.6,0,2.6])a(new THREE.BoxGeometry(.18,3.15,.18),'wood',x,1.75,-2.3);
  a(new THREE.BoxGeometry(2.7,.18,1.15),'roof',0,2.75,2.7,.18);a(new THREE.BoxGeometry(1.5,.5,.75),'wood',0,.38,-2.65);
  return g;
}
