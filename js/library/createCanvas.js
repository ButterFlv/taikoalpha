"use strict";

class CreateCanvas{
  constructor(width, height, append=true){
    this.c=document.createElement("canvas");
    this.g=this.c.getContext("2d");
    this.c.width=width;
    this.c.height=height;
    this.translateX=0;
    this.translateY=0;
    if(append===true){
      document.body.appendChild(this.c);
    };
    /*様々な場面で使うかもしれないので仮想画面を設置しておきます。主にfade系*/
    this.vc=document.createElement("canvas");
    this.vg=this.vc.getContext("2d");
    this.vc.width=this.c.width;
    this.vc.height=this.c.height;
  };
  drawSquare(x, y, width, height, color, rad=0){
    if(!(color===undefined)){this.g.fillStyle=color;};
    this.g.translate((x+width/2), (y+height/2));
    this.g.rotate(rad);
    this.g.translate(-(x+width/2), -(y+height/2));
    this.g.fillRect(x, y, width, height);
    this.g.translate((x+width/2), (y+height/2));
    this.g.rotate(-rad);
    this.g.translate(-(x+width/2), -(y+height/2));
  };
  drawSquareFrame(x, y, width, height, color, bold=10, rad=0){
    if(!(color===undefined)){this.g.strokeStyle=color;};
    this.g.translate((x+width/2), (y+height/2));
    this.g.rotate(rad);
    this.g.translate(-(x+width/2), -(y+height/2));
    this.g.lineWidth=bold;
    this.g.beginPath();
    this.g.moveTo(x, y);
    this.g.lineTo(x+width, y);
    this.g.lineTo(x+width, y+height);
    this.g.lineTo(x, y+height);
    this.g.closePath();
    this.g.stroke();
    this.g.translate((x+width/2), (y+height/2));
    this.g.rotate(-rad);
    this.g.translate(-(x+width/2), -(y+height/2));
  };
  drawSquarePoint(x, y, width, height, color, rad=0){
    if(!(color===undefined)){this.g.fillStyle=color;};
    this.g.translate((x+width/2), (y+height/2));
    this.g.rotate(rad);
    this.g.translate(-(x+width/2), -(y+height/2));
    this.g.fillRect(x-width/2, y-height/2, width, height);
    this.g.translate((x+width/2), (y+height/2));
    this.g.rotate(-rad);
    this.g.translate(-(x+width/2), -(y+height/2));
  };
  drawSquarePointFrame(x, y, width, height, color, bold=10, rad=0){
    if(!(color===undefined)){this.g.strokeStyle=color;};
    this.g.translate((x+width/2), (y+height/2));
    this.g.rotate(rad);
    this.g.translate(-(x+width/2), -(y+height/2));
    this.g.lineWidth=bold;
    this.g.beginPath();
    this.g.moveTo(x-width/2, y-height/2);
    this.g.lineTo(x+width/2, y-height/2);
    this.g.lineTo(x+width/2, y+height/2);
    this.g.lineTo(x-width/2, y+height/2);
    this.g.closePath();
    this.g.stroke();
    this.g.translate((x+width/2), (y+height/2));
    this.g.rotate(-rad);
    this.g.translate(-(x+width/2), -(y+height/2));
  };
  drawCircle(x, y, sz, color){
    if(!(color===undefined)){this.g.fillStyle=color;};
    this.g.beginPath();
    this.g.arc(x, y, sz, 0, Math.PI*2, false);
    this.g.closePath();
    this.g.fill();
  };
  drawCircleFrame(x, y, sz, color, bold=10){
    if(!(color===undefined)){this.g.strokeStyle=color;};
    this.g.lineWidth=bold;
    this.g.beginPath();
    this.g.arc(x, y, sz, 0, Math.PI*2, false);
    this.g.closePath();
    this.g.stroke();
  };
  drawBitSquare(data, x, y, width, height, rad=0){
    let check=0;
    for(let i=0;i<data.length-1;i++){
      if(data[i].length===data[i+1].length){
        check++;
      };
    };
    if(!(check===data.length-1)){
      console.log("それぞれの行のビット数が不一致です！");
      return;
    }else{
      this.g.translate((x+width/2), (y+height/2));
      this.g.rotate(rad);
      this.g.translate(-(x+width/2), -(y+height/2));
      const heightRate=height/data.length;
      const widthRate=width/data[0].length;
      for(let cy=0;cy<data.length;cy++){
        for(let cx=0;cx<data[0].length;cx++){
          if(data[cy][cx]==0){
            this.g.fillStyle="rgba(0, 0, 0, 0)";
          }else{
            this.g.fillStyle=data[cy][cx];
          };
          this.g.fillRect(x+cx*widthRate, y+cy*heightRate, widthRate, heightRate);
        };
      };
      this.g.translate((x+width/2), (y+height/2));
      this.g.rotate(-rad);
      this.g.translate(-(x+width/2), -(y+height/2));
    };
  };
  drawBitSquare2(data, x, y, width, height, bitWidth, bitHeight, rad=0){
    if(data.length%bitWidth===0 && data.length%bitHeight===0){
      this.g.translate((x+width/2), (y+height/2));
      this.g.rotate(rad);
      this.g.translate(-(x+width/2), -(y+height/2));
      const widthRate=width/bitWidth;
      const heightRate=height/bitHeight;
      for(let i=0;i<bitHeight;i++){
        for(let j=0;j<bitWidth;j++){
          if(data[i*bitWidth+j]===0){
            this.g.fillStyle="rgba(0, 0, 0, 0)";
            this.g.fillRect(x+j*widthRate, y+i*heightRate, widthRate, heightRate);
          }else{
            this.g.fillStyle=data[i*bitWidth+j];
            this.g.fillRect(x+j*widthRate, y+i*heightRate, widthRate, heightRate);
          };
        };
      };
      this.g.translate((x+width/2), (y+height/2));
      this.g.rotate(-rad);
      this.g.translate(-(x+width/2), -(y+height/2));
    }else{
      console.log("dataに異常があります！");
      return;
    };
  };
  fillAll(color){
    if(!(color===undefined)){this.g.fillStyle=color;};
    this.g.fillRect(-this.translateX, -this.translateY, this.c.width, this.c.height);
  };
  drawPath(data, color, bold=10, line=true){
    if(!(color===undefined)&&line===true){this.g.strokeStyle=color;};
    if(!(color===undefined)&&!(line===false)){this.g.fillStyle=color;};
    this.g.lineWidth=bold;
    this.g.beginPath();
    this.g.moveTo(data[0][0], data[0][1]);
    for(let i=1;i<data.length;i++){
      this.g.lineTo(data[i][0], data[i][1]);
    };
    if(line===true){
      this.g.stroke();
    }else{
      this.g.closePath();
      this.g.fill();
    };
  };
  drawText(data, x, y, width, margine=50, font="50px arial", color,
            textAlign="center", textBaseLine="middle",  divide=false, rad=0){
    this.g.textAlign="center";
    this.g.textBaseLine=textBaseLine;
    if(!(color===undefined)){this.g.fillStyle=color;};
    this.g.font=font;
    if(data===""||data===undefined||data===[]||data===NaN||data===null){
      console.log("テキストデータに異常があります！");
      return;
    }else{
      let textDrawingData=[[]];
      let count=0;
      for(let i=0;i<data.length;i++){
        if(data[i]==="\br"){
          textDrawingData.push([]);
          count++;
        }else{
          textDrawingData[count].push(data[i]);
        };
      };
      for(let i=0;i<textDrawingData.length;i++){
        let widMargine;
        if(textDrawingData[i].length-1===0){
          if(textAlign==="center"){
            widMargine=width*1/2;
          }else if(textAlign==="right"){
            widMargine=width*1;
          }else if(textAlign==="left"){
            widMargine=width*0;
          }else{
            console.log("textAlignに異常があります！");
            return;
          };
        }else{
          widMargine=width/(textDrawingData[i].length-1);
        };
        if(divide===true){
          for(let j=0;j<textDrawingData[i].length;j++){
            let drawX=0;
            let drawY=0;
            if(textDrawingData[i].length===1){j=1;};
            if(textAlign==="center"){
              drawX=x+widMargine*j-width/2;
              drawY=y-margine*(textDrawingData.length-1)/2+margine*i;
            }else if(textAlign==="right"){
              drawX=x+widMargine*j-width;
              drawY=y-margine*(textDrawingData.length-1)/2+margine*i;
            }else if(textAlign==="left"){
              drawX=x+widMargine*j;
              drawY=y-margine*(textDrawingData.length-1)/2+margine*i;
            }else{
              console.log("テキストデータのtextAlignに異常があります！");
              return;
            };
            if(textDrawingData[i].length===1){j=0;};
            this.g.translate(drawX, drawY);
            this.g.rotate(rad);
            this.g.translate(-drawX, -drawY);
            this.g.fillText(textDrawingData[i][j], drawX, drawY);
            this.g.translate(drawX, drawY);
            this.g.rotate(-rad);
            this.g.translate(-drawX, -drawY);
          };
        }else{
          let shiftX=0;
          let shiftY=0;
          if(textAlign==="center"){
            shiftX=x;
            shiftY=y;
          }else if(textAlign==="right"){
            shiftX=x-width/2;
            shiftY=y;
          }else if(textAlign==="left"){
            shiftX=x+width/2;
            shiftY=y;
          }else{
            console.log("テキストデータのtextAlignに異常があります！");
            return;
          };
          this.g.translate(shiftX, shiftY);
          this.g.rotate(rad);
          this.g.translate(-shiftX, -shiftY);
          for(let j=0;j<textDrawingData[i].length;j++){
            let drawX=0;
            let drawY=0;
            if(textDrawingData[i].length===1){j=1;};
            if(textAlign==="center"){
              drawX=x+widMargine*j-width/2;
              drawY=y-margine*(textDrawingData.length-1)/2+margine*i;
            }else if(textAlign==="right"){
              drawX=x+widMargine*j-width;
              drawY=y-margine*(textDrawingData.length-1)/2+margine*i;
            }else if(textAlign==="left"){
              drawX=x+widMargine*j;
              drawY=y-margine*(textDrawingData.length-1)/2+margine*i;
            }else{
              console.log("テキストデータのtextAlignに異常があります！");
              return;
            };
            if(textDrawingData[i].length===1){j=0;};
            this.g.fillText(textDrawingData[i][j], drawX, drawY);
          };
          this.g.translate(shiftX, shiftY);
          this.g.rotate(-rad);
          this.g.translate(-shiftX, -shiftY);
        };
      };
    };
  };
  mTranslate(x=0, y=0){
    this.translateX+=x;
    this.translateY+=y;
    this.g.translate(x, y);
  };
  compileImageData(data, width, height){
    const imgData=this.g.createImageData(width, height);
    const tentData=imgData.data;
    const length=tentData.length;
    for(let i=0;i<length;i++){
      tentData[i]=data[i];
    };
    return imgData;
  };
  fadeIn(color, time, fps, callBack){
    const r=this.hexToRgb(color)[0];
    const g=this.hexToRgb(color)[1];
    const b=this.hexToRgb(color)[2];
    let alpha=1;
    let useColor="rgba("+r+","+g+","+b+","+alpha+")";
    this.realToVirtual();
    this.fillAll(useColor);
    const times=Math.floor((time/1000)*(1000/fps));
    const decA=1/times;
    const loop=()=>{
      alpha=Math.max(0, alpha-decA);
      useColor="rgba("+r+","+g+","+b+","+alpha+")";
      this.virtualToReal();
      this.fillAll(useColor);
      if(alpha>0){setTimeout(()=>{loop();}, fps);}else{callBack();return;};
    };
    loop();
  };
  fadeOut(color, time, fps, callBack){
    const r=this.hexToRgb(color)[0];
    const g=this.hexToRgb(color)[1];
    const b=this.hexToRgb(color)[2];
    let alpha=0;
    let useColor="rgba("+r+","+g+","+b+","+alpha+")";
    this.realToVirtual();
    this.fillAll(useColor);
    const times=Math.floor((time/1000)*(1000/fps));
    const incA=1/times;
    const loop=()=>{
      alpha=Math.min(1, alpha-(-incA));
      useColor="rgba("+r+","+g+","+b+","+alpha+")";
      this.virtualToReal();
      this.fillAll(useColor);
      if(alpha<1){setTimeout(()=>{loop();}, fps);}else{callBack();return;};
    };
    loop();
  };
  hexToRgb(_hex){
    this.vg.fillStyle=_hex;
    let hex=this.vg.fillStyle;
    if(hex.slice(0, 1)==="#"){hex=hex.slice(1);};
    if(hex.length===3){hex=hex.slice(0,1)+hex.slice(0,1)+hex.slice(1,2)+hex.slice(1,2)+hex.slice(2,3)+hex.slice(2,3);};
    return [hex.slice(0,2), hex.slice(2,4), hex.slice(4,6)].map(
      (str)=>{
        return parseInt(str, 16);
      }
    );
  };
  rgbToHex(_rgb){
    this.vg.fillStyle=_rgb;
    const hex=this.vg.fillStyle;
    return hex;
  };
  realToVirtual(){
    this.vc.width=this.c.width;
    this.vc.height=this.c.height;
    this.vg.drawImage(this.c, 0, 0, this.c.width, this.c.height,
                        0, 0, this.vc.width, this.vc.height);
  };
  virtualToReal(){
    this.g.drawImage(this.vc, 0, 0, this.vc.width, this.vc.height,
                        0, 0, this.c.width, this.c.height);
  };
};
