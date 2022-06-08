import { Sky } from "./objects/Sky";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

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

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true

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

const ambientlight = new THREE.AmbientLight(0xaaaaaa);
scene.add(ambientlight);
 
const cubeRenderTarget1 = new THREE.WebGLCubeRenderTarget(128, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipMapLinearFilter,
})
const cubeRenderTarget2 = new THREE.WebGLCubeRenderTarget(128, {
    generateMipmaps: true,
    minFilter: THREE.LinearMipMapLinearFilter,
})
const cubeRenderTarget3 = new THREE.WebGLCubeRenderTarget(128, {
    generateMipmaps: true,
    minFilter: THREE.LinearMipMapLinearFilter,
})

const cubeCamera1 = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget1);
const cubeCamera2 = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget2);
const cubeCamera3 = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget3);

const pivot1 = new THREE.Object3D()
scene.add(pivot1);
const pivot2 = new THREE.Object3D()
scene.add(pivot2);
const pivot3 = new THREE.Object3D()
scene.add(pivot3);

const material1 = new THREE.MeshPhongMaterial({
    shininess: 100,
    color: 0xffffff,
    specular: 0xffffff,
    envMap: cubeRenderTarget1.texture,
    refractionRatio: 0.5,
    transparent: true,
    side: THREE.BackSide,
    combine: THREE.MixOperation
})
const material2 = new THREE.MeshPhongMaterial({
    envMap: cubeRenderTarget2.texture,
})
const material3 = new THREE.MeshPhongMaterial({
    envMap: cubeRenderTarget3.texture,
})

cubeRenderTarget1.texture.mapping = THREE.CubeRefractionMapping

const ball1 = new THREE.Mesh(new THREE.SphereGeometry(50, 50, 50), material1)
ball1.position.set(0, 70, 0)
//ball1.rotation.x = 90
ball1.castShadow = true
ball1.receiveShadow = true
ball1.add(cubeCamera1)
pivot1.add(ball1)

const ball2 = new THREE.Mesh(new THREE.SphereGeometry(32, 32, 32), material2)
ball2.position.set(100, 100, 0)
ball2.castShadow = true
ball2.receiveShadow = true
ball2.add(cubeCamera2)
pivot2.add(ball2)

const ball3 = new THREE.Mesh(new THREE.SphereGeometry(32, 32, 32), material3)
ball3.position.set(-100, 100, 0)
ball3.castShadow = true
ball3.receiveShadow = true
ball3.add(cubeCamera1)
pivot3.add(ball3)

camera.position.set(0,0,50);

const clock = new THREE.Clock()

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
    
    const delta = clock.getDelta()

    ball1.rotateY(-0.02 * delta)
    pivot1.rotateY(0.2 * delta)
    ball2.rotateY(-0.3 * delta)
    pivot2.rotateY(0.3 * delta)
    ball3.rotateY(-0.4 * delta)
    pivot3.rotateY(0.4 * delta)

    orbitControls.update()

    render() 
}

function render() {

    cubeCamera1.update(renderer, scene)
    cubeCamera2.update(renderer, scene)
    cubeCamera3.update(renderer, scene)

    renderer.render(scene, camera)

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