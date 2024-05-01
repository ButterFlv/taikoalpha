"use strict";

const fps=60;       /*一秒間(1000ms)のframe数*/
const spf=1000/60;  /*1frameあたりの時間(ms)*/
let data=[];        /*譜面データの配列*/
let key=null;
let isDonKaSound=false;      /*ドンとカの音を鳴らすかどうか*/

let donAudioSrc="snd/don.wav";
let kaAudioSrc="snd/ka.wav";
let fullComboAudioSrc="snd/fullcombo.wav";

let imageList={};

const setImageList=()=>{
imageList.bg_clear=new Image();
imageList.bg_clear.src="img/bg_clear.png";

imageList.combonumber=new Image();
imageList.combonumber.src="img/combonumber.png";

imageList.combonumber_l=new Image();
imageList.combonumber_l.src="img/combonumber_l.png";

imageList.explosion_lower=new Image();
imageList.explosion_lower.src="img/explosion_lower.png";

imageList.explosion_upper=new Image();
imageList.explosion_upper.src="img/explosion_upper.png";

imageList.explosion_soul=new Image();
imageList.explosion_soul.src="img/explosion_soul.png";

imageList.soul=new Image();
imageList.soul.src="img/soul.png";

imageList.judgement=new Image();
imageList.judgement.src="img/judgement.png";

imageList.rollballoon=new Image();
imageList.rollballoon.src="img/rollballoon.png";

imageList.font_L=new Image();
imageList.font_L.src="img/font_L.png";

imageList.notes=new Image();
imageList.notes.src="img/notes.png";

imageList.fire=new Image();
imageList.fire.src="img/fire.png";
};