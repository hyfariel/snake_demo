///游戏自调用函数
(function(){
    var that=null;
    //游戏构造函数
    function Game(map){
      this.food=new Food();
      this.snake=new Snake();
      this.map=map;
      that=this;
    };
    //游戏初始化
    Game.prototype.init=function(span){
      this.food.init(this.map);
      this.snake.init(this.map);
      this.runSnake(this.food,this.map,span);
      this.bindkey();    
    };
    //小蛇自动移动
    Game.prototype.runSnake=function(food,map,span){
      var score=0;
      var timeId=setInterval(function(){
        //定时器中的this是windows
        score=this.snake.move(food,map,score);
        span.innerText=score;
        this.snake.init(map);

        var maxX=map.offsetWidth/this.snake.width;
        var maxY=map.offsetHeight/this.snake.height;
        var headX=this.snake.body[0].x;
        var headY=this.snake.body[0].y;

        if(headX<0 || headX>=maxX || headY<0 || headY>=maxY){
          alert("Game Over!");
          clearInterval(timeId);
          console.log('撞墙了');
          return;
        };
      }.bind(that),200);
    };
    //获取用户按键，改变蛇头方向
    Game.prototype.bindkey=function(){
      document.addEventListener("keydown",function(e){
        //这里面的this是document
          switch(e.keyCode){
            case 65:
            case 37:this.snake.direction="left";break;
            case 87:
            case 38:this.snake.direction="top";break;
            case 68:
            case 39:this.snake.direction="right";break;
            case 83:
            case 40:this.snake.direction="bottom";break;
          };
      }.bind(that),false);
    };

    window.Game=Game;
  }());
