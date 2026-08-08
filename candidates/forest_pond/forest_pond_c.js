export default function(THREE){
 const g=new THREE.Group(),m=(c)=>new THREE.MeshStandardMaterial({color:c,roughness:.92,flatShading:true}),add=(geo,c,p,r=[0,0,0])=>{const o=new THREE.Mesh(geo,m(c));o.position.set(...p);o.rotation.set(...r);g.add(o)};
 add(new THREE.CylinderGeometry(7.25,7.6,.22,12),0x5b7d48,[0,.11,0]);
 for(const [x,z,s] of [[-4,-2,1.15],[4,-2,1.05],[-3.5,3,.82],[3.5,3,.82]]){add(new THREE.CylinderGeometry(.3*s,.48*s,3.3*s,8),0x72503a,[x,1.65*s,z]);add(new THREE.SphereGeometry(1.45*s,8,6),0x47724b,[x,3.5*s,z]);add(new THREE.SphereGeometry(1.1*s,8,6),0x668b55,[x+.55*s,4.15*s,z-.2])}
 add(new THREE.TorusGeometry(2.2,.18,6,18,Math.PI),0x8b6845,[0,2.55,3.8],[Math.PI/2,0,0]);for(const x of [-2,-1,0,1,2])add(new THREE.CylinderGeometry(.05,.08,1.4,6),0x839340,[x,.7,4.6]);
 for(const [x,z] of [[-5,1],[5,1],[-1,-4],[1,-4]])add(new THREE.DodecahedronGeometry(.65,0),0x7d7769,[x,.65,z]);return g;
}
