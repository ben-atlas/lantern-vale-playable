export default function (THREE) {
  const g=new THREE.Group(), mats={};
  for(const [k,c] of Object.entries({plaster:0xf1d6a0,timber:0x69422b,roof:0x5b8580,door:0xb85a38,glass:0x9ed3c5,stone:0x8b8170,leaf:0x6c8445,flower:0xe9b43f})) mats[k]=new THREE.MeshStandardMaterial({color:c,roughness:.88,flatShading:true});
  const add=(geo,mat,p,r=[0,0,0])=>{const m=new THREE.Mesh(geo,mats[mat]);m.position.set(...p);m.rotation.set(...r);g.add(m);return m};
  add(new THREE.BoxGeometry(5.4,.22,4.2),'stone',[0,.11,0]);
  add(new THREE.BoxGeometry(4.8,2.75,3.6),'plaster',[0,1.595,0]);
  for(const x of [-2.25,2.25]) add(new THREE.BoxGeometry(.22,2.85,.22),'timber',[x,1.65,1.82]);
  for(const z of [-1.82,1.82]) { add(new THREE.BoxGeometry(4.7,.18,.16),'timber',[0,.62,z]); add(new THREE.BoxGeometry(4.7,.18,.16),'timber',[0,2.28,z]); }
  const roof=new THREE.CylinderGeometry(2.75,2.75,5.5,3,1,false,Math.PI/2); add(roof,'roof',[0,3.03,0],[0,0,Math.PI/2]);
  add(new THREE.BoxGeometry(1.05,1.75,.14),'door',[0,1.09,1.87]);
  add(new THREE.TorusGeometry(.055,.018,6,10),'flower',[.34,1.08,1.95],[Math.PI/2,0,0]);
  for(const x of [-1.55,1.55]) for(const z of [-1.89,1.89]) { add(new THREE.BoxGeometry(.95,.82,.12),'glass',[x,1.55,z]); add(new THREE.BoxGeometry(1.12,.12,.18),'timber',[x,1.55,z]); add(new THREE.BoxGeometry(.12,.98,.18),'timber',[x,1.55,z]); }
  add(new THREE.BoxGeometry(.72,1.45,.72),'stone',[1.55,3.4,-.65]); add(new THREE.BoxGeometry(.9,.16,.9),'stone',[1.55,4.16,-.65]);
  for(const x of [-1.85,-1.2,1.2,1.85]) { add(new THREE.SphereGeometry(.3,8,5),'leaf',[x,.43,1.98]); add(new THREE.SphereGeometry(.07,7,5),'flower',[x,.68,2.12]); }
  return g;
}
