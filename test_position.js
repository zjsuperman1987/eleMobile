//页面初始化
window.onload = function () {
    InitControl.InitMenu();
    //轮播插件
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: {
            delay: 3000, //3秒切换一次
            disableOnInteraction: false,
            waitForTransition: false
        },
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        observer: true,
        observeParents: true

    });


    //移动端手势插件 hammer.js 轮播图
    var hammertime = new Hammer($('.index0_MiddleWrapper')[0]);
    var Carouselindex = 0;
    hammertime.on('swipeleft swiperight', function (ev) {

        if (ev.type == 'swipeleft') {
            Carouselindex++;
            if (Carouselindex == $('.index0_MiddleWrapper_carousel ul').length) Carouselindex = $('.index0_MiddleWrapper_carousel ul').length - 1;
            $('.index0_MiddleWrapper_carousel').animate({ "left": -$('.index0_MiddleWrapper').width() * Carouselindex }, 500);
            $('.index0_MiddleWrapper_control li').removeClass('activeCarousel').eq(1).addClass('activeCarousel');
        }
        else {
            Carouselindex--;
            if (Carouselindex = -1) Carouselindex = 0;
            $('.index0_MiddleWrapper_carousel').animate({ "left": -$('.index0_MiddleWrapper').width() * Carouselindex }, 500);
            $('.index0_MiddleWrapper_control li').removeClass('activeCarousel').eq(0).addClass('activeCarousel');
        }
    });


    //垂直滚动
    $('body').bind('touchmove', function (e) {
        e.preventDefault();               //禁用默认滚动行为，需要自己实现滚动

        //        console.log($(this).scrollTop()); // 计算你的屏幕高度

        //头部高度
        var headBar_height = $('.currentAddressWrapper').height();
        //推荐商家滚动位置
        var recommendMerchant_height = $('.index0_TopWrapper').height() + $('.index0_MiddleWrapper').height() + $('.swiper-container').height() + $('.recommendMerchant_title').height();

        if ($(this).scrollTop() < headBar_height + $('.searchWrapper').height() ) {
            $('.searchWrapper').css({ position: 'relative' })
        }
        if ($(this).scrollTop() >= headBar_height && $(this).scrollTop() < headBar_height + 10) {
            $('.searchWrapper').css({ position: 'fixed', top: '0', 'z-index': '11', background: 'rgb(27, 140, 224, 1)' })
        }
        else if ($(this).scrollTop() >= headBar_height + 10 && $(this).scrollTop() <= headBar_height + 20) {
            $('.searchWrapper').css({ position: 'fixed', top: '0', 'z-index': '11', background: 'rgb(27, 140, 224, 1)', 'padding-bottom': '0' })
        }
        else if ($(this).scrollTop() >= headBar_height + 20) {
            $('.searchWrapper').css({ position: 'fixed', top: '0', 'z-index': '11', background: 'rgb(27, 140, 224, 1)', 'padding-bottom': '.05' })
        }
        if ($(this).scrollTop() >= recommendMerchant_height) {
            $('.recommendMerchant_sort_item').css({ position: 'fixed', top: '.49rem', 'z-index': '11' })
        }
        else if ($(this).scrollTop() < recommendMerchant_height) {
            $('.recommendMerchant_sort_item').css({ position: 'relative', top: '0', 'z-index': '1' })
        }
    });

    //初始化样式
    InitControl.InitStyleSheet();
}

