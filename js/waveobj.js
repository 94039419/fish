function waveObj(){								//定义大鱼吃果实时的圈圈
	this.x=[];
	this.y=[];
	this.r=[];
	this.alive=[];
	this.color;
	
}

waveObj.prototype={
	num:10,										//预设圈圈有10个
	
	init:function(){								//初始化圈圈，全部待命，半径为0
		for(var i=0;i<this.num;i++){
			this.alive[i]=false;	
			this.r[i]=0;
		}
	},	
	
	draw:function(){									//绘制圈圈
		ctx2.save();
		for(var i=0;i<this.num;i++){
			if(this.alive[i]){							//如果数组中该果实出生
				
				this.r[i]+=deltaTime*0.1;				//半径逐渐变大至60,透明度反向变化
				if(this.r[i]>60){
					this.alive[i]=false;
				}
				
				var myalpha=1-this.r[i]/60;			
				var mycolor;
				if(this.color==1){							//判断传来的果实颜色参数，绘制不同颜色的碰撞效果
					mycolor="rgba(255,255,255,";
				}else{
					mycolor="rgba(56,9,247,";
				}
				
				ctx2.save();
				ctx2.lineWidth=2;
				ctx2.beginPath();
				ctx2.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
				ctx2.closePath();
				ctx2.strokeStyle=mycolor+myalpha+")";
				ctx2.stroke();
				ctx2.restore();
				
			}
		}
		ctx2.restore();
	},
	
	born:function(x,y,double){					//定义出生，这个方法在碰撞函数colision.js中，大鱼碰撞果实后执行，并获得当时果实的位置
		for(var i=0;i<this.num;i++){		//如果全部该果实没有出生，那就出生，其实半径为20，xy轴分别是果实的xy轴坐标
			if(!this.alive[i]){
				this.alive[i]=true;
				this.r[i]=20;
				this.x[i]=x;
				this.y[i]=y;
				this.color=double;
				return;						//retrun很重要，只让一个果实出生
			}
		}
	}
}

