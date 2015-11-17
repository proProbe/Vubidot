module.exports = {
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