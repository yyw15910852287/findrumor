/*
 * @Author: hzp
 * @Date:   2017-07-28 16:38:32
 * @Last Modified by:   dell
 * @Last Modified time: 2017-09-11 16:12:58
 */
//页内搜索


var getKwName ="";
var isTitleKeyWorld = true;
var searchTitle = "";
var searchTime ="";
var searchType = "";
var startTime = "";
var endTime = "";

function getKw() {
    //获得url中的关键词
    var searchInput = document.querySelector(".search input:first-child")
    	kw="";
    kw = searchInput.value;
	
	//获得url中的关键词
    /*var ws = window.location.search,
        searchInput = document.querySelector(".search-content input:first-child"),
        s = (function(){
            var arr=ws.split("kw=");
            if(arr.length>1){
                return arr[1]
            }else{
                return ""
            }
        })(),
        kw=""
    ;
	
	console.log(s)
    if (!s) {
        kw = "辟谣";
    }else{
        kw = $.trim(decodeURI(s));
    }*/	
	searchInput.value = kw;	
	//console.log(window.location.hash)
	//window.location.href = "http://www.piyao.org.cn/frontsql.htm?kw="+kw;
	
    getDate({
        siteId: "",
        pageNo: 1,
        pageSize: "",
        keyword: kw,
        callBack: ""
    });
    getKwName = kw;
}




function getDate(opt) {
    var opt = opt || {},
        // siteId = opt.siteId || 11118,
        siteId = opt.siteId || 11322,
        pageNo = opt.pageNo || 1,
        pageSize = opt.pageSize || 200,
        keyword = opt.keyword || "",
        callBack = opt.callBack || "?";
	var filterTime = "&startTime=" + startTime + "&endTime=" + endTime;
	//console.log("filterTime:"+filterTime);
		
	if(isTitleKeyWorld){
		searchTitle = "title=" + keyword;
	}else{
		searchTitle = "content=" + keyword;
	}
    $.ajax({
        // url: "http://so.xinhuanet.com/xhtvapp/getRumour?siteid=" + siteId + "&pageNo=" + pageNo + "&pageSize=" + pageSize + "&keyword=" + keyword + "&callback=" + callBack,sort
		url:"http://so.news.cn/xhtvapp/rumourSearch?"+ searchTitle +"&pageNum=" + pageNo + "&timeInterval=" + searchTime + filterTime + "&typeName=" + searchType + "&pageSize=" + pageSize + "&sort=-1&callback=" + callBack,
        dataType: "jsonp",
        success: function(d) {
            //测试全文搜索接口
            // console.log(d.content);
            if (d.code != 200) return;
            renderList(d);
        }
    })
}

