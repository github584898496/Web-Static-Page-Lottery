/* 取一定范围[under,over]的随机数 begin */
function fRandomBy(under, over) {
    switch (arguments.length) {
        case 1: return parseInt(Math.random() * under + 1);
        case 2: return parseInt(Math.random() * (over - under + 1) + under);
        default: return 0;
    }
}
/* 取一定范围[under,over]的随机数 end */

/*  给它一个json 奖项配置数据，负责生成文本框 begin */
function printInfo(jsonObj) {
    var $txtHtml = ' <input  type="text" value=" " class="txt"  readonly/>';
    $('#title').html("").append("<h2>" + jsonObj.title + "</h2>")
    $('#zjTxt').html("").append($txtHtml);
}
/*  给它一个json 奖项配置数据，负责生成文本框 end */

/* pd一个按下的键是不是键盘上 [1-5] 数字 begin  */
function pdKeyCode(keyCode,keyCodeOne,keyCodeTwo)
{
    return  ((keyCode == keyCodeOne) || (keyCode == keyCodeTwo));
}
/* pd一个按下的键是不是键盘上 [1-5] 数字 end  */

/* 输出第wheel轮中奖者 begin */
function printZjTwoArray(dataTwoArr, wheel)
{
    var lzjCount=dataTwoArr[wheel].length;   //这轮有多少个中奖

    var wheelZjHtml = '第' + wheel + '轮中奖名单:';

    if (lzjCount > 0) {
        for (var j = 0; j < lzjCount; j++) {
            wheelZjHtml += dataTwoArr[wheel][j] + '  ';
        }
    } else {
        wheelZjHtml += '亲~还没有人中噢!';
    }
    $('#showZjInfo').html(wheelZjHtml);
}
/* 输出第n轮中奖者 end */

/* 每轮抽奖的初始化 begin */
function WheelInit(timer, jsonArr, zjDataTwoArr, globalWheel)
{
    window.clearInterval(timer);
    printInfo(jsonArr[globalWheel]);
    printZjTwoArray(zjDataTwoArr, globalWheel);
}
/* 每轮抽奖的初始化 end */

/* 主程 begin */
$(function () {
    /* 记录中奖 begin */
    var zjDataTwoArr = new Array(6);    
    for (var i = 0; i < zjDataTwoArr.length; i++)  
    {
        zjDataTwoArr[i] = new Array();
    }
    /* 记录中奖 end */  
  

    /* 需要进行抽奖数据放在这 begin  */
    var hiddenData= $('#hiddenData').val();
    var ZjSignInDataArrs = hiddenData.split(',');
    /* 需要进行抽奖数据放在这 end  */
    
    
    /* 奖项配置数据 begin */
    var jsonArr = [
         { 'title': '', 'count': '', 'unit': '' },    /* 拿来占位用的 */
         { 'title': '第一轮  奥迪高级防雷伞', 'count': '10', 'unit': '把' },
         { 'title': '第二轮  价值218元抱被', 'count': '8', 'unit': '个' },
         { 'title': '第三轮  价值688元拉杆箱', 'count': '5', 'unit': '个' },
         { 'title': '第四轮  价值6880元奥迪汽车美容套餐 ', 'count': '3', 'unit': '名' },
         { 'title': '第五轮  价值3600元自行车', 'count': '2', 'unit': '台' }
    ];
    /* 奖项配置数据 end */

    /* 全局变量 begin */
    var globalWheel = 1;  //第几轮,默认第一轮   
    var timer = 0;  //全局定時
    var txtIndex = 0; //全局 抽 停
    var micHtml = "<embed id='bgSound' src='./music.mp3' hidden='true' autostart='true' loop='true'>";
    /* 全局变量 end */  
    
    printInfo(jsonArr[globalWheel]);
    printZjTwoArray(zjDataTwoArr, 1);  

    /* 按键盘时控制 begin */
    $('body').keyup(function (e) {
        //第一轮:  49  || 97
        //第二轮:  50  || 98
        //第三轮:  51  || 99
        //第四轮:  52  || 100
        //第五轮:  53  || 101     
        
        var keyCode = e.which;

        /* 如果是按数字轮键 动态生成界面 begin */
        if (pdKeyCode(keyCode, 49, 97)) {

            globalWheel = 1;//第1轮
            txtIndex = 0;

            WheelInit(timer, jsonArr, zjDataTwoArr, globalWheel);

        } else if (pdKeyCode(keyCode, 50, 98)) {
          
            globalWheel = 2;//第2轮
            txtIndex = 0;

            WheelInit(timer, jsonArr, zjDataTwoArr, globalWheel);

        } else if (pdKeyCode(keyCode, 51, 99)) {
           
            globalWheel = 3;//第3轮
            txtIndex = 0;

            WheelInit(timer, jsonArr, zjDataTwoArr, globalWheel);

        } else if (pdKeyCode(keyCode, 52, 100)) {

            globalWheel = 4;//第4轮
            txtIndex = 0;

            WheelInit(timer, jsonArr, zjDataTwoArr, globalWheel);

        } else if (pdKeyCode(keyCode, 53, 101)) {

            globalWheel = 5;//第5轮
            txtIndex = 0;

            WheelInit(timer, jsonArr, zjDataTwoArr, globalWheel);          
        }
        /* 如果是按数字轮键 动态生成界面 end */

        if (e.which == 17) {     //抽      
            txtIndex++;
            if (txtIndex % 2 == 0) {  //停止     
                $('#misic').html('');
                window.clearInterval(timer);             
                zjDataTwoArr[globalWheel].push($('#zjTxt input.txt:first').val());  //存入第"globalWheel"轮，中奖名单
                 printZjTwoArray(zjDataTwoArr, globalWheel);  //输出一下当前"globalWheel"轮中奖名单
            } else {  //开始     

                $('#misic').html('').append(micHtml);
                /* 取名单进行显示 begin */
                timer = window.setInterval(function () {                
                    $('#zjTxt input.txt:first').val(ZjSignInDataArrs[fRandomBy(0, ZjSignInDataArrs.length - 1)]);
                    /* 取名单进行显示 end */
                }, 30);

            }
        }



    });
    /* 按键盘时控制 end */
})
/* 主程 end */