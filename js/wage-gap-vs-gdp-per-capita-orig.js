d3.csv("data/world_bank_gdp_per_capita.csv").then(function(data) {
    console.log(data);
});

var vlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {"url": "data/world_bank_gdp_per_capita.csv"},
    // mark: 'circle',
    title: "Wage Gap vs GDP per capita",
    width: 1500,
    height: 600,
    transform: [
        {
            lookup: "Country Code",
            from: {
                data: {
                    url: "data/oecd_gender_pay_gap.csv"
                    // url: "data/ilo_wage_gap_data2.csv"
                },
                key: "LOCATION",
                fields: ["Unadjusted gender wage gap (%)"]
            }
        },
        {
            lookup: "Country Code",
            from: {
                data: {
                    url: "data/population_by_country.csv",
                },
                key: "Country Code",
                fields: ["2018_pop"]
            }
        },
        {
            lookup: "Country Code",
            from: {
                data: {
                    url: "data/world_bank_income_groups.csv",
                },
                key: "Code",
                fields: ["Income classifications (World Bank (2017))"]
            }
        },
        {
            lookup: "Country Code",
            from: {
                data: {
                    url: "data/labor_force_participation.csv",
                },
                key: "Country Code",
                fields: ["2018_ratio"]
            }
        }
    ],
    selection: {
      "Year": {
          type: "single",
          fields: "Country Code",
          bind: {
              "Country Code": {
                  input: "range",
                  min: 2000,
                  max: 2018,
                  step: 1
              }
          }
      }  
    },
    layer: [
        {
            mark: {
                   type: "circle",
                   size: 500
            },
            encoding: {
                x: {
                    field: '2018',
                    type: 'quantitative',
                    axis: {title: '2018 GDP per capita'},
                    scale: {
                        type: 'log',
                        nice: true
                        // domain: [5000,200000]
                    }
                },
                y: {
                    field: 'Unadjusted gender wage gap (%)',
                    type: 'quantitative',
                    axis: {title: 'Latest gender pay gap'}
                },
                // size: {
                //     field: '2018_ratio',
                //     type: 'quantitative',
                //     scale: {
                //         type: 'quantile',
                //         domain: [40,100]
                //     }
                // },
                // color: {
                //     field: "Income classifications (World Bank (2017))",
                //     type: 'nominal',
                //     scale: {
                //         "domain": ["Low income", "Lower-middle income", "Upper-middle income", "High income", "Not categorized"],
                //         "range": ["#f60606", "#f7a3a3", "#81d9de", "#0678ad", "#a2a2a2"]
                //     },
                //     legend: {title: 'Income level'}
                // },
                color: {
                    field: "2018_ratio",
                    type: 'quantitative',
                    // scale: {
                    //     "domain": ["Low income", "Lower-middle income", "Upper-middle income", "High income", "Not categorized"],
                    //     "range": ["#f60606", "#f7a3a3", "#81d9de", "#0678ad", "#a2a2a2"]
                    // },
                    legend: {title: 'Labour Participation Level'},
                    "scale": {"scheme": "greens"}
                },
                tooltip: [
                    {
                        field: 'Country Name',
                        type: 'nominal',
                    },
                    {
                        field: '2018',
                        type: 'quantitative'
                    },
                    {
                        field: 'Unadjusted gender wage gap (%)',
                        type: 'quantitative'
                    },
                    {
                        field: '2018_ratio',
                        type: 'quantitative'
                    }
        
                ],
                opacity: {value: 0.4}
            }
        },
        {
            mark: {
                type: "text",
                style: "label"
            },
            encoding: {
                x: {
                    field: '2018',
                    type: 'quantitative',
                    axis: {title: '2018 GDP per capita'},
                    scale: {
                        type: 'log',
                        domain: [5000,200000]
                    }
                },
                y: {
                    field: 'Unadjusted gender wage gap (%)',
                    type: 'quantitative',
                    axis: {title: 'Latest gender pay gap'}
                },
                // text: {
                //     field: "Country Name",
                //     type: "nominal"
                // }
            }
        }
    ],
    config: {
        style: {
            label: {
                align: "left",
                baseline: "bottom",
                dx: 5,
                dy: 5
            }
        }
    }
    
    };

// Embed the visualization in the container with id `vis`
vegaEmbed('#vis3', vlSpec);