import { _decorator, Component, Node, resources, Sprite, SpriteFrame, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    start() {
        resources.load('activity/main_active_2/spriteFrame', SpriteFrame, (err, spriteFrame) => {
            if (err) {
                throw err;
            }

            let activityNode = new Node();
            let sprite = activityNode.addComponent(Sprite);
            sprite.spriteFrame = spriteFrame;
            activityNode.setPosition(new Vec3(0, 0, 0));
            this.node.addChild(activityNode);
        });
    }

    update(deltaTime: number) {

    }
}


