window.onload=function(){
	init();
	loop();
}

function g(id){										//定义通用函数
	if(id.substr(0,1)=="."){
		return document.getElementsByClassName(id.substr(1));	
	}
	return document.getElementById(id);
}

var myimg=new Image();										//初始化一张图片，将其传给background.js中的getBackground()方法

var ctx1;													
var ctx2;

var canW=g("canvas1").width;
var canH=g("canvas1").height;



var myAne;													//实例化海藻

var myfruit;												//实例化水果

var mymom;													//实例化鱼妈妈

var mybaby;													//实例化小鱼

var myData;													//实例化果实计数，归零以及是否是蓝色等数据函数

var smTail=[];												//定义小鱼尾巴的数组，将7张鱼尾巴图片放入该数组中
var smEye=[];												//定义小鱼眼睛数组，将2张鱼尾巴图片放入该数组中
var smBody=[];												//定义小鱼身体数组，将19张鱼尾巴图片放入该数组中

var bgTail=[];												//定义大鱼尾巴的数组，将7张鱼尾巴图片放入该数组中
var bgEye=[];												//定义大鱼眼睛数组，将2张鱼尾巴图片放入该数组中
var bgBodyBlue=[];											//定义大鱼蓝色身体数组，将8张鱼尾巴图片放入该数组中
var bgBodyOrange=[];										//定义大鱼橙色身体数组，将8张鱼尾巴图片放入该数组中

var mywave;													//初始化大鱼吃果实的圈圈

var mywaveFishtoFish										//初始化大鱼碰小鱼的圈圈

var myDust;													//初始化漂浮物
var dustPic=[];

function init(){											//初始化
	ctx1=g("canvas1").getContext("2d");						//获取canvas的画布
	ctx2=g("canvas2").getContext("2d");
	myimg.src="img/background.jpg";
	
	document.addEventListener("mousemove",onmousemove,false);
	
	myAne=new ane();									//实例化海藻
	myAne.initPos();
	

	myfruit=new fruit();							//实例化果实
	myfruit.init();
	
	mymom=new mom();								//实例化大鱼
	mymom.init();
	
	mybaby=new smFish();							//实例化小鱼
	mybaby.init();
	
	myData=new scoreData();
	
	mywave=new waveObj();							//实例化大鱼吃果实的圈圈
	mywave.init();
	
	mywaveFishtoFish=new waveFishtoFish();			//实例化大鱼碰小鱼的圈圈
	mywaveFishtoFish.init();
	
	myDust=new dustObj();							//实例化漂浮物
	myDust.init();
	
	
	mx=canW*0.5;									//初始化鼠标在画布的中心位置
	my=canH*0.5;
	
	for(var i=0;i<8;i++){							//初始化，将7张小鱼尾巴图片放入smTail数组中去
		smTail[i]=new Image();
		smTail[i].src="img/babyTail"+i+".png";
	}
	for(var i=0;i<2;i++){							//初始化，将2张小鱼眼睛图片放入smEye数组中去
		smEye[i]=new Image();
		smEye[i].src="img/babyEye"+i+".png";
	}
	for(var i=0;i<20;i++){							//初始化，将2张小鱼身体图片放入smEye数组中去
		smBody[i]=new Image();
		smBody[i].src="img/babyFade"+i+".png";
	}
	
	for(var i=0;i<8;i++){							//初始化，将7张大鱼尾巴图片放入smTail数组中去
		bgTail[i]=new Image();
		bgTail[i].src="img/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++){							//初始化，将2张大鱼眼睛图片放入smEye数组中去
		bgEye[i]=new Image();
		bgEye[i].src="img/bigEye"+i+".png";
	}
	
	for(var i=0;i<8;i++){							//初始化，将8张大鱼身体图片（蓝色和黄色）放入smEye数组中去
		bgBodyBlue[i]=new Image();
		bgBodyOrange[i]=new Image();
		
		bgBodyOrange[i].src="img/bigSwim"+i+".png";
		bgBodyBlue[i].src="img/bigSwimBlue"+i+".png";

	}
	
	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="img/dust"+i+".png";
	}
	
	

}

var lastTime=Date.now();
var deltaTime=0;

function loop(){
	window.requestAnimFrame(loop);
	var nowTime=Date.now();
	deltaTime=nowTime-lastTime;
	lastTime=nowTime;
	
	
	
	getBackground();
	
	fruitMonitor();									//判断位置很重要，必须放在靠前的位置，否则无法产生碰撞效果
	
	myAne.startDraw();
	
	
	myfruit.drawFru();

	ctx2.clearRect(0,0,canW,canH);
	mymom.draw();
	
	mybaby.draw();
	
	fishTofruitcollision();							//大鱼碰撞果实的方法
	bgTosmcollision();								//大鱼碰小鱼的方法
	
	
	
	myData.draw();									//调用该函数，绘制积分板
	
	mywave.draw();									//吃果实的圈圈
	
	mywaveFishtoFish.draw();						//喂食的圈圈
	
	myDust.startDraw();
}

var mx;														//定义鼠标的x轴和y轴
var my;

function onmousemove(e){							//监听鼠标移动事件
	if(myData.gameover==false){
		mx=e.offsetX;
		my=e.offsetY;
	}
}

