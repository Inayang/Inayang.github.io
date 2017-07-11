$(()=>{
    //获得所有楼层的气泡
    var $spans=$(".floor>header>span:first-child");
    //获得id为elevator的div
    var $elev=$("#elevator");
    //为window绑定滚动事件
   $(window).scroll(()=>{
      //获得页面股东国的高度
       var scrollTop=$("body").scrollTop();
           //遍历每个span
       $spans.each((i,span)=>{
           var $span=$(span);
           if($span.offset().top<scrollTop+innerHeight/2){
               //清除所有span的class
               $spans.removeClass("hover");
               //当前span为hover
               $span.addClass("hover");
               //设置$elev下ul下的第i个li为active，清除其余li的class
               $elev.find("ul>li:eq("+i+")").addClass("active").siblings()
                .removeClass("active");
           }else{
               //溢出当前span的hover
               $span.removeClass("hover");
           }
       });
        //如果$spans中有.hover
       if($spans.is(".hover")) {
           //设置$elev显示
           $elev.show();
       }else {
           //设置$elev隐藏
           $elev.hide();
       }
   });

    //鼠标进入电梯按钮翻面
    $elev
        .on("mouseover","a:first-child",
            e=>$(e.target).parent().addClass("active")
        )
        .on("mouseout","a:last-child",e=>{
            var $li=$(e.target).parent();
            var i=$elev.find("ul>li").index($li);
            console.log();
            if(!$spans.eq(i).is(".hover"))
                $li.removeClass("active")
        });

    //为$elev添加单机时间委托，值允许li下的最后一个a响应事件
    $elev.on("click","li>a:last-child",e=>{
        //让页面滚动到当前li对应的span的offsetTop的位置
        var $li=$(e.target).parent();
        var i=$elev.find("ul>li").index($li);
        var $span=$spans.eq(i);
        $("body").animate({
            scrollTop:$span.offset().top
        },500);
    })
});
