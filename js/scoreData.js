function scoreData(){
	this.num=0;										//定义大鱼吃到果实的总数
	this.double=1;									//定义大鱼吃到蓝色果实的状态，蓝色分值为黄色分值的2倍
	this.score=0;									//定义得分
	this.gameover=false;							//定义游戏结束
	this.alpha=0;
}

scoreData.prototype={
	
	draw:function(){
		
		ctx2.shadowBlur=10;							//初始化画布阴影值，阴影颜色，字体大小，居中
		ctx2.shadowColor="white";					
		ctx2.fillStyle="white";					
		ctx2.font="30px verdana";
		ctx2.textAlign="center";
		ctx2.fillText("SCORE:"+this.score,canW*0.5,canH-50);
		
		if(myData.gameover){						//如果游戏结束，“游戏结束”渐渐显示出来
			this.alpha+=0.0005*deltaTime;
			if(this.alpha>1){
				this.alpha=1;	
			}
			
			ctx2.font="70px verdana";
			ctx2.fillStyle="rgba(255,255,255,"+this.alpha+")";
			ctx2.fillText("游戏结束",canW*0.5,canH*0.5-80);
		}
		
	},
	
	calcution:function(){									//计算分值
	
		this.score+=this.num*100*this.double;
		this.num=0;											//重置下面的分数
		this.double=1;
	}
}