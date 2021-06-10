function calcRem(_num) {
    var html = document.querySelector("html"),
        num = _num || 10;
    html.style.fontSize = document.body.clientWidth / num + "px";
    return html;
}

function browserType() {
    var ua = window.navigator.userAgent.toLowerCase(),
        isM = ua.indexOf("mobile") !== -1 ? true : false,
        isIe = ua.indexOf("ie") !== -1 ? true : false,
        isIe8 = ua.indexOf("msie 8") !== -1 ? true : false;
    return {
        ua: ua,
        ism: isM,
        ie: isIe,
        ie8: isIe8
    };
}

function needRem() {
    if (browserType().ism) {
        calcRem();
    }
}
function loadmore(){
	var _body=document.querySelector("body"),
		idbox=_body.querySelector(".getid"),
		isTxt=(_body.getAttribute("class").indexOf("sub-txt")!=-1),
		isPic=(_body.getAttribute("class").indexOf("sub-pic")!=-1),
		id=idbox&&idbox.innerHTML.trim(),
		loadObj={}
		;
	if(!id) return;

	if(isTxt){
		loadObj=new XHW.Xpage('.partList .list', {
		    mode: 'listView', // 插件模式
		    nid: id, // 栏目id
		    pageSize: 10, // 每页条数
			attr:63, //属性
		    item:"li",
			orderby:1,
		    moreButton: '.more', // 更多按钮
		    renderItem: function (item, index, list) { // 列表渲染方
				// console.log(item.keyword)
				var itemHtml ="";
				if(item.keyword=="谣言"){
		       		var itemHtml = '<li class="tag1"><a href="'+item.LinkUrl+'" target="_blank">'+item.Title+'</a></li>';
				}else if(item.keyword=="事实"){
		       		var itemHtml = '<li class="tag2"><a href="'+item.LinkUrl+'" target="_blank">'+item.Title+'</a></li>';
				}else if(item.keyword=="误区"){
		       		var itemHtml = '<li class="tag3"><a href="'+item.LinkUrl+'" target="_blank">'+item.Title+'</a></li>';
				}else if(item.keyword=="辟谣"){
		       		var itemHtml = '<li class="tag4"><a href="'+item.LinkUrl+'" target="_blank">'+item.Title+'</a></li>';
				}
		        return itemHtml;
		    }
		});
	}else{
		/*loadObj=new XHW.Xpage('.list', {
		    mode: 'listView', // 插件模式
		    nid: id, // 栏目id
		    pageSize: 12, // 每页条数
			attr:63, //属性
		    item:"li",
		    moreButton: '.more', // 更多按钮
		    renderItem: function (item, index, list) { // 列表渲染方
		        var itemHtml ='<li><a href="'+item.LinkUrl+'" target="_blank"><img src='+(function(o){
		        	if(typeof o=="object"){
		        		return o[0];
		        	}else if(typeof o=="string"&&o.length>5){
		        		return o;
		        	}
		        })(item.allPics)+' /></a><span><a href="'+item.LinkUrl+'" target="_blank">'+item.Title+'</a></span></li>';
		        return itemHtml;

		    }
		});*/
	}
}
function getListTxt(data) {
	var html = '';
	var uar = data.uarray;
	var len = data.uarray.length;
	if(len<1) return html;
	var tar = data.tarray;
	for(var i = 0;i<len;i++){
		html += '<a href="'+uar[i]+'" target="_blank">'+tar[i]+'</a>';
	}
	return html;
}
function init(){
	//needRem();
	loadmore();
}

init();