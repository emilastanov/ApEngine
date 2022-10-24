"use strict";
import {
    SCENE_NOT_FOUND
} from "../../errors/errors.js";
import Component from "../component.js";
import {itemMixin} from "./items.js";
import {gravityMixin} from "./gravity.js";
import {keyboardMixin} from "./keyboard.js";


// Game instance
class Game extends Component{

    constructor (scene) {
        super();
        this.useState({
            scene: scene,
            gravity: scene.gravity,
            items: [],
            pressedKeyboardButtons: {}
        });
        this.loopId = null;

        if (scene){
            this.state.width = scene.width;
            this.state.height = scene.height;
            scene.body.style.backgroundColor = scene.color;
            scene.body.style.height = `${scene.height}px`;
            scene.body.style.width = `${scene.width}px`;
            scene.body.style.position = 'relative';
            scene.body.style.overflow = 'hidden';
        }
        else { throw SCENE_NOT_FOUND; }
    }

    loop (func, interval=10) {
        this.loopId = setInterval(
            ()=>{
                if(this.state.gravity) {this.useGravity();}
                func();
            },
            interval
        );
    }

    stop () {
        clearInterval(this.loopId);
        document.removeEventListener('keyup');
        document.removeEventListener('keydown');
    }
}

Object.assign(Game.prototype, keyboardMixin);
Object.assign(Game.prototype, gravityMixin);
Object.assign(Game.prototype, itemMixin);

export default Game;