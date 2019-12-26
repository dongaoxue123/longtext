/*
 * charts.JS
 */

//feedPriceChart
var dayHourOption = {
	color: ['#1E90FF'],

	title: {
		text: 'App使用时长',
		left: 'center',
		top: 20
	},
	grid:{
		y2:70
	},
	dataZoom: {
		show: false
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'cross',
			crossStyle: {
				color: '#999'
			}
		}
	},
	legend: {
		data: ['时长']
	},
	xAxis: [{
		type: 'category',
		max: 11,
		data: ["肥猪测重", "母猪体况", "企业内训", "母猪档案", "猪只盘点", "生长监控", "妊检录入", "配种录入", "种猪转舍", "设备控制", "PIGKNOWS", "卓牧鸟"],
		axisLabel: {   
			interval:0,                
			rotate:20                          
		}

	}],
	yAxis: [{
			type: 'value',
			name: '小时',
			min: 0,
			max: 10,
			interval: 2
		}
	]
	,
	series: [{
			name: '使用时长',
			type: 'bar',
			barWidth:20,//柱图宽度
			itemStyle: {
				normal: {
					color: function(params) {
						return params.dataIndex > 5 ? 'rgba(30,144,255)' : 'rgba(30,144,255)'
					}
				}
			},
			data: [5.6,6,3.5,2.8,4,5.4,3.8,3.2,2.5,4,2.8,4.9]
		}
	]
};
//pigPriceChart
var dayTimesOption = {
	//color: ['#ff7d27', '#47b73d', '#fcc36e', '#57a2fd', "#228b22", '#ff9f3f'],//饼图颜色
	title : {
        text: 'App使用次数',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:  ["肥猪测重", "母猪体况", "企业内训", "母猪档案", "猪只盘点", "生长监控", "妊检录入", "配种录入", "种猪转舍", "设备控制", "PIGKNOWS", "卓牧鸟"]
    },
/*    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true, 
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },*/
    series : [
        {
            name:'使用次数',
            type:'pie',
            radius: ['50%', '70%'],  //设置环形的空间大小 
            center: ['50%', '60%'],
            data:[{name:'肥猪测重1',value:26},//5.6,6,3.5,2.8,4,5.4,3.8,3.2,2.5,4,2.8,4.9
            		{name:'母猪体况1',value:28},
            		{name:'企业内训',value:16},
            		{name:'母猪档案',value:10},
            		{name:'猪只盘点',value:15},
            		{name:'生长监控',value:21},
            		{name:'妊检录入',value:13},
            		{name:'配种录入',value:11},
           			{name:'种猪转舍',value:8},
            		{name:'设备控制',value:17},
            		{name:'PIGKNOWS',value:14},
           			{name:'卓牧鸟',value:19}]
        }
    ]
};


/*生长曲线 */
var option = {
		 title : {
        text: '生长曲线',
    },
    tooltip : {
        trigger: 'axis'
    },
/*    legend: {
        data:['批次2018001','批次2018002']
    },*/
/*    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },*/
    calculable : true,
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : []
        }
    ],
    yAxis : [
        {
        	type: 'value',
			name: '斤',
			min: 0,
			max: 200,
			interval: 40
        }
    ],
    series : [
        {
        	name:'重量',
            type:'line',
            data:[],
            itemStyle : { normal: {label : {show: true}}}
            
        },
    ]
}

var pigPriceChart = echarts.init(document.getElementById('pigPriceChart'));
var feedPriceChart = echarts.init(document.getElementById('feedPriceChart'));
var myChart = echarts.init(document.getElementById('farm_size_1'));
var countsDataArry ="";
var timeDataArry = "";
var authToken=localStorage.getItem("authToken");
	//alert(authToken);
	var user =localStorage.getItem("user");
	var group_id = JSON.parse(user).groupId;
	var farm_id = JSON.parse(user).farmId;
	
