import { _decorator, AudioClip, AudioSource, Color, Component, instantiate, LabelComponent, Node, NodeEventType, Prefab, Sprite, sys, tween, UITransform, v2, v3, Vec3 } from 'cc';
import { Tile } from './Tile';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    @property(Node)
    startPanel: Node = null;

    @property(Node)
    gamePanel: Node = null;

    @property(Node)
    overPanel: Node = null;

    @property(LabelComponent)
    txtLv: LabelComponent = null;

    @property(LabelComponent)
    txtScore: LabelComponent = null;

    @property(LabelComponent)
    txtBestScore: LabelComponent = null;

    @property(LabelComponent)
    txtBack: LabelComponent = null;

    @property(Node)
    nodeParent: Node = null;

    @property(UITransform)
    nodeParentTransform: UITransform = null;

    @property(Prefab)
    item: Prefab = null;

    @property(Prefab)
    itemBg: Prefab = null;

    @property(LabelComponent)
    txtOverScore: LabelComponent = null;

    @property(AudioClip)
    moveSound: AudioClip = null;

    @property(AudioClip)
    mergeSound: AudioClip = null;

    private userData: any = null;

    private offset: number = 5;

    private itemWidth: number = 0;

    private itemParentWidth: number = 0;

    private array = [];

    private posiStart = null;

    private posiEnd = null;

    start() {
        this.initPanel();
        this.startPanel.active = true;

        this.addTouch();
    }

    private addTouch() {
        this.nodeParent.on(NodeEventType.TOUCH_START, this.onTouchStart, this);
        this.nodeParent.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);
        this.nodeParent.on(NodeEventType.TOUCH_END, this.onTouchEnd, this);
        this.nodeParent.on(NodeEventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    private onTouchStart(event) {
        this.posiStart = event.getLocation();
    }

    private onTouchMove(event) {

    }

    private onTouchEnd(event) {
        this.posiEnd = event.getLocation();

        let directX = this.posiEnd.x - this.posiStart.x;
        let directY = this.posiEnd.y - this.posiStart.y;
        if (Math.abs(directX) < 10 && Math.abs(directY) < 10) {
            return;
        }

        if (Math.abs(directX) > Math.abs(directY)) {
            if (directX > 0) {
                this.moveItem('right');
            }
            else {
                this.moveItem('left');
            }
        }
        else {
            if (directY > 0) {
                this.moveItem('top');
            }
            else {
                this.moveItem('down');
            }
        }
    }

    private onTouchCancel(event) {


    }

    private moveItem(direct: string) {
        let isCanMove: boolean = false;
        let isCalcScore: boolean = false;

        switch (direct) {
            case 'left':
                for (let i = 0; i < this.array.length; ++i) {
                    for (let j = 1; j < this.array[i].length; ++j) {
                        let prev = this.array[i][j - 1];
                        let curr = this.array[i][j];
                        if (prev === 0 && curr > 0) {
                            this.array[i][j - 1] = this.array[i][j];
                            this.array[i][j] = 0;

                            isCanMove = true;
                        }
                        else if (prev > 0 && prev == curr) {
                            this.array[i][j - 1] = this.array[i][j - 1] * 2;
                            this.array[i][j] = 0;

                            isCanMove = true;
                            isCalcScore = true;

                            this.updateScore(this.array[i][j - 1]);
                        }
                    }
                }
                break;
            case 'right':
                for (let i = 0; i < this.array.length; ++i) {
                    for (let j = this.array[i].length - 2; j >= 0; --j) {
                        let prev = this.array[i][j + 1];
                        let curr = this.array[i][j];
                        if (prev === 0 && curr > 0) {
                            this.array[i][j + 1] = this.array[i][j];
                            this.array[i][j] = 0;

                            isCanMove = true;
                        }
                        else if (prev > 0 && prev == curr) {
                            this.array[i][j + 1] = this.array[i][j + 1] * 2;
                            this.array[i][j] = 0;

                            isCanMove = true;
                            isCalcScore = true;

                            this.updateScore(this.array[i][j + 1]);
                        }
                    }
                }
                break;
            case 'top':
                for (let i = this.array.length - 1; i >= 0; --i) {
                    for (let j = this.array[i].length - 1; j > 0; --j) {
                        let prev = this.array[j][i];
                        let curr = this.array[j - 1][i];
                        if (prev === 0 && curr > 0) {
                            this.array[j][i] = this.array[j - 1][i];
                            this.array[j - 1][i] = 0;

                            isCanMove = true;
                        }
                        else if (prev > 0 && prev == curr) {
                            this.array[j][i] = this.array[j][i] * 2;
                            this.array[j - 1][i] = 0;

                            isCanMove = true;
                            isCalcScore = true;

                            this.updateScore(this.array[j][i]);
                        }
                    }
                }
                break;
            case 'down':
                for (let i = 0; i < this.array.length; ++i) {
                    for (let j = 1; j < this.array[i].length; ++j) {
                        let prev = this.array[j - 1][i];
                        let curr = this.array[j][i];
                        if (prev === 0 && curr > 0) {
                            this.array[j - 1][i] = this.array[j][i];
                            this.array[j][i] = 0;

                            isCanMove = true;
                        }
                        else if (prev > 0 && prev == curr) {
                            this.array[j - 1][i] = this.array[j - 1][i] * 2;
                            this.array[j][i] = 0;

                            isCanMove = true;
                            isCalcScore = true;

                            this.updateScore(this.array[j - 1][i]);
                        }
                    }
                }
                break;
            default:
                break;
        }

        if (isCanMove) {
            this.recreateAllItems();

            let audioSource: AudioSource = new AudioSource();
            if (isCalcScore) {
                audioSource.playOneShot(this.mergeSound, 1);
            }
            else {
                audioSource.playOneShot(this.moveSound, 1);
            }
        }

        this.addRandomArray(this.userData.lv);

        this.userData.array_history.push(JSON.parse(JSON.stringify(this.array)));
        this.userData.array = this.array;
        if (this.userData.array_history.length > 10) {
            this.userData.array_history.shift();
        }
        this.userData.backNum = this.userData.array_history.length;
        this.txtBack.string = "撤回(" + this.userData.backNum + ")";

        this.saveUserInfo();
    }

    private recreateAllItems() {
        this.cleanAllItem();

        for (let i = 0; i < this.array.length; ++i) {
            for (let j = 0; j < this.array[i].length; ++j) {
                if (this.array[i][j] > 0) {
                    let pos = v2(i, j);
                    this.createItem(pos, this.array[i][j], false);
                }
            }
        }
    }

    private cleanAllItem() {
        let children = this.nodeParent.children;
        for (let i = children.length - 1; i >= 0; --i) {
            let tile = children[i].getComponent(Tile);
            if (tile) {
                this.nodeParent.removeChild(children[i]);
            }
        }
    }

    private updateScore(score: number) {
        this.userData.score += score;
        this.txtScore.string = this.userData.score.toString();

        if (this.userData.score > this.userData.bestScore) {
            this.userData.bestScore = this.userData.score;
            this.txtBestScore.string = this.userData.bestScore.toString();
        }

        this.saveUserInfo();
    }

    private initPanel() {
        this.startPanel.active = false;
        this.gamePanel.active = false;
        this.overPanel.active = false;
    }

    private init() {
        this.getUserInfo();
        this.updateView();
    }

    private getUserInfo() {
        this.userData = JSON.parse(sys.localStorage.getItem("userData"));
        if (null === this.userData) {
            this.userData = {
                lv: 5,
                score: 0,
                bestScore: 0,
                array: [],
                array_history: [],
                backNum: 0,
            };
        }
    }

    private saveUserInfo() {
        let value = JSON.stringify(this.userData);

        sys.localStorage.setItem("userData", value);
    }

    private updateView() {
        let lv = this.userData.lv;

        this.txtLv.string = lv.toString() + "x" + lv.toString();
        this.txtScore.string = this.userData.score.toString();
        this.txtBestScore.string = this.userData.bestScore.toString();
        this.txtBack.string = "撤回(" + this.userData.backNum + ")";

        this.itemWidth = Math.round(640 / lv);
        this.itemParentWidth = this.itemWidth * lv + this.offset * (lv + 1);

        this.nodeParentTransform.width = this.itemParentWidth;
        this.nodeParentTransform.height = this.itemParentWidth;

        this.addItemBg(lv);

        this.initArray(lv);
        this.addRandomArray(lv);
    }

    private initArray(lv: number) {
        this.array = [];

        for (let i = 0; i < lv; ++i) {
            this.array[i] = [];
        }

        for (let i = 0; i < lv; ++i) {
            for (let j = 0; j < lv; ++j) {
                this.array[i][j] = 0;
            }
        }
    }

    private addRandomArray(lv: number) {
        let arr_0 = [];
        for (let i = 0; i < lv; ++i) {
            for (let j = 0; j < lv; ++j) {
                if (this.array[i][j] === 0) {
                    arr_0.push(v2(i, j));
                }
            }
        }

        if (arr_0.length !== 0) {
            let i_random = Math.floor(Math.random() * arr_0.length);
            let ii = arr_0[i_random].x;
            let jj = arr_0[i_random].y;
            let randomNum = Math.random() * 10;
            if (randomNum < 2) {
                this.array[ii][jj] = 4;
            }
            else {
                this.array[ii][jj] = 2;
            }

            this.createItem(arr_0[i_random], this.array[ii][jj], true);

            this.onCheckOver();
        }
    }

    private createItem(pos, num, isAction = false) {
        let posStart = v2(-this.itemParentWidth / 2 + this.itemWidth / 2 + this.offset, -this.itemParentWidth / 2 + this.itemWidth / 2 + this.offset);
        let newItem = instantiate(this.item);
        let tile = newItem.getComponent(Tile);
        if (tile) {
            tile.init(num);
        }

        newItem.parent = this.nodeParent;
        let transform: UITransform = newItem.getComponent(UITransform);
        transform.width = this.itemWidth;
        transform.height = this.itemWidth;

        let posX = posStart.x + (this.itemWidth + this.offset) * pos.y;
        let posY = posStart.y + (this.itemWidth + this.offset) * pos.x;
        newItem.position = v3(posX, posY, 0);

        if (isAction) {
            newItem.scale = v3(0, 0, 0);
            tween(newItem).to(0.15, { scale: v3(1, 1, 1) }, { easing: "sineInOut" }).start();
        }
    }

    private addItemBg(lv: number) {
        let posStart = v2(-this.itemParentWidth / 2 + this.itemWidth / 2 + this.offset, -this.itemParentWidth / 2 + this.itemWidth / 2 + this.offset);

        for (let i = 0; i < lv; ++i) {
            for (let j = 0; j < lv; ++j) {
                let newItemBg = instantiate(this.itemBg);
                newItemBg.parent = this.nodeParent;

                let newItemBgTf: UITransform = newItemBg.getComponent(UITransform);
                newItemBgTf.width = this.itemWidth;
                newItemBgTf.height = this.itemWidth;

                let posX = posStart.x + (this.itemWidth + this.offset) * j;
                let posY = posStart.y + (this.itemWidth + this.offset) * i;
                newItemBg.position = v3(posX, posY, 0);
            }
        }
    }

    private onBtnStartClick() {
        this.initPanel();
        this.gamePanel.active = true;

        this.init();
    }

    private onBtnReplayClick() {
        this.userData.array_history = [];
        this.userData.array = [];
        this.userData.score = 0;
        this.userData.backNum = 0;
        this.saveUserInfo();

        this.cleanAllItem();
        this.updateView();
    }

    private onBtnHomeClick() {
        this.initPanel();
        this.startPanel.active = true;
    }

    private onBtnBackClick() {
        if (this.userData.backNum > 0) {
            let history = this.userData.array_history.pop();
            this.array = history;
            this.userData.array = history;
            this.saveUserInfo();

            this.recreateAllItems();
        }

        this.userData.backNum = this.userData.array_history.length;
        this.txtBack.string = "撤回(" + this.userData.backNum + ")";
    }

    private onOverBtnReplayClick() {
        this.overPanel.active = false;

        this.onBtnReplayClick();
    }

    private onOverBtnHomeClick() {
        this.initPanel();
        this.startPanel.active = true;
    }

    private onCheckOver() {
        let isOver: boolean = true;

        for (let i = 0; i < this.array.length; ++i) {
            for (let j = 0; j < this.array[i].length; ++j) {
                if (this.array[i][j] == 0) {
                    isOver = false;
                    break;
                }
            }
        }

        if (isOver) {
            for (let i = 0; i < this.array.length; ++i) {
                for (let j = 0; j < this.array[i].length - 1; ++j) {
                    if (this.array[i][j] == this.array[i][j + 1]) {
                        isOver = false;
                        break;
                    }
                }
            }
        }

        if (isOver) {
            for (let i = 0; i < this.array.length - 1; ++i) {
                for (let j = 0; j < this.array[i].length; ++j) {
                    if (this.array[i][j] == this.array[i + 1][j]) {
                        isOver = false;
                        break;
                    }
                }
            }
        }

        if (isOver) {
            this.overPanel.active = true;
            this.txtOverScore.string = "你得到了" + this.userData.score + "分"
        }
    }
}


