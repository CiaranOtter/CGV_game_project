import { Camera } from "three";
import {Sky} from "./objects/Sky";

// function to close and open the options menu
window.openMenu = function openMenu() {
    document.getElementById("optMenu").style.width = "100%";
}
  
window.closeMenu = function closeMenu() {
    document.getElementById("optMenu").style.width = "0";
}

// import three.js
const THREE = require("three")

// create the scene, camera and initialise the renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement);

let rightPressed = false;
let leftPressed = false;
let Downpressed = false;
let Uppressed = false;
let jumping = false;
let jumpSpeed = 0.05;

// set up the lights
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 1, 0 ); //default; light shining from top
light.castShadow = true; // default false
//scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default

// create the floor
const floorGeometry = new THREE.PlaneGeometry(1000,1000);

const floorTexture = new THREE.TextureLoader().load(require("./textures/woodFloor.jpg"));
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set( 25, 25 );

const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture, bumpMap: floorTexture, side: THREE.DoubleSide});

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = 0;
floor.rotation.x = 90;
floor.rotation.z = 0;
floor.receiveShadow = true;

scene.add( floor );

const sun = new THREE.Vector3();

const sky = new Sky();
sky.scale.setScalar(1000);
scene.add(sky);

// Set up variables to control the look of the sky
const skyUniforms = sky.material.uniforms;
skyUniforms['turbidity'].value = 10;
skyUniforms['rayleigh'].value = 2;
skyUniforms['mieCoefficient'].value = 0.005;
skyUniforms['mieDirectionalG'].value = 0.8;

const parameters = {
    elevation: 10,
    azimuth: 115
};

const pmremGenerator = new THREE.PMREMGenerator(renderer);

const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
const theta = THREE.MathUtils.degToRad(parameters.azimuth);

sun.setFromSphericalCoords(1, phi, theta);

sky.material.uniforms['sunPosition'].value.copy(sun);

scene.environment = pmremGenerator.fromScene(scene).texture;

camera.position.set(0,75,160);
function animate() {
    requestAnimationFrame( animate );
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    
    if (Downpressed) {
        camera.position.z += 1
    }
    if (Uppressed) {
        camera.position.z -= 1
    }
    if (leftPressed) {
        camera.position.x -= 1
    }
    if (rightPressed) {
        camera.position.x += 1
    }

    if (jumping) {
        camera.position.y += jumpSpeed
        jumpSpeed = jumpSpeed - 0.002 
        console.log("jumpSpeed is:"+jumpSpeed) 

        if (jumpSpeed <= -0.05){
            jumping = false;
            jumpSpeed = 0.05;
            camera.position.y = 0
        }
    }
    console.log(camera.position.y)
    renderer.render( scene, camera); 
}

document.addEventListener('keydown', (e) => {
     codeValue = e.code;

     console.log(codeValue)

    switch(codeValue){
        case "KeyW":
            Uppressed = true;
            break;
        case "KeyS":
            Downpressed = true;
            break;
        case "KeyA":
            leftPressed = true;
            break;
        case "KeyD":
            rightPressed = true;
            break;
        case "Space":
            jumping = true;
            break;
    }
}, false);

document.addEventListener('keyup', (e) => {
    let codeValue = e.code;

    switch(codeValue) {
        case "KeyW":
            Uppressed = false;
            break;
        case "KeyS":
            Downpressed = false;
            break;
        case "KeyA":
            leftPressed = false;
            break;
        case "KeyD":
            rightPressed = false;
            break;   
    }
})

animate();