function renderList(d) {
	//console.log(!d.content.url)
    if(!d.content.resultList){
		$(".search_list").html("");
		$(".fenye").html("");
		listBox = document.querySelector(".search_list");
		listBox.innerHTML = '<div class="tagTxt">暂无相关辟谣信息，请【<a href="http://www.piyao.org.cn/xxjbrk.htm" target="_blank">点击这里</a>】提交谣言线索。</div>';

		return;
	} 
    var tit = $(".search_num span"),
        listBox = document.querySelector(".search_list"),
        pageNumBox = document.querySelector(".fenye"),
        pageNo = d.content.pageNum - 0||1,//----当前页码
        pageSize = d.content.pageSize - 0,//---每页条数
        pageTotal = d.content.pageTotal - 0,//-总页数
        totalCount = d.content.totalCount - 0,//--总条数
        i = 0,
        len,//--------实际每页渲染条数
        _len=d.content.resultList.length,
        contStr = "",
        pageStr = "",
        dataTit = "",
        dataLlink = "",
        dataTime = "",
        dataOrign = "",
        dataAbstract = "",
        pagePre = '<div class="previous" data-pageNum=' + (((pageNo - 1) > 0) ? (pageNo - 1) : pageNo) + '>上一页</div>',
        pageNext = '<div class="next" data-pageNum=' + (((pageNo + 1) > pageTotal) ? pageNo : (pageNo + 1)) + '>下一页</div>',
        pageNumShow = 5, //显示几个页码，最好为奇数
        midPageNum = Math.floor(pageNumShow / 2) //中数
    ;
	
    len = _len;
	//console.log("len"+len)

    for (; i < len; i++) {
        //console.log(i,d.content.resultList[i].url);
        dataTit = d.content.resultList[i].title || "";
       /* dataLlink = (function(linkStr) {
            var linkStr = $.trim(linkStr);

            if (!linkStr) return "";
            if (linkStr.length > 0 && (linkStr.indexOf("[") != -1 || linkStr.indexOf("]") != -1)) {
                linkStr = "http://" + linkStr.split("[")[1].split(']')[0].split(",")[0];
            }

            return linkStr;
        })(d.content.resultList[i].originalUrl); //未发现link/url字段*/
		
		dataLlink = d.content.resultList[i].url;
        dataTime = d.content.resultList[i].createDate || "2017-07-28";
        dataOrign = d.content.resultList[i].sourceName || "";
        dataAbstract = d.content.resultList[i].summary;
        dataTag = d.content.resultList[i].tag;
		dataTime = dataTime.substring(0, 10);
		if(dataTit.indexOf(getKwName)>-1){
			dataTit = dataTit.replace(getKwName,'<font color="red">'+getKwName+'</font>');
		}
		

        // contStr += '<li><div class="tittle"><a href="' + dataLlink + '" target="_blank">' + dataTit + '</a><span>' + dataTime + '&nbsp;&nbsp;&nbsp;&nbsp;来源: ' + dataOrign + '</span></div><div class="txt">' + dataAbstract + '</div></li>';
		/*
				if(item.keyword=="谣言"){
		       		var itemHtml = '<li class="tag1"><a href="'+item.LinkUrl+'" target="_blank">'+item.Title+'</a>'+getListTxt(item)+'</li>';
				}else if(item.keyword=="事实"){
		       		var itemHtml = '<li class="tag2"><a href="'+item.LinkUrl+'" target="_blank">'+item.Title+'</a>'+getListTxt(item)+'</li>';
				}else if(item.keyword=="误区"){
		       		var itemHtml = '<li class="tag3"><a href="'+item.LinkUrl+'" target="_blank">'+item.Title+'</a>'+getListTxt(item)+'</li>';
				}else if(item.keyword=="辟谣"){
		       		var itemHtml = '<li class="tag4"><a href="'+item.LinkUrl+'" target="_blank">'+item.Title+'</a>'+getListTxt(item)+'</li>';
				}
			*/
		console.log(dataTag)

		if(dataTag=="谣言"){
			contStr += '<li class="tag1"><a href="'+dataLlink+'" target="_blank">'+ HTMLDecode(dataTit) +'</a></li>';
		}else if(dataTag=="事实"){
			contStr += '<li class="tag2"><a href="'+dataLlink+'" target="_blank">'+ HTMLDecode(dataTit) +'</a></li>';
		}else if(dataTag=="误区"){
			contStr += '<li class="tag3"><a href="'+dataLlink+'" target="_blank">'+ HTMLDecode(dataTit) +'</a></li>';
		}else if(dataTag=="辟谣"){
			contStr += '<li class="tag4"><a href="'+dataLlink+'" target="_blank">'+ HTMLDecode(dataTit) +'</a></li>';
		}
		
		
    };
    i = 0;
    //页码
    // console.log(pageNo);
    if (pageTotal >= pageNumShow) {
        for (; i < pageNumShow; i++) {
            if ((pageNo - midPageNum) > midPageNum && (pageNo + midPageNum) < pageTotal) {
                // console.log("中间");
                if (i < midPageNum) {
                    pageStr += '<li class="pageNum">' + (pageNo - (midPageNum - i)) + '</li>';
                } else if (i == midPageNum) {
                    pageStr += '<li class="on pageNum">' + pageNo + '</li>';
                } else {
                    pageStr += '<li class="pageNum">' + (pageNo + (i - midPageNum)) + '</li>';
                }
            } else if ((pageNo - midPageNum) <= midPageNum) {
                // console.log("左端");
                if ((i + 1) == pageNo) {
                    pageStr += '<li class="on pageNum">' + pageNo + '</li>';
                    continue;
                }
                pageStr += '<li class="pageNum">' + (i + 1) + '</li>';
            } else if ((pageNo + midPageNum) >= pageTotal) {
                // console.log("右端");
                if ((pageTotal - (pageNumShow - i) + 1) == pageNo) {
                    // console.log("相等");
                    pageStr += '<li class="on pageNum">' + pageNo + '</li>';
                    continue;
                }
                pageStr += '<li class="pageNum">' + (pageTotal - (pageNumShow - i) + 1) + '</li>';
            }
        }
    } else {
        for (; i < pageTotal; i++) {
            if ((i + 1) == pageNo) {
                pageStr += '<li class="on pageNum">' + pageNo + '</li>';
                continue;
            }
            pageStr += '<li class="pageNum">' + (i + 1) + '</li>';
        }
    }
    i = 0;
    //tit.html("为您找到相关内容" + totalCount + "篇");
	//console.log("contStr:"+contStr)
	if(contStr==""){
    	listBox.innerHTML = '<div class="tagTxt">暂无相关辟谣信息，请【<a href="http://www.piyao.org.cn/xxjbrk.htm" target="_blank">点击这里</a>】提交谣言线索。</div>';
	}else{
  	    listBox.innerHTML = contStr;
	}
	//console.log("输出html")
    if ((pageNo + pageNumShow) <= pageTotal) {
        pageNumBox.innerHTML = pagePre + '<ul class="fy_num">' + pageStr + '<li>...</li><li class="pageNum">' + pageTotal + '</li></ul>' + pageNext;
    } else {
        pageNumBox.innerHTML = pagePre + '<ul class="fy_num">' + pageStr + '</ul>' + pageNext;
    }+
    setTimeout(function(){
        window.scrollTo(0,-1);
    },0)
	
	//点击弹层
	$(".tittle i").click(function(){
		var maskCon = "";
		var cur = $(this).parent().parent().index();
		var i = 0;
		for (; i < len; i++) {
			if(i==cur){
				maskCon = d.content.resultList[i].content || "";
				//console.log(i)
				//console.log(maskCon)
			}
		}
		
		var maskTit = $(this).parent().parent().find(".maskTit").html();
		var maskLink = $(this).parent().parent().find(".maskLink").html();
		var maskOri = $(this).parent().parent().find(".maskOri").html();
		var maskTime = $(this).parent().parent().find(".maskTime").html();
		var maskHtml = '<h2>'+maskTit+'</h2><div class="maskOri"><span>来源：'+maskOri+'</span><span>'+maskTime+'</span></div><div class="maskCon">'+HTMLDecode(maskCon)+'</div>'
		$("#maskBg").show();
		$("#mask").show();
		$("#maskCon").html(maskHtml);
		//console.log(maskLink)
		$("#mask .alertCon").attr("href",maskLink);
		$("#mask .alertCon span").html(maskOri);
	});
	$("#maskBg,#mask .close").click(function(){
		$("#maskBg").hide();
		$("#mask").hide();
	});

}
function htmlEscape(text){
    var htmlOk = text.replace("&amp;ldquo;","“");
    htmlOk= htmlOk.replace("&amp;rdquo;","”");
    htmlOk= htmlOk.replace("&amp;quot;",'"');
    htmlOk= htmlOk.replace("&amp;middot;",'·');
	
	
    console.log(htmlOk)
    return htmlOk;
}
function HTMLDecode(text) { 
	var temp = document.createElement("div"); 
	temp.innerHTML = text; 
	var output = temp.innerText || temp.textContent; 
	temp = null; 
	return output; 
} 
function evts(ev) {
    var e = ev || window.event,
        tg = e.target || e.srcElement,
        cls = tg.getAttribute("class"),
        isPre = cls && (cls.indexOf("previous") != -1),
        isNext = cls && (cls.indexOf("next") != -1),
        isNum = cls && (cls.indexOf("pageNum") != -1),
        pageNo = 1;
    // console.log(tg);
    if (isPre || isNext) {
        pageNo = tg.getAttribute("data-pagenum");
    } else if (isNum) {
        pageNo = tg.innerHTML - 0;
    } else {
        return;
    }

	// console.log("pageNo:"+pageNo);
	// console.log("getKwName:"+getKwName);
	getDate({
        siteId: "",
        pageNo: pageNo,
        pageSize: "",
        keyword: getKwName,
        callBack: ""
    });
}

