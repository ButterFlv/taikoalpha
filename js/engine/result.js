"use strict";

class Result{
  constructor(_game, _info, _callBacks){
    this.game=_game;
    this.info=_info;
    this.callBacks=_callBacks;
    this.ctx=sprite.backGround.ctx;
    this.c=this.ctx.c;
    this.g=this.ctx.g;
    this.widthRate=WIDTH/1920;
    this.heightRate=HEIGHT/1080;

    this.layout={

      backGroundColor:"#ffffff",

      title:{
        centerX:960*this.widthRate,
        centerY:200*this.heightRate,
        font:100*this.widthRate + "px arial"
      },

      composer:{
        centerX:1200*this.widthRate,
        centerY:350*this.heightRate,
        font:65*this.widthRate + "px arial"
      },

      headLetterY:500*this.heightRate,
      letterX:600*this.widthRate,
      letterHMargine:100*this.heightRate,
      font:50*this.widthRate + "px arial",
      color:"#000000",
      numberX:1000*this.widthRate
    };

    this.createScreen();
  };

  keydown(e){
    if(e.key==="j"||e.key==="f"){this.callBacks.changeStartScreen()};
  };
  keyup(){};

  createScreen(){
    this.drawBackGround();
    this.drawResult();
  };

  drawBackGround(){
    this.ctx.fillAll(this.layout.backGroundColor);
  };

  drawResult(){
    this.g.fillStyle=this.layout.color;

    /*titleの文字の描画*/
    this.g.font=this.layout.title.font;
    this.g.textAlign="center";
    this.g.textBaseLine="middle";
    this.g.fillText(  this.game.arg.data.title,
                      this.layout.title.centerX,
                      this.layout.title.centerY);

    /*composerの文字の描画*/
    this.g.font=this.layout.composer.font;
    this.g.fillText(  this.game.arg.data.composer,
                      this.layout.composer.centerX,
                      this.layout.composer.centerY);

    /*リザルトの様々な情報の描画*/
    let drawY=this.layout.headLetterY;
    this.g.font=this.layout.font;
    this.g.textAlign="left";
    this.g.textBaseLine="middle";
    /*左側の描画*/
    this.g.fillText("score", this.layout.letterX, drawY);drawY+=this.layout.letterHMargine;
    this.g.fillText("good", this.layout.letterX, drawY);drawY+=this.layout.letterHMargine;
    this.g.fillText("ok", this.layout.letterX, drawY);drawY+=this.layout.letterHMargine;
    this.g.fillText("bad", this.layout.letterX, drawY);drawY+=this.layout.letterHMargine;
    this.g.fillText("max combo", this.layout.letterX, drawY);drawY+=this.layout.letterHMargine;
    this.g.fillText("roll", this.layout.letterX, drawY);drawY+=this.layout.letterHMargine;
    /*右側の描画*/
    drawY=this.layout.headLetterY;
    this.g.fillText(this.info.score, this.layout.numberX, drawY);drawY+=this.layout.letterHMargine;
    this.g.fillText(this.info.good, this.layout.numberX, drawY);drawY+=this.layout.letterHMargine;
    this.g.fillText(this.info.ok, this.layout.numberX, drawY);drawY+=this.layout.letterHMargine;
    this.g.fillText(this.info.bad, this.layout.numberX, drawY);drawY+=this.layout.letterHMargine;
    this.g.fillText(this.info.maxCombo, this.layout.numberX, drawY);drawY+=this.layout.letterHMargine;
    this.g.fillText(this.info.roll, this.layout.numberX, drawY);drawY+=this.layout.letterHMargine;
  };
};