$(function() {
	i18n('../../locales', onLangReady) //国际化
});
function onLangReady(){
	if (authToken.length = 0) {
		alert(i18next.t("timeout"));
		window.top.location.href = 'wxlogin.html';
		return false;
	} else {
		getHouseType()
		GetAppCountsInfo();
		GetAppTimeInfo();
//		getGrowingCharts()
//		switchFeedPrice(1)
//		switchPigPrice(1)
//		myChart.setOption(option);
	}
}
	function getHouseType(){
		//获取栋舍类型
	   	$.ajax({
	        url: commonIP + 'api/system/option/getOptionListSelect?authToken='+authToken+'&type=HouseType',
	        success: function (res) {
	        	console.log(res)
	    	var dataObj = JSON.parse(res);
		    if(dataObj!=null && dataObj.dataSource.list.length>0){
	            var groupOption = '';
	            for (var i = 0; i < dataObj.dataSource.list.length; i++) {
	            	if(dataObj.dataSource.list[i].id==='00059'){
	            		if(groupOption == ''){
	            			groupOption = groupOption+'<option value="'+dataObj.dataSource.list[i].id+'" selected="selected">'+dataObj.dataSource.list[i].name+'</option>';
	            		}else{
	            			groupOption = groupOption+'<option value="'+dataObj.dataSource.list[i].id+'">'+dataObj.dataSource.list[i].name+'</option>';
	            		}
	            	}
	            }
	            $("#type").append(groupOption);
	            GetHouse();
	    	  }
	    }
	    });
	    }
		//获取栋舍下拉列表
		function GetHouse(){
			document.getElementById("houseId").options.length = 0;
			var type = $("#type").val();
		   	$.ajax({
		        url: commonIP + 'api/system/house/getHouseListPage?authToken='+authToken+'&page=0&limit=0&farmId='+ farm_id +'&type='+type,
		        success: function (res) {
		    	var dataObj = JSON.parse(res);
			    if(dataObj!=null && dataObj.dataSource.list.length>0){
		            var groupOption;
		            for (var i = 0; i < dataObj.dataSource.list.length; i++) {
		            	groupOption = groupOption+'<option value="'+dataObj.dataSource.list[i].id+'">'+dataObj.dataSource.list[i].name+'</option>';
		            }
		            $("#houseId").append(groupOption);
		            query()
		    	  }
			    else
			    {
			    	var groupOption = groupOption+'<option value="">' + i18next.t("chart.noHouse") + '</option>';
			    	$("#houseId").append(groupOption);
			    }
		    }
		    });
		}

/*
 * 切换
 */
function switchFeedPrice(index, e) {
	if(e != undefined) {
		var children = e.target.parentNode.children
		for(var i = 0; i < children.length; i++) {
			children[i].className = 'widget-caption'
		}
		e.target.className = 'widget-caption active'
	}

	switch(index) {
		case 1: //日
			feedPriceChart.setOption(dayHourOption);
			break;
	}
}

/*
 * 切换
 */
function switchPigPrice(index, e) {
	if(e != undefined) {
		var children = e.target.parentNode.children
		for(var i = 0; i < children.length; i++) {
			children[i].className = 'widget-caption'
		}
		e.target.className = 'widget-caption active'
	}

	switch(index) {
		case 1:
//			pigPriceChart.setOption(dayTimesOption);
			break;
	}
}

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


//取得一周APP使用次数
function GetAppCountsInfo() {
	pigPriceChart.setOption(dayTimesOption)
//	let names = ["肥猪测重", "母猪体况", "企业内训", "母猪档案", "猪只盘点", "生长监控", "妊检录入", "配种录入", "种猪转舍", "设备控制", "PIGKNOWS", "卓牧鸟"]
	let names = [ i18next.t("app.fzcz"), i18next.t("app.mztk"), i18next.t("app.qynx"), i18next.t("app.mzda"), i18next.t("app.zzpd"), i18next.t("app.szjk"), i18next.t("app.rjlr"), i18next.t("app.pzlr"), i18next.t("app.zzzs"), i18next.t("app.sbkz"), "PIGKNOWS", i18next.t("app.zmn"), ]
//	let values = [10,18,14,12,9,6,7,5,10,8,5,7]
	let datas = new Array()
	
	datas = [{name:i18next.t("app.fzcz"),value:26},
            		{name:i18next.t("app.mztk"),value:28},
            		{name:i18next.t("app.qynx"),value:16},
            		{name:i18next.t("app.mzda"),value:10},
            		{name:i18next.t("app.zzpd"),value:15},
            		{name:i18next.t("app.szjk"),value:21},
            		{name:i18next.t("app.rjlr"),value:13},
            		{name:i18next.t("app.pzlr"),value:11},
           			{name:i18next.t("app.zzzs"),value:8},
            		{name:i18next.t("app.sbkz"),value:17},
            		{name:'PIGKNOWS',value:14},
           			{name:i18next.t("app.zmn"),value:19}]
//	for (let i = 0; i < 12; i++){
//		datas.push({
//		     name: names[i],
//		     value: values[i]
//		})
//	}
//	console.log(names)
//	console.log(datas)
	pigPriceChart.setOption({
		title : {
        text: "App" + i18next.t("chart.useTimes") //'App使用次数'
		},
						legend: {                    
		                    data: names
		                },
						series: [{
							name:i18next.t("chart.useTimes"), //使用次数
					        data:datas	
						}]
					});
	return;
	$.ajax({
		type: "GET",
		url: commonIP + 'api/system/device/getAppUseCounts',
		contentType: 'application/json',
		data: 'authToken=' + authToken + '&farmId= '+ farm_id,
		dataType: 'json', // GET 请求方式需要添加dataType 设定返回数据的格式为json;
		success: function(data) {
			console.log(data);

			if (data) {
				if (data.errcode == 200) {
					// 使用次数集合
					countsDataArry = data.dataSource.list[0].appListData;
					for(var i = 0;i< names.length; i++){
		                counts.push({
		                    name: names[i],
		                    value: countsDataArry[i]
		                });
		            }
					// 填入数据
					pigPriceChart.setOption({
						legend: {                    
		                    data: names
		                },
						series: [{
					        data:counts	
						}]
					});
				} else {
					if (data.errcode == "10005") {
						alert(data.errmsg);
					}
				}
			}
		},
		error: function(err) {

		}
	})
}

