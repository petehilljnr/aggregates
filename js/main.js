var tempDim;
var tempGrp;

$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
});

$('#loading').modal('show');

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function remove_empty_bins(source_group) {
	    return {
	        all:function () {
	            return source_group.all().filter(function(d) {
	                return Math.round(d.value * 100) / 100 != 0;
	            });
	        }
	    };
	};

queue()
    .defer(d3.json, "https://www.geelong.stantec.online/v1/query/aggregates?schema=nzta&?columns=traffic%2Cheavy%2Cgradient%2Ccurvature%2Csource%2Cmaterial%2Ccontract%2Cskid_site%2Cscrim%2Cage%2Chierarchy%2Curban_rural%2Cfunction%2Csurf_category%2Cpsv%2Cmpd%2Clength_m%2Cmap_id")
    .await(makeCharts);

function makeCharts(error, data) {

	data.forEach(function(d) {
		d.age = +d.age;
		d.scrim = +d.scrim;
		d.gradient = +d.gradient;
		d.mpd = +d.mpd;
		d.length_m = +d.length_m / 1000;
		d.source = luSources[d.source] || 'unknown'; //
		d.contract = luContracts[d.contract] || 'unknown';//
		d.psv = +d.psv;
		d.material = luMaterials[d.material] || 'unknown';//
		d.surf_category = luCategories[d.surf_category] || 'unknown';//
		d.urban_rural = luUrban[d.urban_rural] || 'unknown';
		d.function = luFunction[d.function] || 'unknown';
		d.curvature = luCurves[d.curvature] || 'unknown';
		d.hierarchy = luHierarchy[d.hierarchy] || 'unknown';
		d.traffic = luTraffic[d.traffic] || 'unknown';
		d.heavy = luHeavies[d.heavy] || 'unknown';
	});

	var fillColour = '#0099cc'
	var ndx					= crossfilter(data),

		all					= ndx.groupAll(),

		sourceDimension		= ndx.dimension(function(d) { return d.source; }),
		sourceGroup			= remove_empty_bins(sourceDimension.group().reduceSum(function(d) {return d.length_m; })),

		contractDimension	= ndx.dimension(function(d) { return d.contract; }),
		contractGroup		= remove_empty_bins(contractDimension.group().reduceSum(function(d) {return d.length_m; })),

		psvDimension		= ndx.dimension(function(d) { return d.psv; }),
		psvGroup			= remove_empty_bins(psvDimension.group().reduceSum(function(d) {return d.length_m; })),

		ageDimension		= ndx.dimension(function(d) { return d.age; }),
		ageGroup			= remove_empty_bins(ageDimension.group().reduceSum(function(d) {return d.length_m; })),

		materialDimension	= ndx.dimension(function(d) { return d.material; }),
		materialGroup		= remove_empty_bins(materialDimension.group().reduceSum(function(d) {return d.length_m; })),

		categoryDimension	= ndx.dimension(function(d) { return d.surf_category; }),
		categoryGroup		= categoryDimension.group().reduceSum(function(d) {return d.length_m; }),

		functionDimension	= ndx.dimension(function(d) { return d.function; }),
		functionGroup		= functionDimension.group().reduceSum(function(d) {return d.length_m; }),

		urbanDimension		= ndx.dimension(function(d) { return d.urban_rural; }),
		urbanGroup			= urbanDimension.group().reduceSum(function(d) {return d.length_m; }),

		skidDimension		= ndx.dimension(function(d) { return d.skid_site; }),
		skidGroup			= skidDimension.group().reduceSum(function(d) {return d.length_m; }),

		mpdDimension		= ndx.dimension(function(d) { return d.mpd; }),
		mpdGroup			= mpdDimension.group().reduceSum(function(d) {return d.length_m; }),

		curveDimension		= ndx.dimension(function(d) { return d.curvature; }),
		curveGroup			= curveDimension.group().reduceSum(function(d) {return d.length_m; }),

		gradientDimension	= ndx.dimension(function(d) { return d.gradient; }),
		gradientGroup		= gradientDimension.group().reduceSum(function(d) {return d.length_m; }),

		hierarchyDimension	= ndx.dimension(function(d) { return d.hierarchy; }),
		hierarchyGroup		= hierarchyDimension.group().reduceSum(function(d) {return d.length_m; }),

		heavyDimension		= ndx.dimension(function(d) { return d.heavy; }),
		heavyGroup			= heavyDimension.group().reduceSum(function(d) {return d.length_m; }),

		trafficDimension	= ndx.dimension(function(d) { return d.traffic; }),
		trafficGroup		= trafficDimension.group().reduceSum(function(d) {return d.length_m; }); 
		

	tempDim = sourceDimension;
	tempGrp = sourceGroup;

		/*,
		psvBoxDimension		= ndx.dimension(function(d) { return d.psv; }),
		sourceBoxDimension	= ndx.dimension(function(d) { return d.source; }),
		ageBoxDimension		= ndx.dimension(function(d) { return d.age; });

		
	*/
	/*
	var sourceBoxGroup		= remove_empty_bins(sourceBoxDimension.group().reduce(
			function(p,v) {
				var i = _.sortedIndex(p,v.scrim);
				p.splice(i,0,v.scrim);
				return p;
			},
			function(p,v) {
				var i = _.indexOf(p,v.scrim,true)
				p.splice(i,1);
				return p;
			},
			function() {
				return [];
			})
	); 

	var psvBoxGroup		= remove_empty_bins(psvBoxDimension.group().reduce(
			function(p,v) {
				var i = _.sortedIndex(p,v.scrim);
				p.splice(i,0,v.scrim);
				return p;
			},
			function(p,v) {
				var i = _.indexOf(p,v.scrim,true)
				p.splice(i,1);
				return p;
			},
			function() {
				return [];
			})
	);

	var ageBoxGroup		= remove_empty_bins(ageBoxDimension.group().reduce(
			function(p,v) {
				var i = _.sortedIndex(p,v.scrim);
				p.splice(i,0,v.scrim);
				return p;
			},
			function(p,v) {
				var i = _.indexOf(p,v.scrim,true)
				p.splice(i,1);
				return p;
			},
			function() {
				return [];
			})
	);
	*/
	createBoxPlots = function() {
    	createPlots(tempDim);
    	updateMap();

    };

	var sourceChart = dc.rowChart("#rowChart-sources");
	var contractChart = dc.barChart("#barChart-contract");
	var psvChart = dc.barChart("#barChart-psv");
	var ageChart = dc.barChart("#barChart-age");
	var materialChart = dc.barChart("#barChart-material");
	var categoryChart = dc.pieChart("#pieChart-category");
	var functionChart = dc.pieChart("#pieChart-function");
	var urbanChart = dc.pieChart("#pieChart-urban");
	var siteChart = dc.rowChart("#rowChart-site");
	var gradientChart = dc.lineChart('#barChart-gradient');
	var curveChart = dc.rowChart('#rowChart-curve');
	var mpdChart = dc.lineChart('#barChart-mpd');
	var trafficChart = dc.rowChart('#rowChart-traffic');
	var heavyChart = dc.rowChart('#rowChart-heavy');
	var hierarchyChart = dc.rowChart('#rowChart-hierarchy');

	//var sourceBoxPlot = dc.boxPlot("#boxPlot-source")

	sourceChart
			.margins({top: 5, left: 10, right: 20, bottom: 20})
			.on('filtered', createBoxPlots)
			.group(sourceGroup)
			.colors(fillColour)
			.dimension(sourceDimension)
			.title(function(d) { return d.key + ': ' + Math.round(d.value * 100) / 100 + ' lane km'})
			.elasticX(true)
			.xAxis().ticks(4);

	contractChart
			.margins({top: 5, left: 50, right: 20, bottom: 80})
			.on('filtered', createBoxPlots)
			.group(contractGroup)
			.colors(fillColour)
			.dimension(contractDimension)
			//.keyAccessor(function(d) { return luContracts[d.key] || 'unknown'})
			.x(d3.scale.ordinal())			
			.xUnits(dc.units.ordinal)
			.title(function(d) { return d.key + ': ' + Math.round(d.value * 100) / 100 + ' lane km'})
			.barPadding(0.1)
			.outerPadding(0.05)
			.on("pretransition",function (chart) {
                    chart.selectAll("g.x text")
                      .style('text-anchor', 'start')
                      .attr('transform', "rotate(45)");
                })
			.brushOn(false)
			.elasticX(true)
			.elasticY(true);

	psvChart
			.margins({top: 5, left: 50, right: 20, bottom: 40})
			.on('filtered', createBoxPlots)
			.group(psvGroup)
			.colors(fillColour)
			.dimension(psvDimension)
			.x(d3.scale.ordinal())			
			.xUnits(dc.units.ordinal)
			.title(function(d) { return d.key + ': ' + Math.round(d.value * 100) / 100 + ' lane km'})
			.barPadding(0.1)
			.outerPadding(0.05)
			.brushOn(false)
			.elasticX(true)
			.elasticY(true);

	materialChart
			.margins({top: 5, left: 50, right: 20, bottom: 40})
			.on('filtered', createBoxPlots)
			.group(materialGroup)
			.colors(fillColour)
			.dimension(materialDimension)
			.x(d3.scale.ordinal())			
			.xUnits(dc.units.ordinal)
			.title(function(d) { return d.key + ': ' + Math.round(d.value * 100) / 100 + ' lane km'})
			.barPadding(0.1)
			.outerPadding(0.05)
			.on("pretransition",function (chart) {
                    chart.selectAll("g.x text")
                      .style('text-anchor', 'start')
                      .attr('transform', "rotate(45)");
                })
			.brushOn(false)
			.elasticX(true)
			.elasticY(true);

	ageChart
			.margins({top: 5, left: 50, right: 20, bottom: 40})
			.on('filtered', createBoxPlots)
			.group(ageGroup)
			.colors(fillColour)
			.dimension(ageDimension)
			.x(d3.scale.ordinal())			
			.xUnits(dc.units.ordinal)
			.title(function(d) { return d.key + ': ' + Math.round(d.value * 100) / 100 + ' lane km'})
			.barPadding(0.1)
			.outerPadding(0.05)
			.brushOn(false)
			.elasticX(true)
			.elasticY(true);

	categoryChart
		.innerRadius(50)
		.on('filtered', createBoxPlots)
		.dimension(categoryDimension)
		.group(categoryGroup)
		.slicesCap(2)
		.legend(dc.legend())
		.title(function(d) {
                  return d.key + ' : ' + Math.round(d.value * 100) / 100 ;
              })
		// workaround for #703: not enough data is accessible through .label() to display percentages
		.on("pretransition",function(chart) {
			chart.selectAll('text.pie-slice').text(function(d) {
			return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
			});
		})		;

	functionChart
		.innerRadius(50)
		.on('filtered', createBoxPlots)
		.dimension(functionDimension)
		.group(functionGroup)
		.slicesCap(3)
		.legend(dc.legend())
		.title(function(d) {
                  return d.key + ' : ' + Math.round(d.value * 100) / 100 ;
              })
		.on("pretransition",function(chart) {
			chart.selectAll('text.pie-slice').text(function(d) {
			return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
			});
		});


	urbanChart
		.innerRadius(50)
		.on('filtered', createBoxPlots)
		.dimension(urbanDimension)
		.group(urbanGroup)
		.slicesCap(3)
		.legend(dc.legend())
		.title(function(d) {
                  return d.key + ' : ' + Math.round(d.value * 100) / 100 ;
              })
		// workaround for #703: not enough data is accessible through .label() to display percentages
		.on("pretransition",function(chart) {
			chart.selectAll('text.pie-slice').text(function(d) {
			return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
			});
		});

	siteChart
			.margins({top: 5, left: 10, right: 20, bottom: 20})
			.on('filtered', createBoxPlots)
			.group(skidGroup)
			.colors(fillColour)
			.dimension(skidDimension)
			.title(function(d) { return d.key + ': ' + Math.round(d.value * 100) / 100 + ' lane km'})
			.elasticX(true)
			.xAxis().ticks(4);

	curveChart
			.margins({top: 5, left: 10, right: 20, bottom: 20})
			.on('filtered', createBoxPlots)
			.group(curveGroup)
			.colors(fillColour)
			.dimension(curveDimension)
			.title(function(d) { return d.key + ': ' + Math.round(d.value * 100) / 100 + ' lane km'})
			.elasticX(true)
			.xAxis().ticks(4);

	gradientChart
			.margins({top: 5, left: 50, right: 20, bottom: 20})
			.on('filtered', createBoxPlots)
			.renderArea(true)
			.group(gradientGroup)
			.colors(fillColour)
			.dimension(gradientDimension)
			.x(d3.scale.linear().domain([-15,15]))			
			.title(function(d) { return d.key + ': ' + Math.round(d.value * 100) / 100 + ' lane km'})
			//.barPadding(0.1)
			//.outerPadding(0.05)
			.brushOn(true)
			.elasticX(true)
			.elasticY(true);

	mpdChart
			.margins({top: 5, left: 50, right: 20, bottom: 20})
			.on('filtered', createBoxPlots)
			.group(mpdGroup)
			.renderArea(true)
			.colors(fillColour)
			.dimension(mpdDimension)
			.x(d3.scale.linear().domain([0,10]))			
			.title(function(d) { return d.key + ': ' + Math.round(d.value * 100) / 100 + ' lane km'})
			//.barPadding(0.1)
			//.outerPadding(0.05)
			.brushOn(true)
			.elasticX(true)
			.elasticY(true);

	trafficChart
			.margins({top: 5, left: 10, right: 20, bottom: 20})
			.on('filtered', createBoxPlots)
			.group(trafficGroup)
			.colors(fillColour)
			.dimension(trafficDimension)
			.title(function(d) { return d.key + ': ' + Math.round(d.value * 100) / 100 + ' lane km'})
			.elasticX(true)
			.xAxis().ticks(4);

	heavyChart
			.margins({top: 5, left: 10, right: 20, bottom: 20})
			.on('filtered', createBoxPlots)
			.group(heavyGroup)
			.colors(fillColour)
			.dimension(heavyDimension)
			.title(function(d) { return d.key + ': ' + Math.round(d.value * 100) / 100 + ' lane km'})
			.elasticX(true)
			.xAxis().ticks(4);

	hierarchyChart
			.margins({top: 5, left: 10, right: 20, bottom: 20})
			.on('filtered', createBoxPlots)
			.group(hierarchyGroup)
			.colors(fillColour)
			.dimension(hierarchyDimension)
			.title(function(d) { return d.key + ': ' + Math.round(d.value * 100) / 100 + ' lane km'})
			.elasticX(true)
			.xAxis().ticks(4);

	/*
	sourceBoxPlot
			.margins({top: 5, left: 50, right: 20, bottom: 80})
			.dimension(sourceDimension)
			.group(sourceBoxGroup)
			.boxPadding(0.1)
			.outerPadding(0.05)
			.elasticX(true)
			.elasticY(true);

	*/

	hasResized = function(){
          dc.chartRegistry.list().forEach(function(chart) {
            _bbox = chart.root().node().parentNode.getBoundingClientRect();
            chart.width(_bbox.width - 20).height(_bbox.height - 20).render();
          });
        };
      
    hasResized();
    
    createBoxPlots();

    window.addEventListener('resize', hasResized);    

	$('#loading').modal('hide');
}

