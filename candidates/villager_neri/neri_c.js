// Neri C: seasoned coastal fisher with oilskin collar, hook staff, and fish bag.
export default function (THREE) {
  const g=new THREE.Group();
  const colors={oil:0xd39b45,teal:0x2f686b,skin:0xc17b57,hair:0x53615b,boot:0x403c34,rope:0x876c49,wood:0x78513a,metal:0xb7c5bd,bag:0x5b7f73,fish:0x76aaa9};
  const mats=Object.fromEntries(Object.entries(colors).map(([k,v])=>[k,new THREE.MeshStandardMaterial({color:v,roughness:.87,metalness:k==='metal'?.3:0,flatShading:true})]));
  const orb=new THREE.SphereGeometry(1,10,7), add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,mats[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m};
  add(orb,'boot',[-.18,.11,.035],[.17,.11,.25]); add(orb,'boot',[.18,.11,.035],[.17,.11,.25]);
  add(new THREE.CylinderGeometry(.25,.32,.7,9),'teal',[0,.53,0]); add(orb,'oil',[0,.82,0],[.34,.29,.245]);
  add(new THREE.TorusGeometry(.31,.055,6,12),'oil',[0,.98,.01],[1,1,.72],[Math.PI/2,0,0]);
  const arm=new THREE.CylinderGeometry(.078,.098,.42,8); add(arm,'oil',[-.35,.72,0],[1,1,1],[0,0,-.2]); add(arm,'oil',[.35,.72,0],[1,1,1],[0,0,.2]);
  add(orb,'skin',[-.39,.52,.01],[.098,.108,.098]); add(orb,'skin',[.39,.52,.01],[.098,.108,.098]);
  add(orb,'skin',[0,1.23,.02],[.25,.27,.23]); add(orb,'hair',[0,1.29,-.16],[.25,.23,.13]);
  add(new THREE.CylinderGeometry(.31,.34,.09,12),'oil',[0,1.47,0]); add(new THREE.ConeGeometry(.22,.19,10),'teal',[0,1.6,0]);
  add(new THREE.TorusGeometry(.2,.03,6,12,Math.PI),'hair',[0,1.17,.19],[1,.9,.6],[0,0,Math.PI]);
  add(new THREE.BoxGeometry(.34,.4,.18),'bag',[-.31,.62,-.18]); add(new THREE.TorusGeometry(.25,.022,6,12,Math.PI),'rope',[-.13,.84,-.1],[1,1,.7],[0,0,Math.PI]);
  // Gaff-like staff and opposite hanging catch balance the all-angle shape.
  add(new THREE.CylinderGeometry(.022,.032,1.28,7),'wood',[.43,.82,-.02],[1,1,1],[0,0,-.08]);
  add(new THREE.TorusGeometry(.085,.022,6,10,Math.PI),'metal',[.49,1.46,-.02],[1,1,1],[0,0,-.08]);
  add(orb,'fish',[-.43,.47,.04],[.15,.07,.045],[0,0,-.1]); add(new THREE.ConeGeometry(.08,.12,6),'fish',[-.58,.48,.04],[1,1,1],[0,0,Math.PI/2]);
  g.position.set(0,0,.025); return g;
}
