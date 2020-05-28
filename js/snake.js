//小蛇自调用函数
  (function(){
    var elements=[];
    function Snake(width,height,direction){
      this.width=width||20;
      this.height=height||20;
      this.direction=direction||"right";
      this.body=[
        {x:3,y:2,color:"#666"},
        {x:2,y:2,color:"#999"},
        {x:1,y:2,color:"#999"},
      ];
    };
    Snake.prototype.init=function(map){
      removeSnake();
      for(var i=0;i<this.body.length;i++){
        var obj=this.body[i];
        var div=document.createElement("div");
        map.appendChild(div);
        
        div.style.position="absolute";
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.left=obj.x*this.width+"px";
        div.style.top=obj.y*this.height+"px";
        div.style.backgroundColor=obj.color;
        //方向direction

        elements.push(div);
      } 
    };
    Snake.prototype.move=function(food,map,score){
      //改变小蛇身体
      var i=this.body.length-1;
      for(;i>0;i--){
        this.body[i].x=this.body[i-1].x;
        this.body[i].y=this.body[i-1].y;
      }
      //改变蛇头 上下左右
      switch(this.direction){
        case("right"):this.body[0].x+=1;break;
        case("left"):this.body[0].x-=1;break;
        case("top"):this.body[0].y-=1;break;
        case("bottom"):this.body[0].y+=1;break;
      };
      
      //判断吃到食物
      var headX=this.body[0].x*this.width;
      var headY=this.body[0].y*this.height;
      if(headX==food.x && headY==food.y){
        score++;
        //把最后一个蛇尾复制一个，放到body数组里最后面
        var tail=this.body[this.body.length-1];
        this.body.push({
          x:tail.x,
          y:tail.y,
         color:tail.color});
        food.init(map);
      }
      return score;
    };
    function removeSnake(){
      var i=elements.length-1;
      //从尾巴删掉
      for(;i>=0;i--){
        var ele=elements[i];
        ele.parentNode.removeChild(ele);
        elements.splice(i,1);
      }
    };
    window.Snake=Snake;
  }()); 
  