var openid = "";
var access_token = "";
var MemberInfo = {};
//初始化控制
var InitControl = (function () {
    return {
        InitMenu: function () {
            sessionStorage.setItem("ProjGUID", "64F0FDA6-336D-497F-8C69-6A23615112A8");
            /*此判断防止用户在第一次进入时刷新的凭证失效导致获取用户数据失败*/
            var code = PubRequest.Query("code");
            //            if (code !== null && sessionStorage.getItem("code") != code) {
            //                sessionStorage.setItem("index", PubRequest.Query("state"));
            //                PubAjax.post("AnalysisCode", { code: code, "type": "0" }, function (data) {
            //                    if (data.result == 'true') {
            //                        openid = data.openid;
            //                        access_token = data.access_token;
            //                        sessionStorage.setItem("code", code);
            //                        PubAjax.post("openidGetMemberInfo", { openid: openid, "type": "0" }, function (data) {
            //                            if (data.result == "false") {
            //                                //显示绑定手机号页面
            //                                $("#BindInfo").css("display", "block");
            //                                $("#Back1").css("display", "block");
            //                            } else {
            //                                //显示首页
            //                                $("#IndexInfo").css("display", "block");
            //                                sessionStorage.setItem("voucher", data.MemberGUID);
            //                                sessionStorage.setItem("MemberName", data.MemberName);
            //                            }
            //                        });
            //                    } else {
            //                        $("#BindInfo").css("display", "block");
            //                        $("#Back1").css("display", "block");
            //                    }
            //                });
            //            } else {
            //                $("#IndexInfo").css("display", "block");
            //            }
            /*通过session取用户访问的页面下标*/

            /*
            var index = sessionStorage.getItem("index") == null ? 0 : sessionStorage.getItem("index");
            $("#IndexInfo").find(".Index").css("display", "none");
            if (index == 0) {
            //初始化首页数据
            InitControl.InitGrid();
            $("#NavHome").attr('src', '/Mobile/WeChat/_image/nav_home_c.png')
            $("#NavAddress").attr('src', '/Mobile/WeChat/_image/nav_address.png')
            $("#NavOrder").attr('src', '/Mobile/WeChat/_image/nav_order.png')
            $("#NavMine").attr('src', '/Mobile/WeChat/_image/nav_mine.png')
            $("#Index0").css("display", "block");
            } else if (index == 1) {
            //初始化附近数据
            //InitControl.InitMenberInfo();
            $("#NavHome").attr('src', '/Mobile/WeChat/_image/nav_home.png')
            $("#NavAddress").attr('src', '/Mobile/WeChat/_image/nav_address_c.png')
            $("#NavOrder").attr('src', '/Mobile/WeChat/_image/nav_order.png')
            $("#NavMine").attr('src', '/Mobile/WeChat/_image/nav_mine.png')
            $("#Index1").css("display", "block");
            } else if (index == 2) {
            //初始化订单数据
            //InitControl.InitMenberInfo();
            $("#NavHome").attr('src', '/Mobile/WeChat/_image/nav_home.png')
            $("#NavAddress").attr('src', '/Mobile/WeChat/_image/nav_address.png')
            $("#NavOrder").attr('src', '/Mobile/WeChat/_image/nav_order_c.png')
            $("#NavMine").attr('src', '/Mobile/WeChat/_image/nav_mine.png')
            $("#Index2").css("display", "block");
            } else if (index == 3) {
            //初始化我的数据
            InitControl.InitMenberInfo();
            $("#NavHome").attr('src', '/Mobile/WeChat/_image/nav_home.png')
            $("#NavAddress").attr('src', '/Mobile/WeChat/_image/nav_address.png')
            $("#NavOrder").attr('src', '/Mobile/WeChat/_image/nav_order.png')
            $("#NavMine").attr('src', '/Mobile/WeChat/_image/nav_mine_c.png')
            $("#Index3").css("display", "block");
            }
            */
            //调试使用
            //            sessionStorage.setItem("voucher", "64F0FDA6-336D-497F-8C69-6A23615112A8");
            //            $("#IndexInfo").css("display", "block");
            //            $("#BindInfo").css("display", "none");
            //            $("#Back1").css("display", "none");
        },
        //点击底部
        ClickBottom: function (obj) {
            $("#IndexInfo").find(".Index").css("display", "none");
            switch ($(obj).find("p").text().trim()) {
                case "首页":
                    $("#NavHome").attr('src', '/Mobile/WeChat/_image/nav_home_c.png')
                    $("#NavAddress").attr('src', '/Mobile/WeChat/_image/nav_address.png')
                    $("#NavOrder").attr('src', '/Mobile/WeChat/_image/nav_order.png')
                    $("#NavMine").attr('src', '/Mobile/WeChat/_image/nav_mine.png')
                    $("#Index0").css("display", "block");
                    $("#Index3").css("display", "none");
                    sessionStorage.setItem("index", 0);
                    InitControl.InitGrid();
                    break;
                case "附近":
                    $("#NavHome").attr('src', '/Mobile/WeChat/_image/nav_home.png')
                    $("#NavAddress").attr('src', '/Mobile/WeChat/_image/nav_address_c.png')
                    $("#NavOrder").attr('src', '/Mobile/WeChat/_image/nav_order.png')
                    $("#NavMine").attr('src', '/Mobile/WeChat/_image/nav_mine.png')
                    sessionStorage.setItem("index", 1);
                    $("#Index1").css("display", "block");
                    break;
                case "订单":
                    $("#NavHome").attr('src', '/Mobile/WeChat/_image/nav_home.png')
                    $("#NavAddress").attr('src', '/Mobile/WeChat/_image/nav_address.png')
                    $("#NavOrder").attr('src', '/Mobile/WeChat/_image/nav_order_c.png')
                    $("#NavMine").attr('src', '/Mobile/WeChat/_image/nav_mine.png')
                    sessionStorage.setItem("index", 2);
                    $("#Index2").css("display", "block");
                    break;
                case "我的":
                    $("#NavHome").attr('src', '/Mobile/WeChat/_image/nav_home.png')
                    $("#NavAddress").attr('src', '/Mobile/WeChat/_image/nav_address.png')
                    $("#NavOrder").attr('src', '/Mobile/WeChat/_image/nav_order.png')
                    $("#NavMine").attr('src', '/Mobile/WeChat/_image/nav_mine_c.png')
                    $("#Index3").css("display", "block");
                    sessionStorage.setItem("index", 3);
                    InitControl.InitMenberInfo();
                    break;
                default:
                    break;
            }
        },

        //初始化首页数据
        InitGrid: function () {
            $("#RecommendedProducts").html("");
            PubAjax.post("RecommendedProducts", { ProjGUID: sessionStorage.getItem("ProjGUID") }, function (data) {
                var html = "";
                $.each(data.MerchandiseGrid, function (index, item) {
                    html += ' <div class="tour" ConvertGUID="' + item.ConvertGUID + '">\
                                \<img alt="" style="width: 30%; height: .85rem;" src="' + item.ImgSrc + '" />\
                                    \<div class="right">\
                                        \<div class="text">' + item.ConvertName + '</div>\
                                        \<div class="price">\
                                            \<span class="h25">' + item.Score + '</span> <a class="h25">' + (item.ConvertClass == "礼品" ? "立即查看" : "立即兑换") + '</a>\
                                        \</div>\
                                    \</div>\
                                \</div>';
                });
                $("#RecommendedProducts").append(html);
                $("#RecommendedProducts .tour").click(function () {
                    window.location.href = "/Mobile/WeChat/PointsMallManager/PointsMallInfo.htm?id=" + escape($(this).attr("ConvertGUID"));
                });
            });
        },
        //初始化会员数据
        InitMenberInfo: function () {
            PubAjax.post("GetMemberInfo", { "type": 0 }, function (data) {
                $("#headimgurl").attr("src", data.WeiChatUserInfo.headimgurl);
                var DataList = "MemberName;MemberScore;MemberLevel;LevelName;CouponNum;MemberCode";
                var Dataarray = DataList.split(";");
                PubUtil.Set(Dataarray, data.MemberInfo);
                $("#MemberCode1").text(data.MemberInfo.MemberCode)
                MemberInfo = data.MemberInfo;
            });
        },
        //点击扫我
        PhoneQRCode: function () {
            PubAjax.post("GetPhoneQRCode", { "MobilePhone": MemberInfo.MemberCode }, function (data) {
                $("#MobilePhoneQRCode").attr("src", 'data:image/jpeg;base64,' + data.MobilePhoneQRCode);
            });
            $("#hide-body").css("display", "block");
            $("#Back").css("display", "block");
        },
        //点击二维码关闭
        PhoneClose: function () {
            $("#hide-body").css("display", "none");
            $("#Back").css("display", "none");
        },
        //点击排序
        InitStyleSheet: function () {

            var panelSwitch = true;

            $('.recommendMerchant_sort_item>li').on('click', function (ev) {
                ev.bubbles = false;

                switch ($(this).text().trim()) {
                    case "好评优先":
                        alert("好评优先");
                        break;
                    case "距离最近":
                        alert("距离最近");
                        break;
                    case "筛选":
                        alert('筛选');
                        break;
                    default:
                        if (panelSwitch) {
                            //计算搜索栏高度
                            var search_height = $('.searchWrapper').height() + parseInt($('.searchWrapper').css('padding-top')) + parseInt($('.searchWrapper').css('padding-bottom'))

                            //计算推荐商家高度
                            var recommendMerchant_height = $('.index0_TopWrapper').height() + $('.index0_MiddleWrapper').height() + $('.swiper-container').height() + $('.recommendMerchant_title').height();

                            $('.searchWrapper').css({ position: 'fixed', top: '0', 'z-index': '11' })
//                            $('.recommendMerchant_content').css({ position: 'fixed', top: search_height, 'z-index': '11' })
                            $("html,body").animate({ scrollTop: 411 }, 500);

                            $('.sort_mode').css({ display: 'block' });
                            $('.recommendMerchant_shadow').css({ display: 'block' });
                            $('.sort_triangle').removeClass('fa-caret-down').addClass('fa-caret-up').css('color', '#1B8CE0');

                            //取消浮动
                            $('.recommendMerchant_sort_item').css({ position: 'relative', top: '0', 'z-index': '1' })

                            //遮罩打开后阻止滚动
                            $('html,body').addClass('ovfHiden'); //使网页不可滚动

                            panelSwitch = false;
                        }
                        else {
                            $('.sort_mode').hide()
                            $('.recommendMerchant_shadow').css({ display: 'none' });
                            $('.sort_triangle').removeClass('fa-caret-up').addClass('fa-caret-down').css('color', 'gray');

                            $('html,body').removeClass('ovfHiden'); //打开网页滚动
                            panelSwitch = true;
                        }


                        break;
                }

                $('.recommendMerchant_shadow').off('click').on('click', function () {
                    $('.recommendMerchant_shadow').hide();
                    $('.sort_mode').hide()
                    $('.sort_triangle').removeClass('fa-caret-up').addClass('fa-caret-down').css('color', 'gray');

                    $('html,body').removeClass('ovfHiden'); //打开网页滚动

                    panelSwitch = true;
                })

                //综合排序选项
                $('.sort_mode ul li').off('click').on('click', function (ev) {
                    $('.check').remove()
                    $(ev.currentTarget).append('<span class="check"><i class="fa fa-check"></i></span>')
                    $('.sort_triangle').parent().find("span").text($(ev.currentTarget).find('span:first').text().trim());
                });
            })
        },


        //初始化商家表单
        InitCustomerInfo: function () {


        }

    }
})();

