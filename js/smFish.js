function smFish(){
	this.x=0;
	this.y=0;
	
	this.smBody=new Image();
	this.smEye=new Image();
	this.smTail=new Image();
	
	this.angle=0;
	
	this.tailTimer=0;										//设置鱼尾巴时间轴
	this.tailCount=0;										//设置鱼尾巴帧
	
	this.eyeTimer=0;										//设置鱼尾巴时间轴
	this.eyeCount=0;										//设置鱼尾巴帧
	this.eyeInterval=1000;									//设置间隔时间，随后会对改时间进行一个随机数的生成，让眼睛睁着时保持2-3秒，闭眼是500毫秒
	
	this.bodyTimer=0;										//身体时间轴						
	this.bodyCount=0;										//身体帧			
}

smFish.prototype={
	init:function(){
		this.x=canW*0.5;
		this.y=canH*0.5;
		this.angle=0;	
		this.tailTimer=0;										//设置鱼尾巴时间轴
		this.tailCount=0;										//设置鱼尾巴帧
		
		this.eyeTimer=0;										//设置鱼尾巴时间轴
		this.eyeCount=0;										//设置鱼尾巴帧
		
		this.bodyTimer=0;										//身体时间轴						
		this.bodyCount=0;										//身体帧	
	},
	
	draw:function(){
		
		this.x=lerpDistance(mymom.x,this.x,0.99);					//这个函数在老师定义的函数commonFunctions.js中，使当前位置趋向于目标位置
		this.y=lerpDistance(mymom.y,this.y,0.99);
		
		var xchazhi=this.x-mymom.x;									//小鱼的坐标值减去大鱼坐标值
		var ychazhi=this.y-mymom.y;
		
		var chajiao=Math.atan2(ychazhi,xchazhi);				//通过获得的坐标差值，通过正切函数获得差角
		
		this.angle=lerpAngle(chajiao,this.angle,0.9);	 //这个函数在老师定义的函数commonFunctions.js中，使当前角度趋向于目标角度，一个值是目标角度
		
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
		
		this.bodyTimer+=deltaTime;							//因为在循环执行中，所以让时间轴加等于两帧时间差
		if(this.bodyTimer>300){								//如果时间轴小于50
			this.bodyCount=this.bodyCount+1;			//那么帧就在0-7之间循环
			this.bodyTimer=this.bodyTimer%300;				//而每次执行后时间轴归零
			if(this.bodyCount>19){
				this.bodyCount=19;
				myData.gameover=true;						//当小鱼身体完全变成白色后，scoreData的gameover数据就变成true
			}
		}
		
		
		ctx2.save();
		ctx2.translate(this.x,this.y);									//设置该坐标为画布原点，中心点
		
		var babytc=this.tailCount;										//定义一个尾巴变量，获得当前帧
		
		var babyec=this.eyeCount;										//定义一个眼睛变量，获得当前帧	
		
		var babybc=this.bodyCount;										//定义一个身体变量，获得当前帧							
		
		ctx2.rotate(this.angle)											//旋转角度
		ctx2.drawImage(smBody[babybc],-smBody[babybc].width*0.5,-smBody[babybc].height*0.5);	
		ctx2.drawImage(smEye[babyec],-smEye[babyec].width*0.5,-smEye[babyec].height*0.5);
		ctx2.drawImage(smTail[babytc],-smTail[babytc].width*0.5+25,-smTail[babytc].height*0.5);//这里的尾巴图片是通过myjs中预加载的数组
		
		
		ctx2.restore();
	}
}