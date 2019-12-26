/**
 * Created by chenyi on 2018/1/23.
 */
// 判断是否显示锁屏
if(window.sessionStorage.getItem("isLock") == "true"){
    lockPage();
}
//锁屏
// var $ = layui.$    
function lockScreen(){
    window.sessionStorage.setItem("isLock",true);
    lockPage();
}
function lockPage() {
    layer.open({
        title : false,
        area: ['1980', '1080'],
        type : 1,
        content : '<video class="video-player" preload="auto" autoplay="autoplay" loop="loop" data-height="1080" data-width="1980px" height="1080" width="1980px"> ' +
        '<source src="/statics/login/login.mp4" type="video/mp4"> </video>' +
        '<div class="lock-content"><div class="admin-header-lock" id="lock-box">'+
        '<div class="admin-header-lock-img"><img src="statics/img/index/head.jpg"/></div>'+
        '<div class="admin-header-lock-name" id="lockUserName">' + i18next.t("index.role") + '</div>'+
        '<div class="input_btn">'+
        '<input type="password" class="admin-header-lock-input layui-input" autocomplete="off" placeholder="' + i18next.t("index.unlockPasswordPlaceholder") + '" name="lockPwd" id="lockPwd" />'+
        '<button class="layui-btn" id="unlock" style="background-color: #42bdf1">' + i18next.t("index.unlock") + '</button>'+
        '</div>'+
        '</div></div>',
        closeBtn : 0,
        shade : 0.9
    })
    $(".admin-header-lock-input").focus();
}
// var $ = layui.jquery;
// 解锁
try {
    $("body").on("click","#unlock",function(){

        if($(this).siblings(".admin-header-lock-input").val() == ''){
            Tips.tips(i18next.t("index.unlockPasswordPrompt") + "123456！",$("#lockPwd"),1,'#4fcef1');
            $(this).siblings(".admin-header-lock-input").focus();
        }else{
            //验证密码是否正确
            if($(this).siblings(".admin-header-lock-input").val() == "123456"){
                window.sessionStorage.setItem("isLock",false);
                $(this).siblings(".admin-header-lock-input").val('');
                layer.closeAll("page");
            }else{
                Tips.tips(i18next.t("index.wrongPassword") + "123456！！",$("#lockPwd"),1,'#4fcef1');
                $(this).siblings(".admin-header-lock-input").val('').focus();
            }
        }
    });
    $(document).on('keydown', function() {
        if(event.keyCode == 13) {
            $("#unlock").click();
        }
    });
    
    $(document).ready(function () {
        i18n('./locales',onLangReady)//国际化
        //默认显示菜单
        setMainHeight();
    });
    function onLangReady(){
        let menuPath = language === "en" ? "json/enFunctionMenu.json" : "json/functionMenu.json"
         createMenu(menuPath);
    }
    $(window).resize(function () {
        setMainHeight();
    });
    //设置主内容高度
    function setMainHeight() {
        var height = $(parent.window).height();
        $("#main").css("height", height - 154 + "px");
    }
    //生成菜单
    function createMenu(url) {
        $("#menuSearch").val("");
        $.getJSON(url, function (r) {
            //设置菜单缓存
            $t.setStorageItem("menuList", r.menuList);
            //显示菜单
            setMenu(r.menuList);
    
        });
    }
    
    var authToken=localStorage.getItem("authToken");
    var user =localStorage.getItem("user");
    var userID = JSON.parse(user).id;
    //显示菜单
    function setMenu(menuList) {
        $(".layui-nav-tree").html("");
            for (var i = 0; i < menuList.length; i++) {
                var _li;
                var _cli;
                if (menuList[i].type === 0) {
                    _li = ['<li class="layui-nav-item">',
                        '<a class="" href="javascript:;" title="' + menuList[i].name + '" >',
                        '<i class="' + menuList[i].icon + '"></i>' + menuList[i].name + '</a>',
                        '</li>'].join("");
                    //是否有下级菜单
                    if (menuList[i].list) {
                        var $li = $(_li);
                        $li.find("a").after('<dl class="layui-nav-child">');    
                        for (var j = 0; j < menuList[i].list.length; j++) {            		            	                
                           $li.find(".layui-nav-child").append(' <dd><a class="cy-page" href="javascript:;" data-url="' + menuList[i].list[j].url + '" title="' + menuList[i].list[j].name + '">' + menuList[i].list[j].name + '</a></dd>');
                        }
                    }
                    _li = $li.prop("outerHTML");
                }
        
                if (menuList[i].type === 1) {
                    _li = '<li class="layui-nav-item"><a class="layui-nav-item cy-page" href="javascript:;" data-url="' + menuList[i].url + '" title="' + menuList[i].name + '"><i class="' + menuList[i].icon + '"></i> ' + menuList[i].name + '</a></li>';
                }
                $(".layui-nav-tree").append(_li);
            }          
        layui.use('element', function () {
            var element = layui.element;
            element.render();
        });
    }
    
    //生成菜单
    function createSetMenu(url) {
        $("#menuSearch").val("");
        $.getJSON(url, function (r) {
            //设置菜单缓存
            $t.setStorageItem("menuList", r.menuList);
            //显示菜单
            setupMenu(r.menuList);
    
        });
    }
    //显示菜单
    function setupMenu(menuList) {
        $(".layui-nav-tree").html("");
        for (var i = 0; i < menuList.length; i++) {
            var _li;
            if (menuList[i].type === 0) {
                _li = ['<li class="layui-nav-item">',
                    '<a class="" href="javascript:;" title="' + menuList[i].name + '" >',
                    '<i class="' + menuList[i].icon + '"></i>' + menuList[i].name + '</a>',
                    '</li>'].join("");
                //是否有下级菜单
                if (menuList[i].list) {
                    var $li = $(_li);
                    $li.find("a").after('<dl class="layui-nav-child">');
                    for (var j = 0; j < menuList[i].list.length; j++) {
                        $li.find(".layui-nav-child").append(' <dd><a class="cy-page" href="javascript:;" data-url="' + menuList[i].list[j].url + '" title="' + menuList[i].list[j].name + '">' + menuList[i].list[j].name + '</a></dd>');
                    }
                }
                _li = $li.prop("outerHTML");
            }
            if (menuList[i].type === 1) {
                _li = '<li class="layui-nav-item"><a class="layui-nav-item cy-page" href="javascript:;" data-url="' + menuList[i].url + '" title="' + menuList[i].name + '"><i class="' + menuList[i].icon + '"></i> ' + menuList[i].name + '</a></li>';
            }
            $(".layui-nav-tree").append(_li);
        }
    
        layui.use('element', function () {
            var element = layui.element;
            element.render();
        });
    }
    
    //左侧菜单收起与显示
    $(".toggle-collapse").click(function () {
        var width = $(window).width();
        if ($(this).hasClass("toggle-show")) {
            $(this).removeClass("toggle-show").animate({left: '200px'});
            $(".layui-body,.layui-footer").css("width", parseInt(width) - 200 + "px").animate({left: '200px'});
            $(".layui-side").animate({left: '0px'}).fadeIn("slow");
        } else {
            $(this).addClass("toggle-show").animate({left: '0px'});
            $(".layui-body,.layui-footer").css("width", parseInt(width) + "px").animate({left: '0px'});
            $(".layui-side").animate({left: '-200px'});
        }
    
    });
    
    
    //菜单搜索
    $(" .menu-search-clear").click(function () {
        $("#menuSearch").val("");
        $(".menu-search-clear").hide()
        //显示默认菜单
        setMenu($t.getStorageItem("menuList"))
    });
    
    $("#menuSearch").keyup(function () {
        if ($("#menuSearch").val() == "") {
            $(".menu-search-clear").hide();
            //显示默认菜单
            setMenu($t.getStorageItem("menuList"))
        } else {
            $(".menu-search-clear").show();
            var menuList = $t.getStorageItem("menuList");
            //显示搜索结果菜单
            var k = $("#menuSearch").val().trim("");
            if (k == "") return;
            var arr = [];
            var patt = new RegExp(k);
            for (var i = 0; i < menuList.length; i++) {
                if (menuList[i].type === 1) {
                    if (patt.test(menuList[i].name) || patt.test(menuList[i].url)) {
                        arr.push({name: menuList[i].name, url: menuList[i].url, icon: menuList[i].icon});
                    }
                }
                if (menuList[i].list) {
                    for (var j = 0; j < menuList[i].list.length; j++) {
                        if (menuList[i].list[j].type === 1) {
                            if (patt.test(menuList[i].list[j].name) || patt.test(menuList[i].list[j].url)) {
                                arr.push({
                                    name: menuList[i].list[j].name,
                                    url: menuList[i].list[j].url,
                                    icon: menuList[i].list[j].icon
                                });
                            }
                        }
    
                    }
                }
            }
            $(".layui-nav-tree").html("");
            if (arr.length > 0) {
                //渲染查询后的表格
                for (var i = 0; i < arr.length; i++) {
                    $('.layui-nav-tree').append(
                        ['<li class="layui-nav-item">',
                            '<a class="layui-nav-item cy-page" href="javascript:;" ',
                            'data-url="' + arr[i].url + '" title="' + arr[i].name + '">',
                            '<i class="fa fa-pencil"></i> ' + arr[i].name + '</a></li>'].join(""));
                }
                layui.use('element', function () {
                    var element = layui.element;
                    element.render();
    
                });
            }
    
        }
    });
} catch {
    console.log(Text)
}


