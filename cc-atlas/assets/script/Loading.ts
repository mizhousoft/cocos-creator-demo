import { Vec3 } from 'cc';
import { _decorator, Component, Node, resources, Sprite, SpriteAtlas } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    start() {
        resources.load("atlas/atlas", SpriteAtlas, (err, atlas) => {
            let activityNode = new Node('activity');
            let sprite = activityNode.addComponent(Sprite);
            sprite.spriteFrame = atlas.getSpriteFrame('main_active_2');
            activityNode.setPosition(new Vec3(0, 0, 0));

            this.node.addChild(activityNode);
        });
    }

    update(deltaTime: number) {

    }
}


