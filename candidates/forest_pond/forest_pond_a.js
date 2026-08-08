export default function(THREE){
 const g=new THREE.Group(),m=(c)=>new THREE.MeshStandardMaterial({color:c,roughness:.9,flatShading:true}),add=(geo,c,p,r=[0,0,0])=>{const o=new THREE.Mesh(geo,m(c));o.position.set(...p);o.rotation.set(...r);g.add(o)};
 add(new THREE.CylinderGeometry(7.2,7.6,.22,12),0x597c49,[0,.11,0]);
 for(const [x,z,s] of [[-4,-1,1.2],[4,1,1],[-2,3,.8],[2,-3,.9]]){add(new THREE.CylinderGeometry(.28*s,.42*s,3.2*s,7),0x765137,[x,1.6*s,z]);add(new THREE.ConeGeometry(1.65*s,3.4*s,8),0x426b47,[x,4.15*s,z]);add(new THREE.ConeGeometry(1.3*s,2.7*s,8),0x628853,[x,5.35*s,z])}
 for(const [x,z,s] of [[-5,3,.8],[5,-2,.7],[0,4,.65]]){add(new THREE.DodecahedronGeometry(.7*s,0),0x7b7465,[x,.45*s,z]);add(new THREE.DodecahedronGeometry(.35*s,0),0x91a267,[x+.3,.8*s,z-.1])}
 for(const x of [-4.8,-3.3,-1.8,0,1.8,3.5,5]){add(new THREE.CylinderGeometry(.04,.06,1.1,6),0x617b39,[x,.55,5.4]);add(new THREE.SphereGeometry(.16,7,5),0xe2c55a,[x,.9,5.4])} return g;
}
