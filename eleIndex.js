PubAjax = (function () {
    return {
        post: function (BusinessType, date, successFun, errorFun, completeFunc) {
            date = date || {};
            date.voucher = sessionStorage.getItem("voucher");
            if (BusinessType) {
                date.BusinessType = BusinessType;
            }
            date.BusinessData = {};
            var result;
            $.ajax({
                type: "POST",
                url: "/Mobile/WeChat/IndexPage.aspx",
                cache: false,
                data: date,
                dataType: "json",
                async: false,
                success: successFun,
                error: errorFun,
                complete: completeFunc
            });
        }
    }
})();


//公共方法 =======================
//控制字符
function LimitNumber(txt, maxLetter) {
    var str = txt;
    str = str.substr(0, maxLetter) + '...';
    return str;
}

//页面初始化
window.onload = function () {
    //定位
    //    position.isGetLocation();
    // 初始化轮播图
    InitControl.initCarousel();
    //初始化
    InitControl.init();

    //初始化搜索
    InitControl.initSearch();
    //初始化 排序
    InitControl.InitSort();
    //加载 下拉刷新
    InitControl.initPullRefresh();
    //跳转详情页面
    InitControl.initCommodityDetails();

   
}

var count = 1;
var openid = "";
var access_token = "";
var MemberInfo = {};

