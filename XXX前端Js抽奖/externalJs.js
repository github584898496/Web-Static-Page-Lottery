/* 实用函数 不需要配置 begin */
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
        $txtHtml += ' <input  type="text" value=" " class="txt"  readonly/>';
    }
    $('#title').html("").append("<h2>" + jsonObj.title + "</h2>")
    $('#zjTxt').html("").append($txtHtml);
    $('#btnEnd').attr('disabled', 'disabled');
}
/*  给它一个json 奖项对象，负责生成文本框 end */
/* 处理初始化数组 begin */
function processConfigArr(operatorArr, counts, addElementVal) {
    for (var i = 0; i < counts; i++) {
        operatorArr.push(addElementVal);
    }
}
/* 处理初始化数组 end */
/* 实用函数 不需要配置 begin */


/* 主程 begin */
$(function () {
    var zjArr = []; //真正抽奖数据库
    var zzArrGdDataArr = ["特等奖", "一等奖", "二等奖", "三等奖", "四等奖", "五等奖", "XXX中庆,多谢支持!"]; //真正g动的显示数据库,其时就是中奖类型放在这里，浩兄  

    //相同的配置数据请添加 begin
    processConfigArr(zjArr, 1, "特等奖");
    processConfigArr(zjArr, 3, "一等奖");
    processConfigArr(zjArr, 1, "二等奖");
    processConfigArr(zjArr, 1, "三等奖");
    processConfigArr(zjArr, 10, "四等奖");
    processConfigArr(zjArr, 100, "五等奖");
    processConfigArr(zjArr, 300, "XXXX中庆,继续努力!");
    //相同的配置数据请添加 end

    //不需要配置下面的 begin
    var globalIndex = 0;  //到哪组奖项 -->定等獎,分组奖
    var optionsi = 0;
    var jsonArr = [
         { 'title': 'XXX抽奖', 'count': '1' }
    ];
    var timer = 0;  //全局定時
    var txtIndex = 0;
    /* 缓存对象 begin */
    var $misic = $('#misic');
    var $beginMisic = $("<embed id='bgSound' src='./misic/begin/gds2.mp3' hidden='true' autostart='true' loop='true'>");
    var $btnBegin = $('#btnBegin');
    var $btnEnd = $('#btnEnd');
    /* 缓存对象 end */
    mainPro(jsonArr[globalIndex]);   //初始化输出
    var $currentTxt = $('#zjTxt input:first');

    //不需要配置下面的 end   
    $btnBegin.click(function () {
        $(this).attr('disabled', 'disabled');
        $btnEnd.removeAttr('disabled');
        if (zjArr.length >= jsonArr[globalIndex].count) {
            $misic.html("").append($beginMisic);
            timer = window.setInterval(function () {
                //取名单进行显示 begin
                $currentTxt.val(zzArrGdDataArr[fRandomBy(0, zzArrGdDataArr.length - 1)]);  //真正g动的数据
                //取名单进行显示 end
            }, 3);  //g动 ,浩兄,这里配置速度,值越大，速度越慢慢.最小为1就行了.
        } else {
            alert('亲!奖项数据已抽完!请重新初始化系统再来!!');
        }
    });
    $btnEnd.click(function () {
        $(this).attr('disabled', 'disabled');
        $btnBegin.removeAttr('disabled');
        window.clearInterval(timer);
        $misic.html("");
        $currentTxt.val(zjArr[fRandomBy(0, zjArr.length - 1)]);  //真正中奖数据
        var removeIndex = zjArr.indexOf($currentTxt.val());
        zjArr.splice(removeIndex, 1);
    });

    var isTdJ = false;
    var isOne = false;
    var isTwo = false;

    $('body').keydown(function (e) {
        console.log(e.which);
        if ((e.which == 87) && ($btnBegin.attr('disabled') == 'disabled') && (isOne == false)) { //按了''，但要g动着才可,且必须是第一次
            //说明你还没有要过一等    
            var kIndexOne = zjArr.indexOf('一等奖');
            if (kIndexOne == (-1)) {  //你想要'一等奖'，但被人抽走了!               
                isOne = true;
            } else {
                $btnBegin.removeAttr('disabled');
                $btnEnd.attr('disabled', 'disabled');
                window.clearInterval(timer);
                $misic.html("");
                $currentTxt.val("一等奖"); //要
                var removeIndex = zjArr.indexOf($currentTxt.val());
                zjArr.splice(removeIndex, 1);
                isOne = true;  //要过了 "一等奖"
            }
        } else if ((e.which == 81) && ($btnBegin.attr('disabled') == 'disabled') && (isTdJ == false)) {   //按 "q",要"特等奖",并且是第一次
            var kIndexTd = zjArr.indexOf('特等奖');
            if (kIndexTd == (-1)) {   //你想要"特等"，但被人抽走了!         
                isTdJ = true;  //想要不了
            } else {
                $btnBegin.removeAttr('disabled');
                $btnEnd.attr('disabled', 'disabled');
                window.clearInterval(timer);
                $misic.html("");
                $currentTxt.val("特等奖");  //要
                var removeIndex = zjArr.indexOf($currentTxt.val());
                zjArr.splice(removeIndex, 1);
                isTdJ = true;   //要过了 "特等奖"
            }
        } else if ((e.which == 69) && ($btnBegin.attr('disabled') == 'disabled') && (isTwo == false)) {
            var kIndexTwo = zjArr.indexOf('二等奖');
            if (kIndexTwo == (-1)) {   //你想要'二等奖'，但被人抽走了!         
                isTwo = true;  //想要不了,"二等奖"
            } else {
                $btnBegin.removeAttr('disabled');
                $btnEnd.attr('disabled', 'disabled');
                window.clearInterval(timer);
                $misic.html("");
                $currentTxt.val("二等奖"); //要
                var removeIndex = zjArr.indexOf($currentTxt.val());
                zjArr.splice(removeIndex, 1);
                isTwo = true;  //要过了 "二等奖"
            }
        }
    });

})
/* 主程 end */