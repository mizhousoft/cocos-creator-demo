import { _decorator, Collider2D, Color, Component, Contact2DType, IPhysics2DContact, Node, Sprite, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Rotate')
export class Rotate extends Component {
    start() {
        tween(this.node).by(6, { angle: -360 }).repeatForever().start();

        let collider2D = this.node.getComponent(Collider2D);
        collider2D.on(Contact2DType.BEGIN_CONTACT, this.onContactBegin, this);
        collider2D.on(Contact2DType.END_CONTACT, this.onContactEnd, this);
    }

    update(deltaTime: number) {

    }

    onContactBegin(self: Collider2D, other: Collider2D, context: IPhysics2DContact) {
        let sprite = self.node.getComponent(Sprite);
        if (sprite) {
            sprite.color = Color.RED;
        }
    }

    onContactEnd(self: Collider2D, other: Collider2D, context: IPhysics2DContact) {
        let sprite = self.node.getComponent(Sprite);
        if (sprite) {
            sprite.color = Color.WHITE;
        }
    }
}


