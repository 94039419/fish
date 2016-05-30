function fruit(){
	this.alive=[];									//定义果实的状态，是活跃中，还是等待中
	this.orangeFru=new Image();
	this.blueFru=new Image();
	this.speed=[];
	this.l=[];										//定义果实的大小
	this.fruitType=[];								//定义果实的颜色，是blue还是orange			
	this.aneIndex=[];								//根据是哪一个海葵，设置果实的出生位置
	this.x=[];
	this.y=[];
	
}

fruit.prototype={
	num:30,
	
	init:function(){
		for(var i=0;i<this.num;i++){
			this.alive[i]=false;											//初始化美国果实都false
			this.getPos(i);													//初始化每个果实在哪些海藻上面
			this.speed[i]=Math.random()*0.015+0.005;
			this.fruitType[i]="";											//初始化果实类型为空
		}
		this.orangeFru.src="img/fruit.png";
		this.blueFru.src="img/blue.png";
	},
	
	getPos:function(i){													//定义果实在海藻上的位置
		this.l[i]=0;
		
		this.aneIndex[i]=Math.floor(Math.random()*myAne.num);				//随机获得是哪根海葵
		
		
		this.alive[i]=true;	
		
		var suiji=Math.random();
		if(suiji<0.2){														//随机产生0到1之间的数字，如果随机数小于0.2，就出声蓝色果实，否则橘色
			this.fruitType[i]="blue";
		}else{					
			this.fruitType[i]="orange";
		}
		
	},
	
	drawFru:function(){
		for(var i=0;i<this.num;i++){
			if(this.alive[i]=true){											//只有当果实状态是true时，才执行以下操作
				if(this.fruitType[i]=="blue"){									//判断如果该果实是蓝色，就出生蓝色果实
					var pic=this.blueFru
				}else{
					var pic=this.orangeFru
				}
				if(this.l[i]<15){												//当果实大小小于15，他就持续增大
					this.x[i]=myAne.headx[this.aneIndex[i]];
					this.y[i]=myAne.heady[this.aneIndex[i]];
					ctx1.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
					this.l[i]+=0.01*deltaTime;
				}else{															//否则就开始上升
					ctx1.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
					this.y[i]-=	this.speed[i]*deltaTime*5;
				}
				
				if(this.y[i]<5){												//如果果实上移出屏幕，其状态就设为false
					this.alive[i]=false;	
				}
			}
		}
	},
	
	dead:function(i){
		this.alive[i]=false;
	}
}

function fruitMonitor(){										//活着的果实监听，如果屏幕上的果实小于15个，就持续出生新的果实
	var totle=0;

	if(totle<15){
		startBorn();
		return ;	
	}
}

function startBorn(){											//判断果实是否出身，没有出身就开始出生
	for(var i=0;i<myfruit.num;i++){
		if(!myfruit.alive[i]){
			myfruit.getPos(i);
			return;
		}		
	}

}