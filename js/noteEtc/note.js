"use strict";

class Note{
  constructor(_obj){
    this.BPM            = _obj.BPM;
    this.scroll         = _obj.scroll;
    this.enterTime      = _obj.enterTime;
    this.direction      = _obj.direction;
    /*Game2クラスによってもう一度上書きされる*/
    this.callBackFuncs  = _obj.callBackFuncs;

    this.isJudgeFrameOut=false;

    this.kill=false;

    this.setFrame();
    this.setSpeed();
    this.setFunc();
    this.setDrawFrame();
    this.setUseFrame();
    /*this.isUse...今使うかどうかを判定する。*/
  };

  /*判定枠とちょうど重なるタイミング(justのフレームを求める)*/
  setFrame(){
    this.enterFrame=Math.round(this.enterTime/spf);
    this.judgeFrame=Util.getJudgeConstant(this.enterFrame);
  };

  /*x,y座標を求める*/
  setPoint(frame){
    this.x=this.f_x(frame*spf);
    this.y=this.f_y(frame*spf);
  };

  /*ノーツのスピードを求める*/
  setSpeed(){
    this.speedX=Util.getXSpeed(this.BPM,this.scroll,this.direction);
    this.speedY=Util.getYSpeed(this.BPM,this.scroll,this.direction);
  };

  /*ノートの位置(変異をtime[ms]を変数とした一次関数で定義する)*/
  setFunc(){
    this.targetX=WIDTH/2;
    this.targetY=HEIGHT/2;
    this.f_x=(time)=>{return this.speedX*(time-this.enterTime)+this.targetX;};
    this.f_y=(time)=>{return this.speedY*(time-this.enterTime)+this.targetY;};
  };

  /*描画する初めのフレーム・最後のフレームを求める*/
  setDrawFrame(){
    let a=0;
    while(true){
      const x=this.f_x(a*spf);
      const y=this.f_y(a*spf);
      if(Util.range(x,0-frameOut,WIDTH+frameOut)&&
          Util.range(y,0-frameOut,HEIGHT+frameOut)&&
          this.drawStartFrame===undefined){
        this.drawStartFrame=a;
      };
      if(!(Util.range(x,0-frameOut,WIDTH+frameOut)&&
          Util.range(y,0-frameOut,HEIGHT+frameOut))&&
          this.drawStartFrame!==undefined){
        this.drawEndFrame=a-1;
        break;
      };
      a++;
    };
  };

  /*判定の終・始のフレームと描画の終・始のフレームをもとに処理(変位計算など)を行う初めのフレーム、終わりのフレームを計算する*/
  setUseFrame(){
    this.useStartFrame=Math.min(this.judgeFrame[0], this.drawStartFrame);
    this.useEndFrame=Math.max(this.judgeFrame[5], this.drawEndFrame);
  };
  
  isUse(frame){
    if(Util.range(frame,this.useStartFrame,this.useEndFrame)){
      return true;
    }else{return false;};
  };
};
