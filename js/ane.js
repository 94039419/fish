var ane=function(){
	this.startx=[];						//海葵底部起始坐标
	this.headx=[];						//海葵头部x坐标
	this.heady=[];						//海葵头部y坐标
	this.amp=[];						//定义摆动振幅
	this.alpha=0;						//摆动的角度，这个用在Math.sin正弦函数中	
	
	
}

ane.prototype={
	num:50,														//海葵数量设为50个
	
	initPos:function(){										//初始化位置
		for(var i=0;i<this.num;i++){
			this.startx[i]=i*16+Math.random()*20;				//初始化起始点坐标
			this.headx[i]=this.startx[i];						//头部x坐标初始化
			this.heady[i]=canH-250+Math.random()*50;			//头部y坐标初始化
			this.amp[i]=Math.random()*20+30;
		}
		
	},
	
	startDraw:function(){
		
		
		
		ctx1.strokeStyle="#BB4474";
		ctx1.lineCap="round";
		ctx1.lineWidth=20;
		ctx1.globalAlpha=0.5;
		ctx1.save();
		for(var i=0;i<this.num;i++){
			
			this.alpha+=deltaTime*0.00003;										//这一步没有看懂
			var l=Math.sin(this.alpha);
			
			ctx1.beginPath();
			ctx1.moveTo(this.startx[i],canH);														//利用贝塞尔曲线绘制
			
			this.headx[i]=this.startx[i]+l*this.amp[i]			//为了让以下海葵定点xy坐标传值给果实函数，让其出生，这里做整合
			ctx1.quadraticCurveTo(this.startx[i],canH-100,this.headx[i],this.heady[i]);			//控制点和结束点的坐标绘制
			
			ctx1.stroke();

		}	
		ctx1.restore();
	}
		
}

