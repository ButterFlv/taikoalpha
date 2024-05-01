"use strict";

class Game{
  constructor(_ctx, _data, _callBacks){
    this.ctx        = _ctx;         /*キャンバス情報*/
    this.data       = _data;        /*引数で渡されたデータ*/
    this.disjointed = undefined;    /*引数で渡された譜面データを文字ごとに変換*/
    this.disjointedDirection = undefined;   /*引数で渡された方向データを分解する*/
    this.notes      = [];           /*ノーツのオブジェクトをインスタンス化する配列*/
    this.callBacks  = _callBacks;   /*コールバック関数*/
    this.score      = 0;            /*スコア*/
    this.judgeResultNum = [];       /*処理時に不可判定よりも良・可判定を優先するために用いる配列*/

    /*連打のノーツを設定するときに一時的に設定するデータ*/
    this.rollTemporaryData=null;

    this.SEC={
      /*より広い分類でのカウンタ*/
      nomal:0,
      roll:0,

      /*細かくカウント*/
      smallDon:0,
      smallKa:0,
      bigDon:0,
      bigKa:0,
      smallRoll:0,
      bigRoll:0
    };

    /*大連打のノーツを設定するときに一時的に設定するデータ*/
    this.bigRollTemporaryData=null;

    /*風船のノーツを設定するときに一時的に設定するデータ*/
    this.balloonTemporaryData=null;

    /*ゴーゴの始まりと終わりに関する情報*/
    this.gogoChangeInfo=[];
    this.BPMReferNumber=0;
    this.scrollReferNumber=0;

    this.setFuncs();
    this.audioSet();
    this.disjointed=this.disjointData([...this.data.score]);            /*音価を含む・含まないを問わず一文字一文字をひとつの要素に分解する*/
    this.disjointedDirection=this.disjointData([...this.data.direction]);
    this.disjointedDirection=this.concatData(this.disjointedDirection);
    this.createNotes();
    if(!(this.rollTemporaryData===null && this.bigRollTemporaryData===null && this.balloonTemporaryData===null)){console.error("連打関連の処理に異常があります！！");};
    this.startPlay();
  };

  /*譜面データをノーツに変換するために分解する(方向データも分解する)*/
  disjointData(argData){
    const d=argData;
    const measure=d.length;
    let returnData=[];
    for(let i=0;i<measure;i++){
      const length=d[i].length;
      returnData.push([]);
      for(let j=0;j<length;j++){
        if(d[i].substr(j, 1)!==" "){
          returnData[i].push(d[i].substr(j, 1));
        };
      };
    };
    return returnData;
  };

  /*データを結合する*/
  concatData(data){
    let argData=data;
    let returnData=[];
    for(let i=0;i<argData.length;i++){
      returnData=returnData.concat(argData[i]);
    };
    return returnData;
  };

  /*譜面データからオブジェクトを生成*/
  createNotes(){    /*BeatPerMinutes*/  /*SecondPerMeasure*/
    const d=this.data;      /*曲と譜面データをコピー*/
    const s=this.disjointed;      /*譜面データ(一度変換)をコピー*/
    let directionCount={n:0};directionCount.add=()=>{directionCount.n++;};    /*n:曲データ内の"direction"の配列の何番目を参照するか,add関数=()=>nの値を1増加させる*/
    let nowTime=0;    /*ノーツのenterTimeの値、それぞれのノーツのオブジェクト作成後にそのノーツの長さ分プラスする*/
    for(let i=0;i<s.length;i++){
      const count=this.notesCount(s[i]);
      for(let j=0;j<s[i].length;j++){
        let now=this.getBPM_SPM_scroll(d);    /*現在のBPMとSPMとscrollの値を取得する*/
        const thisSpan=now.SPM/count;
        const obj={ BPM:now.BPM,scroll:now.scroll,
                    enterTime:nowTime,

                    /*下の行は要修正(一応解決)*/
                    direction:this.disjointedDirection[directionCount.n],

                    callBackFuncs:this.noteCallBack};  /*BPM, scroll, enterTime, direction, callBackFuncs*/

        /*
        if(!(s[i][j]===6)&&!(this.rollTemporaryData===null)){console.error("連打の始まりと終わりの間にノーツがあります。");};

        if(!(s[i][j]==="f")&&!(this.bigRollTemporaryData===null)){console.error("大連打の始まりと終わりの間にノーツがあります。");};

        if(!(s[i][j]===8)&&!(this.balloonTemporaryData===null)){console.error("風船連打の始まりと終わりの間にノーツがあります。");};
        */

        if(obj.direction===undefined){obj.direction="2";};

        const argObj=this.noteKindIndividual(s[i][j],obj);
        if(argObj!==null){
          if(argObj!=="blank"){directionCount.add();};

          this.produceNoteObj(s[i][j], argObj);
          nowTime+=thisSpan;
        };
      };
    };
  };

