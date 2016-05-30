function mom(){											//定义鱼妈妈
	this.x=0;
	this.y=0;
	this.momBody=new Image();							//定义大鱼各部位图片
	this.momEye=new Image();
	this.momTail=new Image();
	
	this.angle=0;										//定义鱼头的位置
	
	this.tailTimer=0;										//设置鱼尾巴时间轴
	this.tailCount=0;										//设置鱼尾巴帧
	
	this.eyeTimer=0;										//设置鱼尾巴时间轴
	this.eyeCount=0;										//设置鱼尾巴帧
	this.eyeInterval=1000;									//初始化睁眼保持时间
	
	this.bodyCount=0;										//设置身体帧为0
}

mom.prototype={										//初始化，初始化鱼妈妈的坐标，身体，眼睛，尾巴的图片
	init:function(){
		this.x=canW*0.5;
		this.y=canH*0.5;	
		this.momBody.src="img/big.png";
		this.angle=0;								//初始化鱼头
		
		this.tailTimer=0;										//设置鱼尾巴时间轴
		this.tailCount=0;										//设置鱼尾巴帧
		
		this.eyeTimer=0;										//设置鱼尾巴时间轴
		this.eyeCount=0;										//设置鱼尾巴帧
		
		this.bodyCount=0;										//设置身体帧为0
	},
	
	draw:function(){

		this.x=lerpDistance(mx,this.x,0.98);					//这个函数在老师定义的函数commonFunctions.js中，使当前位置趋向于目标位置
		this.y=lerpDistance(my,this.y,0.98);
		
		var xchazhi=this.x-mx;									//鱼的坐标值减去鼠标移动到的坐标值
		var ychazhi=this.y-my;
		
		var chajiao=Math.atan2(ychazhi,xchazhi);				//通过获得的坐标差值，通过正切函数获得差角
		
		this.angle=lerpAngle(chajiao,this.angle,0.5);			 //这个函数在老师定义的函数commonFunctions.js中，使当前角度趋向于目标角度，一个值是目标角度
		
		this.tailTimer+=deltaTime;							//因为在循环执行中，所以让时间轴加等于两帧时间差
		if(this.tailTimer>50){								//如果时间轴小于50
			this.tailCount=(this.tailCount+1)%8;			//那么帧就在0-7之间循环
			this.tailTimer=this.tailTimer%50;				//而每次执行后时间轴归零
		}
		
		
		this.eyeTimer+=deltaTime;							//小鱼眼睛动画制作
		if(this.eyeTimer>this.eyeInterval){						
			this.eyeCount=(this.tailCount+1)%2;			
			this.eyeTimer=this.eyeTimer%this.eyeInterval;		
			if(this.eyeCount==0){										//如果当前是在睁眼这一帧，那把定时器设为随机数在800—1000毫秒之间
				this.eyeInterval=Math.random()*300+800;
			}else{
				this.eyeInterval=80;									//如果当前是在眨眼这一帧，那把定时器设为随机数在80毫秒
			}
		}
		
	
			
		if(this.eyeCount==0){										//如果当前是在睁眼这一帧，那把定时器设为随机数在800—1000毫秒之间
			this.eyeInterval=Math.random()*300+800;
		}else if(this.eyeCount==1){
			this.eyeInterval=80;									//如果当前是在眨眼这一帧，那把定时器设为随机数在80毫秒
		}
		
		ctx2.save();
		ctx2.translate(this.x,this.y);									//设置该坐标为画布原点，中心点
		ctx2.rotate(this.angle)											//旋转角度
		
		var momtc=this.tailCount;										//定义一个尾巴变量，获得当前帧
		
		var momec=this.eyeCount;										//定义一个眼睛变量，获得当前帧	

		var mombc=this.bodyCount;										//定义一个身体变量，获得当前帧	
			
		
		if(myData.double==2){
			ctx2.drawImage(bgBodyBlue[mombc],-bgBodyBlue[mombc].width*0.5,-bgBodyBlue[mombc].height*0.5);	
		}else{
			ctx2.drawImage(bgBodyOrange[mombc],-bgBodyOrange[mombc].width*0.5,-bgBodyOrange[mombc].height*0.5);	
		}
		
		ctx2.drawImage(bgTail[momtc],-bgTail[momtc].width*0.5+25,-bgTail[momtc].height*0.5);
		ctx2.drawImage(bgEye[momec],-bgEye[momec].width*0.5,-bgEye[momec].height*0.5);
	
		ctx2.restore();
	}
}