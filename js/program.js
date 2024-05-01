"use strict";

class Program{
  constructor(_ctx){
    this.ctx=_ctx;
    this.startScreenCallBack=undefined;
    this.audio={};
    this.audio.don=new Audio(donAudioSrc);
    this.audio.ka=new Audio(kaAudioSrc);
    this.callBacks=this.functionsSet();
    this.callBacks.changeOpeningScreen();
    this.setEventListener();
  };

  functionsSet(){
    let functions={};
    
    functions.changeOpeningScreen=()=>{
      this.engine=new OpeningScreen(this.ctx, this.callBacks);
    };

    functions.changeStartScreen=()=>{
      this.engine=new StartScreen(this.ctx, this.callBacks);
    };
    
    functions.changeGame=(collectedScoreData)=>{
      this.engine=new Game(this.ctx, collectedScoreData, this.callBacks);
    };

    functions.changeResult=(engine, resultInfo)=>{
      this.engine=new Result(engine, resultInfo, this.callBacks);
    };

    return functions;
  };

  setEventListener(){

    window.addEventListener("keydown",(e)=>{

      this.ctx.c.requestFullscreen();

      if((e.key==="j" || e.key==="f") && isDonKaSound){
        this.audio.don.currentTime=0;
        this.audio.don.play();
      }else if((e.key==="k" || e.key==="d") && isDonKaSound){
        this.audio.ka.currentTime=0;
        this.audio.ka.play();
      }else if(e.key==="w"){
        if(isDonKaSound===true){isDonKaSound=false;}else{isDonKaSound=true;};
      }else if(e.key==="q"){
        location.reload();
      };

      this.engine.keydown(e);
    },false);

    window.addEventListener("keyup",(e)=>{
      this.engine.keyup(e);
    },false);
  };
};
