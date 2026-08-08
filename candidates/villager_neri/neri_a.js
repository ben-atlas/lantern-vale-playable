// Neri A: practical pond fisher with rain cape, net, and reed-woven hat.
export default function (THREE) {
  const g=new THREE.Group();
  const colors={coat:0x3f7b78,cape:0x285b62,skin:0xb87551,hair:0x283d3d,boot:0x4a4035,reed:0xc6a560,rope:0x8b704c,net:0x8aa8a1,fish:0x7fb5b2,silver:0xc5d0c7};
  const mats=Object.fromEntries(Object.entries(colors).map(([k,v])=>[k,new THREE.MeshStandardMaterial({color:v,roughness:.86,metalness:k==='silver'?.25:0,flatShading:true,side:THREE.DoubleSide})]));
  const orb=new THREE.SphereGeometry(1,10,7), add=(geo,mat,p,s=[1,1,1],r=[0,0,0])=>{const m=new THREE.Mesh(geo,mats[mat]);m.position.set(...p);m.scale.set(...s);m.rotation.set(...r);g.add(m);return m};
  add(orb,'boot',[-.18,.11,.03],[.17,.11,.25]); add(orb,'boot',[.18,.11,.03],[.17,.11,.25]);
  add(new THREE.CylinderGeometry(.25,.32,.72,9),'coat',[0,.54,0]); add(orb,'cape',[0,.83,-.04],[.34,.3,.25]);
  const arm=new THREE.CylinderGeometry(.075,.095,.43,8); add(arm,'coat',[-.34,.72,0],[1,1,1],[0,0,-.17]); add(arm,'coat',[.34,.72,0],[1,1,1],[0,0,.17]);
  add(orb,'skin',[-.38,.52,.01],[.095,.105,.095]); add(orb,'skin',[.38,.52,.01],[.095,.105,.095]);
  add(orb,'skin',[0,1.24,.02],[.25,.27,.225]); add(orb,'hair',[0,1.29,-.16],[.25,.225,.13]);
  add(new THREE.CylinderGeometry(.36,.39,.065,12),'reed',[0,1.49,0]); add(new THREE.ConeGeometry(.27,.2,12),'reed',[0,1.61,-.015]);
  add(new THREE.TorusGeometry(.2,.03,6,12,Math.PI),'hair',[0,1.18,.19],[1,.85,.6],[0,0,Math.PI]);
  // A wide landing net reads from the rear and both profiles.
  add(new THREE.CylinderGeometry(.022,.028,.9,7),'rope',[-.28,.92,-.22],[1,1,1],[0,0,-.42]);
  add(new THREE.TorusGeometry(.22,.025,6,14),'rope',[-.47,1.3,-.22],[1,1.2,1],[0,.1,-.42]);
  add(new THREE.CircleGeometry(.19,12),'net',[-.47,1.3,-.225],[1,1.2,1],[0,.1,-.42]);
  add(orb,'fish',[.12,.58,.27],[.18,.075,.045],[0,0,.12]); add(new THREE.ConeGeometry(.09,.13,6),'fish',[.3,.59,.27],[1,1,1],[0,0,-Math.PI/2]);
  add(new THREE.TorusGeometry(.055,.012,5,10),'silver',[0,.93,.255],[1,1,.4]);
  g.position.set(.169,0,0); return g;
}
