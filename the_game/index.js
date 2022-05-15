const THREE = require("three")

const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
const Map = require("./classes/map.js")
const controls = require("./classes/controls");

let map = new Map(20)
map.getMap(0)
let room = map.renderRoom()

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

console.log(windowWidth, windowHeight)

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color:  0x00ff00} );
// const cube = new THREE.Mesh(geometry, material);
scene.add(room);

camera.position.z = map.getPlayerPos()[1]*20;
camera.position.x = map.getPlayerPos()[0]*20;

console.log("camera is at:"+ camera.position.x + ','+camera.position.z )

let cont = new controls(camera, document);

function animate() {
    requestAnimationFrame( animate );
    camera = cont.makeMove(map);
    renderer.render(scene, camera); 
}



animate();