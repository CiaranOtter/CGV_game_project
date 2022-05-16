import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; 

function hide(x, y, z, w) {
    x.style.display = 'none';
    y.style.display = 'none';
    z.style.display = 'none';


}
function showScore(w) {
    w.innerHTML;
    w = document.getElementById('p').innerHTML = "You Won!"
    w.style.color = 'green';



}
let btnText = document.getElementById('btnText');
let btnText2 = document.getElementById('btnText2');
let btnText3 = document.getElementById('btnText3');
let score = document.getElementById('p').innerHTML;

btnText.addEventListener('click', () => {
    hide(btnText, btnText2, btnText3);

});
btnText2.addEventListener('click', () => {

    hide(btnText, btnText2, btnText3);
    showScore(score);

});
btnText3.addEventListener('click', () => {

    hide(btnText, btnText2, btnText3);
    scene.clear();
});

const { BackSide } = require("three");
const THREE = require("three")

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();