import * as THREE from './imports/three.js';
import { GLTFLoader } from './imports/GLTFLoader.js';


window.openMenu = function openMenu() {
    document.getElementById("optMenu").style.width = "100%";
}

window.closeMenu = function closeMenu() {
    document.getElementById("optMenu").style.width = "0";
}
function hide(x,p, y, z, a, b) {
    x.style.display = 'none';
    p.style.display = 'none';
    y.style.display = 'none';
    z.style.display = 'none';
    a.style.display = 'none';
    b.style.display = 'none';


}
function showMenu(a,p, b, c) {
    a.style.display = 'block';
    p.style.display = 'block';
    b.style.display = 'block';
    c.style.display = 'block';
}
let btnText = document.getElementById('btnText');
let btnText2 = document.getElementById('btnText2');
let btnText3 = document.getElementById('btnText3');
let title = document.getElementById('h1');
let subTitle = document.getElementById('h2');
let opt = document.getElementById('optBtn');
btnText.addEventListener('click', () => {
    hide(btnText, opt, btnText2, btnText3, title, subTitle);


});
btnText2.addEventListener('click', () => {

    hide(btnText, opt, btnText2, btnText3, title, subTitle);

    //  showScore(score);

});
btnText3.addEventListener('click', () => {

    // hide(btnText, btnText2, btnText3);
    timeRefresh(btnText3)
});
let but = document.querySelector('p');
document.body.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        btnText.innerText = "Resume";
        showMenu(btnText, opt, btnText2, btnText3)
    }
});

function timeRefresh(a) {
    setTimeout("location.reload(true);", a);
}



//const { BackSide } = require("three");
//const THREE = require("three")


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement);

//const geometry = new THREE.BoxGeometry();
//const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//const cube = new THREE.Mesh(geometry, material);
//scene.add(cube);

camera.position.set(0, 1, 2);
scene.add(camera)
const loader = new GLTFLoader();

var obj;
loader.load(
    // resource URL
    './scene/maze.gltf',
    // called when the resource is loaded
    function (gltf) {
        console.log(gltf)
        obj = gltf.scene
        scene.add(gltf.scene);

    },
    // called while loading is progressing
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {

        console.log('An error happened');

    }
);
scene.background = new THREE.Color(0xffffff);
var light = new THREE.HemisphereLight(0xffffffff, 0X000000, 2);
scene.add(light);
function animate() {
    requestAnimationFrame(animate);
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();