//取得一周APP使用时长
function GetAppTimeInfo() {
	
	feedPriceChart.setOption(dayHourOption)
//	let names = ["肥猪测重", "母猪体况", "企业内训", "母猪档案", "猪只盘点", "生长监控", "妊检录入", "配种录入", "种猪转舍", "设备控制", "PIGKNOWS", "卓牧鸟"]
	let names = [ i18next.t("app.fzcz"), i18next.t("app.mztk"), i18next.t("app.qynx"), i18next.t("app.mzda"), i18next.t("app.zzpd"), i18next.t("app.szjk"), i18next.t("app.rjlr"), i18next.t("app.pzlr"), i18next.t("app.zzzs"), i18next.t("app.sbkz"), "PIGKNOWS", i18next.t("app.zmn"), ]
	

	feedPriceChart.setOption({
		title : {
        text: 'App' + i18next.t("chart.usageTime")
		},
						legend: {                    
		                    data: [i18next.t("chart.duration")]
		                },
		                xAxis: [{
							data: names //["肥猪测重", "母猪体况", "企业内训", "母猪档案", "猪只盘点", "生长监控", "妊检录入", "配种录入", "种猪转舍", "设备控制", "PIGKNOWS", "卓牧鸟"]
					
						}],
						yAxis: [{
								name: i18next.t("chart.hours")
						}],
						series: [{
							name:i18next.t("chart.usageTime") //'使用时长',
//					        data:datas	
						}]
					});
	return;
	
	var currentDate = getDate();
    var countsList = [];
    var counts
	$.ajax({
		type: "GET",
		url: commonIP + 'api/system/device/getAppUseTime',
		contentType: 'application/json',
		data: 'authToken=' + authToken + '&farmId= '+ farm_id,
		dataType: 'json', // GET 请求方式需要添加dataType 设定返回数据的格式为json;
		success: function(data) {
			console.log(data);

			if (data) {
				if (data.errcode == 200) {
					// 使用次数集合
					timeDataArry = data.dataSource.list[0].appTimeListData;
					for(var i = 0;i< timeDataArry.length; i++){
						counts = parseInt(timeDataArry[i]/60%24) 
		                countsList.push(counts);
		            }
					// 填入数据
					feedPriceChart.setOption({
						series: [{
					            data:countsList	
						}]
					});
				} else {
					if (data.errcode == "10005") {
						alert(data.errmsg);
					}
				}
			}
		},
		error: function(err) {

		}
	})
}

function query() {
	myChart.setOption(option);
	var counts = [];
	var house_id = document.getElementById("houseId").value;
	$.ajax({
		type: "GET",
		url: commonIP + 'api/pig/weight/getWeightBatchList',
		contentType: 'application/json',
		data: 'authToken=' + authToken + '&group_id=' + group_id + '&farm_id=' + farm_id + '&house_id=' + house_id,
		dataType: 'json', // GET 请求方式需要添加dataType 设定返回数据的格式为json;
		success: function(data) {
			console.log(data);
			if(data) {
				if(data.errcode == 200) {
					//时间
					var timeDataArry = data.dataSource.list[0].date;
					//重量
					var weightDataArry = data.dataSource.list[0].data;
					// 填入数据
//					option.xAxis[0].data = timeDataArry;
//					option.series[0].data = weightDataArry;
					myChart.setOption({
						title: {
							text: i18next.t("chart.growthCurve")// '生长曲线'
						},
						xAxis:[{
							data: timeDataArry	
						}],
						yAxis: [{
							name: i18next.t("common.kg")
						}],
						series: [{
							name: i18next.t("chart.weight"), //重量
							data: weightDataArry
						}]
					});
				} else {
//					option.xAxis[0].data = '';
//					option.series[0].data = '';
					myChart.setOption({
						title: {
							text: i18next.t("chart.growthCurve")
						},
						xAxis:[{
							data: ''	
						}],
						yAxis: [{
							name: i18next.t("common.kg")
						}],
						series: [{
							name: i18next.t("chart.weight"), //重量
							data: ""
						}]
					});
				}
			}
		},
		error: function(err) {

		}
	})
}


	

