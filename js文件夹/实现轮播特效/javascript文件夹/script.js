//封装一个代替document.getElementById()的方法
function biId(id) {
    return typeof (id) === "string" ? document.getElementById(id) : id;
}
//全局变量
var index = 0, timer = null;
var pics = biId("banner").getElementsByTagName("div")
var len = pics.length;
var Span = biId("dots").getElementsByTagName("span");
var prev = biId("prev");
var next = biId("next");
var menu = biId("menuContent");
var menuItems = menu.getElementsByClassName("menu-item");
var subMenu = biId("sub-menu");
var innerBox = subMenu.getElementsByClassName("inner-box");

function slidTmg() {

    var main = biId("main");//鼠标悬停清楚定时器

    main.onmouseover = function () {
        return clearInterval(timer);//悬停清楚定时器
    }


    main.onmouseout = function () {
        timer = setInterval(function () {
            index++;
            if (index >= len) {
                index = 0;
            }
            changeTmg();
        }, 2000);
    }
    main.onmouseout();
    //点击圆点切换图片 ，遍历所有点，且绑定点击事件
    for (var d = 0; d < len; d++) {
        //给所有的span添加一个id属性，值为d，作为当前span的索引
        Span[d].id = d;
        Span[d].onclick = function () {
            index = this.id;

            changeTmg();
        }
    }

    next.onclick = function () {
        index++;
        if (index >= len) { index = 0; }
        changeTmg()
    }
    prev.onclick = function () {
        index--;
        if (index < 0) { index = len - 1; }
        changeTmg()
    }
    //导航菜单，且绑定事件
    //遍历主菜单，且绑定事件
    for (var m = 0; m < menuItems.length; m++) {
        //为每一个menuitems定义一个data-index属性，作为索引
        menuItems[m].setAttribute("data-index", m);
        menuItems[m].onmouseover = function () {
            subMenu.className = "sub-menu";
            var idx = this.getAttribute("data-index");
            //鼠标滑过每一个子菜单，该子菜单将会被隐藏  
            for (var j = 0; j < innerBox.length; j++) {
                innerBox[j].style.display = "none"
                menuItems[j].style.background = "none"
            }

            menuItems[idx].style.background = "rgba(0,0,0,0.1)"
            innerBox[idx].style.display = "block";

        }
    }
    menu.onmouseout = function () {
        subMenu.className = "sub-menu hide";
    }
    subMenu.onmouseover = function () {
        this.className = "sub-menu";
    }
    subMenu.onmouseout = function () {
        this.className = "sub-menu hide";
    }
    //切换图片
    function changeTmg() {
        for (var i = 0; i < len; i++) {
            pics[i].style.display = "none";
            Span[i].className = " ";
        }
        //根据index索引找到当前div，将其显示出来
        pics[index].style.display = "block";
        Span[index].className = "active";
    }
}
slidTmg();