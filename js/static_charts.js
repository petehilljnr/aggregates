var boxChart1;
var boxChart1Data;

var sourceDataMax = -Infinity;
var sourceDataMin = Infinity;

var boxChart2;
var boxChart2Data;

var boxChart3;
var boxChart3Data;

var lineChartCDF;
var lineChartCDFData;

var lineChart2CDF;
var lineChart2CDFData;
var lineChart3CDF;
var lineChart3CDFData;

var allQuantiles = {'age' : [0.25, 0.75], 'psv' : [0.25,0.75], 'source': [0.25,0.75]};

var updateBoxPlots = true;

nv.addGraph(function() {
      boxChart1 = nv.models.boxPlotChart()
          .x(function(d) { return d.label })
          .y(function(d) { return d.values.Q3 })
          .staggerLabels(false)
          .maxBoxWidth(75) // prevent boxes from being incredibly wide 
          ;

      //boxChart1.xAxis.rotateLabels(90);
      boxChart1.yAxis.tickFormat(d3.format('.02f'))
      boxChart1.margin({bottom: 100});
      //boxChart1.padData(true)      


      boxChart1Data = d3.select('#boxplot-source svg')
          .datum([])
          .call(boxChart1);

      nv.utils.windowResize(boxChart1.update);
      return boxChart1;
    });

nv.addGraph(function() {
      boxChart2 = nv.models.boxPlotChart()
          .x(function(d) { return d.label })
          .y(function(d) { return d.values.Q3 })

          .staggerLabels(false)
          .maxBoxWidth(75) // prevent boxes from being incredibly wide 
          ;
      boxChart2.yAxis.tickFormat(d3.format('.02f'))
      //boxChart1.xAxis.rotateLabels(90);
      boxChart2.margin({bottom: 40});
      //boxChart1.padData(true)      


      boxChart2Data = d3.select('#boxplot-psv svg')
          .datum([])
          .call(boxChart2);

      nv.utils.windowResize(boxChart2.update);
      return boxChart2;
    });

nv.addGraph(function() {
      boxChart3 = nv.models.boxPlotChart()
          .x(function(d) { return d.label })
          .y(function(d) { return d.values.Q3 })

          .staggerLabels(false)
          .maxBoxWidth(75) // prevent boxes from being incredibly wide 
          ;
      boxChart3.yAxis.tickFormat(d3.format('.02f'))
      //boxChart1.xAxis.rotateLabels(90);
      boxChart3.margin({bottom: 40});
      //boxChart1.padData(true)      


      boxChart3Data = d3.select('#boxplot-age svg')
          .datum([])
          .call(boxChart3);

      nv.utils.windowResize(boxChart3.update);
      return boxChart3;
    });

nv.addGraph(function() {
      lineChartCDF = nv.models.lineChart()
          .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
          .showYAxis(true)        //Show the y-axis
          .showXAxis(true)   
          .showLegend(true) 
      
      lineChartCDF.yAxis.tickFormat(d3.format('.02f'))
      //boxChart1.xAxis.rotateLabels(90);
      lineChartCDF.xAxis     //Chart x-axis settings
	      .axisLabel('SCRIM ESC')

	  lineChartCDF.yAxis     //Chart y-axis settings
	      .axisLabel('Frequency')
	      .tickFormat(d3.format(".0%"));

      lineChartCDFData = d3.select('#lineplot-cdf svg')
          .datum([])
          .call(lineChartCDF);

      nv.utils.windowResize(lineChartCDF.update);
      return lineChartCDF;
    });

nv.addGraph(function() {
      lineChart2CDF = nv.models.lineChart()
          .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
          .showYAxis(true)        //Show the y-axis
          .showXAxis(true)   
          .showLegend(true) 
      
      lineChart2CDF.xAxis.tickFormat(d3.format('.02f'))
      //boxChart1.xAxis.rotateLabels(90);
      lineChart2CDF.xAxis     //Chart x-axis settings
	      .axisLabel('Percentage')
	      .tickFormat(d3.format(".0%"));

	  lineChart2CDF.yAxis     //Chart y-axis settings
	      .axisLabel('SCRIM ESC')	      

      lineChart2CDFData = d3.select('#lineplot2-cdf svg')
          .datum([])
          .call(lineChart2CDF);

      nv.utils.windowResize(lineChart2CDF.update);
      return lineChart2CDF;
    });
