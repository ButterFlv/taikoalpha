"use strict";

class Effect{
  constructor(size, sort){
    /*small or big*/
    this.size=size;

    /*good or ok or bad ...すべて文字も表示する*/
    this.sort=sort;
    this.kill=false;

    this.innerCounter=0;

    this.lowerCounter;
    this.upperCounter;
    this.letterCounter=20;

    this.lowerName;
    this.upperName;
    this.letterName;

    this.sprite_counter_set();
  };

  sprite_counter_set(){
    if(this.size==="small" && this.sort==="good"){
      this.lowerCounter=10;
      this.upperCounter=5;
      this.lowerName="effectSGL";
      this.upperName="effectSGU";
      this.letterName="judgeGood";
    }else if(this.size==="big" && this.sort==="good"){
      this.lowerCounter=10;
      this.upperCounter=11;
      this.lowerName="effectBGL";
      this.upperName="effectBGU";
      this.letterName="judgeGood";
    }else if(this.size==="small" && this.sort==="ok"){
      this.lowerCounter=10;
      this.upperCounter=4;
      this.lowerName="effectSOL";
      this.upperName="effectSOU";
      this.letterName="judgeOk";
    }else if(this.size==="big" && this.sort==="ok"){
      this.lowerCounter=10;
      this.upperCounter=10;
      this.lowerName="effectBOL";
      this.upperName="effectBOU";
      this.letterName="judgeOk";
    }else{
      this.lowerCounter=0;
      this.upperCounter=0;
      this.lowerName=null;
      this.upperName=null;
      this.letterName="judgeBad";
    };
  };

  draw(){
    const max=Math.max(this.lowerCounter, this.upperCounter, this.letterCounter);
    if(this.innerCounter<this.lowerCounter){
      sprite[this.lowerName][this.innerCounter].drawCenter(WIDTH/2, HEIGHT/2, noteSize*1.7, noteSize*1.7);
    };
    if(this.innerCounter<this.upperCounter){
      sprite[this.upperName][this.innerCounter].drawCenter(WIDTH/2, HEIGHT/2, noteSize*1.7, noteSize*1.7);
    };
    if(this.innerCounter<this.letterCounter){
      sprite[this.letterName].drawCenter(WIDTH/2, HEIGHT/2-noteSize*0.45, noteSize*0.75, noteSize*0.6);
    };
    if(this.innerCounter>=max){
      this.kill=true;
    };
    this.innerCounter++;
  };
};
