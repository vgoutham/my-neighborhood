var React = require('react');

var ChartContainer = module.exports = React.createClass({
  componentDidMount: function() {
    //sample response.text
    var datax = {"Demographics:demographics":{"$":{"xmlns:Demographics":"http://www.zillow.com/static/xsd/Demographics.xsd","xsi:schemaLocation":"http://www.zillow.com/static/xsd/Demographics.xsd http://www.zillowstatic.com/vstatic/1dd7cdd/static/xsd/Demographics.xsd","xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance"},"request":[{"state":["WA"],"city":["Seattle"],"neighborhood":["name"]}],"message":[{"text":["Request successfully processed"],"code":["0"]}],"response":[{"region":[{"id":["16037"],"state":["Washington"],"city":["Seattle"],"latitude":["47.614848"],"longitude":["-122.33607"],"zmmrateurl":["http://www.zillow.com/mortgage-rates/wa/seattle/"]}],"links":[{"main":["http://www.zillow.com/seattle-wa/"],"affordability":["http://www.zillow.com/local-info/WA-Seattle-home-value/r_16037/"],"homesandrealestate":["http://www.zillow.com/local-info/WA-Seattle-homes/r_16037/"],"people":["http://www.zillow.com/local-info/WA-Seattle-people/r_16037/"],"forSale":["http://www.zillow.com/seattle-wa/"],"forSaleByOwner":["http://www.zillow.com/seattle-wa/fsbo/"],"foreclosures":["http://www.zillow.com/seattle-wa/fore_lt/pmf_pt/"],"recentlySold":["http://www.zillow.com/seattle-wa/sold/"]}],"charts":[{"chart":[{"name":["Median Condo Value"],"url":["http://www.zillow.com/app?chartType=affordability_avgCondoValue&graphType=barChart&regionId=16037&regionType=6&service=chart"]},{"name":["Median Home Value"],"url":["http://www.zillow.com/app?chartType=affordability_avgHomeValue&graphType=barChart&regionId=16037&regionType=6&service=chart"]},{"name":["Dollars Per Square Feet"],"url":["http://www.zillow.com/app?chartType=affordability_pricePerSqft&graphType=barChart&regionId=16037&regionType=6&service=chart"]},{"name":[{"_":"Zillow Home Value Index Distribution","$":{"deprecated":"true"}}],"url":["http://www.zillow.com/app?chartType=affordability_ZindexByDistribution&graphType=barChart&regionId=16037&regionType=6&service=chart"]},{"name":["Home Type"],"url":["http://www.zillow.com/app?chartType=home_homeType&graphType=barChart&regionId=16037&regionType=6&service=chart"]},{"name":[{"_":"Owners vs. Renters","$":{"deprecated":"true"}}],"url":["http://www.zillow.com/app?chartType=home_ownVsRent&graphType=barChart&regionId=16037&regionType=6&service=chart"]},{"name":["Home Size in Square Feet"],"url":["http://www.zillow.com/app?chartType=home_homeSize&graphType=barChart&regionId=16037&regionType=6&service=chart"]},{"name":["Year Built"],"url":["http://www.zillow.com/app?chartType=home_yearBuilt&graphType=barChart&regionId=16037&regionType=6&service=chart"]}]}],"market":[{"$":{"deprecated":"true"}}],"pages":[{"page":[{"name":["Affordability"],"tables":[{"table":[{"name":["Affordability Data"],"data":[{"attribute":[{"name":["Zillow Home Value Index"],"values":[{"city":[{"value":[{"_":"507600","$":{"type":"USD"}}]}],"nation":[{"value":[{"_":"180100","$":{"type":"USD"}}]}]}]},{"name":["Median Single Family Home Value"],"values":[{"city":[{"value":[{"_":"566300","$":{"type":"USD"}}]}],"nation":[{"value":[{"_":"179700","$":{"type":"USD"}}]}]}]},{"name":["Median Condo Value"],"values":[{"city":[{"value":[{"_":"368400","$":{"type":"USD"}}]}],"nation":[{"value":[{"_":"186100","$":{"type":"USD"}}]}]}]},{"name":["Median 2-Bedroom Home Value"],"values":[{"city":[{"value":[{"_":"440300","$":{"type":"USD"}}]}],"nation":[{"value":[{"_":"139500","$":{"type":"USD"}}]}]}]},{"name":["Median 3-Bedroom Home Value"],"values":[{"city":[{"value":[{"_":"557000","$":{"type":"USD"}}]}],"nation":[{"value":[{"_":"173800","$":{"type":"USD"}}]}]}]},{"name":["Median 4-Bedroom Home Value"],"values":[{"city":[{"value":[{"_":"668600","$":{"type":"USD"}}]}],"nation":[{"value":[{"_":"292500","$":{"type":"USD"}}]}]}]},{"name":["Percent Homes Decreasing"],"values":[{"city":[{"value":[{"_":"0.042","$":{"type":"percent"}}]}],"nation":[{"value":[{"_":"0.321","$":{"type":"percent"}}]}]}]},{"name":["Percent Listing Price Reduction"],"values":[{"city":[{"value":["0"]}],"nation":[{"value":["0"]}]}]},{"name":["Median List Price Per Sq Ft"],"values":[{"city":[{"value":[{"_":"372","$":{"type":"USD"}}]}],"nation":[{"value":[{"_":"115","$":{"type":"USD"}}]}]}]},{"name":["Median List Price"],"values":[{"city":[{"value":["0"]}],"nation":[{"value":["0"]}]}]},{"name":["Median Sale Price"],"values":[{"city":[{"value":[{"_":"484200","$":{"type":"USD"}}]}],"nation":[{"value":[{"_":"218900","$":{"type":"USD"}}]}]}]},{"name":["Homes For Sale"],"values":[{"city":[{"value":["0"]}],"nation":[{"value":["0"]}]}]},{"name":["Homes Recently Sold"],"values":[{"city":[{"value":["0"]}],"nation":[{"value":["0"]}]}]},{"name":["Property Tax"],"values":[{"city":[{"value":[{"_":"3868","$":{"type":"USD"}}]}],"nation":[{"value":[{"_":"2116","$":{"type":"USD"}}]}]}]},{"name":["Turnover (Sold Within Last Yr.)"],"values":[{"city":[{"value":[{"_":"0.064","$":{"type":"percent"}}]}],"nation":[{"value":[{"_":"0.04","$":{"type":"percent"}}]}]}]},{"name":["Median Value Per Sq Ft"],"values":[{"city":[{"value":["0"]}],"nation":[{"value":["0"]}]}]},{"name":["1-Yr. Change"],"values":[{"city":[{"value":[{"_":"0.11","$":{"type":"percent"}}]}],"nation":[{"value":[{"_":"0.033","$":{"type":"percent"}}]}]}]},{"name":["Homes For Sale By Owner"],"values":[{"city":[{"value":[""]}],"nation":[{"value":[""]}]}]},{"name":["New Construction"],"values":[{"city":[{"value":[""]}],"nation":[{"value":[""]}]}]},{"name":["Foreclosures"],"values":[{"city":[{"value":[""]}],"nation":[{"value":[""]}]}]}]}]}]}]},{"name":["Homes & Real Estate"],"tables":[{"table":[{"name":["Homes & Real Estate Data"],"data":[{"attribute":[{"name":["Owners"],"values":[{"city":[{"value":[{"_":"0.48412441","$":{"type":"percent"}}]}],"nation":[{"value":[{"_":"0.66268764","$":{"type":"percent"}}]}]}]},{"name":["Renters"],"values":[{"city":[{"value":[{"_":"0.51587559","$":{"type":"percent"}}]}],"nation":[{"value":[{"_":"0.33731236","$":{"type":"percent"}}]}]}]},{"name":["Median Home Size (Sq. Ft.)"],"values":[{"city":[{"value":["1520"]}]}]},{"name":["Avg. Year Built"],"values":[{"city":[{"value":["1949"]}]}]},{"name":["Single-Family Homes"],"values":[{"city":[{"value":[{"_":"0.6487942484377","$":{"type":"percent"}}]}]}]},{"name":["Condos"],"values":[{"city":[{"value":[{"_":"0.2496228965463","$":{"type":"percent"}}]}]}]}]}]},{"name":["BuiltYear"],"data":[{"attribute":[{"name":["<1900"],"value":[{"_":"0.0102990862809","$":{"type":"percent"}}]},{"name":[">2000"],"value":[{"_":"0.1381789829333","$":{"type":"percent"}}]},{"name":["1900-1919"],"value":[{"_":"0.1711197517211","$":{"type":"percent"}}]},{"name":["1920-1939"],"value":[{"_":"0.1768069265304","$":{"type":"percent"}}]},{"name":["1940-1959"],"value":[{"_":"0.2551635572361","$":{"type":"percent"}}]},{"name":["1960-1979"],"value":[{"_":"0.1173005284588","$":{"type":"percent"}}]},{"name":["1980-1999"],"value":[{"_":"0.131131166839","$":{"type":"percent"}}]}]}]},{"name":["Census Summary-HomeSize"],"data":[{"attribute":[{"name":["<1000sqft"],"value":[{"_":"0.2157297481458","$":{"type":"percent"}}]},{"name":[">3600sqft"],"value":[{"_":"0.043368189323","$":{"type":"percent"}}]},{"name":["1000-1400sqft"],"value":[{"_":"0.2221872788741","$":{"type":"percent"}}]},{"name":["1400-1800sqft"],"value":[{"_":"0.1968655816757","$":{"type":"percent"}}]},{"name":["1800-2400sqft"],"value":[{"_":"0.186172917158","$":{"type":"percent"}}]},{"name":["2400-3600sqft"],"value":[{"_":"0.1238514558272","$":{"type":"percent"}}]}]}]},{"name":["Census Summary-HomeType"],"data":[{"attribute":[{"name":["Condo"],"value":[{"_":"0.2496228965463","$":{"type":"percent"}}]},{"name":["Other"],"value":[{"_":"0.1015828550158","$":{"type":"percent"}}]},{"name":["SingleFamily"],"value":[{"_":"0.6487942484377","$":{"type":"percent"}}]}]}]},{"name":["Census Summary-Occupancy"],"data":[{"attribute":[{"name":["Own"],"value":[{"_":"0.48412441","$":{"type":"percent"}}]},{"name":["Rent"],"value":[{"_":"0.51587559","$":{"type":"percent"}}]}]}]}]}]},{"name":["People"],"tables":[{"table":[{"name":["People Data"],"data":[{"attribute":[{"name":["Median Household Income"],"values":[{"city":[{"value":[{"_":"45736","$":{"currency":"USD"}}]}],"nation":[{"value":[{"_":"44512.0130806292","$":{"currency":"USD"}}]}]}]},{"name":["Single Males"],"values":[{"city":[{"value":[{"_":"0.230033266826908","$":{"type":"percent"}}]}],"nation":[{"value":[{"_":"0.146462187349365","$":{"type":"percent"}}]}]}]},{"name":["Single Females"],"values":[{"city":[{"value":[{"_":"0.187486853578992","$":{"type":"percent"}}]}],"nation":[{"value":[{"_":"0.124578258618535","$":{"type":"percent"}}]}]}]},{"name":["Median Age"],"values":[{"city":[{"value":["37"]}],"nation":[{"value":["36"]}]}]},{"name":["Homes With Kids"],"values":[{"city":[{"value":[{"_":"0.181808339938523","$":{"type":"percent"}}]}],"nation":[{"value":[{"_":"0.313623902816284","$":{"type":"percent"}}]}]}]},{"name":["Average Household Size"],"values":[{"city":[{"value":["2.08"]}],"nation":[{"value":["2.58883240001203"]}]}]},{"name":["Average Commute Time (Minutes)"],"values":[{"city":[{"value":["26.6363786935206"]}],"nation":[{"value":["26.375545725891282"]}]}]}]}]},{"name":["Census Summary-AgeDecade"],"data":[{"attribute":[{"name":[">=70s"],"value":[{"_":"0.0949154648324828","$":{"type":"percent"}}]},{"name":["0s"],"value":[{"_":"0.0894075881961393","$":{"type":"percent"}}]},{"name":["10s"],"value":[{"_":"0.0939587308631018","$":{"type":"percent"}}]},{"name":["20s"],"value":[{"_":"0.199337918792989","$":{"type":"percent"}}]},{"name":["30s"],"value":[{"_":"0.196015087641447","$":{"type":"percent"}}]},{"name":["40s"],"value":[{"_":"0.162076769469714","$":{"type":"percent"}}]},{"name":["50s"],"value":[{"_":"0.108700244064788","$":{"type":"percent"}}]},{"name":["60s"],"value":[{"_":"0.0555881961393388","$":{"type":"percent"}}]}]}]},{"name":["Census Summary-CommuteTime"],"data":[{"attribute":[{"name":["<10min"],"value":[{"_":"0.093782297601696","$":{"type":"percent"}}]},{"name":[">=60min"],"value":[{"_":"0.0512620908970452","$":{"type":"percent"}}]},{"name":["10-20min"],"value":[{"_":"0.295385583675633","$":{"type":"percent"}}]},{"name":["20-30min"],"value":[{"_":"0.256535709553465","$":{"type":"percent"}}]},{"name":["30-45min"],"value":[{"_":"0.198499403736584","$":{"type":"percent"}}]},{"name":["45-60min"],"value":[{"_":"0.104534914535577","$":{"type":"percent"}}]}]}]},{"name":["Census Summary-Household"],"data":[{"attribute":[{"name":["NoKids"],"value":[{"_":"0.818191660061477","$":{"type":"percent"}}]},{"name":["WithKids"],"value":[{"_":"0.181808339938523","$":{"type":"percent"}}]}]}]},{"name":["Census Summary-RelationshipStatus"],"data":[{"attribute":[{"name":["Divorced-Female"],"value":[{"_":"0.0641341128948266","$":{"type":"percent"}}]},{"name":["Divorced-Male"],"value":[{"_":"0.0501983960855829","$":{"type":"percent"}}]},{"name":["Married-Female"],"value":[{"_":"0.206254326831769","$":{"type":"percent"}}]},{"name":["Married-Male"],"value":[{"_":"0.208028966032711","$":{"type":"percent"}}]},{"name":["Single-Female"],"value":[{"_":"0.187486853578992","$":{"type":"percent"}}]},{"name":["Single-Male"],"value":[{"_":"0.230033266826908","$":{"type":"percent"}}]},{"name":["Widowed-Female"],"value":[{"_":"0.0438983248141122","$":{"type":"percent"}}]},{"name":["Widowed-Male"],"value":[{"_":"0.00996575293509803","$":{"type":"percent"}}]}]}]}]}],"segmentation":[{"liveshere":[{"title":["Power Singles"],"name":["High-income urban singles."],"description":["Highly educated professionals, many with advanced degrees. They draw a handsome salary and have reasonable living expenses while living a hip, upscale life in an urban center. "]},{"title":["College Life"],"name":["Students in higher education. These individuals are enrolled in college or graduate school."],"description":["People in college or graduate school."]},{"title":["Makin' It Singles"],"name":["Upper-scale urban singles."],"description":["Pre-middle-age to middle-age singles with upper-scale incomes. May or may not own their own home. Most have college educations and are employed in mid-management professions."]},{"title":["Aspiring Urbanites"],"name":["Urban singles with moderate income."],"description":["Low- to middle-income singles over a wide age range. Some have a college education. They work in a variety of occupations, including some management-level positions."]},{"title":["Bright Lights, Big City"],"name":["Very mobile singles living in the city."],"description":["Singles ranging in age from early 20s to mid-40s who have moved to an urban setting. Most rent their apartment or condo. Some have a college education and work in services and the professional sector."]}]}],"uniqueness":[{"category":[{"$":{"type":"Education"},"characteristic":["Bachelor's degrees","Master's degrees"]},{"$":{"type":"Income"},"characteristic":["High rent compared to income"]},{"$":{"type":"People & Culture"},"characteristic":["Born in the Midwest","Born in the Northeast","Single females","Single males","Wealthy retirees"]},{"$":{"type":"Transportation"},"characteristic":["Get to work by bus","Walk to work"]}]}]}]}]}]}};

    //get data from res
    var ageDistribution = datax['Demographics:demographics'].response[0].pages[0].page[2].tables[0].table[1].data[0].attribute;
    
    var dataArr = [];
    for (var i = 0; i < ageDistribution.length; i++) {
      dataArr.push({
        name: ageDistribution[i].name[0],
        val: Math.round(ageDistribution[i].value[0]._ * 100)
      });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    //draw initial canvas
    var barHeight = 50;
    var canvas = d3.select('#chartHere')
      .append('svg')
      .attr('class', 'graphs')
      .attr('width', 80 + '%')
      .attr('height', (40 * dataArr.length) + 80);

    var bars = canvas.selectAll('g')
      .data(dataArr)
      .enter()
      .append('g')
      .attr('transform', function(d, i) { return 'translate(0,' + i * barHeight + ')'; });

    bars.append('rect')
      .attr('width', function(d) {return d.val + '%';})
      .attr('height', barHeight - 10);

    bars.append('text')
      .attr('class', 'locVal')
      .attr('x', function(d) { return (d.val + .5) + '%'; })
      .attr('y', barHeight / 2 - 5)
      .attr('dy', '.35em')
      .text(function(d) { return d.val + '%'; });

    bars.append('text')
      .attr('x', 0)
      .attr('y', barHeight / 2 - 5)
      .attr('dy', '.35em')
      .text(function(d) { return d.name; });
    ////////////////////////////////////////////////////////////////////////////////////////////////

    //update canvas with new random data
    function newData() {
      for (var i = 0; i < dataArr.length; i++) {
        dataArr[i].val = Math.floor(Math.random() * 50);
      }
      d3.transition()
        .each(function() {
          d3.selectAll('rect')
            .data(dataArr)
            .transition()
            .duration(400)
            .ease('linear')
            .attr('width', function(d) { return d.val + '%'; });
          d3.selectAll('.locVal')
            .data(dataArr)
            .transition()
            .duration(400)
            .ease('linear')
            .attr('x', function(d) { return (d.val + .5) + '%'; })
            .attr('y', barHeight / 2 - 5)
            .attr('dy', '.35em')
            .text(function(d) { return d.val + '%'; });
        });
      }
  },
  render: function() {
    return(
      <section id='chartHere'>
      </section>
    );
  }
});