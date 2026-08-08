export default function(THREE){
 const g=new THREE.Group(),m=(c,e=0)=>new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:e,roughness:.84,flatShading:true}),add=(geo,c,p,r=[0,0,0],e=0)=>{const o=new THREE.Mesh(geo,m(c,e));o.position.set(...p);o.rotation.set(...r);g.add(o)};
 add(new THREE.CylinderGeometry(4.5,4.8,.2,12),0x708d52,[0,.1,0]);add(new THREE.CylinderGeometry(.5,.72,4.7,8),0x684733,[0,2.35,0]);add(new THREE.TorusGeometry(.72,.12,6,12),0xc78a38,[0,4.45,0],[Math.PI/2,0,0]);add(new THREE.BoxGeometry(1.55,1.7,1.55),0xf0bd4c,[0,5.08,0],[0,.25,0],.3);add(new THREE.ConeGeometry(1.22,.75,4),0x3e6961,[0,6.3,0],[0,.25,0]);
 for(const [x,z,s] of [[-3,-1,.8],[3,-1,.8],[-2.6,2.5,.65],[2.6,2.5,.65]]){add(new THREE.CylinderGeometry(.16*s,.24*s,2.5*s,7),0x74503a,[x,1.25*s,z]);add(new THREE.IcosahedronGeometry(.8*s,1),0x527d4d,[x,2.65*s,z])}for(const x of [-3.5,-2.1,-.7,.7,2.1,3.5])add(new THREE.CylinderGeometry(.05,.08,1,6),0x9a963d,[x,.5,3.4]);return g;
}
