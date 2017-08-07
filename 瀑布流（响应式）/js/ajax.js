/*
	接口：
		http://www.wookmark.com/api/json/popular?callback=?
*/
//一个li的宽度
let oneW = 236;
//li的 margin left
let marginL = 10;
//总宽度
let iW = $(window).innerWidth() + marginL;
//一个li实际占位宽度
let actW = oneW + marginL;
//一排的个数
let len = Math.floor(iW/actW);
let num = 0;
let arrT = [];
let arrL = [];

//找到arrT中谁最短
function minIndex(){	
	var num = 0;
	num = Math.min.apply(null,arrT);
	return arrT.findIndex(e=>e==num);
}

$('#ul').width((len * actW) - marginL);
for (var i = 0; i < len; i++) {
	arrT.push(0);
	arrL.push(actW * i);
}
addPic(num);
function addPic (num) {
	$.ajax({
		url:'http://www.wookmark.com/api/json/popular?callback=?',
		dataType:'jsonp',
		success:function (data) {
			$(data).each(function(i,e) {
				let li = $('<li>');
				let iH = (e.height*oneW)/e.width;
				let img = $('<img src="'+e.preview+'" style = "height:'+iH+'px">');
				img[0].onload=function () {
					li.append(img);
					li.css({
						left: arrL[minIndex()],
						top: arrT[minIndex()]
					});
					$('#ul').append(li);
					arrT[minIndex()] += (iH+10);
				}
			});
		}
	});
}
$(window).resize(function () {
	let iW = $(window).innerWidth() + marginL;
	let len = Math.floor(iW/actW);
	$('#ul').width((len * actW) - marginL);
	arrT.length = arrL.length = 0;
	for (var i = 0; i < len; i++) {
		arrT.push(0);
		arrL.push(actW*i);
	}
	$('li').each(function (i,e) {
		$(e).css({
			left: arrL[minIndex()],
			top: arrT[minIndex()]
		});
		arrT[minIndex()] += ($(e).height()+10);
	})
});