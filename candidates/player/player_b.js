export default function (THREE) {
  const g = new THREE.Group();
  const materials = Object.fromEntries(Object.entries({ boot:0x4b2e20, teal:0x315d62, cloth:0xead9b9, skin:0xd89562, hair:0x633a24, straw:0xd99a28, scarf:0xc8562c }).map(([k,v]) => [k,new THREE.MeshStandardMaterial({color:v,roughness:.9,flatShading:true})]));
  const mesh = (geo, material, p, s = [1,1,1], r = [0,0,0]) => { const m = new THREE.Mesh(geo, materials[material]); m.position.set(...p); m.scale.set(...s); m.rotation.set(...r); g.add(m); return m; };
  const sphere = new THREE.SphereGeometry(1, 10, 7);
  const limb = new THREE.CylinderGeometry(.09, .105, .42, 8);
  // Rounder pear-shaped interpretation with a taller waist and asymmetric stance.
  mesh(new THREE.SphereGeometry(1,8,5), 'boot', [-.17,.11,.06], [.17,.11,.27]);
  mesh(new THREE.SphereGeometry(1,8,5), 'boot', [ .17,.11,.06], [.17,.11,.27]);
  mesh(limb, 'teal', [-.16,.39,0], [1,1,1], [0,0,-.04]);
  mesh(limb, 'teal', [ .16,.39,0], [1,1,1], [0,0, .04]);
  mesh(sphere, 'teal', [0,.78,0], [.34,.39,.23]);
  mesh(new THREE.BoxGeometry(.31,.40,.04), 'teal', [0,.86,.235]);
  mesh(new THREE.BoxGeometry(.49,.25,.34,2,2,2), 'cloth', [0,1.01,0]);
  mesh(limb, 'cloth', [-.36,.88,0], [1,1,1], [0,0,-.22]);
  mesh(limb, 'cloth', [ .36,.88,0], [1,1,1], [0,0, .22]);
  mesh(sphere, 'skin', [-.405,.66,.01], [.105,.12,.10]);
  mesh(sphere, 'skin', [ .405,.66,.01], [.105,.12,.10]);
  mesh(new THREE.CylinderGeometry(.10,.10,.13,8), 'skin', [0,1.17,0]);
  mesh(sphere, 'skin', [0,1.37,.015], [.27,.29,.245]);
  // Six chunky rear locks form a readable scalloped back silhouette.
  for (let i=0;i<6;i++) { const a=-1.05+i*.42; mesh(sphere,'hair',[Math.sin(a)*.22,1.38,-.19+Math.abs(a)*.015],[.105,.18,.09],[0,0,a*.18]); }
  mesh(new THREE.ConeGeometry(.14,.24,7), 'scarf', [0,1.11,.285], [1,1,1], [Math.PI,0,0]);
  mesh(new THREE.TorusGeometry(.36,.045,6,16), 'straw', [0,1.60,0], [1,1,.82], [Math.PI/2,0,0]);
  mesh(new THREE.CylinderGeometry(.36,.36,.045,16), 'straw', [0,1.60,0]);
  mesh(new THREE.CylinderGeometry(.23,.28,.18,12), 'straw', [0,1.70,0]);
  mesh(new THREE.TorusGeometry(.255,.025,5,12), 'scarf', [0,1.625,0], [1,1,1], [Math.PI/2,0,0]);
  return g;
}
