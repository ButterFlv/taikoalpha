"use strict";

class Roll{
  constructor(_ctx, _beforeObj, _afterObj){
    this.type="smallRoll";
    this.ctx=_ctx;
    this.before=Util_Roll.beforeObjSet(_beforeObj);
    this.after=Util_Roll.afterObjSet(_afterObj);
    this.callBackFuncs=_beforeObj.callBackFuncs;
    this.radian=null;
  };
  setPoint(frame){
    this.before.setPoint(frame);
    this.after.setPoint(frame);
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

    Util_Roll.drawEnd(this, sprite.srolle[cosNum]);
    Util_Roll.drawMiddle(this, sprite.srollm[cosNum]);
    Util_Roll.drawStart(this, sprite.srolls[cosNum]);
  };
  isUse(frame){
    if(this.before.isDraw(frame) || this.after.isDraw(frame)){
      return true;
    }else{return false;};
  };
};



class Util_Roll{
  constructor(){};



  static beforeObjSet(_beforeObj){

    let obj={};

    /*連打ノーツの頭の情報を設定*/
    obj={
      BPM:_beforeObj.BPM,
      scroll:_beforeObj.scroll,
      enterTime:_beforeObj.enterTime,
      direction:_beforeObj.direction,
      callBackFuncs:_beforeObj.callBackFuncs
    };

    /*連打ノーツの頭のフレームを計算*/
    obj.enterFrame=Math.round(obj.enterTime/spf);

    /*連打ノーツの頭の速さについて設定*/
    obj.speedX=Util.getXSpeed(obj.BPM,obj.scroll,obj.direction);
    obj.speedY=Util.getYSpeed(obj.BPM,obj.scroll,obj.direction);

    /*連打ノーツの頭の位置を一次関数で表す。*/
    obj.targetX=WIDTH/2;
    obj.targetY=HEIGHT/2;
    obj.f_x=(time)=>{return obj.speedX*(time-obj.enterTime)+obj.targetX;};
    obj.f_y=(time)=>{return obj.speedY*(time-obj.enterTime)+obj.targetY;};

    /*連打ノーツの頭の座標情報について設定*/
    obj.x=null;obj.y=null;
    obj.setPoint=(frame)=>{
      obj.x=obj.f_x(frame*spf);
      obj.y=obj.f_y(frame*spf);
    };

    /*描画範囲のフレームを設定*/
    for(let a=0;true;a++){
      const x=obj.f_x(a*spf);
      const y=obj.f_y(a*spf);
      if(Util.range(x,0-frameOut,WIDTH+frameOut)&&
          Util.range(y,0-frameOut,HEIGHT+frameOut)&&
          obj.drawStartFrame===undefined){
        obj.drawStartFrame=a;
      };
      if(!(Util.range(x,0-frameOut,WIDTH+frameOut)&&
          Util.range(y,0-frameOut,HEIGHT+frameOut))&&
          obj.drawStartFrame!==undefined){
        obj.drawEndFrame=a-1;
        break;
      };
    };

    /*ノーツが描画範囲にあるか判定*/
    obj.isDraw=(frame)=>{
      if(Util.range(frame,obj.drawStartFrame,obj.drawEndFrame)){
        return true;
      }else{return false;};
    };

    /*連打ノーツの頭の描画*/
    obj.draw=(frame, nowBPM, combo)=>{
      let cosNum=0;
      if(Util.range(combo,0,49)){
        cosNum=0;
      }else if(Util.range(combo,50,99)){
        cosNum=Util.costume8(frame, nowBPM);
      }else{
        cosNum=Util.costume16(frame, nowBPM);
      };
      sprite.srolls[cosNum].drawCenter(obj.x, obj.y, noteSize, noteSize);
    };
    return obj;
  };



