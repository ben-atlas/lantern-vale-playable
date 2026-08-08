export default function (THREE) {
 const g=new THREE.Group(),M={};for(const[k,c]of Object.entries({cream:0xefd59e,brown:0x65412c,teal:0x527f78,red:0xb9573c,glass:0xa7d6c6,stone:0x8a806d,green:0x66834b,yellow:0xe6b243}))M[k]=new THREE.MeshStandardMaterial({color:c,roughness:.9,flatShading:true});
 const A=(geo,mat,p,r=[0,0,0])=>{let x=new THREE.Mesh(geo,M[mat]);x.position.set(...p);x.rotation.set(...r);g.add(x)};
 A(new THREE.BoxGeometry(5.5,.24,4.2),'stone',[0,.12,0]);A(new THREE.BoxGeometry(4.9,2.65,3.55),'cream',[0,1.565,0]);
 A(new THREE.CylinderGeometry(2.7,2.7,5.6,3),'teal',[0,3.02,0],[0,0,Math.PI/2]);
 // Offset entry bay gives a cottage-like asymmetry.
 A(new THREE.BoxGeometry(1.7,2.15,.65),'cream',[1.25,1.4,1.95]);A(new THREE.BoxGeometry(1,1.75,.14),'red',[1.25,1.13,2.3]);
 for(const [x,z,ry]of[[-1.25,1.8,0],[-1.45,-1.8,0],[1.45,-1.8,0],[-2.5,0,Math.PI/2],[2.5,0,Math.PI/2]]){A(new THREE.BoxGeometry(.85,.85,.11),'glass',[x,1.55,z],[0,ry,0]);A(new THREE.BoxGeometry(1,.1,.17),'brown',[x,1.55,z],[0,ry,0]);A(new THREE.BoxGeometry(.1,1,.17),'brown',[x,1.55,z],[0,ry,0]);}
 for(const z of[-1.8,1.8])for(const y of[.55,2.3])A(new THREE.BoxGeometry(4.8,.16,.15),'brown',[0,y,z]);
 A(new THREE.BoxGeometry(.7,1.4,.7),'stone',[-1.4,3.5,-.55]);A(new THREE.CylinderGeometry(.48,.55,.18,8),'stone',[-1.4,4.28,-.55]);
 for(let i=0;i<6;i++){const x=-2.1+i*.84;A(new THREE.SphereGeometry(.26,8,5),'green',[x,.42,2.25]);A(new THREE.SphereGeometry(.06,7,5),'yellow',[x,.65,2.42]);}
 // The projecting entry bay shifts the raw geometry forward; recenter the asset origin.
 g.position.z=-.3; return g;
}
