// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        maxStarDuration: 0,
        minStarDuration: 0,

        ground: {
            default: null,
            type: cc.Node
        },

        player: {
            default: null,
            type: cc.Node
        },

        scoreDisplay: {
            default: null,
            type: cc.Label
        },

        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.score = 0;

        this.timer = 0;
        this.starDuration = 0;

        this.groundY = this.ground.y + this.ground.height / 2;
        // cc.log(this.groundY);
        this.spawnNewStar();
    },

    // start () {

    // },

    spawnNewStar: function () {
        var newStar = cc.instantiate(this.starPrefab);

        newStar.setPosition(this.getNewStartPosition());
        
        this.node.addChild(newStar);
        
        // Staging a reference of Game object on a star component
        newStar.getComponent('Star').game = this;

        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        // cc.log(this.starDuration);

        this.timer = 0;

    },

    getNewStartPosition: function () {
        var randX = 0;
        var maxX = this.node.width / 2;

        randX = (Math.random() - 0.5) * 2 * maxX;

        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;

        // cc.log(randX);
        // cc.log(randY);

        return cc.v2(randX, randY);
    },

    gainScore: function() {
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    update (dt) {
        if(this.timer > this.starDuration) {
            this.gameOver();
            return
        }
        this.timer += dt;
        // cc.log(this.timer);
    },


    gameOver () {
        this.player.stopAllActions();
        cc.director.loadScene('GameOver');
    } 
});
