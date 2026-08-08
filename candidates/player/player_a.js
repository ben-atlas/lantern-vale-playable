export default function (THREE) {
  const g = new THREE.Group();
  const mat = (color) => new THREE.MeshStandardMaterial({ color, roughness: 0.86, flatShading: true });
  const add = (geo, color, x, y, z, rx = 0, ry = 0, rz = 0) => {
    const m = new THREE.Mesh(geo, mat(color));
    m.position.set(x, y, z); m.rotation.set(rx, ry, rz); g.add(m); return m;
  };
  const cyl = (rt, rb, h, n = 10) => new THREE.CylinderGeometry(rt, rb, h, n);
  const sph = (x, y, z) => new THREE.SphereGeometry(1, x, y);

  // Broad, grounded boots and compact limbs.
  add(new THREE.BoxGeometry(.27, .18, .38, 1, 1, 1), 0x49301f, -.18, .09, .055);
  add(new THREE.BoxGeometry(.27, .18, .38, 1, 1, 1), 0x49301f,  .18, .09, .055);
  add(cyl(.105, .12, .38), 0x2a7070, -.18, .36, 0);
  add(cyl(.105, .12, .38), 0x2a7070,  .18, .36, 0);
  add(new THREE.BoxGeometry(.54, .48, .30, 2, 2, 2), 0x267a78, 0, .72, 0);
  add(new THREE.BoxGeometry(.42, .22, .31), 0xe8d6b5, 0, .965, 0);
  // Sleeves, forearms and mitten hands make both side views articulate.
  add(cyl(.095, .11, .38), 0xe8d6b5, -.34, .87, 0, 0, 0, -.16);
  add(cyl(.095, .11, .38), 0xe8d6b5,  .34, .87, 0, 0, 0,  .16);
  add(sph(8, 6), 0xd99763, -.375, .66, .015).scale.set(.115, .13, .105);
  add(sph(8, 6), 0xd99763,  .375, .66, .015).scale.set(.115, .13, .105);
  // Neck, head, ears, hair locks and front-facing scarf.
  add(cyl(.11, .11, .13), 0xd99763, 0, 1.115, 0);
  add(sph(12, 8), 0xd99763, 0, 1.33, .015).scale.set(.265, .29, .245);
  add(sph(8, 6), 0xd99763, -.265, 1.33, .015).scale.set(.06, .09, .055);
  add(sph(8, 6), 0xd99763,  .265, 1.33, .015).scale.set(.06, .09, .055);
  for (const [x, y, z, rz] of [[-.20,1.39,-.19,-.5],[-.10,1.48,-.22,-.2],[0,1.49,-.23,0],[.11,1.47,-.22,.25],[.21,1.38,-.18,.5]]) {
    add(cyl(.055, .095, .22, 7), 0x704124, x, y, z, .35, 0, rz);
  }
  const scarf = new THREE.Shape(); scarf.moveTo(-.18,.1); scarf.lineTo(.18,.1); scarf.lineTo(.1,-.1); scarf.lineTo(0,-.19); scarf.lineTo(-.1,-.1); scarf.closePath();
  add(new THREE.ExtrudeGeometry(scarf, { depth: .035, bevelEnabled: false }), 0xb94b24, 0, 1.10, .255);
  // Oversized straw hat: brim, crown and dark band.
  add(cyl(.43, .43, .055, 16), 0xd99a28, 0, 1.57, 0);
  add(cyl(.25, .29, .19, 12), 0xe2aa37, 0, 1.69, 0);
  add(cyl(.292, .292, .055, 12), 0x9a5a24, 0, 1.605, 0);
  return g;
}
