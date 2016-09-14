/* 取一定范围的随机数 begin */
function fRandomBy(under, over) {
    switch (arguments.length) {
        case 1: return parseInt(Math.random() * under + 1);
        case 2: return parseInt(Math.random() * (over - under + 1) + under);
        default: return 0;
    }
}
/* 取一定范围的随机数 end */

/*  初始化数抽奖数组 begin */
function initZjArr(initArrs)
{
    for (var i = 0; i < initArrs.length ; i++)
    {
        initArrs[i].countryFlag = './i/lg_' + (i + 1) + '.jpg';
    }  
}
/*  初始化数抽奖数组 end */

/* 主程 begin */
$(function () {
    var configArr = [
        { 'countryName': '巴西', 'countryFlag': '', 'countryClothings': ['./i/yf/bx1.png', './i/yf/bx2.png'] },
        { 'countryName': '喀麦隆', 'countryFlag': '', 'countryClothings': ['./i/yf/kml1.png'] },
        { 'countryName': '墨西哥', 'countryFlag': '', 'countryClothings': ['./i/yf/mxg1.png'] },
        { 'countryName': '克罗地亚', 'countryFlag': '', 'countryClothings': ['./i/yf/klty1.png'] },

        { 'countryName': '西班牙', 'countryFlag': '', 'countryClothings': ['./i/yf/xbw1.png'] },
        { 'countryName': '智利', 'countryFlag': '', 'countryClothings': ['./i/yf/zl1.png'] },
        { 'countryName': '澳大利亚', 'countryFlag': '', 'countryClothings': ['./i/yf/hdly1.png'] },
        { 'countryName': '荷兰', 'countryFlag': '', 'countryClothings': ['./i/yf/hy1.png'] },

        { 'countryName': '哥伦比亚', 'countryFlag': '', 'countryClothings': ['./i/yf/glpy1.png'] },
        { 'countryName': '科特迪瓦', 'countryFlag': '', 'countryClothings': ['./i/yf/ktdw1.png'] },
        { 'countryName': '日本', 'countryFlag': '', 'countryClothings': ['./i/yf/yb1.png'] },
        { 'countryName': '希腊', 'countryFlag': '', 'countryClothings': ['./i/yf/xl1.png'] },


        { 'countryName': '乌拉圭', 'countryFlag': '', 'countryClothings': ['./i/yf/wlg1.png'] },
        { 'countryName': '英格兰', 'countryFlag': '', 'countryClothings': ['./i/yf/xkl1.png'] },
        { 'countryName': '哥斯达黎加', 'countryFlag': '', 'countryClothings': ['./i/yf/gxdng1.png'] },
        { 'countryName': '意大利', 'countryFlag': '', 'countryClothings': ['./i/yf/ydl1.png'] },

        { 'countryName': '瑞士', 'countryFlag': '', 'countryClothings': ['./i/yf/ys1.png'] },
        { 'countryName': '厄瓜多尔', 'countryFlag': '', 'countryClothings': ['./i/yf/ggdn1.png'] },
        { 'countryName': '洪都拉斯', 'countryFlag': '', 'countryClothings': ['./i/yf/hdls1.png'] },
        { 'countryName': '法国', 'countryFlag': '', 'countryClothings': ['./i/yf/fg1.png'] },

        { 'countryName': '阿根廷', 'countryFlag': '', 'countryClothings': ['./i/yf/agt1.png'] },
        { 'countryName': '尼日尼亚', 'countryFlag': '', 'countryClothings': ['./i/yf/nyny1.png'] },
        { 'countryName': '伊朗', 'countryFlag': '', 'countryClothings': ['./i/yf/yl1.png'] },
        { 'countryName': '波黑', 'countryFlag': '', 'countryClothings': ['./i/yf/bh1.png'] },

        { 'countryName': '德国', 'countryFlag': '', 'countryClothings': ['./i/yf/dg1.png'] },
        { 'countryName': '加纳', 'countryFlag': '', 'countryClothings': ['./i/yf/jn1.png'] },
        { 'countryName': '美国', 'countryFlag': '', 'countryClothings': ['./i/yf/mg1.png'] },
        { 'countryName': '葡萄牙', 'countryFlag': '', 'countryClothings': ['./i/yf/bty1.png'] },

        { 'countryName': '比利时', 'countryFlag': '', 'countryClothings': ['./i/yf/bls1.png'] },
        { 'countryName': '阿尔及利亚', 'countryFlag': '', 'countryClothings': ['./i/yf/aejyy1.png'] },
        { 'countryName': '韩国', 'countryFlag': '', 'countryClothings': ['./i/yf/hg1.png'] },
        { 'countryName': '俄罗斯', 'countryFlag': '', 'countryClothings': ['./i/yf/els1.png'] }
    ];
    //初始化国家标记
    initZjArr(configArr);
  
    var ctrlIndex = 0;  //按ctrl的标识
    var timer = 0;  //全局定時

    var reviewBone = false;  //当前是否停止
    var isOne = true;    //第一次回车

    var currentRandomCuntry = null;   //当前随机国家

    //图片显示:缓存
    var $showClothingImg = $('#showClothingImg');
    var $showCountryImgDl = $('#showCountryImgDl');
    var $title = $('#title');

    //按"回车"控制開始和停止 begin
    $('body').keyup(function (e) {    
        if (e.which == 17) {
           ctrlIndex++;
           if (ctrlIndex % 2 == 0) {   //偶数--停止
               window.clearInterval(timer);          
               reviewBone = true;  //当前停止
              
           } else {//奇数--开始             
               reviewBone = false;
               isOne = true;
               $showCountryImgDl.attr('src', './i/logo01.jpg');
               $title.html(' &nbsp;');

               timer = window.setInterval(function () {
                   var cci = fRandomBy(0, configArr.length - 1);   //随机一个国家的索引

                   currentRandomCuntry = configArr[cci];  //记录当前哪个国家

                   var cccs = configArr[cci].countryClothings;   //随机国家衣服_数组
                   var ci = fRandomBy(0, cccs.length - 1);  //随机这个国家衣服,的索引                
                   $showClothingImg.attr('src', cccs[ci]);  //把相应衣服显示出来
               }, 30)
           }
        } else if ((e.which == 13) && (reviewBone == true)) {   //回车 + 当前停止
            if (isOne)  //第一次回车
            {
                $showCountryImgDl.attr('src', currentRandomCuntry.countryFlag);
                isOne = false;
            } else if (isOne == false) {
                isOne = true;
                $title.html(currentRandomCuntry.countryName);
            }
        }
    });
    //按"回车"控制開始和停止 end
})
/* 主程 end */