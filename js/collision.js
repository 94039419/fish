function fishTofruitcollision(){							//大鱼碰撞果实效果
	if(!myData.gameover){							//只有当gameover为false时，才执行如下动画
		for(var i=0;i<myfruit.num;i++){						//循环每一个果实，测量果实和鱼妈妈的距离的平方是否小于900,是的话该果实设为false
			if(myfruit.alive[i]){
				var collision=calLength2(myfruit.x[i],myfruit.y[i] ,mymom.x,mymom.y);
				if(collision<900){
					myfruit.dead(i);							//当大鱼吃到果实后，果实消失
					myData.num++;						//大鱼吃到果实后，果实个数
					mymom.bodyCount++;					//吃到果实，大鱼身体变化的帧加1
					
					if(mymom.bodyCount>7){				//如果大鱼身体帧大于7，身体就维持在第7帧上面
						mymom.bodyCount=7;	
					}
					
					if(myfruit.fruitType[i]=="blue"){		//当碰到的果实是蓝色，记录在myData数据里
						myData.double=2;
					}else{
						myData.double=1;
					}
					
					mywave.born(myfruit.x[i],myfruit.y[i],myData.double);		//执行碰果实圈圈函数中的born方法，传递当前果实的坐标、颜色，作为圈圈的产生坐标，以及碰到果实后的颜色
				}
			}
		}
	}
}

function bgTosmcollision(){							//大鱼碰撞小鱼效果
	if(myData.num>0&&!myData.gameover){									//只有当吃到果实或者gameove为false，才会有以下和小鱼碰撞的效果，否则不执行
		var collision2=calLength2(mybaby.x,mybaby.y,mymom.x,mymom.y);
		if(collision2<900){
			mybaby.bodyCount=0;								//当大小鱼碰撞后，小鱼身体帧变成0
			
			mymom.bodyCount=0;								//当大小鱼碰撞后，大鱼身体帧变成0
			
			myData.calcution();	
			
			mywaveFishtoFish.born(mymom.x,mymom.y);
		}
		
		
	}
}