import { _decorator, Component, Node } from 'cc';
import { HelloWorld } from './proto/proto.js';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    start() {
        let helloWorld = new HelloWorld();
        helloWorld.id = 100;

        console.log('Loaded Protobufjs object: ' + JSON.stringify(helloWorld));
    }

    update(deltaTime: number) {

    }
}


