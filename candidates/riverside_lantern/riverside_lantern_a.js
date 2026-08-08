export default function(THREE){
 const g=new THREE.Group(),m=(c,e=0)=>new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:e,roughness:.85,flatShading:true}),add=(geo,c,p,r=[0,0,0],e=0)=>{const o=new THREE.Mesh(geo,m(c,e));o.position.set(...p);o.rotation.set(...r);g.add(o)};
 add(new THREE.CylinderGeometry(4.4,4.7,.2,12),0x6e8b50,[0,.1,0]);add(new THREE.CylinderGeometry(.42,.62,4.8,8),0x60432f,[0,2.4,0]);add(new THREE.BoxGeometry(1.4,1.65,1.4),0xdeb24b,[0,4.9,0],[0,.35,0],.25);add(new THREE.ConeGeometry(1.15,.7,4),0x3f6b63,[0,6.05,0],[0,.35,0]);
 for(const [x,z,r] of [[-2.7,-1,.3],[2.7,1,-.3]]){add(new THREE.CylinderGeometry(.14,.2,2.8,7),0x735039,[x,1.4,z],[0,0,r]);add(new THREE.SphereGeometry(.65,8,6),0x527d4d,[x-r*2.5,3,z])}for(const x of [-3,-1.5,1.5,3])add(new THREE.DodecahedronGeometry(.38,0),0x81776a,[x,.34,3]);return g;
}
