/* 取一定范围的随机数 begin */
function fRandomBy(under, over) {
    switch (arguments.length) {
        case 1: return parseInt(Math.random() * under + 1);
        case 2: return parseInt(Math.random() * (over - under + 1) + under);
        default: return 0;
    }
}
/* 取一定范围的随机数 end */

/*  给它一个json 奖项对象，负责生成文本框 begin */
function mainPro(jsonObj) {
    var $txtHtml = "";
    for (var i = 0; i < jsonObj.count; i++) {
        //$txtHtml += ' <input  type="text" value=" " class="txt"  readonly/>';  老的
        $txtHtml += ' <img src="./i/1.jpg" style="width:200px;height:210px;" class="txt" alt="中奖图片" />';
    }
    $('#title').html("").append("<h2>" + jsonObj.title + "</h2>")
    $('#zjTxt').html("").append($txtHtml);
}
/*  给它一个json 奖项对象，负责生成文本框 end */

/* 主程 begin */
$(function () {
    //需要进行抽奖数据放在这 begin  
    var zjArr = ["./i/2.jpg", "./i/3.jpg", "./i/4.jpg", "./i/5.jpg", "./i/6.jpg", "./i/7.jpg", "./i/8.jpg", "./i/9.jpg", "./i/10.jpg", "./i/11.jpg"];
    //需要进行抽奖数据放在这 end

    var globalIndex = 0;  //到哪组奖项 -->定等獎
    var optionsi = 0;  //定開停

    //财兄:这里我帮你配置了，你只需要配置人数即可 ""
    var jsonArr = [
         { 'title': '三等奖:恒大情侣球衣', 'count': '1','zone':[] },
         { 'title': '二等奖:奥迪自行车', 'count': '1', 'zone': [] },
         { 'title': '一等奖:陶瓷杯一套', 'count': '1', 'zone': [] }
    ];
    var timer = 0;  //全局定時
    var txtIndex = 0;

    /* 缓存对象 begin */
    //音樂
    var $misic = $('#misic');
    var $beginMisic = $("<embed id='bgSound' src='./misic/begin/gds1.mp3' hidden='true' autostart='true' loop='true'>"); 

    /* 缓存对象 end */
    mainPro(jsonArr[globalIndex]);   

    //按"空格"控制開始和停止
    $('body').keyup(function (e) {      
        if (e.which == 13) {  //回车下一组
            globalIndex++;
            mainPro(jsonArr[globalIndex]);
        }
        if (e.which == 17) {     //抽      
            txtIndex++;
            if (txtIndex % 2 == 0) {              
                window.clearInterval(timer);
                $misic.html("");    
                //下面正常
                var $currentTxt = $('#zjTxt img:first');  //當前顯示在值
                var removeIndex = zjArr.indexOf($currentTxt.attr('src'));
                zjArr.splice(removeIndex, 1);
            } else {  //开始     
                if ((zjArr.length ) >= jsonArr[globalIndex].count) {  //-在这
                    $misic.html("").append($beginMisic);
                    timer = window.setInterval(function () {  
                        //取名单进行显示 begin
                        do {
                            var currentIndex= fRandomBy(0, zjArr.length - 1);                            
                            if (zjArr[currentIndex] != "xxx") {                               
                                $('#zjTxt img:first').attr("src",zjArr[currentIndex]);
                                break;
                            }          
                        } while (true);                       
                        //取名单进行显示 end
                    }, 15);
                } else {
                    alert('名额不足于抽=>' + jsonArr[globalIndex].title + ",请添加名额再来!");
                }
            }
            //mainPro(jsonArr[globalIndex]);          
        }
    })
})
/* 主程 end */