'use strict';
var app = angular.module('App',[
	'ngRoute',
	'highcharts-ng'
	]);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.otherwise({redirectTo: '/'});
}]);

app.controller('MainController', ['$http', function($http){
	var main = this;
	// updateData();
	main.chartConfig = {

		options: {
			chart: {
				type: 'bar'
			},
			tooltip: {
				style: {
					padding: 10,
					fontWeight: 'bold'
				}
			}
		},

		series: [{
			data: [10, 15, 12, 8, 7]
		}],
		title: {
			text: 'Hello'
		},
		loading: false,
		xAxis: {
			currentMin: 0,
			currentMax: 20,
			title: {text: 'values'}
		},
		useHighStocks: false,
		size: {
			width: 400,
			height: 300
		},
		func: function (chart) {
		}
	};
	main.chartConfig2 = {
		"options": {
			"chart": {
				"type": "pie"
			},
			"plotOptions": {
				"series": {
					"stacking": ""
				}
			}
		},
		"series": [
		{
			"name": "Some data",
			"data": [
			1,
			2,
			4,
			7,
			3
			]
		},
		{
			"name": "Some data 3",
			"data": [
			3,
			1,
			null,
			5,
			2
			],
			"connectNulls": true
		},
		{
			"name": "Some data 2",
			"data": [
			5,
			2,
			2,
			3,
			5
			],
			"type": "column"
		},
		{
			"name": "My Super Column",
			"data": [
			1,
			1,
			2,
			3,
			2
			],
			"type": "column"
		}
		],
		"title": {
			"text": "Hello"
		},
		"credits": {
			"enabled": true
		},
		"loading": false,
		"size": {}
	};


function updateData(){

	$http({
		method: 'GET',
		url: 'http://things.ubidots.com/api/v1.6/variables/5634b7577625425d815517b7/values',
		headers: {
			'X-Auth-Token': 'UpyVWc57qAd9FIIqlArKYJ3oBo6aoJ'
		}
	})
	.success(function(data){
		console.log(data);
		main.dataSource1 = data;
	})
	.error(function(err){
		console.log(err);
	});
}
}]);