"use strict";

class Util{
  static getJudgeConstant(frame){
    let a=[];
    a[0]=frame-badFrame;
    a[1]=frame-okFrame;
    a[2]=frame-goodFrame;
    a[3]=frame+goodFrame;
    a[4]=frame+okFrame;
    a[5]=frame+badFrame;
    return a;
  };

  static range(x, a, b, _a=true, _b=true){
    if(_a && _b){
      if(a<=x && x<=b){return true;}else{return false;};
    }else if(_a && !(_b)){
      if(a<=x && x<b){return true;}else{return false;};
    }else if(!(_a) && _b){
      if(a<x && x<=b){return true;}else{return false;};
    }else if(!(_a) && !(_b)){
      if(a<x && x<b){return true;}else{return false;};
    }else{console.error("equal is not true or false defined");};
  };

  static getXSpeed(BPM,scroll,direction){
    const speed=Math.abs(BPM*scroll*scrollConstant);
    const r2=Math.sqrt(2);
    let a=undefined;
    switch(direction){
      case "0":a=0;break;
      case "1":a=-(speed/r2);break;
      case "2":a=-speed;break;
      case "3":a=-(speed/r2);break;
      case "4":a=0;break;
      case "5":a=speed/r2;break;
      case "6":a=speed;break;
      case "7":a=speed/r2;break;
      default:a=-speed;console.log("direction is not found!!\nOr, you use string!!\nUse number!!");break;
    };
    return a;
  };

  static getYSpeed(BPM,scroll,direction){
    const speed=Math.abs(BPM*scroll*scrollConstant);
    const r2=Math.sqrt(2);
    let a=undefined;
    switch(direction){
      case "0":a=speed;break;
      case "1":a=speed/r2;break;
      case "2":a=0;break;
      case "3":a=-(speed/r2);break;
      case "4":a=-speed;break;
      case "5":a=-(speed/r2);break;
      case "6":a=0;break;
      case "7":a=speed/r2;break;
      default:a=0;console.log(direction, "direction is not found!!\nOr, you use wrong marks!!");break;
    };
    return a;
  };

  static costume8(frame, BPM){
    const nowTime=frame*spf;
    let a=nowTime;
    let b=1000*60/BPM/2;/*そのBPMでの8分音符の時間*/
    let c=0;
    while(true){
      if((a-b)>=0){a-=b;}else{break;};
      c++;
    };
    return c%2;
  };

  static costume16(frame, BPM){
    const nowTime=frame*spf;
    let a=nowTime;
    let b=1000*60/BPM/4;/*そのBPMでの8分音符の時間*/
    let c=0;
    while(true){
      if((a-b)>=0){a-=b;}else{break;};
      c++;
    };
    return c%2;
  };

  static getRad(direction){
    switch(direction){
      case 0:return Math.PI/4*(-2);
      case 1:return Math.PI/4*(-1);
      case 2:return Math.PI/4*0;
      case 3:return Math.PI/4*1;
      case 4:return Math.PI/4*2;
      case 5:return Math.PI/4*3;
      case 6:return Math.PI/4*4;
      case 7:return Math.PI/4*5;
      default:console.error("direction is wrong!!");
    };
  };

  static distance(p1,p2){
    return Math.sqrt((p1[0]-p2[0])**2+(p1[1]-p2[1])**2);
  };
};
