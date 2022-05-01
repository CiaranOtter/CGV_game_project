const { MeshPhongMaterial } = require("three");

module.exports = class controls {
    constructor(obj, document, inverted = false) {
        this.Up = false;
        this.Down = false;
        this.Left = false;
        this.Right = false;
        this.playerMoveSpeed = 0.1;
        this.inverted = false;
        this.obj = obj

        document.addEventListener("keydown", (e) => this.calculateDirection(e));
        document.addEventListener("keyup", (e) => this.calculateStop(e));
    }

    calculateDirection(e) {
        switch(e.code){
            case 'KeyD':
                this.Left = true;
                break;
            case 'KeyA':
                this.Right = true;
                break;
            case 'KeyW':
                this.Up = true;
                break;
            case 'KeyS':
                this.Down = true;
                break;
        }
    }

    calculateStop(e) {
        switch(e.code) {
            case 'KeyD':
                this.Left = false;
                break;
            case 'KeyA':
                this.Right = false;
                break;
            case 'KeyW':
                this.Up = false;
                break;
            case 'KeyS':
                this.Down = false;
                break;
        }
    }

    // setInitialPosition() {

    // }

    makeMove(map) {
        if (this.Up && map.canMoveUp(this.obj.position.z)){
            this.obj.position.z -= this.playerMoveSpeed;
            console.log("moving forward")
        } 
        if (this.Down && map.canMoveDown(this.obj.position.z)) {
            this.obj.position.z += this.playerMoveSpeed;
            console.log("moving back")
        }
        if (this.Right && map.canMoveRight(this.obj.position.x)) {
            this.obj.position.x -= this.playerMoveSpeed;
            console.log("moving right")
        }
        if (this.Left && map.canMoveLeft(this.obj.position.x)) {
            this.obj.position.x += this.playerMoveSpeed;
            console.log("moving left")
        }

        map.setPlayerPosition(this.obj.position.x, this.obj.position.z)
        return this.obj
    }

    checkMoveLeft(map) {

    }
    
}