"use strict";

class BigRoll extends Roll{
  constructor(_ctx, _beforeObj, _afterObj){
    super(_ctx, _beforeObj, _afterObj);
    this.type="bigRoll";
  };
  draw(frame, BPM, combo){
    this.radian=Util_Roll.calcRad(this);

    let cosNum=0;
    if(Util.range(combo,0,49)){
      cosNum=0;
    }else if(Util.range(combo,50,99)){
      cosNum=Util.costume8(frame, BPM);
    }else{
      cosNum=Util.costume16(frame, BPM);
    };

    Util_Roll.drawEnd(this, sprite.brolle[cosNum]);
    Util_Roll.drawMiddle(this, sprite.brollm[cosNum]);
    Util_Roll.drawStart(this, sprite.brolls[cosNum]);
  };
};
