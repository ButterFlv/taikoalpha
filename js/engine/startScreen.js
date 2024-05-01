"use strict";

class StartScreen{
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

      /*画像データ(サムネイル)のレイアウト*/
      img:{
        centerX:960*this.widthRate,
        centerY:430*this.heightRate,
        size:700*this.widthRate
      },

      /*titleのレイアウト*/
      title:{
        centerX:960*this.widthRate,
        centerY:850*this.heightRate,
        font:100*this.widthRate + "px arial"
      },

      /*composerのレイアウト*/
      composer:{
        centerX:1200*this.widthRate,
        centerY:1000*this.heightRate,
        font:50*this.widthRate + "px arial"
      },

      /*警告文字の設定*/
      alertLetters:{
        x:10*this.widthRate,
        y:10*this.heightRate,
        font:30*this.widthRate + "px arial"
      },

      /*選択誘導文字の設定(プロパティ)*/
      right:{
        x:WIDTH/2+750*this.widthRate,
        y:540*this.heightRate,
        font:100*this.widthRate + "px arial",
      },

      left:{
        x:WIDTH/2-750*this.widthRate,
        y:540*this.heightRate,
        font:100*this.widthRate + "px arial",
      }
    };

    this.images=this.getImage();

    this.loop(this.ctx);
  };
  keydown(e){
    if(e.key==="j"||e.key==="f"){
      this.isDrawLoop=false;
      this.callBacks.changeGame(data[this.currentCollectNumber]);
    }else if(e.key==="k"){
      this.currentCollectNumber=Math.min(data.length-1, this.currentCollectNumber+1);
    }else if(e.key==="d"){
      this.currentCollectNumber=Math.max(0, this.currentCollectNumber-1);
    };
  };
  keyup(e){};

  getImage(){
    let arr=[];
    for(let i=0;i<data.length;i++){
      const img=new Image();
      img.src=data[i].imgSrc;
      arr.push(img);
    };
    return arr
  };

  loop(_ctx){

    _ctx.fillAll(this.layout.backGroundColor);

    /*画像の描画位置をレイアウトから計算*/
    const img={
      x:this.layout.img.centerX-this.layout.img.size/2,
      y:this.layout.img.centerY-this.layout.img.size/2,
      width:this.layout.img.size,
      height:this.layout.img.size
    };

    /*サムネイル画像を描画*/
    this.g.drawImage( this.images[this.currentCollectNumber],
                      img.x, img.y, img.width, img.height);

    /*titleを描画*/
    this.g.fillStyle=this.layout.letterColor;
    this.g.font=this.layout.title.font;
    this.g.textAlign="center";
    this.g.textBaseLine="middle";
    this.g.fillText(data[this.currentCollectNumber].title,
                    this.layout.title.centerX, this.layout.title.centerY);

    /*composerの描画*/
    this.g.font=this.layout.composer.font;
    this.g.fillText(data[this.currentCollectNumber].composer,
                    this.layout.composer.centerX, this.layout.composer.centerY);

    /*alertLettersの描画*/
    this.g.textAlign="left";
    this.g.textBaseline="top";
    this.g.font=this.layout.alertLetters.font;
    this.g.fillText("W : ドンとカの音をオンにする　←　音ズレが発生しやすいので非推奨",
                    this.layout.alertLetters.x, this.layout.alertLetters.y);

    /*right_leftの誘導文字の描画*/
    this.g.textAlign="center";
    this.g.textBaseline="top";
    this.g.font=this.layout.right.font;
    this.g.fillText("K→", this.layout.right.x, this.layout.right.y);

    this.g.textAlign="center";
    this.g.textBaseline="top";
    this.g.font=this.layout.left.font;
    this.g.fillText("←D", this.layout.left.x, this.layout.left.y);

    if(this.isDrawLoop){requestAnimationFrame(()=>{this.loop(_ctx);})};
  };
};