nv.addGraph(function() {
      lineChart3CDF = nv.models.lineChart()
          .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
          .showYAxis(true)        //Show the y-axis
          .showXAxis(true)   
          .showLegend(true) 
      
      lineChart3CDF.xAxis.tickFormat(d3.format('.02f'))
      //boxChart1.xAxis.rotateLabels(90);
      lineChart3CDF.xAxis     //Chart x-axis settings
	      .axisLabel('SCRIM ESC')

	  lineChart3CDF.yAxis     //Chart y-axis settings
	      .axisLabel('Frequency')

      lineChart3CDFData = d3.select('#lineplot3-cdf svg')
          .datum([])
          .call(lineChart3CDF);

      nv.utils.windowResize(lineChart3CDF.update);
      return lineChart3CDF;
    });

function createPlots(dataAll, quart1, quart2, quart3) {
	if(updateBoxPlots) {
		//console.log('called')
		var sourceData = [];
		var psvData = [];
		var ageData = [];
		var cdfE = [];
		var cdfA = [];
		var cdfE2 = [];
		var cdfA2 = [];
		var normD = [];

		//var bySourceData= [], byPsvData = [], byAgeData = [];

		var data = dataAll.top(Infinity);

		var allScrim = data.map(function(d) { return d.scrim;});
		var allScrimMean = d3.mean(allScrim);
		var allScrimStd = d3.deviation(allScrim);

		$("#table-count").text(allScrim.length)
		$("#table-len").text(d3.format('.02f')(d3.sum(data, d => d.length_m)))
		$("#table-mean").text(d3.format('.03f')(allScrimMean))
		$("#table-std").text(d3.format('.03f')(allScrimStd))
		$("#table-med").text(d3.format('.02f')(d3.median(allScrim)))

		for (var i = 0.3; i <= 0.81; i=i+0.01) {
		    cdfE.push({x: Math.round(i * 100) / 100, y: Math.round(normalcdf((i-allScrimMean)/allScrimStd) * 1000)/1000});
		    cdfE2.push({y: Math.round(i * 100) / 100, x: Math.round(normalcdf((i-allScrimMean)/allScrimStd) * 1000)/1000});

		    var y = allScrim.filter(function(d) { return d <= i })

		    cdfA.push({x: Math.round(i * 100) / 100, y: Math.round((y.length / allScrim.length) * 1000)/1000});
		    cdfA2.push({y: Math.round(i * 100) / 100, x: Math.round((y.length / allScrim.length) * 1000)/1000});
		  }

	  	for (var i = 0; i <= 1; i=i+0.01) {
	  		var y = allScrim.filter(function(d) { return d >= i && d < i+0.01 });
	  		normD.push({x: Math.round(i * 100) / 100, y: y.length});
	  	}

		var bySourceData = d3.nest().key(function(d) {return d.source;}).entries(data);
		var byPsvData = d3.nest().key(function(d) {return d.psv;}).entries(data);
		var byAgeData = d3.nest().key(function(d) {return d.age;}).entries(data);

		bySourceData.forEach(function(d) {
			var values = d.values.map(function(obj) {
				return obj.scrim;
			})

			values.sort(function(a,b) { 
				return a - b;
			});

			d.values = values


		});


		byPsvData.forEach(function(d) {
			var values = d.values.map(function(obj) {
				return obj.scrim;
			})

			values.sort(function(a,b) { 
				return a - b;
			});

			d.values = values
		});

		byAgeData.forEach(function(d) {
			var values = d.values.map(function(obj) {
				return obj.scrim;
			})

			values.sort(function(a,b) { 
				return a - b;
			});

			d.values = values
		});

		sourceDataMax = -Infinity;
		sourceDataMin = Infinity;

		bySourceData.forEach(function(d) {
			var values = d.values;
			var label = d.key;
			var Q1 = Math.round(d3.quantile(values,allQuantiles['source'][0]) * 100) / 100;
			var Q2 = Math.round(d3.quantile(values,0.5) * 100) / 100;
			var Q3 = Math.round(d3.quantile(values,allQuantiles['source'][1]) * 100) / 100;
			var whisker_low = Math.round(values[0] * 100) / 100;
			var whisker_high = Math.round(values[values.length-1] * 100) / 100;

			sourceDataMax = sourceDataMax < whisker_high ? whisker_high : sourceDataMax;
			sourceDataMin = sourceDataMin > whisker_low ? whisker_low : sourceDataMin;
			
			sourceData.push({
				label: label,
				values: {
					Q1: Q1,
					Q2: Q2,
					Q3: Q3,
					whisker_low: whisker_low,
					whisker_high: whisker_high,
					outliers: []
					}
			});
		});
		
		sourceData.sort(function(a,b) {
			return (a.values.Q2 + (a.values.Q3/100)) - (b.values.Q2 + (b.values.Q3/100));
		});

		byPsvData.forEach(function(d) {
			var values = d.values;
			var label = d.key;
			var Q1 = Math.round(d3.quantile(values,allQuantiles['psv'][0]) * 100) / 100;
			var Q2 = Math.round(d3.quantile(values,0.5) * 100) / 100;
			var Q3 = Math.round(d3.quantile(values,allQuantiles['psv'][1]) * 100) / 100;
			var whisker_low = Math.round(values[0] * 100) / 100;
			var whisker_high = Math.round(values[values.length-1] * 100) / 100;

			psvData.push({
				label: label,
				values: {
					Q1: Q1,
					Q2: Q2,
					Q3: Q3,
					whisker_low: whisker_low,
					whisker_high: whisker_high,
					outliers: []
					}		
			});
		});
		
		byAgeData.forEach(function(d) {
			var values = d.values;
			var label = d.key;
			var Q1 = Math.round(d3.quantile(values,allQuantiles['age'][0]) * 100) / 100;
			var Q2 = Math.round(d3.quantile(values,0.5) * 100) / 100;
			var Q3 = Math.round(d3.quantile(values,allQuantiles['age'][1]) * 100) / 100;
			var whisker_low = Math.round(values[0] * 100) / 100;
			var whisker_high = Math.round(values[values.length-1] * 100) / 100;

			ageData.push({
				label: label,
				values: {
					Q1: Q1,
					Q2: Q2,
					Q3: Q3,
					whisker_low: whisker_low,
					whisker_high: whisker_high,
					outliers: []
					}		
			});
		});
		

		//boxChart1.yAxis.scale().domain([Math.max(sourceDataMin - 0.1,0), Math.min(sourceDataMax + 0.1,1)]);
		boxChart1Data.datum(sourceData).call(boxChart1);
		nv.utils.windowResize(boxChart1.update);

		boxChart2Data.datum(psvData).call(boxChart2);
		nv.utils.windowResize(boxChart2.update);

		boxChart3Data.datum(ageData).call(boxChart3);
		nv.utils.windowResize(boxChart3.update);

		lineChartCDFData.datum([{key: "Estimated CF", values: cdfE}, {key: "Actual CF", values: cdfA, color: "#ff802c"}]).call(lineChartCDF);
		lineChart2CDFData.datum([{key: "Estimated CF", values: cdfE2}, {key: "Actual CF", values: cdfA2, color: "#ff802c"}]).call(lineChart2CDF);
		lineChart3CDFData.datum([{key: "Distribution", values: normD}]).call(lineChart3CDF);
		nv.utils.windowResize(lineChartCDF.update);
		nv.utils.windowResize(lineChart2CDF.update);
		nv.utils.windowResize(lineChart3CDF.update);

		var angle = -90;

		var xTicks = d3.select('#boxplot-source .nv-x.nv-axis > g').selectAll('g').selectAll('text');
		xTicks.attr('transform', function() { return 'rotate(' + angle + ' 0,0)' }) ;
		xTicks.style('text-anchor',function() {
		    var anchor;
		    if(angle > 0){ anchor = 'start'; }
		    else if(angle < 0){ anchor = 'end'; }
		    else { anchor = 'middle'; }
		    return anchor;
		});
	}
}

function normalcdf(X){   //HASTINGS.  MAX ERROR = .000001
	var T=1/(1+.2316419*Math.abs(X));
	var D=.3989423*Math.exp(-X*X/2);
	var Prob=D*T*(.3193815+T*(-.3565638+T*(1.781478+T*(-1.821256+T*1.330274))));
	if (X>0) {
		Prob=1-Prob
	}
	return Prob
}   