  /*BPM情報とscroll情報を渡し、BPMとSPM("SecondPerMinute"...一小節当たりの時間(ms))とscrollを格納したオブジェクトを返す*/
  getBPM_SPM_scroll(data){
    const r={ BPM:data.BPM[this.BPMReferNumber],
              SPM:(1000*60)/(data.BPM[this.BPMReferNumber]/4),
              scroll:data.scroll[this.scrollReferNumber]};
    return r;
  };

  /*ノーツの種類によって、ノーツのオブジェクトをpushするときの引数を設定する*/
  noteKindIndividual(elm,o){
    let returnArr;
    switch(elm){
      case "0":returnArr="blank";break;
      case "1":returnArr=o;break;/*BPM, scroll, enterTime, direction, callBackFuncs*/
      case "2":returnArr=o;break;
      case "3":returnArr=o;break;
      case "4":returnArr=o;break;
      case "5":returnArr=o;break;
      case "6":returnArr=o;break;
      case "e":returnArr=o;break;
      case "f":returnArr=o;break;
      case "7":returnArr=o;break;
      case "8":returnArr=o;break;

      /*  後で書く  */

      default:returnArr=null;break;
    };
    if(elm==="a" || elm==="A" || elm==="b" || elm==="B"){
      this.gogoChangeInfo.push(o.enterTime);
    }else if(elm==="c" || elm==="C"){
      this.BPMReferNumber++;
    }else if(elm==="d" || elm==="D"){
      this.scrollReferNumber++;
    };
    return returnArr;
  };

  /*ノートの配列にノーツのオブジェクトをpushする*/
  produceNoteObj(elm, obj){
    switch(elm){
      case "1":this.notes.push(new Don(obj));this.SEC.nomal++;this.SEC.smallDon++;break;
      case "2":this.notes.push(new Ka(obj));this.SEC.nomal++;this.SEC.smallKa++;break;
      case "3":this.notes.push(new BigDon(obj));this.SEC.nomal++;this.SEC.bigDon++;break;
      case "4":this.notes.push(new BigKa(obj));this.SEC.nomal++;this.SEC.bigKa++;break;
      case "5":this.rollTemporaryData={...obj};break;   /*メモisRollの状態を切り替えるコールバック関数を渡す*/
      case "6":
        if(!(this.rollTemporaryData===null)){
          this.notes.push(new Roll(this.ctx, this.rollTemporaryData, obj));
          this.SEC.roll++;this.SEC.smallRoll++;
          this.rollTemporaryData=null;
        }else{console.error("譜面データに、対応する連打の始めがありません！！");};
        break;
      case "e":this.bigRollTemporaryData={...obj};break;   /*メモisRollの状態を切り替えるコールバック関数を渡す*/
      case "f":
        if(!(this.bigRollTemporaryData===null)){
          this.notes.push(new BigRoll(this.ctx, this.bigRollTemporaryData, obj));
          this.SEC.roll++;this.SEC.bigRoll++;
          this.bigRollTemporaryData=null;
        }else{console.error("譜面データに、対応する大連打の始めがありません！！");};
        break;

      /*  後で書く  */

      default:break;
    };
  };

  /*audioデータのソースからセットする*/
  audioSet(){
    this.audio=new Audio();
    this.audio.src=this.data.audioSrc;
  };

  /*小節の中で音価を持つノーツの数を数える*/
  notesCount(arr){
    const d=arr.map(x=>x);
    let count=0;
    for(let i=0;i<d.length;i++){if(Util.range(d[i],0,8)){count++;};};
    return count;
  };

  /*プレイを開始する(Game2を宣言して必要な変数を渡す)*/
  startPlay(){
    /*譜面データ以外の引数*/
    const arg={
      data:this.data,
      ctx:this.ctx,
      audio:this.audio,
      callBacks:this.callBacks,
      gogoChange:this.gogoChangeInfo,
      scoreElementCount:this.SEC
    };

    /*譜面データの引数*/
    const notes=this.notes;
    const game2=new Game2(arg,notes);
    this.keydown=(e)=>{game2.keydown(e);};
    this.keyup=(e)=>{game2.keyup(e);};
  };


  /*ノーツのオブジェクトを宣言するときに渡す引数のコールバック関数のオブジェクトを返す*/
  setFuncs(){
    let _callBack=new Object();
    _callBack.addScore=(score)=>{this.score+=score;};
    _callBack.getJudgeResultNum=(arr)=>{this.judgeResultNum.push(arr);};
    this.noteCallBack=_callBack;
    return;
  };
};



/*
Game1の為の便利な関数をまとめる専用クラス(static関数で表現する)
基本的な処理以外の細かな処理はGame1クラス内に記述すると煩雑になり、分りにくいのでこちらに記述する。
*/
class Util_Game1{
  construcor(){};
};
