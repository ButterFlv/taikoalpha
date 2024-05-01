"use strict";

class Util_Game2_draw{
  constructor(){};
  
  static comboNum(engine){
    const ctx=sprite.backGround.ctx;

    /*コンボ数を表示するときの画像(群)の中心座標と画像サイズの設定*/
    const layout={
      centerX:      960   *(WIDTH/1920),
      centerY:      270   *(HEIGHT/1080),
      imageScale:   1.5   *(WIDTH/1920),
      imageMargine: 80    *(WIDTH/1920),
      imageAlpha:   0.5
    };

    /*コンボ数が10未満であれば描画しないようにする*/
    if(engine.playData.combo<10){return;};

    /*数字の各桁を配列に分割する*/
    let numberArray=[];
    const stringCombo=String(engine.playData.combo);
    for(let i=0;i<stringCombo.length;i++){
      numberArray.push(Number(stringCombo.substr(i, 1)));
    };

    /*それぞれの画像の座標を計算する*/
    let numberPointArray=[];
    const allWidth = layout.imageMargine * (numberArray.length - 1);
    for(let i=0;i<numberArray.length;i++){
      numberPointArray.push(layout.centerX - allWidth/2 + layout.imageMargine*i);
    };

    ctx.g.globalAlpha = layout.imageAlpha;

    /*それぞれの数字を描画する*/
    for(let i=0;i<numberArray.length;i++){
      sprite.combof[numberArray[i]].drawCenter(
        numberPointArray[i], layout.centerY,
        sprite.combof[numberArray[i]].usePicture.sw * layout.imageScale,
        sprite.combof[numberArray[i]].usePicture.sh * layout.imageScale
      );
    };
    
    ctx.g.globalAlpha = 1;
  };



  static scoreNum(engine, count){
    const ctx=sprite.backGround.ctx;

    /*スコアを表示するときの画像(群)の中心座標と画像サイズの設定*/
    const layout={
      centerX:      960   *(WIDTH/1920),
      centerY:      800   *(HEIGHT/1080),
      imageScale:   0.75  *(WIDTH/1920),
      imageMargine: 33    *(WIDTH/1920),
      imageAlpha:   0.5
    };

    /*数字の各桁を配列に分割する*/
    let numberArray=[];
    const stringScore=String(engine.playData.score);
    for(let i=0;i<stringScore.length;i++){
      numberArray.push(Number(stringScore.substr(i, 1)));
    };

    /*それぞれの画像の座標を計算する*/
    let numberPointArray=[];
    const allWidth = layout.imageMargine * (numberArray.length - 1);
    for(let i=0;i<numberArray.length;i++){
      numberPointArray.push(layout.centerX - allWidth/2 + layout.imageMargine*i);
    };

    ctx.g.globalAlpha = layout.imageAlpha;

    /*それぞれの数字を描画する*/
    for(let i=0;i<numberArray.length;i++){
      sprite.font[numberArray[i]].drawCenter(
        numberPointArray[i], layout.centerY,
        sprite.font[numberArray[i]].usePicture.sw * layout.imageScale,
        sprite.font[numberArray[i]].usePicture.sh * layout.imageScale
      );
    };
    
    ctx.g.globalAlpha = 1;
  };
};