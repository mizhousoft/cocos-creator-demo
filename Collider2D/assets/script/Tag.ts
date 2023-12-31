import { _decorator, Collider2D, Color, Component, Contact2DType, IPhysics2DContact, LabelComponent, Node, sp, Sprite, Tween, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Tag')
export class Tag extends Component {

    @property(LabelComponent)
    numLabel: LabelComponent = null;

    @property(Collider2D)
    otherCollider: Collider2D = null;

    defaultColor: Color = Color.WHITE;

    start() {
        tween(this.node).by(3, { eulerAngles: new Vec3(0, 0, -360) }).repeatForever().start();

        this.otherCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.otherCollider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }

    update(deltaTime: number) {

    }

    onBeginContact(self: Collider2D, other: Collider2D, context: IPhysics2DContact) {
        this.numLabel.string = other.tag.toString();

        if (this.defaultColor == Color.WHITE) {
            this.defaultColor = Color.RED;
        }
        else {
            this.defaultColor = Color.WHITE;
        }
        let sprite = this.node.getComponent(Sprite);
        if (sprite) {
            sprite.color = this.defaultColor;
        }
    }

    onEndContact(self: Collider2D, other: Collider2D, context: IPhysics2DContact) {
        if (this.defaultColor == Color.WHITE) {
            this.defaultColor = Color.RED;
        }
        else {
            this.defaultColor = Color.WHITE;
        }

        let sprite = this.node.getComponent(Sprite);
        if (sprite) {
            sprite.color = this.defaultColor;
        }
    }
}


