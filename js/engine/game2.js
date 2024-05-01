"use strict";

/*
Gameクラスが大きくなってしまったのでこちらに記述。
Gameクラスの必要な情報を引数で渡す。
*/
class Game2{
  constructor(arg, notes){

    this.arg=arg;

    /*プレイ中に必要なデータを格納するオブジェクト*/
    this.playData={
      BPM:arg.data.BPM[0],
      scroll:arg.data.scroll[0],
      combo:0,
      maxCombo:0,
      score:0,
      NumberOfRoll:0,
      NumberOfGood:0,
      NumberOfOk:0,
      NumberOfBad:0,
      isGogo:false,
      isRoll:false,
      isLoop:false,
      temporaryData:{}
    };

    /*押されたキーの名前のプロパティをtrueにする*/
    /*this.key=[];*/

    /*キーの入力受付をキーの名前のプロパティのtrue or falseで表現*/
    this.keyCan={};

    /*入力の内容*/
    this.command=null;

    /*プレイ中に必要なHTML(JavaScript?)の要素*/
    this.playElement={
      ctx:arg.ctx,
      audio:arg.audio,
      fullcombo:new Audio(fullComboAudioSrc)
    };

    this.change={
      gogo:arg.gogoChange
    };

    /*受け取ったノーツ*/
    this.notes=notes;

    /*エフェクトの配列*/
    this.effects=[];

    /*Game2クラスでやることがすべて終わったらコールバック関数でProgram関数の処理に戻る*/
    this.allEndCallBack=arg.endCallBack;

    /*(そのフレームで)どのような判定が出力されたかを格納する配列
    (あとで関数内で"const"で定義するのでこの行は削除する)*/
    this.thisFrameJudgeResult=[];

    /*setFunctionsで作ったコールバック関数をノーツの関数に置き換える*/
    this.replaceNotesFunctions();

    /*それぞれのデータにidを付与*/
    this.addId();

    /*演奏を開始する*/
    this.start();
  };

  /*ノーツのcallBack関数を置き換える関数を定義し、オブジェクトにする関数*/
  setFunctions(){
    let functions={};

    functions.addScore=(point)=>{
      this.playData.score+=point;
    };

    functions.addCombo=()=>{
      this.playData.combo++;
    };

    functions.getEngine=()=>{
      return this;
    };

    functions.getJudgeResultNum=(id, result)=>{
      this.playData.temporaryData.judgeResultList.push([id, result]);
    };

    /*  後で書く  */

    return functions;
  };

  /*setFunctionsで作ったコールバック関数をノーツの関数に置き換える関数*/
  replaceNotesFunctions(){
    const functions={...this.setFunctions()};

    for(let i=0;i<this.notes.length;i++){
      this.notes[i].callBackFuncs=functions;
    };
  };

  addId(){
    for(let i=0;i<this.notes.length;i++){
      this.notes[i].id=i;
    };
  };

  /*演奏を開始する*/
  start(){
    this.playData.isLoop=true;
    let count=0;
    let startTime=0;
    const n=this.notes;
    const eff=this.effects;

    this.loop=()=>{

      const currentTime=performance.now();

      count=(currentTime-startTime)/spf;

      /*現在ロールかどうかを判定する。*/
      this.judgeRoll(count);

      /**/
      Util_Game2.updateBackGround(this, count);
      Util_Game2.alertLettersDraw(count);
      Util_Game2.gogo_BPM_scroll_change(this, count);
      Util_Game2.judgeFrameOut(this, count);
      Util_Game2.keyUpdate(this, n, count);
      Util_Game2.updateNotes(this, n, count);
      Util_Game2.updateEffects(this, eff, count);

      Util_Game2_draw.comboNum(this);
      Util_Game2_draw.scoreNum(this);

      /*最高コンボの情報を更新する*/
      this.playData.maxCombo=Math.max(this.playData.combo, this.playData.maxCombo);

      if(Util_Game2.resultCheck(this, count)){
        this.playData.isLoop=false;
      };

      this.command=null;

      count++;
      if(this.playData.isLoop){
        requestAnimationFrame(this.loop);
      }else{
        this.goResult();
      };
    };

    setTimeout(()=>{
      Util_Game2.updateBackGround(this, 0);
      Util_Game2.alertLettersDraw(0);
      Util_Game2_draw.comboNum(this);
      Util_Game2_draw.scoreNum(this);
    }, spf*3);

    setTimeout(()=>{startTime=performance.now();this.loop();},this.arg.data.offset);

    setTimeout(()=>{this.playElement.audio.play();},this.arg.data.songOffset);
  };

  keydown(e){
    if(this.keyCan[e.key]===true || this.keyCan[e.key]===undefined){
      this.keyCan[e.key]=false;
      /*this.key.push(e.key);*/
      if(e.key==="j" || e.key==="f"){
        this.command="don";
      }else if(e.key==="k" || e.key==="d"){
        this.command="ka";
      };
    };
  };

  keyup(e){
    this.keyCan[e.key]=true;
  };

  judgeRoll(count){
    this.playData.isRoll=false;
    for(let i=0;i<this.notes.length;i++){
      if(this.notes[i].type==="smallRoll"){
        if(Util.range(count,this.notes[i].before.enterTime/spf,this.notes[i].after.enterTime/spf)){
          this.playData.isRoll="smallRoll";
          return;
        };
      }else if(this.notes[i].type==="bigRoll"){
        if(Util.range(count,this.notes[i].before.enterTime,this.notes[i].after.enterTime)){
          this.playData.isRoll="bigRoll";
          return;
        };
      };
    };
  };

  goResult(){

    /*もしフルコンボであれば、フルコンボの音声を流す*/
    if(this.playData.maxCombo===this.arg.scoreElementCount.nomal){
      this.playElement.fullcombo.currentTime=0;
      this.playElement.fullcombo.play();
    };

    const resultInfo={
      good: this.playData.NumberOfGood,
      ok:   this.playData.NumberOfOk,
      bad:  this.arg.scoreElementCount.nomal - ( this.playData.NumberOfGood + this.playData.NumberOfOk ),

      maxCombo:this.playData.maxCombo,
      roll:this.playData.NumberOfRoll,

      score:this.playData.score
      
      /*後で書く*/
    };

    this.playElement.audio.pause();
    this.playElement.audio.currentTime=0;

    this.arg.callBacks.changeResult(this, resultInfo);
  };
};
