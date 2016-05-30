function dustObj(){								//漂浮物的函数，定义坐标，振幅，震动角度，id
	this.x=[];
	this.y=[];
	this.amp=[];
	this.alpha;	
	this.index=[];
}

dustObj.prototype={
	num:30,
	
	init:function(){
		for(var i=0;i<this.num;i++){
			this.x[i]=Math.random()*canW;
			this.y[i]=Math.random()*canH;	
			this.index[i]=Math.floor(Math.random()*7);
			this.amp[i]=Math.random()*20+30;
			this.alpha=0;
		}	
		
	},

	startDraw:function(){
		ctx1.save();
		for(var i=0;i<this.num;i++){
			
			this.alpha+=deltaTime*0.00003;										//这一步没有看懂
			var l=Math.sin(this.alpha);
			var id=this.index[i]
			ctx1.drawImage(dustPic[id],this.x[i]+l*this.amp[i],this.y[i]);			//控制点和结束点的坐标绘制





		}	
		ctx1.restore();
	}
}