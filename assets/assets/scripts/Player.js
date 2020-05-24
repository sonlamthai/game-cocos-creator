// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        jumpHeight: 0,

        jumpDuration: 0,

        maxMoveSpeed: 0,

        accel: 0,

        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.accLeft = false;
        this.accRight = false;

        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        this.xSpeed = 0;
        this.posX = 0;

        cc.systemEvent.on('keydown', this.onKeyDown, this);
        cc.systemEvent.on('keyup', this.onKeyUp, this);


    },

    update(dt) {




        if (!this.accLeft || !this.accRight) {
            this.node.x = this.xSpeed;
        }

        if (this.accLeft) {

            this.xSpeed -= this.accel * dt;
        }

        else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }


        // if (this.node.x > cc.winSize.width) {
        //     console.log("bang ne");
        // }

        // if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
        //     // if speed reach limit, use max speed with current direction
        //     this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        // }

        this.node.x += this.xSpeed * dt;

        // if ( this.node.x > this.node.parent.width/2) {
        //     this.node.x = this.node.parent.width/2;
        //     this.xSpeed = 0;
        // } else if (this.node.x < -this.node.parent.width/2) {
        //     this.node.x = -this.node.parent.width/2;
        //     this.xSpeed = 0;
        // }


    },


    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    setJumpAction: function () {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, - this.jumpHeight)).easing(cc.easeCubicActionIn());

        var playJump = cc.callFunc(this.playJumpSound, this);

        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, playJump));

        // var tweenJump = cc.tween(this.node).repeatForever(cc.tween()
        //     .by(this.jumpDuration, { position: { value: cc.v2(0, this.jumpHeight) } })
        //     .by(this.jumpDuration, { position: { value: cc.v2(0,  - this.jumpHeight)} })).start();
        // // var actions = tweenJump.repeatForever()    

        // return tweenJump;
    },

    playJumpSound: function () {
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.left:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
            case cc.macro.KEY.right:
                this.accRight = true;
                break;
        }
    },

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.left:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
            case cc.macro.KEY.right:
                this.accRight = false;
                break;
        }
    },


});
