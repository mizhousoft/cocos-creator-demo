import { _decorator, Component, Node } from 'cc';
import { HelloWorld } from './proto/proto.js';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    start() {
        let helloWorld = new HelloWorld();
        helloWorld.id = 100;

        console.log('Loading...' + JSON.stringify(helloWorld));
    }

    update(deltaTime: number) {

    }
}


