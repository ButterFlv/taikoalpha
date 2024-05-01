"use strict";

class Don extends Note{
  constructor(_obj){
    super(_obj);
    this.x=undefined;
    this.y=undefined;
    this.type="smallDon";
  };
  draw(frame, nowBPM, combo){
    let cosNum=0;
    if(Util.range(combo,0,49)){
      cosNum=0;
    }else if(Util.range(combo,50,99)){
      cosNum=Util.costume8(frame, nowBPM);
    }else{
      cosNum=Util.costume16(frame, nowBPM);
    };
    sprite.sd[cosNum].drawCenter(this.x, this.y, noteSize, noteSize);
  };
  judge(frame){
    switch(this.getJudgeNum(frame)){
      case 0:this.callBackFuncs.getJudgeResultNum(this.id, "bad");return;
      case 1:this.callBackFuncs.getJudgeResultNum(this.id, "ok");return;
      case 2:this.callBackFuncs.getJudgeResultNum(this.id, "good");return;
      case 3:this.callBackFuncs.getJudgeResultNum(this.id, "ok");return;
      case 4:this.callBackFuncs.getJudgeResultNum(this.id, "bad");return;
      case "else":return;
      default:console.error("Judge is strange!!");
    };
  };
  getJudgeNum(frame){
    for(let i=0;i<5;i++){
      if(Util.range(frame,this.judgeFrame[i],this.judgeFrame[i+1],true,false)){
        return i;
      };
    };
    return "else";
  };
};