  static afterObjSet(_afterObj){

    let obj={};

    /*連打ノーツの頭の情報を設定*/
    obj={
      BPM:_afterObj.BPM,
      scroll:_afterObj.scroll,
      enterTime:_afterObj.enterTime,
      direction:_afterObj.direction,
      callBackFuncs:_afterObj.callBackFuncs
    };

    /*連打ノーツの頭のフレームを計算*/
    obj.enterFrame=Math.round(obj.enterTime/spf);

    /*連打ノーツの頭の速さについて設定*/
    obj.speedX=Util.getXSpeed(obj.BPM,obj.scroll,obj.direction);
    obj.speedY=Util.getYSpeed(obj.BPM,obj.scroll,obj.direction);

    /*連打ノーツの頭の位置を一次関数で表す。*/
    obj.targetX=WIDTH/2;
    obj.targetY=HEIGHT/2;
    obj.f_x=(time)=>{return obj.speedX*(time-obj.enterTime)+obj.targetX;};
    obj.f_y=(time)=>{return obj.speedY*(time-obj.enterTime)+obj.targetY;};

    /*連打ノーツの頭の座標情報について設定*/
    obj.x=null;obj.y=null;
    obj.setPoint=(frame)=>{
      obj.x=obj.f_x(frame*spf);
      obj.y=obj.f_y(frame*spf);
    };

    /*描画範囲のフレームを設定*/
    for(let a=0;true;a++){
      const x=obj.f_x(a*spf);
      const y=obj.f_y(a*spf);
      if(Util.range(x,0-frameOut,WIDTH+frameOut)&&
          Util.range(y,0-frameOut,HEIGHT+frameOut)&&
          obj.drawStartFrame===undefined){
        obj.drawStartFrame=a;
      };
      if(!(Util.range(x,0-frameOut,WIDTH+frameOut)&&
          Util.range(y,0-frameOut,HEIGHT+frameOut))&&
          obj.drawStartFrame!==undefined){
        obj.drawEndFrame=a-1;
        break;
      };
    };

    /*ノーツが描画範囲にあるか判定*/
    obj.isDraw=(frame)=>{
      if(Util.range(frame,obj.drawStartFrame,obj.drawEndFrame)){
        return true;
      }else{return false;};
    };

    /*連打ノーツの頭の描画*/
    obj.draw=(frame, nowBPM, combo)=>{
      let cosNum=0;
      if(Util.range(combo,0,49)){
        cosNum=0;
      }else if(Util.range(combo,50,99)){
        cosNum=Util.costume8(frame, nowBPM);
      }else{
        cosNum=Util.costume16(frame, nowBPM);
      };
      sprite.srolle[cosNum].drawCenter(obj.x, obj.y, noteSize, noteSize);
    };
    return obj;
  };



  static calcRad(_class){
    const b=[_class.before.x, _class.before.y];
    const a=[_class.after.x, _class.after.y];
    const radian=Math.atan((b[1]-a[1])/(b[0]-a[0]));
    let returnRadian=radian;
    if(b[0]>=a[0]){returnRadian=radian+Math.PI;};
    return returnRadian;
  };



  static drawEnd(_class, sprite){
    const a=[_class.after.x, _class.after.y];
    const radian=_class.radian;
    const c=_class.ctx.c;
    const g=_class.ctx.g;

    g.translate(a[0], a[1]);
    g.rotate(radian);
    sprite.drawCenter(0, 0, noteSize, noteSize);
    g.rotate(-radian);
    g.translate(-a[0], -a[1]);
  };



  static drawMiddle(_class, sprite){
    const b=[_class.before.x, _class.before.y];
    const a=[_class.after.x, _class.after.y];
    const p=[(b[0]+a[0])/2, (b[1]+a[1])/2];
    const radian=_class.radian;
    const c=_class.ctx.c;
    const g=_class.ctx.g;

    g.translate(p[0], p[1]);
    g.rotate(radian);
    sprite.drawCenter(0, 0, Util.distance(a,b), noteSize);
    g.rotate(-radian);
    g.translate(-p[0], -p[1]);
  };



  static drawStart(_class, sprite){
    const b=[_class.before.x, _class.before.y];
    sprite.drawCenter(b[0], b[1], noteSize, noteSize);
  };
};
