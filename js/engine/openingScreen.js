"use strict";

class OpeningScreen{
  constructor(_ctx, _callBacks){
    this.ctx=_ctx;
    this.c=this.ctx.c;
    this.g=this.ctx.g;
    this.callBacks=_callBacks;
    this.currentCollectNumber=0;
    this.isDrawLoop=true;

    this.widthRate=WIDTH/1920;
    this.heightRate=HEIGHT/1080;

    this.layout={

      backGroundColor:"#ff7f50",
      letterColor:"#000000",
      font:70*this.widthRate + "px arial",
      x:20*this.widthRate,
      y:20*this.widthRate,
      margineY:100*this.widthRate

    };

    this.createScreen(this.ctx);
  };
  keydown(e){
    this.callBacks.changeStartScreen();
  };
  keyup(e){};

  createScreen(_ctx){
    const g=_ctx.g;
    let drawY=this.layout.y;
    _ctx.fillAll(this.layout.backGroundColor);
    g.fillStyle=this.layout.letterColor;
    g.textAlign="left";
    g.textBaseline="top";
    g.font=this.layout.font;
    g.fillText("Press any keys to start!!", this.layout.x, drawY);
    drawY+=this.layout.margineY*2;
    g.fillText("W : ドンとカの音をオンにする", this.layout.x, drawY);
    drawY+=this.layout.margineY;
    g.fillText("　　↑音ズレが発生しやすいので非推奨", this.layout.x, drawY);
    drawY+=this.layout.margineY;
    g.fillText("Q : ページをリロード", this.layout.x, drawY);
  };
};
