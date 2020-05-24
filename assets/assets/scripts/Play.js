// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
     
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('mousedown', this.scaleButton, this);
        this.node.on('mouseup', this.playGame, this);
    },

    scaleButton () {
        cc.tween(this.node).to(0.2, {scale: 1.2}).start();
    },

    playGame (event) {
        cc.director.loadScene('Game');
    },

});
