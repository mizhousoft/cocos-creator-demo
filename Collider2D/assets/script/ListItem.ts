import { _decorator, Component, director, Node } from 'cc';
import { UIDirector } from './UIDirector';
const { ccclass, property } = _decorator;

@ccclass('ListItem')
export class ListItem extends Component {
    public sceneName: string = null;

    public index: number = -1;

    start() {

    }

    update(deltaTime: number) {

    }

    loadScene() {
        director.loadScene(this.sceneName, this.sceneLoaded.bind(this, this.index));
    }

    sceneLoaded(index: number) {
        UIDirector.showUI(index);
    }
}


