// Selected from three verified candidates: B has the clearest soft-canopy
// silhouette, readable boardwalk edge, and balanced detail from all four sides.
export default function(THREE){
 const g=new THREE.Group(),m=(c)=>new THREE.MeshStandardMaterial({color:c,roughness:.88,flatShading:true}),add=(geo,c,p,r=[0,0,0])=>{const o=new THREE.Mesh(geo,m(c));o.position.set(...p);o.rotation.set(...r);g.add(o)};
 add(new THREE.CylinderGeometry(7.3,7.6,.22,12),0x56794b,[0,.11,0]);
 for(const [x,z,s] of [[-4.5,-1.8,1.05],[4.3,-.8,.95],[-2.6,3.2,.9],[2.7,3.5,.78]]){add(new THREE.CylinderGeometry(.3*s,.45*s,3.4*s,7),0x704934,[x,1.7*s,z]);for(let i=0;i<3;i++)add(new THREE.IcosahedronGeometry((1.35-i*.12)*s,1),[0x3f704b,0x598552,0x73945b][i],[x+(i-1)*.25*s,(3.25+i*.85)*s,z+(i%2?.18:-.18)])}
 for(let i=0;i<7;i++){const x=-5.4+i*1.8;add(new THREE.BoxGeometry(1.65,.18,.5),0x9a7650,[x,.28,5]);add(new THREE.CylinderGeometry(.1,.13,.58,7),0x6a4934,[x-.65,.3,5]);}
 for(const [x,z] of [[-5,2],[5,2],[-1,-4],[1,-4]]){add(new THREE.DodecahedronGeometry(.55,0),0x77756b,[x,.42,z]);add(new THREE.SphereGeometry(.22,7,5),0x83a15b,[x+.25,.68,z])}return g;
}