// getKw();
$(".inputSub").click(function(){
	getKw();
	$(".partList").hide();
	$(".partSearchList").show();
	$(".backHome").show();
})
$(".backHome").click(function(){
	$(".partList").show();
	$(".partSearchList").hide();
	$(".backHome").hide();
})
//$(document).on("click", evts);

$(function(){
	$(".filter1 span").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		if($(this).html()=="标题搜索"){
			isTitleKeyWorld = true;
		}
		if($(this).html()=="全文搜索"){
			isTitleKeyWorld = false;
		}
		getKw();

	});
	$(".filter2 span").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		if($(this).html()=="自定义时间"){
			$("#beginY").focus();
		}else{
			//$(".filterDate").hide(500);
			startTime ="";
			endTime = "";
			searchTime = $(this).attr("data-title");
			getKw();
		}
	});
	$(".filter2 .filterDate input").click(function(){
		$(".filter2 span").eq(4).addClass("on").siblings().removeClass("on");
	});
	$(".filter3 span").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		if($(this).html()=="全部"){
			searchType=""
		}else{
			searchType = $(this).html();
		}
		getKw();
	});
	
	//自定义时间搜索
	$(".btnSearch").click(function(){
		startTime = $("#c9").val().replace(/-/g,"");
		endTime = $("#c10").val().replace(/-/g,"");
		console.log("startTime:"+startTime);
		console.log("endTime:"+endTime);
		getKw();
	})
	
})