var ResultValidCode;
//绑定
var Bind = (function () {
    return {
        //获取验证码
        BindValidCode: function () {
            if ($("#MobilePhone").val() == "") {
                pop.notice('请输入手机号', 1);
                return false
            }
            var RegCellPhone = /^([0-9]{11})?$/;
            if (RegCellPhone.test($("#MobilePhone").val())) {
                PubAjax.post("BindValidCode", { MobilePhone: $("#MobilePhone").val() }, function (data) {
                    if (data.result == 'true') {
                        ResultValidCode = data.validcode;
                        var time = 120;
                        $("#btn_ValidCode").attr("disabled", true);
                        $("#btn_ValidCode").text(time-- + " 秒");
                        var timer = setInterval(function () {
                            if (time > 0) {
                                $("#btn_ValidCode").text(time-- + " 秒");
                                $("#btn_ValidCode").attr("disabled", true);
                            } else {
                                clearInterval(timer);
                                $("#btn_ValidCode").text("获取验证码");
                                $("#btn_ValidCode").attr("disabled", false);
                            }
                        }, 1000);
                    } else {
                        pop.notice('获取验证码失败！请您稍后再试', 2);
                    }
                });
            } else {
                pop.notice('手机号不合法', 1);
                return false
            }
        },
        BindMobilePhone: function () {
            if ($("#MemberName1").val() == "") {
                pop.notice('请输入姓名', 2);
                return false;
            }
            if ($("#Birthday").val() == "") {
                pop.notice('请选择生日', 2);
                return false;
            }
            if ($("#ValidCode").val() == "") {
                pop.notice('请输入验证码', 2);
                return false;
            }
            //            if ($("#ValidCode").val() != ResultValidCode) {
            //                pop.notice('验证码输入不正确', 2);
            //                return false;
            //            }
            var JsonDate = {
                openid: openid,
                access_token: access_token,
                MobilePhone: $("#MobilePhone").val(),
                type: "0",
                MemberName: $("#MemberName1").val(),
                Birthday: $("#Birthday").val(),
                MaritalStatus: $("#MaritalStatus option:checked").val()
            }
            PubAjax.post("BindMobilePhone", JsonDate, function (data) {
                if (data.result == "true") {
                    sessionStorage.setItem("voucher", data.voucher);
                    $("#IndexInfo").css("display", "block");
                    $("#BindInfo").css("display", "none");
                    $("#Back1").css("display", "none");
                } else {
                    pop.notice('绑定失败！请您稍后再试', 2);
                    $("#MemberPhone").val("");
                }
            });

        }
    }
})();



