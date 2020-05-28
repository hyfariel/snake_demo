  //食物自调用函数 (f1());
  (function (){
    var elements=[];//保存每个食物小方块
    //食物小方块自定义构造函数
    function Food(x,y,width,height,color){
    this.x=0;
    this.y=0;
    this.width=width||20;
    this.height=height||20;
    this.color=color||"#999";
    };
    //食物原型对象添加初始化方法:食物在地图上显示
    Food.prototype.init=function(map){
      removeFood();
      var div=document.createElement("div");
      map.appendChild(div);
      
      div.style.position="absolute";
      div.style.width=this.width+"px";
      div.style.height=this.height+"px";
      div.style.backgroundColor=this.color;
     
      this.x=parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
      this.y=parseInt(Math.random() * (map.offsetHeight/this.height)) * this.height;
      div.style.left=this.x+"px";
      div.style.top=this.y+"px";

      elements.push(div);
    };
    //私有函数 删除食物
    function removeFood(){
       for(var i=0;i<elements.length;i++){
         var ele=elements[i];
         //用ele的父亲删除ele这个元素 地图上删除
         ele.parentNode.removeChild(ele);
         //在数组中删掉ele 数组中删除
        elements.splice(i,1);//从索引i的位置开始，删除1项
       }
    };
    window.Food=Food;
  }());
  