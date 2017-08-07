/*
	接口：
		http://www.wookmark.com/api/json/popular?callback=?
*/
let num=0;
let n=0;
let onOff=true;
picLoad(n);
//判断最短li
function minLi(){
	let lis=$('li');
	let arr=[];
	let min=null;
	lis.each(function (i,e){
		arr.push(e.scrollHeight);
	});
	min=Math.min.apply(null,arr);
	return arr.findIndex(e=>e==min);
};
$(window).scroll(function (){
	var index=minLi();
	let s1=$('li').eq(index)[0].scrollHeight;
	let s2=$(window).scrollTop()+$(window).innerHeight();
	if (s2>=s1) {
		if (onOff) {
			n++;
			picLoad(n);
		}
	}
});
function picLoad(n){
	onOff=false;
	$.ajax({
		url:'http://www.wookmark.com/api/json/popular?callback=?',
		dataType:'jsonp',
		data:{
			page:n
		},
		success:function (data){
			$(data).each(function (i,e){
				const div=$('<div class="pic"></div>');
				const img=$('<img src="'+e.preview+'">');
				img[0].onload=function (){
					let index=minLi();
					div.append(img);
					$('li').eq(index).append(div);
				}
			})
			onOff=true;
		}
	});
};
