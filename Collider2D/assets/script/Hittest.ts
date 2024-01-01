import { _decorator, Collider2D, Color, Component, EventTouch, Node, PhysicsSystem2D, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Hittest')
export class Hittest extends Component {
    colliders: Collider2D[] = [];

    start() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    update(deltaTime: number) {

    }

    onTouchStart(event: EventTouch) {
        let collider2Ds = PhysicsSystem2D.instance.testPoint(event.getUILocation());
        this.colliders = collider2Ds.concat([]);

        collider2Ds.forEach(collider2D => {
            let sprite = collider2D.node.getComponent(Sprite);
            if (sprite) {
                sprite.color = Color.RED;
            }
        })
    }

    onTouchEnd(event: EventTouch) {
        this.colliders.forEach(collider2D => {
            let sprite = collider2D.node.getComponent(Sprite);
            if (sprite) {
                sprite.color = Color.WHITE;
            }
        })
    }
}


