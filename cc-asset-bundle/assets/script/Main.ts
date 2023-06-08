import { _decorator, Component, Node, assetManager, TextAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    start() {
        assetManager.loadBundle('equip', (err, bundle) => {
            bundle.load(`EquipShenZhuangCfg`, TextAsset, function (err, textAsset) {
                let text = textAsset.text;
                console.log(text);
            });

            bundle.load(`EquipTipsCfg`, TextAsset, function (err, textAsset) {
                let text = textAsset.text;
                console.log(text);
            });
        });
    }

    update(deltaTime: number) {

    }
}


