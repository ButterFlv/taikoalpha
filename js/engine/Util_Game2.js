"use stritct";

/*
Game2の為の便利な関数をまとめる専用クラス(static関数で表現する)
基本的な処理以外の細かな処理はGame2クラス内に記述すると煩雑になり、分りにくいのでこちらに記述する。
*/
class Util_Game2{
  construcor(){};

  static updateBackGround(engine,count){
    sprite.backGround.drawCenter(WIDTH/2,HEIGHT/2,WIDTH,HEIGHT);
    if(engine.playData.isGogo===true){

      /*ゴーゴータイムの判定枠の大きさを調整する定数*/
      const rate=3;

      const a=Math.floor(count)%8;
      sprite.gogoJudgeFrame[a].drawCenter(WIDTH/2,HEIGHT/2,noteSize*rate,noteSize*rate);
    }else{sprite.judgeFrame.drawCenter(WIDTH/2,HEIGHT/2,noteSize,noteSize);};
  };

  static gogo_BPM_scroll_change(engine, count){
    for(let i=0;i<engine.change.gogo.length-1;i++){
      if(Util.range(count*spf, engine.change.gogo[i], engine.change.gogo[i+1])){
        if(i%2===0){engine.playData.isGogo=true;}
        else{engine.playData.isGogo=false;};
        break;
      };
    };

    if(count*spf>=engine.change.gogo[engine.change.gogo.length-1]){
      if((engine.change.gogo.length-1)%2===0){
        engine.playData.isGogo=true;
      }else{engine.playData.isGogo=false;};
    };
  };

  static keyUpdate(engine,n,count){
    const c=engine.command;
    engine.playData.temporaryData.judgeResultList=[];
    if(c!==null){
      if(engine.playData.isRoll===false){
        /*ドンとカについて分ける*/
        if(c==="don"){
          for(let i=0;i<n.length;i++){if(n[i].type==="smallDon" || n[i].type==="bigDon"){
            if(n[i].kill!==true){n[i].judge(count);};
          };};
        }else if(c==="ka"){
          for(let i=0;i<n.length;i++){if(n[i].type==="smallKa" || n[i].type==="bigKa"){
            if(n[i].kill!==true){n[i].judge(count);};
          };};
        };

        /*
        engine.playData.temporaryData.judgeResultListの判定の内容によって処理を分ける。
        1. 中身が全て"bad"の場合
        2. 中身に"good"か"ok"が含まれている場合
        3. 中身が空の場合

        1...最も判定タイミングの早いノーツを"bad"判定とする
        2...最も判定タイミングの早いノーツを"good"または"ok"判定とする
        3...処理はなし
        */
        if(engine.playData.temporaryData.judgeResultList.length>0){
          let indexGood = engine.playData.temporaryData.judgeResultList.find(elm=>elm[1]==="good");
          let indexOk   = engine.playData.temporaryData.judgeResultList.find(elm=>elm[1]==="ok");
          if(!(indexGood===undefined && indexOk===undefined)){
            if(indexGood===undefined){indexGood=[Infinity];};
            if(indexOk===undefined){indexOk=[Infinity];};
            const id=Math.min(indexGood[0], indexOk[0]);
            engine.notes[id].kill=true;

            /*エフェクトのタイプを*/
            let effectType={size:null,sort:null};

            /*effectType.sizeの値を設定*/
            if(engine.notes[id].type==="smallDon" || engine.notes[id].type==="smallKa"){
              effectType.size="small";
            }else{effectType.size="big";};

            /*effectType.sortの値を設定*/
            for(let i=0;i<engine.playData.temporaryData.judgeResultList.length;i++){
              if(engine.playData.temporaryData.judgeResultList[i][0]===id){
                effectType.sort=engine.playData.temporaryData.judgeResultList[i][1];
                break;
              };
            };

            if(effectType.sort==="good"){
              engine.playData.NumberOfGood++;
              engine.playData.score+=goodScore;
            }else if(effectType.sort==="ok"){
              engine.playData.NumberOfOk++;
              engine.playData.score+=okScore;
            };

            engine.playData.combo++;

            engine.effects.push(new Effect(effectType.size, effectType.sort));
          }else{
            n[engine.playData.temporaryData.judgeResultList[0][0]].kill=true;
            engine.playData.combo=0;
            engine.effects.push(new Effect("small", "bad"));
          };
        };
      }else{
        let effectSize;

        if(engine.playData.isRoll==="smallRoll"){
          effectSize="small";
        }else{
          effectSize="big";
        };

        engine.playData.NumberOfRoll++;

        engine.playData.score+=rollScore;

        engine.effects.push(new Effect(effectSize, "good"));
      };
    };
    engine.command=null;
  };

  static updateNotes(engine,n,count){
    for(let i=n.length-1;i>=0;i--){
      if(n[i].isUse(count) && !(n[i].kill)){
        n[i].setPoint(count);
        n[i].draw(count, engine.playData.BPM, engine.playData.combo);
      };
    };
  };

  static updateEffects(engine, eff, count){
    for(let i=0;i<eff.length;i++){
      eff[i].draw();
      if(eff[i].kill){
        eff.splice(i,1);
      };
    };
  };

  static resultCheck(engine, count){
    const n=engine.notes;
    const last=n[n.length-1];
    if(last.type==="smallDon"||last.type==="smallKa"||last.type==="bigDon"||last.type==="bigKa"){
      if(count*spf>=last.enterTime+3000){
        return true;
      };
      return false;
    }else if(last.type==="smallRoll"||last.type==="bigRoll"){
      if(count*spf>=last.after.enterTime+3000){
        return true;
      };
      return false;
    };
    console.error("notesオブジェクトの最後の要素に異常があります。");
    return null;
  };

  static judgeFrameOut(engine, count){
    const n=engine.notes;

    /*ノーツが判定を通り越してbadになっているかどうかを判定する*/
    for(let i=0;i<n.length;i++){
      if(n[i].type==="smallDon" || n[i].type==="smallKa" || n[i].type==="bigDon" || n[i].type==="bigKa"){
        if(n[i].kill!==true && n[i].isJudgeFrameOut===false && n[i].judgeFrame[4]<=count){
          engine.playData.combo=0;
          n[i].isJudgeFrameOut=true;
        };
      };
    };
  };

  static alertLettersDraw(count){
    const ctx=sprite.backGround.ctx;
    const c=ctx.c;
    const g=ctx.g;

    const layout={
      x:10*WIDTH/1920,
      y:10*HEIGHT/1080,
      font:30*WIDTH/1920 + "px arial",
      color:"#000000",

      /*初期値は1*/
      alpha:1,

      /*完全に消去するフレーム*/
      endCount:120,
    };

    /*alphaの値を設定*/
    layout.alpha=Math.max(-(1/120)*count+1, 0);

    g.globalAlpha=layout.alpha;
    g.fillStyle=layout.color;
    g.font=layout.font;
    g.textAlign="left";
    g.textBaseline="top";
    g.fillText("W : ドンとカの音をオンにする　←　音ズレが発生しやすいので非推奨",
              layout.x, layout.y);
    g.globalAlpha=1;
  };
};
