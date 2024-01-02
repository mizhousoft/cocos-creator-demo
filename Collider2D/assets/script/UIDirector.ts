import { _decorator, Button, Component, director, game, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIDirector')
export class UIDirector extends Component {
    static exitButton: Node = null;

    static index: number = 0;

    start() {
        director.addPersistRootNode(this.node);

        UIDirector.exitButton = this.node.getChildByName("ExitButton") as Node;
        UIDirector.exitButton.active = false;
    }

    update(deltaTime: number) {

    }

    public static showUI(idx: number) {
        UIDirector.index = idx;

        UIDirector.exitButton.active = UIDirector.index > 0;
    }

    public backToList() {
        UIDirector.exitButton.active = false;

        director.loadScene("main");
    }
}


