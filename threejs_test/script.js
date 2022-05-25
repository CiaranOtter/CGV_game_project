window.openMenu = function openMenu() {
    document.getElementById("optMenu").style.width = "100%";
}
  
window.closeMenu = function closeMenu() {
    document.getElementById("optMenu").style.width = "0";
}

const THREE = require("three")

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement);

//const geo = new THREE.PlaneGeometry( 100, 100, 1, 1 );
//const texture = new THREE.TextureLoader().load( require("./textures/woodFloor.jpg") );
//const mat = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
//const plane = new THREE.Mesh(geo, mat);

//plane.rotation.x = 90;

//scene.add(plane);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color:  0x00ff00} );
const cube = new THREE.Mesh(geometry, material);
scene.add( cube );

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera); 
}

animate();