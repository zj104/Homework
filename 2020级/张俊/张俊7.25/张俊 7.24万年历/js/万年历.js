/* 1.自动生成年份和月份下拉列表元素 
   2.简易封装循环函数{
	   1.循环的开始和结束
	   2.循环要做的事情
	   3.开发不仅仅要注重开发过程的正确 更要注重开发后的代码的读写和重构
   }
   3.选择月份的第一天是在哪个位置（周几） 
   4.选中月份当月的天数
   
*/

var oYear = document.getElementById("year"),
	oMonth = document.getElementById("month"),
	oLi = document.querySelectorAll(".day li");//获取li
/* for (var i = 1900;i <= 2050;i++)
{
	var oOption = document.createElement("option") ;
	oOption.innerHTML = i;
	oOption.value = i;
	oYear.appendChild(oOption);//添加子元素在父级元素后面
	
} */


//callback 回调函数 将函数当参数传递 这个函数就叫做回调函数
function each(argCollection,callback){//形参
	var i = argCollection.start;//循环初始值
	for (;i <= argCollection.end;i++)
	{
		//循环内做什么事情  是用户去操控的
		callback(i);
	}
}

//封装日历查询
function query(){
	var yearVal = oYear.value,
		monthVal = oMonth.value;
	if (!(yearVal && monthVal)){//先写事物的异常处理和特殊情况的判断
		return alert("请选择年份和月份");
	}
	/**************查询日历的逻辑*************/
	else{
		//选择月份的第一天的时间对象
		var dateObj = new Date(yearVal,monthVal),
			selDay = dateObj.getDay(),//选择的月份第一天是周几
		// console.log(dateObj.getDay());
			monthCount = getMonthCount(yearVal,monthVal);//选择的月份de天数
			//清空原始内容
			oLi.forEach(function(el){
				el.innerHTML = "";
			});
			
			//遍历li
			each({
				start:1,
				end:monthCount
			},function(i){
				oLi[selDay+i - 1].innerHTML = i;
			})
			/* oLi.forEach(function(el,index){//遍历
				if(selDay == index){
					
				}
			}) */
	}
}

	//年份的下拉列表
	each({
			start:1900,
			end:2050
		},function(i){//实参
			var oOption = document.createElement("option") ;//在对象中创建对象
			oOption.innerHTML = i;
			oOption.value = i;
			oYear.appendChild(oOption);//添加子元素在父级元素后面
		}); 
	
	//月份的下拉列表
	each({
		start:1,
		end:12
	},function(i){//实参
		var oOption = document.createElement("option") ;
		oOption.innerHTML = i;
		oOption.value = i - 1;//月份从零开始
		oMonth.appendChild(oOption);//添加子元素在父级元素后面
	}); 
	
	//计算选择月份的天数
	function getMonthCount(year,month){
		
		var date = [31,28,31,30,31,30,31,31,30,31,30,31];
		
		if(year % 4 == 0 &&(year % 100!=0 || year % 400 == 0))//判断是否为闰年
		{
			date[1] =29;//getMonthCount(2021,1) 得到2021年2月de天数
		}
		return date[month];
	}
