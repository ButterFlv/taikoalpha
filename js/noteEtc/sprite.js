"use strict";

class Sprite{
  constructor(name, _ctx, sx, sy, sw, sh){
    this.name=name;
    this.ctx=_ctx;
    this.usePicture={};
    this.usePicture.sx=sx;
    this.usePicture.sy=sy;
    this.usePicture.sw=sw;
    this.usePicture.sh=sh;
  };
  draw(x, y, w=this.usePicture.sw, h=this.usePicture.sh){
    const u=this.usePicture;
    this.ctx.g.drawImage(imageList[this.name], u.sx, u.sy, u.sw, u.sh,
                          x, y, w, h);
  };
  drawCenter(x, y, w=this.usePicture.sw, h=this.usePicture.sh){
    const u=this.usePicture;
    this.ctx.g.drawImage(imageList[this.name], u.sx, u.sy, u.sw, u.sh,
                          x-w/2, y-h/2, w, h);
  };
  static set(_ctx){
    setImageList();
    setSprite(_ctx);
    return;
  };
};

let sprite={};

const setSprite=(_ctx)=>{
sprite.backGround=new Sprite("bg_clear",_ctx,0,353,663,318);

sprite.combon=[];
sprite.combon[0]=new Sprite("combonumber",_ctx,0,0,45,52);
sprite.combon[1]=new Sprite("combonumber",_ctx,47,0,35,52);
sprite.combon[2]=new Sprite("combonumber",_ctx,86,0,46,52);
sprite.combon[3]=new Sprite("combonumber",_ctx,133,0,43,52);
sprite.combon[4]=new Sprite("combonumber",_ctx,174,0,47,52);
sprite.combon[5]=new Sprite("combonumber",_ctx,221,0,43,52);
sprite.combon[6]=new Sprite("combonumber",_ctx,264,0,43,52);
sprite.combon[7]=new Sprite("combonumber",_ctx,309,0,43,52);
sprite.combon[8]=new Sprite("combonumber",_ctx,353,0,43,52);
sprite.combon[9]=new Sprite("combonumber",_ctx,397,0,42,52);

sprite.combof=[];
sprite.combof[0]=new Sprite("combonumber_l",_ctx,4,0,53,69);
sprite.combof[1]=new Sprite("combonumber_l",_ctx,67,0,41,69);
sprite.combof[2]=new Sprite("combonumber_l",_ctx,123,0,55,69);
sprite.combof[3]=new Sprite("combonumber_l",_ctx,183,0,51,69);
sprite.combof[4]=new Sprite("combonumber_l",_ctx,239,0,59,69);
sprite.combof[5]=new Sprite("combonumber_l",_ctx,304,0,53,69);
sprite.combof[6]=new Sprite("combonumber_l",_ctx,365,0,52,69);
sprite.combof[7]=new Sprite("combonumber_l",_ctx,423,0,55,69);
sprite.combof[8]=new Sprite("combonumber_l",_ctx,482,0,55,69);
sprite.combof[9]=new Sprite("combonumber_l",_ctx,541,0,55,69);

sprite.effectSGL=[];
sprite.effectSOL=[];
sprite.effectBGL=[];
sprite.effectBOL=[];
for(let i=0;i<10;i++){
  sprite.effectSGL.push(new Sprite("explosion_lower",_ctx,208*i,0,208,208));
  sprite.effectSOL.push(new Sprite("explosion_lower",_ctx,208*i,207,208,208));
  sprite.effectBGL.push(new Sprite("explosion_lower",_ctx,208*i,415,208,208));
  sprite.effectBOL.push(new Sprite("explosion_lower",_ctx,208*i,623,208,208));
};

sprite.effectSGU=[];
for(let i=0;i<5;i++){sprite.effectSGU.push(new Sprite("explosion_upper",_ctx,Math.floor(234.5454*i),0,235,238));};
sprite.effectSOU=[];
for(let i=0;i<4;i++){sprite.effectSOU.push(new Sprite("explosion_upper",_ctx,Math.floor(234.5454*i),238,235,238));};
sprite.effectBGU=[];
for(let i=0;i<11;i++){sprite.effectBGU.push(new Sprite("explosion_upper",_ctx,Math.floor(234.5454*i),476,235,238));};
sprite.effectBOU=[];
for(let i=0;i<10;i++){sprite.effectBOU.push(new Sprite("explosion_upper",_ctx,Math.floor(234.5454*i),714,235,238));};

sprite.effectTamashiU=[];
for(let i=0;i<10;i++){sprite.effectTamashiU.push(new Sprite("explosion_soul",_ctx,300*i,0,300,300));};

sprite.effectTamashiL=[];
for(let i=0;i<8;i++){sprite.effectTamashiL.push(new Sprite("soul",_ctx,244*i,0,244,244));};

sprite.judgeGood=new Sprite("judgement",_ctx,0,0,108,Math.floor(89.333));
sprite.judgeOk=new Sprite("judgement",_ctx,0,Math.floor(89.333),108,Math.floor(89.333));
sprite.judgeBad=new Sprite("judgement",_ctx,0,Math.floor(89.333*2),108,Math.floor(89.333));

sprite.rollballoon=new Sprite("rollballoon",_ctx,0,0,410,204);

sprite.font=[];
sprite.font[0]=new Sprite("font_L",_ctx,98+51*0,130,51,65);
sprite.font[1]=new Sprite("font_L",_ctx,98+51*1,130,51,65);
sprite.font[2]=new Sprite("font_L",_ctx,98+51*2,130,51,65);
sprite.font[3]=new Sprite("font_L",_ctx,98+51*3,130,51,65);
sprite.font[4]=new Sprite("font_L",_ctx,98+51*4,130,51,65);
sprite.font[5]=new Sprite("font_L",_ctx,98+51*5,130,51,65);
sprite.font[6]=new Sprite("font_L",_ctx,98+51*6,130,51,65);
sprite.font[7]=new Sprite("font_L",_ctx,98+51*7,130,51,65);
sprite.font[8]=new Sprite("font_L",_ctx,98+51*8,130,51,65);
sprite.font[9]=new Sprite("font_L",_ctx,98+51*9,130,51,65);

sprite.judgeFrame=new Sprite("notes",_ctx,0,0,160,160);

sprite.gogoJudgeFrame=[];
for(let i=0;i<4;i++){sprite.gogoJudgeFrame.push(new Sprite("fire",_ctx,376*i,0,376,376));};
for(let i=0;i<4;i++){sprite.gogoJudgeFrame.push(new Sprite("fire",_ctx,376*i,376,376,376));};

sprite.sd=[];
sprite.sd[0]=new Sprite("notes",_ctx,160*1,0,160,160);
sprite.sd[1]=new Sprite("notes",_ctx,160*1,160,160,160);
sprite.sk=[];
sprite.sk[0]=new Sprite("notes",_ctx,160*2,0,160,160);
sprite.sk[1]=new Sprite("notes",_ctx,160*2,160,160,160);
sprite.bd=[];
sprite.bd[1]=new Sprite("notes",_ctx,160*3,0,160,160);
sprite.bd[0]=new Sprite("notes",_ctx,160*3,160,160,160);
sprite.bk=[];
sprite.bk[1]=new Sprite("notes",_ctx,160*4,0,160,160);
sprite.bk[0]=new Sprite("notes",_ctx,160*4,160,160,160);
sprite.srolls=[];
sprite.srolls[0]=new Sprite("notes",_ctx,160*5,0,155,160);
sprite.srolls[1]=new Sprite("notes",_ctx,160*5,160,155,160);
sprite.srollm=[];
sprite.srollm[0]=new Sprite("notes",_ctx,160*6,0,159,160);
sprite.srollm[1]=new Sprite("notes",_ctx,160*6,160,159,160);
sprite.srolle=[];
sprite.srolle[0]=new Sprite("notes",_ctx,160*7+1,0,160,160);
sprite.srolle[1]=new Sprite("notes",_ctx,160*7+1,160,160,160);
sprite.brolls=[];
sprite.brolls[0]=new Sprite("notes",_ctx,160*8,0,159,160);
sprite.brolls[1]=new Sprite("notes",_ctx,160*8,160,159,160);
sprite.brollm=[];
sprite.brollm[0]=new Sprite("notes",_ctx,160*9,0,159,160);
sprite.brollm[1]=new Sprite("notes",_ctx,160*9,160,159,160);
sprite.brolle=[];
sprite.brolle[0]=new Sprite("notes",_ctx,160*10,0,160,160);
sprite.brolle[1]=new Sprite("notes",_ctx,160*10,160,160,160);
sprite.balloon=[];
sprite.balloon[0]=new Sprite("notes",_ctx,160*11,0,160*2,160);
sprite.balloon[1]=new Sprite("notes",_ctx,160*11,160,160*2,160);
};


/*
<<スプライトについて>>
ノーツのパクパクは
0~49コンボはなし。
50~99コンボは8分音符のタイミングでで切り替わる。
100~コンボは16分音符のタイミングで切り替わる
*/
