//var commonIP = 'http://wangshoujian.s1.natapp.cc/';
   var commonIP = 'http://192.168.1.205/';
//var commonIP = 'http://localhost/';
// var commonIP = 'http://azp.longoor.com/' //线上正式环境
//var commonIP = 'http://192.168.1.203/';
var language = 'zh'

var now = new Date();                    //当前日期     
var nowDayOfWeek = now.getDay();         //今天本周的第几天     
var nowDay = now.getDate();              //当前日     
var nowMonth = now.getMonth();           //当前月     
var nowYear = now.getYear();             //当前年     
nowYear += (nowYear < 2000) ? 1900 : 0;  //   


/**
 * 获取当前时间
 */
function getDate() {
	var myDate = new Date();
	//获取当前年
	var year = myDate.getFullYear();
	//获取当前月
	var month = myDate.getMonth() + 1;
	//获取当前日
	var date = myDate.getDate();
	var now = year + '-' + p(month) + "-" + p(date);
	return now;
}

function p(s) {
	return s < 10 ? '0' + s : s;
}

function getCurDate() {
	var d = new Date();
	var week;
	switch (d.getDay()) {
		case 1:
			week = "星期一";
			break;
		case 2:
			week = "星期二";
			break;
		case 3:
			week = "星期三";
			break;
		case 4:
			week = "星期四";
			break;
		case 5:
			week = "星期五";
			break;
		case 6:
			week = "星期六";
			break;
		default:
			week = "星期天";
	}
	var years = d.getFullYear();
	var month = add_zero(d.getMonth() + 1);
	var days = add_zero(d.getDate());
	var hours = add_zero(d.getHours());
	var minutes = add_zero(d.getMinutes());
	var seconds = add_zero(d.getSeconds());
	var ndate = years + "年" + month + "月" + days + "日 " + hours + ":" + minutes + " " + week;
	return ndate;
}

function add_zero(temp) {
	if (temp < 10) return "0" + temp;
	else return temp;
}

function goBack() {
	window.history.go(-1);
}

function setInit() {
	$(".footer").load('WebContent/footer.html');
}

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return decodeURIComponent(r[2]);
	return null; //返回参数值
}

// 点击菜单按钮跳转
function menuClick(target) { 	
	if (target == 'weight'){					
		// 跳转页面并传输参数
		window.location.href = 'weight.html?pigsArchivesId='+pigsArchivesId;			
	} else if (target == 'backfat') {				
		window.location.href = 'backfat.html?pigsArchivesId='+pigsArchivesId;
	} else if (target == 'feeding') {				
		window.location.href = 'feeding.html?pigsArchivesId='+pigsArchivesId;
	} else if (target == 'pigRecord') {			
		window.location.href = 'pigRecord.html?pigsArchivesId='+pigsArchivesId;
	} 
}
//格式化日期：yyyy-MM-dd     
function formatDate(date) {      
    var myyear = date.getFullYear();     
    var mymonth = date.getMonth()+1;     
    var myweekday = date.getDate();      
         
    if(mymonth < 10){     
        mymonth = "0" + mymonth;     
    }      
    if(myweekday < 10){     
        myweekday = "0" + myweekday;     
    }    
    return (myyear+"-"+mymonth + "-" + myweekday);      
}      
//获得某月的天数     
function getMonthDays(myMonth){     
    var monthStartDate = new Date(nowYear, myMonth, 1);      
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);      
    var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);      
    return days;      
}      

//获得本周的开始日期     
function getWeekStartDate() {    
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);      
    return formatDate(weekStartDate);     
}      
    
//获得本周的结束日期     
function getWeekEndDate() {      
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) + 1);      
    return formatDate(weekEndDate);     
}      
    
//获得本月的开始日期     
function getMonthStartDate(){     
    var monthStartDate = new Date(nowYear, nowMonth, 1);      
    return formatDate(monthStartDate);     
}     
    
//获得本月的结束日期     
function getMonthEndDate(){     
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));      
    return formatDate(monthEndDate);    
}
function goFieldList(){
	// 跳转页面并传输参数
	window.location.href = 'fieldList.html?pigsArchivesId='+pigsArchivesId;	
}
//检查authToken是否超时，超时时间为30分钟。
function checkToken(){
	var loginTime = localStorage.getItem("loginTime");//登录系统时间
	var currentTime = new Date().getTime();//当前时间
	var time = 30*60*1000;//设置的时效时间 30分钟
	if(currentTime - loginTime > time){
		localStorage.clear();//清除数据
		return false;//超时
	}else{
		return true;//未超时
	}
}
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


toTime = function(nS, format) {
	if(!nS){
		return;
	}
	var myDate = new Date(nS);
	var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
	var mouth = (((myDate.getMonth() + 1) > 9) ? (myDate.getMonth() + 1) : ("0" + (myDate.getMonth() + 1))) //获取当前月份(0-11,0代表1月)
	var date = myDate.getDate() > 9 ? myDate.getDate() : '0' + myDate.getDate(); //获取当前日(1-31)
	var hours = myDate.getHours() > 9 ? myDate.getHours() : '0' + (myDate.getHours()); //获取当前小时数(0-23)
	var minutes = myDate.getMinutes() > 9 ? myDate.getMinutes() : '0' + (myDate.getMinutes()); //获取当前分钟数(0-59)
	var seconds = myDate.getSeconds() > 9 ? myDate.getSeconds() : '0' + (myDate.getSeconds()); //获取当前秒数(0-59)
	switch(format) {
		case 'year':
			return myDate.getFullYear();
			break;
		case 'mouth':
			return mouth;
			break;
		case 'date':
			return date;
			break;
		case 'charDate':
			return year + '年' + mouth + '月' + date + '日'
			break;
		case 'hours':
			return hours;
			break;
		case 'minutes':
			return minutes;
			break;
		case 'seconds':
			return seconds;
			break;
		case 'noTime':
			return myDate.getFullYear() + '-' + mouth + '-' + date;
			break;
		case 'noSeconds':
			return myDate.getFullYear() + '-' + mouth + '-' + date + ' ' + hours + ':' + minutes;
			break;
		default:
			return myDate.getFullYear() + '-' + mouth + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
	}
}

function i18n(path, cb){
//国际化
//国际化 start
			i18next.use(i18nextXHRBackend);
			i18next.init({
		        lng: language, 
		        debug: false,
		        backend: {
		        	loadPath: path + '/{{lng}}/{{ns}}.json'
		        }
     		 }, function(err, t) {
     		 	localize = locI18next.init(i18next);
				  localize('[data-i18n]');
				  try {
					cb() 
				  } catch {
					console.log(Text)
				  }
      		});
      		//语言切换
//    		i18next.changeLanguage('zh', function(err, t){
//   		 		document.getElementById('username').value = t("key");
//   		})
			//国际化 end
}