//初始化控制
var InitControl = (function () {
    return {
        init: function (filterKey) {
            //            sessionStorage.setItem("ProjGUID", "64F0FDA6-336D-497F-8C69-6A23615112A8");
            /*此判断防止用户在第一次进入时刷新的凭证失效导致获取用户数据失败*/
            //            var code = PubRequest.Query("code");
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

            $("#NavHome").attr('src', '/Mobile/WeChat/_image/nav_home_c.png')
            $("#NavAddress").attr('src', '/Mobile/WeChat/_image/nav_address.png')
            $("#NavOrder").attr('src', '/Mobile/WeChat/_image/nav_order.png')
            $("#NavMine").attr('src', '/Mobile/WeChat/_image/nav_mine.png')

            //调试使用
            //            sessionStorage.setItem("voucher", "64F0FDA6-336D-497F-8C69-6A23615112A8");
            //            $("#IndexInfo").css("display", "block");
            //            $("#BindInfo").css("display", "none");
            //            $("#Back1").css("display", "none"); 

            //初始化数据
            PubAjax.post("selectCustomerBrandInfo", {
                filter: filterKey
            },
            function (result) {
                // 商品列表
                $(result.contract_customer_brand_list).each(function (i, item) {
                    if (i < 10 * count) {
                        console.log(count);
                        $('.recommendMerchant_content_list_itemWrapper').append("<div class='recommendMerchant_content_list_item' data-contractGUID=" + item.ContractGUID + " data-customerGUID=" + item.CustomerGUID + ">" +
                                    "<div class='recommendMerchant_content_list_left'>" +
                                        "<div class='recommendMerchant_content_list_left_topImg'>" +
                                            "<img src='../../_image/Login.jpg' />" +
                                        "</div>" +
                                    "</div>" +
                                    "<div class='recommendMerchant_content_list_right'>" +
                                        "<div class='recommendMerchant_content_list_right_brandName'>" +
                                            "<span class='brandNameFont'>" + item.BrandName + "</span> <span class='brandNameIcon'>...</span>" +
                                        "</div>" +
                                        "<div class='recommendMerchant_content_list_right_starLeve  l'>" +
                                            " <span class='starLevelIcon'><i class='fas fa-star'></i><i class='fas fa-star'></i><i" +
                                                "class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>" +
                                            "</span><span class='starLevelNum'>4.8</span> <span>月售705</span>" +
                                        "</div>" +
                                        "<div class='recommendMerchant_content_list_right_dispatchingInfo clearfix'>" +
                                            "<span><span>起送￥15元</span> <i>|</i> <span>配送￥4元</span> </span><span>38分钟|173m</span>" +
                                        "</div>" +
                                        "<div class='recommendMerchant_content_list_right_category'>" +
                                            "<span>" + item.FormatTypeName + "</span>" +
                                        "</div>" +
                                        "<div class='recommendMerchant_content_list_right_fullReduction'>" +
                                            "<i class='fullReduction_bargainPrice'>满减</i><span>满10减6,满30减15,满50减20</span>" +
                                        "</div>" +
                                        "<div class='recommendMerchant_content_list_right_bargainPrice'>" +
                                            "<i class='fullReduction_bargainPrice'>特价</i><span>特价商品一元起</span>" +
                                        "</div>" +
                                        "<div class='recommendMerchant_content_list_right_nearby'>" +
                                            "<i class='fas fa-map-marker-alt'></i><span>附近还有4家大米先生</span>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>")
                    }
                })
            })
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
        InitSort: function () {
            $('.recommendMerchant_sort_item').on('click', function (ev) {
                switch ($(this).text().trim()) {
                    case "好评优先":
                        InitControl.init("好评优先")
                        break;
                    case "距离最近":
                        InitControl.init("距离最近")
                        break;
                    case "筛选":
                        InitControl.init("筛选")
                        break;
                    default:
                        if (!$('.recommendMerchant_sort_item').eq(0).find('i').hasClass('fa-caret-up')) {
                            if ($('.searchPage').css("display") == "none") {
                                Index0.scrollToElement($('.recommendMerchant')[0]);
                            }
                            $('.sort_triangle').removeClass('fa-caret-down').addClass('fa-caret-up').css('color', '#1B8CE0');
                            $('.recommendMerchant_shadow, .sort_mode').show();
                            Index0.disable();
                        } else {
                            $('.sort_triangle').removeClass('fa-caret-up').addClass('fa-caret-down').css('color', 'gray');
                            var node = ev.target;
                            while (node.tagName != "DIV") {
                                node = node.parentNode;
                            }
                            if (!$(node).hasClass("sort_mode_content_first")) {
                                $('.check').remove();
                                $(node).append('<span class="check"><i class="fa fa-check"></i></span>');
                            }
                            $('.sort_mode_content_Item_font').text(LimitNumber($(node).find('span').eq(0).text(), 4));
                            $('.recommendMerchant_shadow, .sort_mode').hide();
                            InitControl.init($(node).find('span').eq(0).text());
                            Index0.enable();
                        }
                        break;
                }
                $('.recommendMerchant_shadow').off('click').on('click', function () {
                    $('.recommendMerchant_shadow, .sort_mode').hide();
                    Index0.enable();
                    $('.sort_triangle').removeClass('fa-caret-up').addClass('fa-caret-down').css('color', 'gray');
                })
            })
        },
        //点击搜索
        initSearch: function () {
            function searchPost(search) {
                PubAjax.post("selectCustomerBrandInfo", { filter: search }, function (result) {
                    if (result) {
                        $(".searchResultList_item").remove();
                        $.each(result.contract_customer_brand_list, function (i, item) {
                            $(".brandInfoList").append(
                                        '<div class="searchResultList_item" data-contractguid=' + item.ContractGUID + '>' +
                                            '<div class="searchResultList_left">' +
                                                '<img src="../../_image/Login.jpg"/> ' +
                                            ' </div>' +
                                            '<div class="searchResultList_right">' +
                                                '<div class="searchList_brandName"><span>' + item.BrandName + '</span></div> ' +
                                                ' <div class="searchList_onSale"><span>*****4.6 月售1667</span></div>  ' +
                                                 ' <div class="searchList_arrivePrice">   ' +
                                                 ' <span>起送￥15 优惠配送￥1.5</span>     ' +
                                                 '  <div class="searchList_contentRight">   ' +
                                                    '<span>34</span>分钟    ' +
                                                   ' <span>911</span>m  ' +
                                                '</div>  ' +
                                            '</div>' +
                                            '<div class="searchList_formatType"><span>' + item.FormatTypeName + '</span></div>' +
                                            '<div class="searchList_fullReduction"><i>满减</i><span>满25减8，满35减10，满55减20</span></div>' +
                                            '<div class="searchList_member"><i>会员</i><span>超级会员领8元无门槛红包</span></div>' +
                                            '<div class="searchList_show">' +
                                                '<div class="searchList_show_img"></div>' +
                                                '<div class="searchList_show_img"></div>' +
                                                '<div class="searchList_show_img"></div>' +
                                            '</div>' +
                                        '</div>' +
                                        '</div>'
                                    )
                            $('.searchResult').show();
                            Index0.disable();
                            $('#search_inner_scroller').prepend($('.recommendMerchant_sort')[0]);
                            window.setTimeout(function () {
                                searchScroll = new IScroll("search_inner_wrapper", {
                                    probeType: 3
                                })
                                searchScroll.on("scroll", searchScrollAnimate)
                                searchScroll.on("scrollEnd", searchScrollAnimate)
                            }, 100)
                            function searchScrollAnimate() {
                                var y = this.y >> 0;
                                if (y < -40) {
                                    $('.searchPage').append($('.recommendMerchant_sort')[0])
                                    $('.searchPage').append($('.like_commodity')[0])
                                    $('.recommendMerchant_sort').addClass('recommendMerchant_sort_position')
                                    $('.like_commodity').addClass('like_commodity_position')
                                    $('.searchPage').css("padding", 0)
                                } else {
                                    $('#search_inner_scroller').prepend($('.like_commodity')[0])
                                    $('#search_inner_scroller').prepend($('.recommendMerchant_sort')[0])
                                    $('.recommendMerchant_sort').removeClass('recommendMerchant_sort_position')
                                    $('.like_commodity').removeClass('like_commodity_position')
                                    $('.searchPage').css("padding", ".1rem");
                                }
                            }
                        })
                    }
                })
            }


            var searchScroll;
            $('#search input').on("touchstart", function (e) {
                $(".searchPage").show();
                var history = localStorage.getItem("history");
                if (history) {
                    history = history.split(',');
                    refreshHistory(history);
                } else {
                    $('.history').empty().append('<div class="history_title"><span>历史搜索</span><i class="far fa-trash-alt"></i></div>');
                    return;
                }
            });
            $('.header_left').on("click", function () {
                $(".searchPage").hide();
                $('.searchResult').hide();
                Index0.enable();
                var scrollTop = $('.scroller').css('transform').replace(/[^0-9\-,]/g, '').split(',')[5]
                if (scrollTop < -440) {
                    $('.recommendMerchant_sort').insertAfter('.searchWrapper');
                } else {
                    $('.recommendMerchant_content').prepend($('.recommendMerchant_sort')[0]);
                }
                if (searchScroll) {
                    searchScroll.disable();
                }
            });
            $(".header_right").on("click", function () {
                var historyValue = localStorage.getItem("history");
                var addValue = $(".searchContent input").val().trim();
                if (!addValue) {
                    return;
                }
                if (!historyValue) {
                    localStorage.setItem("history", addValue);
                }

                if (historyValue && $.inArray(addValue, historyValue.split(',')) == -1) {
                    if (historyValue.split(",").length == 10) {
                        historyArray = historyValue.split(",");
                        historyArray.pop();
                        historyArray.unshift(addValue);
                        localStorage.setItem("history", historyArray);
                    }
                    else {
                        localStorage.setItem("history", addValue + "," + historyValue)
                    }
                }
                searchPost($('.searchContent input').val().trim());

            });
            function refreshHistory(history) {
                $('.history').empty().append('<div class="history_title"><span>历史搜索</span><i class="far fa-trash-alt"></i></div>');
                $('.fa-trash-alt').on('click', function () {
                    localStorage.clear();
                    $('.history').empty().append('<div class="history_title"><span>历史搜索</span><i class="far fa-trash-alt"></i></div>');
                });
                $.each(history, function (i, item) {
                    $('.history').append('<div class="history_content">' + item + '</div>');
                })
                $('.history_content').on('click', function (e) {
                    searchPost($(this).text())
                    $('.searchContent input').val($(this).text())
                });
            }
        },
        //下拉刷新
        initPullRefresh: function () {
            function updateCSS() {
                //计算推荐商家高度
                var recommendmerchant_height = $('.index0_TopWrapper').outerHeight() + $('.index0_MemberInfo').outerHeight() + $('.swiper-container').outerHeight() + $('.recommendMerchant_title').outerHeight() + $('.pullDown').outerHeight() - $('.searchWrapper').outerHeight();

                if (this.y > -$('.currentAddressWrapper').outerHeight() - $('.pullDown').outerHeight()) {
                    $('.currentAddressWrapper').after($('.searchWrapper')[0])
                }

                else if (this.y <= -$('.currentAddressWrapper').outerHeight() - $('.pullDown').outerHeight()) {
                    $('#IndexInfo').prepend($('.searchWrapper')[0]).find('.searchWrapper')
                }
                if (this.y <= -recommendmerchant_height) {
                    $('.searchWrapper').after($('.recommendMerchant_sort')[0])
                }
                else if (this.y > -recommendmerchant_height) {
                    $('.recommendMerchant_content').prepend($('.recommendMerchant_sort')[0])
                }
            }

            function pullUp() {
                setTimeout(function () {
                    //上滑 加载更多
                    InitControl.init();
                    Index0.refresh();
                }, 1000);
                count++;
            }
            function pullDown() {
                setTimeout(function () {
                    //下滑 刷新
                    Index0.refresh();
                    Index0.scrollTo(0, -$('.pullDown').outerHeight());
                }, 1000);
            }
            //下拉刷新
            refresher.init({
                id: 'Index0',
                pullUpAction: pullUp,
                pullDownAction: pullDown
            })

            Index0.on('scroll', updateCSS);

        },
        //初始化轮播
        initCarousel: function () {
            PubAjax.post("selectCarousel", {}, function (result) {
                //搜索栏下方商品 数据
                $('.customerContainer').empty();
                $(result.topBrandList).each(function (i, item) {
                    $('.customerContainer').append('<div>' + item.GoodsName + '</div>');
                });


                //轮播图数据
                $('.swiper-slide-active > div').empty()
                $('.swiper-slide-next > div').empty()
                $(result.carouselBrandList).each(function (i, item) {
                    if (i < 10) {
                        $('.swiper-slide-active > div').append("<div class='swiperItem'>" +
                                            "<div class='swiperItem_top'>" +
                                                "<img src='../../_image/Login.jpg' />" +
                                            "</div>" +
                                            "<div class='swiperItem_bottom'>" +
                                                LimitNumber(item.FormatTypeName, 2) + "</div>" +
                                        "</div>"
                                        )
                    }
                    else {
                        $('.swiper-slide-next > div').append("<div class='swiperItem'>" +
                                            "<div class='swiperItem_top'>" +
                                                "<img src='../../_image/Login.jpg' />" +
                                            "</div>" +
                                            "<div class='swiperItem_bottom'>" +
                                                LimitNumber(item.FormatTypeName, 2) + "</div>" +
                                        "</div>"
                                        )
                    }
                });
                //轮播插件 自动
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
                //轮播插件 手动
                var swiper = new Swiper('.index0_MemberInfo', {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                });
            });
        },
        //跳转 商品详情
        initCommodityDetails: function () {
            $(".recommendMerchant_content_list_item").on("click", function () {
                var contractguid = $(this).data("contractguid");
                var CustomerGUID = $(this).data("customerguid");
                location.href = "commodityDetail.htm?contractguid=" + escape(contractguid) + "&brandName=" + escape($(this).find('.brandNameFont').text()) + "&customerGUID=" + escape(CustomerGUID);
            });
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

/*
1、功能描述：首页定位功能
xhp
*/
//var position = (function () {
//    return {
//        isGetLocation: function () {
//            //如果没有地址的缓存则重新获取定位
//            if (sessionStorage.getItem("addr") == null) {
//                position.getLocation();
//            } else {
//                $("#addr").text(sessionStorage.getItem("name") == null ? sessionStorage.getItem("addr") : sessionStorage.getItem("name") == null ? "" : sessionStorage.getItem("name"));

//            }

//        },
//        //获取当前用户位置信息
//        getLocation: function () {
//            //初始化定位组件 
//            var geolocation = new qq.maps.Geolocation();
//            //timeout 调用API超市时间默认10s  failTipFlag 判断用户如果未授权是否重新提示授权
//            var options = { timeout: 9000, failTipFlag: true };
//            var position = geolocation.getLocation(showPosition, errPosition, options);

//            //定位成功回调函数
//            function showPosition(position) {
//                //返回结果说明
//                //    "module":"geolocation",
//                //    "nation": "中国",
//                //    "province": "广州省",
//                //    "city":"深圳市",
//                //    "district":"南山区",
//                //    "adcode":"440305", //行政区ID，六位数字, 前两位是省，中间是市，后面两位是区，比如深圳市ID为440300
//                //    "addr":"深圳大学杜鹃山(白石路北250米)",
//                //    "lat":22.530001, //火星坐标(gcj02)，腾讯、Google、高德通用
//                //    "lng":113.935364,
//                //    "accuracy":13 //误差范围，以米为单位 
//                // alert(JSON.stringify(position, null));
//                //缓存微信信息
//                sessionStorage.setItem("nation", position.nation);
//                sessionStorage.setItem("province", position.province);
//                sessionStorage.setItem("city", position.city);
//                sessionStorage.setItem("district", position.district);
//                sessionStorage.setItem("adcode", position.adcode);
//                sessionStorage.setItem("addr", position.addr);
//                sessionStorage.setItem("lat", position.lat);
//                sessionStorage.setItem("lng", position.lng);
//                sessionStorage.setItem("accuracy", position.accuracy);
//                $("#addr").text(sessionStorage.getItem("addr"));

//            }
//            //定位失败回调函数
//            function errPosition(position) {
//                alert("定位失败！请您刷新后重新确认定位授权。");
//            }
//        },
//        openSelAddress: function () {
//            window.location.href = "/Mobile/WeChat/selAddress.htm";
//        }

//    }
////})()
 
