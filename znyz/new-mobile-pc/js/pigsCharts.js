/*
 * 首页JS
 */
var pigPriceChart = echarts.init(document.getElementById('pigPriceChart'));
var feedPriceChart = echarts.init(document.getElementById('feedPriceChart'));

var pigFeedPriceOption 
var sowFeedPriceOption 
var pigPriceOption 
var sowPriceOption 
var piglitPriceOption 
$(function() {
	i18n('../../locales', onLangReady) //国际化
});
function onLangReady(){
	initChart()
	breed();
}
function initChart(){
	
 pigFeedPriceOption = {
	color: ['#ea1919', '#00bc97', '#ff9f3f'],

	backgroundColor: '#e6f7fe',
	title: {
		text:  i18next.t("chart.feedPrice"), //'饲料价格',
		left: 'center',
		top: 20,
		textStyle: {
			color: '#ccc'
		}
	},
	toolbox: {
		show: true,
		right: '10px',
		itemSize: 20,
		feature: {
			myTool1: {
				show: true,
				title: i18next.t("chart.forecast"), //'预测',
				icon: 'image://assets/img/yuce1.png',
				onclick: function() {
					pigFeedPriceOption.xAxis[0].max = (pigFeedPriceOption.xAxis[0].max == 4 ? 8 : 4)
					feedPriceChart.setOption(pigFeedPriceOption)
				}
			},
			myTool2: {
				show: false,
				title: i18next.t("chart.forecast"), //'预测',
				icon: 'image://assets/img/yuce1.png',
				onclick: function() {
					sowFeedPriceOption.xAxis[0].max = (sowFeedPriceOption.xAxis[0].max == 4 ? 8 : 4)
					feedPriceChart.setOption(sowFeedPriceOption)
				}
			}
		}
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
		data: [i18next.t("chart.sowFeed"),i18next.t("chart.pigletFeed"),i18next.t("chart.price")]//['母猪料', '仔猪料', '价格']i18next.t("chart.sowFeed"), //
	},
	xAxis: [{
		type: 'category',
		max: 4,
		data:  getMonthArr(), //['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		axisPointer: {
			type: 'shadow'
		}
	}],
	yAxis: [{
			type: 'value',
			name: i18next.t("chart.expend"), //'消耗',
			min: 0,
			max: 100,
			interval: 50,
			axisLabel: {
				formatter: '{value} kg'
			}
		},
		{
			type: 'value',
			name: i18next.t("chart.price"), //'价格',
			min: 850,
			max: 950,
			interval: 20,
			axisLabel: {
				formatter: '{value} ' + i18next.t("chart.yuan") //
			}
		}
	],
	series: [{
			name: i18next.t("chart.sowFeed"), //'母猪料',
			type: 'bar',
			itemStyle: {
				normal: {
					color: function(params) {
						return params.dataIndex > 4 ? 'rgba(194,53,49,0.6)' : 'rgba(194,53,49,1)'
					}
				}
			},
			data: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 59, 59]
		},
		{
			name: i18next.t("chart.pigletFeed"), //'仔猪料',
			type: 'bar',
			itemStyle: {
				normal: {
					color: function(params) {
						return params.dataIndex > 4 ? 'rgba(51,91,161,0.6)' : 'rgba(51,91,161,1)'
					}
				}
			},
			data: [40, 41, 42, 41, 42, 41, 42, 41, 43, 41, 44, 45]
		},
		{
			name: i18next.t("chart.price"), //'价格',
			type: 'line',
			yAxisIndex: 1,
			data: [900, 910, 910, 911, 910, 910, 910, 910, 910, 916, 911, 920]
		}
	]
};

 sowFeedPriceOption = {
	color: ['#093', '#00bc97', '#ff9f3f'], // 默认色板

	backgroundColor: '#f5fff3',
	title: {
		text: i18next.t("chart.feedPrice"), //'饲料价格',
		left: 'center',
		top: 20,
		textStyle: {
			color: '#ccc'
		}
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
	toolbox: {
		show: true,
		right: '10px',
		itemSize: 20,
		feature: {
			myTool1: {
				show: false
			},
			myTool2: {
				show: true,

			},
		}
	},
	legend: {
		data: [i18next.t("chart.firstSowFeed"),i18next.t("chart.secondSowFeed"),i18next.t("chart.price")] // ['一元母料', '二元母料', '价格']i18next.t("chart.feedPrice"), //
	},
	dataZoom: {
		show: false
	},
	xAxis: [{
		type: 'category',
		max: 4,
		data:  getMonthArr(), // ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		axisPointer: {
			type: 'shadow'
		}
	}],
	yAxis: [{
			type: 'value',
			name: i18next.t("chart.expend"), //'消耗',
			min: 0,
			max: 100,
			interval: 50,
			axisLabel: {
				formatter: '{value} kg'
			}
		},
		{
			type: 'value',
			name: i18next.t("chart.price"), //'价格',
			min: 850,
			max: 950,
			interval: 20,
			axisLabel: {
				formatter: '{value} ' + i18next.t("chart.yuan") //
			}
		}
	],
	series: [{
			name: i18next.t("chart.firstSowFeed"), //'一元母料',
			type: 'bar',
			itemStyle: {
				normal: {
					color: function(params) {
						return params.dataIndex > 4 ? 'rgba(0,153,204,0.6)' : 'rgba(0,153,204,1)'
					}
				}
			},
			data: [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 59, 59]
		},
		{
			name: i18next.t("chart.secondSowFeed"), //'二元母料',
			type: 'bar',
			itemStyle: {
				normal: {
					color: function(params) {
						return params.dataIndex > 4 ? 'rgba(255,204,0,0.6)' : 'rgba(255,204,0,1)'
					}
				}
			},
			data: [52, 52, 52, 53, 54, 55, 57, 57, 58, 59, 60, 60]
		},
		{
			name: i18next.t("chart.price"), //'价格',
			type: 'line',
			yAxisIndex: 1,
			data: [900, 910, 910, 911, 910, 910, 910, 910, 910, 916, 911, 920]
		}
	]
};

 pigPriceOption = {
	color: ['#f93', '#054', '#063', '#c36'],
	backgroundColor: '#e8fff5',
	title: {
		text: i18next.t("chart.pigsPrice"), //'猪价',
		left: 'center',
		top: 20,
		textStyle: {
			color: '#ccc'
		}
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
	toolbox: {
		show: true,
		right: '10px',
		itemSize: 20,
		feature: {
			myTool1: {
				show: true,
				title: i18next.t("chart.forecast"), //'预测',
				icon: 'image://assets/img/yuce1.png',
				onclick: function() {
					pigPriceOption.xAxis[0].max = (pigPriceOption.xAxis[0].max == 4 ? 8 : 4)
					pigPriceChart.setOption(pigPriceOption)
				}
			},
			myTool2: {
				show: false,
				title: i18next.t("chart.forecast"), //'预测',
				icon: 'image://assets/img/yuce1.png',
				onclick: function() {
					sowPriceOption.xAxis[0].max = (sowPriceOption.xAxis[0].max == 4 ? 8 : 4)
					pigPriceChart.setOption(sowPriceOption)
				}
			},
			myTool3: {
				show: false,
				title: i18next.t("chart.forecast"), //'预测',
				icon: 'image://assets/img/yuce1.png',
				onclick: function() {
					piglitPriceOption.xAxis[0].max = (piglitPriceOption.xAxis[0].max == 4 ? 8 : 4)
					pigPriceChart.setOption(piglitPriceOption)
				}
			}
		}
	},
	legend: {
		data: [i18next.t("chart.field") + "1",i18next.t("chart.field") + '2',i18next.t("chart.field") + '1' + i18next.t("chart.total"),i18next.t("chart.field") + '2' + i18next.t("chart.total")] //['栋舍1', '栋舍2', '栋舍1总价', '栋舍2总价']i18next.t("chart.feedPrice"), //
	},
	dataZoom: {
		show: false
	},
	xAxis: [{
		type: 'category',
		max: 4,
		data:  getMonthArr(), //['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		axisPointer: {
			type: 'shadow'
		}
	}],
	yAxis: [{
			type: 'value',
			name: i18next.t("chart.kilograms"), //'出栏公斤数',
			min: 30000,
			max: 35000,
			interval: 5000,
			axisLabel: {
				formatter: '{value} kg'
			}
		},
		{
			type: 'value',
			name: i18next.t("chart.price"), //'价格',
			min: 180000,
			max: 185000,
			interval: 2000,
			axisLabel: {
				formatter: '{value} ' + i18next.t("chart.yuan") //
			}
		}
	],
	visualMap: [{
		show: false,
		dimension: 0,
		seriesIndex: 0,
		pieces: [{
				lte: 4,
				color: '#f93'
			},
			{
				gt: 4,
				lte: 20,
				color: 'rgba(255,153,51,0.6)'
			}
		]

	}, {
		show: false,
		dimension: 0,
		seriesIndex: 1,
		pieces: [{
				lte: 4,
				color: '#054'
			},
			{
				gt: 4,
				lte: 12,
				color: 'rgba(0,85,68,0.6)'
			}
		]

	}, {
		show: false,
		dimension: 0,
		seriesIndex: 2,
		pieces: [{
				lte: 4,
				color: '#063'
			},
			{
				gt: 4,
				lte: 20,
				color: '#093'
			}
		]

	}, {
		show: false,
		dimension: 0,
		seriesIndex: 3,
		pieces: [{
				lte: 4,
				color: '#c36'
			},
			{
				gt: 4,
				lte: 12,
				color: '#f66'
			}
		]

	}],
	series: [{
			name: i18next.t("chart.field") + '1', //'栋舍1',
			type: 'bar',
			data: [31200, 31050, 31000, 31000, 31000, 31000, 31000, 31000, 31000, 31000, 31000, 31000]
		},
		{
			name: i18next.t("chart.field") + '2', //'栋舍2',
			type: 'bar',
			data: [31300, 31250, 31500, 31400, 31500, 31700, 31800, 31500, 31400, 31700, 31500, 31600]
		},
		{
			name: i18next.t("chart.field") + '1' + i18next.t("chart.total"), //'栋舍1总价',
			type: 'line',
			yAxisIndex: 1,
			data: [182500, 182600, 182700, 183000, 182500, 182500, 182500, 182500, 182500, 182800, 182000, 182100]
		},
		{
			name: i18next.t("chart.field") + '2' + i18next.t("chart.total"), //'栋舍2总价',
			type: 'line',
			yAxisIndex: 1,
			data: [182600, 182700, 182800, 183400, 182700, 182600, 182600, 182600, 182700, 182900, 182500, 182500]
		}
	]
};

 sowPriceOption = {
	color: ['#339', '#c36', '#636', '#09f'],
	backgroundColor: '#fff4ff',
	title: {
		text: i18next.t("chart.pigsPrice"), //'猪价',
		left: 'center',
		top: 20,
		textStyle: {
			color: '#ccc'
		}
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
	toolbox: {
		show: true,
		right: '10px',
		itemSize: 20,
		feature: {
			myTool1: {
				show: false
			},
			myTool2: {
				show: true
			},
			myTool3: {
				show: false
			}
		}
	},
	dataZoom: {
		show: false
	},
	legend: {
		data: [i18next.t("chart.field") + "1",i18next.t("chart.field") + '2',i18next.t("chart.field") + '1' + i18next.t("chart.total"),i18next.t("chart.field") + '2' + i18next.t("chart.total")] //['栋舍1', '栋舍2', '栋舍1总价', '栋舍2总价']i18next.t("chart.feedPrice"), //
	},
	xAxis: [{
		type: 'category',
		max: 4,
		data:  getMonthArr(), //['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		axisPointer: {
			type: 'shadow'
		}
	}],
	yAxis: [{
			type: 'value',
			name: i18next.t("chart.kilograms"), //'出栏公斤数',
			min: 5000,
			max: 5500,
			interval: 500,
			axisLabel: {
				formatter: '{value} kg'
			}
		},
		{
			type: 'value',
			name: i18next.t("chart.price"), //'价格',
			min: 19000,
			max: 21000,
			interval: 500,
			axisLabel: {
				formatter: '{value} ' + i18next.t("chart.yuan") //
			}
		}
	],
	visualMap: [{
		show: false,
		dimension: 0,
		seriesIndex: 0,
		pieces: [{
				lte: 4,
				color: '#339'
			},
			{
				gt: 4,
				color: 'rgba(51,51,153,0.6)'
			}
		]

	}, {
		show: false,
		dimension: 0,
		seriesIndex: 1,
		pieces: [{
				lte: 4,
				color: '#c36'
			},
			{
				gt: 4,
				color: 'rgba(204,51,102,0.6)'
			}
		]

	}, {
		show: false,
		dimension: 0,
		seriesIndex: 2,
		pieces: [{
				lte: 4,
				color: '#636'
			},
			{
				gt: 4,
				lte: 20,
				color: '#a637a6'
			}
		]

	}, {
		show: false,
		dimension: 0,
		seriesIndex: 3,
		pieces: [{
				lte: 4,
				color: '#09f'
			},
			{
				gt: 4,
				lte: 20,
				color: '#39c'
			}
		]

	}],
	series: [{
			name: i18next.t("chart.field") + '1', //'栋舍1',
			type: 'bar',
			data: [5250, 5251, 5253, 5257, 5254, 5260, 5291, 5292, 5293, 5294, 5300, 5320]
		},
		{
			name: i18next.t("chart.field") + '2', //'栋舍2',
			type: 'bar',
			data: [5260, 5261, 5263, 5267, 5264, 5265, 5271, 5285, 5288, 5290, 5394, 5399]
		},
		{
			name: i18next.t("chart.field") + '1' + i18next.t("chart.total"), //'栋舍1总价',
			type: 'line',
			yAxisIndex: 1,
			data: [19962, 19972, 19982, 19982, 19988, 19990, 19995, 19999, 20000, 20050, 20070, 20080]
		},
		{
			name: i18next.t("chart.field") + '2' + i18next.t("chart.total") , //'栋舍2总价',
			type: 'line',
			yAxisIndex: 1,
			data: [19972, 19982, 19992, 19999, 19999, 20000, 20050, 20060, 20066, 20066, 20066, 20076]
		}
	]
};
 piglitPriceOption = {
	color: ['#09f', '#336', '#369', '#f90'],
	backgroundColor: '#feffde',
	title: {
		text: i18next.t("chart.pigsPrice"), //'猪价',
		left: 'center',
		top: 20,
		textStyle: {
			color: '#ccc'
		}
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
	toolbox: {
		show: true,
		right: '10px',
		itemSize: 20,
		feature: {
			myTool1: {
				show: false
			},
			myTool2: {
				show: false
			},
			myTool3: {
				show: true
			}
		}
	},
	dataZoom: {
		show: false
	},
	legend: {
		data: [i18next.t("chart.field") + "1",i18next.t("chart.field") + '2',i18next.t("chart.field") + '1' + i18next.t("chart.total"),i18next.t("chart.field") + '2' + i18next.t("chart.total")]//i18next.t("chart.feedPrice"), //
	},
	xAxis: [{
		type: 'category',
		max: 4,
		data:  getMonthArr(), //['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		axisPointer: {
			type: 'shadow'
		}
	}],
	yAxis: [{
			type: 'value',
			name: i18next.t("chart.kilograms"), //'出栏公斤数',
			min: 15000,
			max: 15300,
			interval: 100,
			axisLabel: {
				formatter: '{value} kg'
			}
		},
		{
			type: 'value',
			name: i18next.t("chart.price"), //'价格',
			min: 870000,
			max: 880000,
			interval: 2000,
			axisLabel: {
				formatter: '{value} ' + i18next.t("chart.yuan")
			}
		}
	],
	visualMap: [{
		show: false,
		dimension: 0,
		seriesIndex: 0,
		pieces: [{
				lte: 4,
				color: '#09f'
			},
			{
				gt: 4,
				color: 'rgba(0,153,255,0.6)'
			}
		]
	}, {
		show: false,
		dimension: 0,
		seriesIndex: 1,
		pieces: [{
				lte: 4,
				color: '#336'
			},
			{
				gt: 4,
				color: 'rgba(51,51,102,0.6)'
			}
		]
	}, {
		show: false,
		dimension: 0,
		seriesIndex: 2,
		pieces: [{
				lte: 4,
				color: '#369'
			},
			{
				gt: 4,
				lte: 20,
				color: '#69f'
			}
		]
	}, {
		show: false,
		dimension: 0,
		seriesIndex: 3,
		pieces: [{
				lte: 4,
				color: '#f90'
			},
			{
				gt: 4,
				lte: 20,
				color: '#f96'
			}
		]
	}],
	series: [{
			name: i18next.t("chart.field") + '1', //'栋舍1',
			type: 'bar',
			data: [15020, 15050, 15050, 15060, 15060, 15060, 15060, 15060, 15069, 15060, 15065, 15066]
		},
		{
			name: i18next.t("chart.field") + '2', //'栋舍2',
			type: 'bar',
			data: [15120, 15120, 15120, 15120, 15120, 15120, 15120, 15120, 15120, 15120, 15120, 15120]
		},
		{
			name: i18next.t("chart.field") + '1' + i18next.t("chart.total"), //'栋舍1总价',
			type: 'line',
			yAxisIndex: 1,
			data: [871000, 871200, 871300, 871400, 871700, 871800, 872200, 872400, 872800, 872900, 872900, 872900]
		},
		{
			name: i18next.t("chart.field") + '2' + i18next.t("chart.total"), //'栋舍2总价',
			type: 'line',
			yAxisIndex: 1,
			data: [872000, 872000, 872000, 872000, 872000, 872000, 872000, 872000, 872000, 872000, 872000, 872000]
		}
	]
};

	
	
	
	
	switchFeedPrice(1)
	switchPigPrice(1)
}
function getMonthArr(){
	let aMonth = new Array()
	let months = i18next.t("chart.months").split(",")
	for(let i = 0; i < 12; i++){
//		console.log(i18next.t("chart.months"))
		aMonth.push(months[i])
	}
	return aMonth
}
/*繁育 */
function breed() {
	//初始化
	var myChart = echarts.init(document.getElementById('farm_size_1'));

	var dataAxis = getMonthArr() // ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
	var liveNum = [340, 340, 340, 340, 340, 340, 340, 340,340];
	var weakNum = [20, 30, 30, 30, 25, 26, 27, 29,28];
	var dieNum = [10, 15, 17, 12, 18, 17, 19, 19,19];
	var liveNum1 = [346, 345, 344, 345, 345, 345, 344, 342,345];
	var weakNum1 = [22, 27, 31, 29, 25, 25, 26, 25,27];
	var dieNum1 = [11, 12, 18, 13, 15, 16, 18, 18,17];
	var yMax = 16;
	var dataShadow = [];

	/*for(var i = 0; i < data.length; i++) {
		dataShadow.push(yMax);
	}*/

	var option = {
		title: {
			text: i18next.t("chart.sowBreeding"), //'母猪生产',
			subtext: i18next.t("chart.breedingStat") //'繁育统计'
		},
		grid: { //设置整体的大小
			top: '15%',
			bottom: '15%',
		},
		toolbox: {
			show: true,
			itemSize: 30,
			right: '20px',
			feature: {
				myTool1: {
					show: true,
					title: i18next.t("chart.forecast"), //'预测',
					icon: 'image://assets/img/yuce1.png',
					onclick: function() {
						option.xAxis.max = (option.xAxis.max == 4 ? 8 : 4)
						myChart.setOption(option);
					}
				},
			}
		},
		legend: {
			bottom: 4,
			data: [i18next.t("chart.healthy"),i18next.t("chart.weak"),i18next.t("chart.death")] //['健仔', '弱仔', '死亡']
		},
		xAxis: {
			type: 'category',
			max: 4,
			data: dataAxis,
		},
		yAxis: {
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#999'
				}
			}
		},
		dataZoom: [{
			type: 'inside'
		}],
		series: [{
				name: i18next.t("chart.death"),
				type: 'bar',
				barCateGoryGap: '2%',
				barWidth: 40,
				stack: i18next.t("chart.januaryRoom"), //'1月产房一',
				itemStyle: {
					normal: {
						color: function(params) {
							return params.dataIndex > 4 ? 'rgba(102,102,102,0.8)' : 'rgba(102,102,102,1)'
						}
					}
				},
				label: {
					normal: {
						show: false,
						position: 'bottom'
					}
				},
				data: dieNum
			},
			{
				name: i18next.t("chart.weak"), //'弱仔',
				type: 'bar',
				barWidth: 40,
				itemStyle: {
					normal: {
						color: function(params) {
							return params.dataIndex > 4 ? 'rgba(51,200,204,0.8)' : 'rgba(51,200,204,1)'
						}
					}
				},
				stack: i18next.t("chart.januaryRoom"), //'1月产房一',
				data: weakNum
			},
			{
				name: i18next.t("chart.healthy"), //'健仔',
				type: 'bar',
				barWidth: 40,
				itemStyle: {
					normal: {
						color: function(params) {
							return params.dataIndex > 4 ? 'rgba(51,153,204,0.8)' : 'rgba(51,153,204,1)'
						}
					}
				},
				label: {
					normal: {
						rotate: 40,
						align: 'left',
						verticalAlign: 'middle',
						position: 'top',
						distance: 1,
						show: true,
						color: '#555',
						formatter: function(params) {
							return i18next.t("chart.deliveryRoom1") //'产房一'
						}
					}
				},
				stack: i18next.t("chart.januaryRoom"), //'1月产房一',
				data: liveNum
			},
			{
				name: i18next.t("chart.death"), //'死亡',
				type: 'bar',
				stack: i18next.t("chart.deliveryRoom2"), //'产房二',
				barWidth: 40,
				itemStyle: {
					normal: {
						color: function(params) {
							return params.dataIndex > 4 ? 'rgba(102,102,102,0.8)' : 'rgba(102,102,102,1)'
						}
					}
				},
				data: dieNum1
			},
			{
				name: i18next.t("chart.weak"), //'弱仔',
				type: 'bar',
				stack: i18next.t("chart.deliveryRoom2"), //'产房二',
				barWidth: 40,
				itemStyle: {
					normal: {
						color: function(params) {
							return params.dataIndex > 4 ? 'rgba(51,200,204,0.8)' : 'rgba(51,200,204,1)'
						}
					}
				},
				data: weakNum1
			},
			{
				name: i18next.t("chart.healthy"), //'健仔',
				type: 'bar',
				stack: i18next.t("chart.deliveryRoom2"), //'产房二',
				barWidth: 40,
				itemStyle: {
					normal: {
						color: function(params) {
							return params.dataIndex > 4 ? 'rgba(51,153,204,0.8)' : 'rgba(51,153,204,1)'
						}
					}
				},
				label: {
					normal: {
						rotate: 40,
						align: 'left',
						verticalAlign: 'middle',
						position: 'top',
						distance: 1,
						show: true,
						color: '#555',
						formatter: function(params) {
							return i18next.t("chart.deliveryRoom2") //'产房二'
						}
					}
				},
				data: liveNum1
			}
		]
	};

	// Enable data zoom when user click bar.
	var zoomSize = 6;
	myChart.on('click', function(params) {
		console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
		myChart.dispatchAction({
			type: 'dataZoom',
			startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
			endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
		});
	});

	// 使用刚指定的配置项和数据显示图表。 
	myChart.setOption(option);
}

/*
 * 切换饲料价格
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
		case 1: //生猪料价格
			feedPriceChart.setOption(pigFeedPriceOption);
			break;
		case 2: //母猪料价格
			feedPriceChart.setOption(sowFeedPriceOption);
			break;
	}
}

/*
 * 切换猪价
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
		case 1: //生猪价格
			pigPriceChart.setOption(pigPriceOption);
			break;
		case 3: //母猪价格
			pigPriceChart.setOption(sowPriceOption);
			break;
		case 2: //仔猪价格
			pigPriceChart.setOption(piglitPriceOption);
			break;
	}
}