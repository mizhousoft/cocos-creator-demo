import { _decorator, Component, resources, assetManager, Texture2D, SpriteFrame, Sprite } from 'cc';
import JSZip from 'jszip';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    start() {
        this.loadZip("gzip/data").then((file: ArrayBuffer) => {
            this.readZipFile(file);
        }).catch((err) => {
            console.log(err);
        });
    }

    update(deltaTime: number) {

    }

    private async readZipFile(file) {
        let jszip = new JSZip();
        const data = await jszip.loadAsync(file);

        data.file("player.json").async("text").then((content: string) => {
            console.log(content)
        });

        data.file("rc.jpg").async("base64").then((buf: string) => {
            let img = new Image();
            img.src = 'data:image/png;base64,' + buf;
            let texture = new Texture2D();
            img.onload = () => {
                texture.reset({
                    width: img.width,
                    height: img.height
                });

                texture.uploadData(img, 0, 0);

                let spriteFrame = new SpriteFrame();
                spriteFrame.texture = texture;

                let sprite = this.node.getComponent(Sprite);
                sprite.spriteFrame = spriteFrame;
            }
        });
    }

    private loadZip(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resources.load(url, (err, asset) => {
                if (err) {
                    return reject(err);
                }

                assetManager.loadAny({ url: asset.nativeUrl }, null, (err, file) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(file);
                })
            })
        })
    }
}


