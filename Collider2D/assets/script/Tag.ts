import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, LabelComponent, Node, Tween, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Tag')
export class Tag extends Component {

    @property(LabelComponent)
    numLabel: LabelComponent = null;

    @property(Collider2D)
    otherCollider: Collider2D = null;

    start() {
        tween(this.node).by(3, { eulerAngles: new Vec3(0, 0, -360) }).repeatForever().start();

        this.otherCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }

    update(deltaTime: number) {

    }

    onBeginContact(self: Collider2D, other: Collider2D, context: IPhysics2DContact) {
        this.numLabel.string = other.tag.toString();
    }
}