function resetFilter(chartName) {
	updateBoxPlots = false;
	dc.chartRegistry.list().forEach(function(chart) {
		if (chart.anchorName()==chartName) {
			chart.filterAll();
		}
	});
	dc.redrawAll();
	updateBoxPlots = true;
	createBoxPlots();
}

function getAllFilters() {
	var filters = [];

	dc.chartRegistry.list().forEach(function(chart) {
		var filter = chart.filters()
		if(filter.length > 0) {
			var base = luChartNames[chart.anchor()];
			
			if(filter[0].filterType == 'RangedFilter') {
				filters.push(base + ' ' + (Math.round(filter[0][0] * 100)/100) + ' to ' + (Math.round(filter[0][1] * 100)/100) );
			}
			else {
				filters.push(base + ' ' + filter.join());
			}
			
		}
	});

	return filters;
}

function getQueryFilters() {
	var filters = ['(1 = 1)'];

	dc.chartRegistry.list().forEach(function(chart) {
		var filter = chart.filters()
		if(filter.length > 0) {
			var base = luChartNamesMeta[chart.anchor()];
			
			if(base[2]=='range') {
				filters.push('(' + base[0] + ' BETWEEN ' + (Math.round(filter[0][0] * 100)/100) + ' AND ' +  (Math.round(filter[0][1] * 100)/100) + ')');
			} else {
				if(base[3]) {
					filter = filter.map(n => getKeyByValue(base[3],n))
				}

				if(base[1]=='text') {
					filter = filter.map(n => "'" + n + "'");
				}
				filters.push('(' + base[0] + ' IN (' + filter.join() + '))')
			}
			/*
			if(filter[0].filterType == 'RangedFilter') {
				filters.push(base + ' ' + (Math.round(filter[0][0] * 100)/100) + ' to ' + (Math.round(filter[0][1] * 100)/100) );
			}
			else {
				filters.push(base + ' ' + filter.join());
			}
			*/
		}
	});
	$("#numFilters").text(filters.length - 1);
	return(filters.join(' AND '))
}

function changeQuantile(group, values) {
	allQuantiles[group] = values;
	createBoxPlots();
}

function resetAllFilters() {
	updateBoxPlots = false;
	dc.filterAll(); dc.renderAll();
	updateBoxPlots = true;
	createBoxPlots();
}

function showFilters() {
	filterList = getAllFilters();

	listSelector = $("#allFilters")
	$("#allFilters").empty();

	$.each(filterList, function(i, obj) {
	    listSelector.append("<li>" + obj + "</li>")
		});

	$('#showFilters').modal('show');
}