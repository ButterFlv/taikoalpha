"use strict";

const WIDTH=2560;           /*canvasのwidth(px)*/
const HEIGHT=1440;          /*canvasのheight(px)*/
const scrollConstant=1/165*WIDTH/1920;   /*ノーツの通常幅を設定する定数(1BPM,1HSでの見やすいノーツ幅)*/
const goodFrame=3;  /*良判定の前または後ろのみの判定フレーム */
const okFrame=6;    /*可           〃                     */
const badFrame=9;   /*不可         〃                     */
const frameOut=30;  /*画面の端より少しはみ出したところで描画する*/
const noteSize=200*WIDTH/1920;

const goodScore=2000;
const okScore=1000;
const rollScore=200;

const donOffset=0;
const kaOffset=0;
