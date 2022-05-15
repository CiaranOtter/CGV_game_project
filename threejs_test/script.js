window.openMenu = function openMenu() {
    document.getElementById("optMenu").style.width = "100%";
}
  
window.closeMenu = function closeMenu() {
    document.getElementById("optMenu").style.width = "0";
}

const THREE = require('three');
const {OrbitControls} = require('three-orbit-controls');
class LoadModel {
    constructor(){
        this._initialize();
    }

    _initialize() {
        this._threejs = new THREE.WebGLRenderer({antialias: true});
        this._threejs.updateShadowMap.enabled = true;
        this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
        this._threejs.setPixelRatio(window.devicePixelRatio);
        this._threejs.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this._threejs.domElement);

        window.addEventListener('resize', () => {
            this._OnWindowResize();
        }, false);

        const fov = 60;
        const aspect = 1920/1080;
        const near = 1.0;
        const far = 1000.0;

        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this._camera.position.set(75,20,0);

        this._scene = new THREE.Scene();

        let light = new THREE.DirectionalLight(0xfffff,1.0);
        light.position.set(20,100,10);
        light.target.position.set(0,0,0);
        light.castShadow = true;
        light.shadow.bias = 0.001;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 100;
        light.shadow.camera.right = -100;
        light.shadow.camera.top = 100;
        light.shadow.camera.bottom = -100;
        this._scene.add(light);

        light = new THREE.AmbientLight(0xffffff, 4.0);
        this._scene.add(light);

        const controls = new OrbitControls(
            this/this._camera, this._threejs.domElement
        );
        controls.target.set(0,20,0);
        controls.update();

        // const loader = new THREE.CubeTextureLoader();
        // const texture = loader.load([
        //     ''
        // ]);

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100,100,10,10),
            new THREE.MeshStandardMaterial({
                color: 0x202020,
            }));

        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.Pi/2;
        this._scene.add(plane);

        this._previousRAF = null;

        this_LoadModel();
        this.RAF();
    }

    _LoadModel() {

    }

    _OnWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._threejs.setSize(window.innerWidth, window.innerHeight);

    }

    _RAF() {
        requestAnimationFrame((t) => {
            if (this._previousRAF === null){
                this._previousRAF = t;
            }

            this._RAF();

            this._threejs.render(this._scene, this.camera);
            this._Step(t - this.previousRAF);
            this._previousRAF = t;
        });
    }

    _Step(timeElapsed) {
        if (this._mixer) {
            this._mixer.updated(timeElapsed* 0.0001)
        }
    }
}

let _App = null;

window.addEventListener('DOMContentLoaded', () => {
    _App = new LoadModel();
})


// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer();

// let rightPressed = false;
// let leftPressed = false;
// let Downpressed = false;
// let Uppressed = false;
// let jumping = false;
// let jumpSpeed = 0.05;

// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.append(renderer.domElement);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color:  0x00ff00} );
// const cube = new THREE.Mesh(geometry, material);
// scene.add( cube );

// camera.position.z = 5;

// function animate() {
//     requestAnimationFrame( animate );
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//     if (Downpressed) {
//         camera.position.z += 0.05
//     }
//     if (Uppressed) {
//         camera.position.z -= 0.05
//     }
//     if (leftPressed) {
//         camera.position.x -= 0.05
//     }
//     if (rightPressed) {
//         camera.position.x += 0.05
//     }

//     if (jumping) {
//         camera.position.y += jumpSpeed
//         jumpSpeed = jumpSpeed - 0.002 
//         console.log("jumpSpeed is:"+jumpSpeed) 

//         if (jumpSpeed <= -0.05){
//             jumping = false;
//             jumpSpeed = 0.05;
//             camera.position.y = 0
//         }
//     }
//     console.log(camera.position.y)
//     renderer.render( scene, camera); 
// }

// document.addEventListener('keydown', (e) => {
//      let wcodeValue = e.code;

//      console.log(codeValue)

//     switch(codeValue){
//         case "KeyW":
//             Uppressed = true;
//             break;
//         case "KeyS":
//             Downpressed = true;
//             break;
//         case "KeyA":
//             leftPressed = true;
//             break;
//         case "KeyD":
//             rightPressed = true;
//             break;
//         case "Space":
//             jumping = true;
//             break;
//     }
// }, false);

// document.addEventListener('keyup', (e) => {
//     let codeValue = e.code;

//     switch(codeValue) {
//         case "KeyW":
//             Uppressed = false;
//             break;
//         case "KeyS":
//             Downpressed = false;
//             break;
//         case "KeyA":
//             leftPressed = false;
//             break;
//         case "KeyD":
//             rightPressed = false;
//             break;   
//     }
// })

// animate();