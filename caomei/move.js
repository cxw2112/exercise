function moveFlex(obj, attr, iTar, endFn){
	//给节点对象，动态添加一个 timer 属性，作为我们的定时器的时间句柄
	obj.timer && clearInterval(obj.timer);
	
	//速度
	var speed = 0;
	
	obj.timer = setInterval(function(){
		var cur = 0;
		if (attr == 'opacity'){
			cur = parseFloat(getStyle(obj, attr)) * 100;
		} else {
			cur = parseInt(getStyle(obj, attr));
		}
		
		//计算速度
		speed += (iTar - cur) / 5;
		speed *= 0.75;
		
		if (Math.abs(iTar - cur) > 1 || Math.abs(speed) > 1){ //没到
			if (attr == 'opacity'){
				obj.style[attr] = (cur + speed)/100; //chrome FF
				obj.style.filter = 'alpha(opacity:'+ (cur + speed) +')'; //IE
			} else {
				obj.style[attr] = cur + speed + 'px';
			}
		} else {
			clearInterval(obj.timer);
			
			if (attr == 'opacity'){
				obj.style[attr] = iTar/100; //chrome FF
				obj.style.filter = 'alpha(opacity:'+ iTar +')'; //IE
			} else {
				obj.style[attr] = iTar + 'px';
			}
			
			//调用回调
			endFn && endFn();
		}
	}, 30);
}

//缓冲运动
function moveBuffer(obj, attr, iTar, endFn){
	//给节点对象，动态添加一个 timer 属性，作为我们的定时器的时间句柄
	obj.timer && clearInterval(obj.timer);
	
	//速度
	var speed = 0;
	
	//缓冲运动 => 速度开始是很大的值 ，随着运动的进行，速度值越来越小
	obj.timer = setInterval(function(){
		var cur = 0;
		if (attr == 'opacity'){
			cur = parseFloat(getStyle(obj, attr)) * 100;
		} else {
			cur = parseInt(getStyle(obj, attr));
		}
		
		//从大大小的变化
		speed = (iTar - cur) / 5;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		
		if (iTar == cur){ //停止条件
			clearInterval(obj.timer);
			
			//调用回调
			endFn && endFn();
		} else {
			if (attr == 'opacity'){
				obj.style[attr] = (cur + speed)/100; //chrome FF
				obj.style.filter = 'alpha(opacity:'+ (cur + speed) +')'; //IE
			} else {
				obj.style[attr] = cur + speed + 'px';
			}
		}
		
	}, 30);
}

//匀速运动
function moveNormal(obj, attr, iTar, endFn){
	//给节点对象，动态添加一个 timer 属性，作为我们的定时器的时间句柄
	obj.timer && clearInterval(obj.timer);
	
	var cur = 0;
	if (attr == 'opacity'){
		cur = parseFloat(getStyle(obj, attr)) * 100;
	} else {
		cur = parseInt(getStyle(obj, attr));
	}
	
	var speed = 0;
	if (iTar - cur > 0){
		speed = 10;
	} else {
		speed = -10;
	}
	
	obj.timer = setInterval(function(){
		var cur = 0;
		if (attr == 'opacity'){
			cur = parseFloat(getStyle(obj, attr)) * 100;
		} else {
			cur = parseInt(getStyle(obj, attr));
		}
		
		if (Math.abs(iTar - cur) < Math.abs(speed)){
			clearInterval(obj.timer);
			
			if (attr == 'opacity'){
				obj.style[attr] = iTar/100; //chrome FF
				obj.style.filter = 'alpha(opacity:'+ iTar +')'; //IE
			} else {
				obj.style[attr] = iTar + 'px';
			}
			
			//调用回调
			endFn && endFn();
		} else {
			if (attr == 'opacity'){
				obj.style[attr] = (cur + speed)/100; //chrome FF
				obj.style.filter = 'alpha(opacity:'+ (cur + speed) +')'; //IE
			} else {
				obj.style[attr] = cur + speed + 'px';
			}
		}
	}, 30);
}

//获取节点的样式
function getStyle(obj, attr){
	if (window.getComputedStyle){ //chrome  FF
		return window.getComputedStyle(obj, false)[attr];
	} else { //IE
		return obj.currentStyle[attr]; 
	}
}
