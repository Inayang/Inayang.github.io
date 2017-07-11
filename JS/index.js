/*广告图片数组*/
var imgs=[
    "Img/m01.jpg",
    "Img/m02.jpg",
    "Img/m03.jpg",
    "Img/m04.jpg",
    "Img/m05.jpg"
];
//DOM内容加载后执行
$(()=>{
  var $ulImgs=$("#imgs");
  var $ulIdxs=$("#indexs");
  var LIWIDTH=parseFloat(
      $("#slider").css("width")
  );
    //设置ul的总宽度
  $ulImgs.css(
    "width",LIWIDTH*(imgs.length+1)
  );
  var strImgs='<li><img src="'+imgs.join(
    '"></li><li><img src="')+'"></li>';
    //再重复追加第一张图片
  strImgs+=`
    <li><img src="${imgs[0]}"></li>
  `;
  $ulImgs.html(strImgs);
  for(var i= 1,str="";i<=imgs.length;i++){
    str+="<li>"+i+"</li>"
  }
    //设置第一个图片为hover
  $ulIdxs.html(str).children(":first").addClass("hover");
    //自动轮播
    var speed=400;//一次轮播的时间
    var wait=2000;//每次轮播之间等待的时间
    var i=0;//保存当前显示的图片下标
    var timer=null;
    //轮播
    function move(){
        timer=setTimeout(()=>{
            //i+1
            i++;
            //让$ulimgs的left在speed时间内，移动到-i*LIWIDTH
            $ulImgs.animate(
                {left: -i * LIWIDTH},
                speed,
                ()=> {
                    //防止i越界
                    if (i == imgs.length) {
                        i = 0;
                        $ulImgs.css("left", "");
                    }
                    //将$ulIdxs的第i个li设置为hover，清除其兄弟的hover
                    $ulIdxs.children(":eq("+i+")")
                        .addClass("hover")
                        .siblings()
                        .removeClass("hover");
                    move();//移动后再次回调启动等待
                }
            );
        },wait);
    }
    move();//启动第一次

    var canMove=true;
    //为id为slider的div添加鼠标进入和移出事件
    $("#slider").hover(
        ()=>{
            //停止一次性定时器
            clearTimeout(timer);
            canMove=false;
        },
        ()=>{
            canMove=true;
            move();
        }
    );

    //当鼠标进入index中的li时，滚动到指定的图片
    $ulIdxs.on("mouseover","li:not(.hover)",e=>{
        //获得当前li的下标
        i=$ulIdxs.children().index(e.target);
        //先清空动画队列，再启动本次动画
        $ulImgs.stop(true).animate(
            {left: -i * LIWIDTH},
            speed,
            ()=>{
                //将$ulIdxs的第i个li设置为hover，清除其兄弟的hover
                $ulIdxs.children(":eq(" + i + ")")
                    .addClass("hover")
                    .siblings()
                    .removeClass("hover");
            }
        )
    })
});








