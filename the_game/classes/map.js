'use strict';

const map = require('./map.json')
const THREE = require("three")

module.exports = class Map {
    constructor(block_size, i = 0){
        console.log(map);
        this.room_map = map[`room_${i}`]["game_room"]
        this.playerPos = map[`room_${i}`]["player_position"]
        this.block_size = block_size
    }

    getMap(room_index){
        this.room_map = map[`room_${room_index}`]["game_room"];
        this.playerPos = map[`room_${room_index}`]["player_position"]
    }

    setPlayerPosition(x, y) {
        this.playerPos = [Math.floor(x/this.block_size),Math.floor(y/this.block_size)];
        console.log(this.playerPos);
    }

    canMoveLeft(x) {
        

        if (!this.isNextRight()){
            return true
        }
        console.log("There is a wall to your right")
        if (x%this.block_size == this.block_size-1) {
            return false;
        }
    }

    canMoveRight(x) {
        if (!this.isNextleft()) {
           
            return true
        }
        console.log("obstacle to the left")
        if (x%this.block_size == this.block_size-1) {
            return false;
        }   
    }

    canMoveDown(x) {
        if (!this.isNextBack()){
            return true
        }
        console.log("There is a wall next to you")
        if (x%this.block_size == this.block_size-1) {
            return false;
        }
    }

    canMoveUp(x) {
        if (x%this.block_size == 0 && this.isNextFront()) {
            return false;
        }
        return true;
    }

    isNextleft() {
        if (this.room_map[this.playerPos[1]][this.playerPos[0]+1] == 1){
            return true;
        }
        return false;
    }

    isNextRight() {
        if (this.room_map[this.playerPos[1]][this.playerPos[0]] == 1){
            return true;
        }
        return false;
    }

    isNextFront() {
        if (this.room_map[this.playerPos[1]+1][this.playerPos[0]] == 1){
            return true;
        }
        return false;
    }

    isNextBack() {
        if (this.room_map[this.playerPos[1]-1][this.playerPos[0]] == 1){
            return true;
        }
        return false;
    }

    getPlayerPos() {
        console.log(this.playerPos)
        return this.playerPos;
    }

    getRoomMap() {
        return this.room_map;
    }

    renderRoom() {
        const roomObject = new THREE.Object3D();
        this.room_map.forEach((arr,i) => {
            arr.forEach((e,j) => {
                if (e == 1) {
                    const geometry = new THREE.BoxGeometry(this.block_size, this.block_size, this.block_size);
                    const material = new THREE.MeshBasicMaterial( { color:  0x00ff00} );  
                    const cube = new THREE.Mesh(geometry, material);
                    cube.position.x = this.block_size*i;
                    cube.position.z = this.block_size*j;
                    roomObject.add(cube)
                }
            })
            
        });

        return roomObject
    }
}