"use strict";

const load=()=>{
  const ctx=new CreateCanvas(WIDTH, HEIGHT);
  ctx.fillAll("rgb(0, 0, 0)");
  Sprite.set(ctx);
  objectElmentAllLoaded(imageList,()=>{
    spriteAllDraw(ctx);
    const main=new Program(ctx);
  });
};

const objectElmentAllLoaded=(object, callBack)=>{
  const key=Object.keys(object);
  let count=0;
  for(let i=0;i<key.length;i++){
    object[key[i]].onload=()=>{
      count++;
      if(count>=key.length){
        callBack();
        return;
      };
    };
  };
};

const arrayElmentAllLoaded=(array, callBack)=>{
  let count=0;
  for(let i=0;i<array.length;i++){
    array[i].onload=()=>{
      console.log("audio");
      count++;
      if(count>=array.length){
        callBack();
        return;
      };
    };
  };
};

const spriteAllDraw=(_ctx)=>{
  const key=Object.keys(sprite);
  for(let i=0;i<key.length;i++){
    if(Array.isArray(sprite[key[i]])){
      for(let j=0;j<sprite[key[i]].length;j++){
        sprite[key[i]][j].drawCenter(WIDTH/2,HEIGHT/2,noteSize,noteSize);
      };
    }else{
      sprite[key[i]].drawCenter(WIDTH/2,HEIGHT/2,noteSize,noteSize);
    };
  };
  _ctx.fillAll("rgb(0, 0, 0)");
};

window.addEventListener("load", ()=>{load();}, false);
