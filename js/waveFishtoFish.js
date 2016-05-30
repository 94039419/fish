function waveFishtoFish(){								//定义大鱼碰小鱼时的圈圈,圈圈一个就够了
	this.x=0;
	this.y=0;
	this.r=0;
	this.alive=false;
	
}

waveFishtoFish.prototype={
	num:1,										//预设圈圈有10个
	
	init:function(){								//初始化圈圈，全部待命，半径为0
			this.alive=false;	
			this.r=0;
	},	
	
	draw:function(){									//绘制圈圈
			if(this.alive){							//如果数组中该果实出生
				
				this.r+=deltaTime*0.1;				//半径逐渐变大至60,透明度反向变化
				if(this.r>100){
					this.alive=false;
				}
				
				var myalpha=1-this.r/100;			
				
				ctx2.save();
				ctx2.lineWidth=3;	
				ctx2.beginPath();
				ctx2.arc(this.x,this.y,this.r,0,2*Math.PI);
				ctx2.closePath();
				ctx2.strokeStyle="rgba(255,51,0,"+myalpha+")";
				
				ctx2.stroke();
				
				ctx2.restore();
				
			}
	},
	
	born:function(x,y){					//定义出生，这个方法在碰撞函数colision.js中，大鱼碰撞果实后执行，并获得当时果实的位置
		for(var i=0;i<this.num;i++){		//如果全部该果实没有出生，那就出生，其实半径为20，xy轴分别是果实的xy轴坐标
			if(!this.alive){
				this.alive=true;
				this.r=40;
				this.x=x;
				this.y=y;
				return;						//retrun很重要，只让一个果实出生
			}
		}
	}
}

