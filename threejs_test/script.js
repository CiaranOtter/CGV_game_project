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

let rightPressed = false;
let leftPressed = false;
let Downpressed = false;
let Uppressed = false;
let jumping = false;
let jumpSpeed = 0.05;

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.append(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color:  0x00ff00} );
const cube = new THREE.Mesh(geometry, material);
scene.add( cube );

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    if (Downpressed) {
        camera.position.z += 0.05
    }
    if (Uppressed) {
        camera.position.z -= 0.05
    }
    if (leftPressed) {
        camera.position.x -= 0.05
    }
    if (rightPressed) {
        camera.position.x += 0.05
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