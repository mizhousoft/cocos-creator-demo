import { _decorator, Component, director, instantiate, Label, LabelComponent, Layout, Node, Prefab } from 'cc';
import { ListItem } from './ListItem';
const { ccclass, property } = _decorator;

@ccclass('List')
export class List extends Component {
    @property(Prefab)
    listItemPrefab: Prefab = null;

    start() {
        let listItem = instantiate(this.listItemPrefab);
        let titleLabel = listItem.getComponentInChildren(Label);
        titleLabel.string = "Hittest";
        let itemComponenct = listItem.getComponent(ListItem);
        itemComponenct.sceneName = "hittest";
        itemComponenct.index = 1;
        listItem.parent = this.node;

        listItem = instantiate(this.listItemPrefab);
        titleLabel = listItem.getComponentInChildren(Label);
        titleLabel.string = "Tag";
        itemComponenct = listItem.getComponent(ListItem);
        itemComponenct.sceneName = "tag";
        itemComponenct.index = 2;
        listItem.parent = this.node;
    }

    update(deltaTime: number) {

    }
}


