export default function(THREE){
 const g=new THREE.Group(),m=(c,e=0)=>new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:e,roughness:.88,flatShading:true}),add=(geo,c,p,r=[0,0,0],e=0)=>{const o=new THREE.Mesh(geo,m(c,e));o.position.set(...p);o.rotation.set(...r);g.add(o)};
 add(new THREE.CylinderGeometry(4.5,4.8,.2,12),0x6b8950,[0,.1,0]);add(new THREE.CylinderGeometry(.46,.68,4.6,8),0x654532,[0,2.3,0]);add(new THREE.BoxGeometry(1.5,1.8,1.5),0xe9b54b,[0,5,0],[0,.78,0],.28);add(new THREE.CylinderGeometry(1.1,1.1,.25,8),0x3d675f,[0,6,0]);
 for(const a of [0,Math.PI/2,Math.PI,Math.PI*1.5]){const x=Math.sin(a)*3.2,z=Math.cos(a)*3.2;add(new THREE.BoxGeometry(1.35,.18,.55),0x956f49,[x,.38,z],[0,a,0]);add(new THREE.CylinderGeometry(.1,.14,.7,7),0x684733,[x+Math.cos(a)*.5,.35,z-Math.sin(a)*.5])}for(const [x,z] of [[-2,-2],[2,-2],[-2,2],[2,2]]){add(new THREE.SphereGeometry(.5,8,6),0x537d4c,[x,.55,z]);add(new THREE.SphereGeometry(.16,7,5),0xd39745,[x+.25,.8,z])}return g;
}
