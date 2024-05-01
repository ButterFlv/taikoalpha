"use strict";

class BigKa extends Don{
  constructor(_obj){
    super(_obj);
    this.type="bigKa";
  };

  setPoint(frame){
    super.setPoint(frame);
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
    sprite.bk[cosNum].drawCenter(this.x, this.y, noteSize, noteSize);
  };
};
