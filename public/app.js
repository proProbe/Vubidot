'use strict';

var ubidotsCredentials = require('./config/ubidot_credentials.js');

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

	main.updateData = function updateData(){

		$http({
			method: 'GET',
			url: 'http://things.ubidots.com/api/v1.6/variables/' + ubidotsCredentials.variables.first + '/values',
			headers: {
				'X-Auth-Token': ubidotsCredentials.api_token
			}
		})
		.success(function(data){
			var srcData = [];
			for (var i = data.results.length - 1; i >= 0; i--) {
				srcData.push([data.results[i].created_at, data.results[i].value]);
			}
			main.chartConfig.series = [];
			main.lineConfig.series = [];
			main.chartConfig.loading = false;
			main.lineConfig.loading = false;
			main.chartConfig.series.push({
				"data":srcData,
				"connectNulls": true,
				"type": "area",
				"name": "Waste level"
			});
			main.lineConfig.series.push({
				"data":srcData,
				"connectNulls": true,
				"type": "spline",
				"name": "Waste level"
			});
		})
		.error(function(err){
			console.log(err);
		});
	};

	main.addPoint = function addPoint(){
		var d = new Date();
		main.chartConfig.series[0].data.push([Math.random()*10 + 60]);
	};

	main.chartConfig = {
		"options": {
			"chart": {
				"type": "line"
			},
			"plotOptions": {
				"series": {
					"stacking": ""
				}
			}
		},
		"series": [],
		"title": {
			"text": "Waste level"
		},
		"yAxis": {
			title: {text: "Level"}
		},
		"xAxis":{
			title: {text: "Hour"},
			type: "category"
		},
		"credits": {
			"enabled": true
		},
		"loading": true,
		"size": {},
		func: function(chart){

		}
	};
	main.lineConfig = {
		"options": {
			"chart": {
				"type": "spline"
			},
			"plotOptions": {
				"series": {
					"stacking": ""
				}
			}
		},
		"series": [],
		"title": {
			"text": "Waste level"
		},
		"yAxis": {
			title: {text: "Level"},
			// minorGridLineWidth: 0,
            gridLineWidth: 0,
            // alternateGridColor: null,
            plotBands: [{ // Fresh breeze
                from: 0,
                to: 50,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'Low level',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // Strong breeze
                from: 50,
                to: 80,
                color: 'rgba(0, 0, 0, 0)',
                label: {
                    text: 'Moderate level',
                    style: {
                        color: '#606060'
                    }
                }
            }, { // High wind
                from: 80,
                to: 100,
                color: 'rgba(68, 170, 213, 0.1)',
                label: {
                    text: 'High level',
                    style: {
                        color: '#606060'
                    }
                }
            }]
		},
		"xAxis":{
			title: {text: "Hour"},
			type: "category"
		},
		"credits": {
			"enabled": true
		},
		"loading": true,
		"size": {},
		func: function(chart){

		}
	};
	main.updateData();
}]);