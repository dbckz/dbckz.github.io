d3.csv("data/world_bank_gdp_per_capita.csv").then(function(data) {
    console.log(data);
});

var vlSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "data": {"url": "data/world_bank_gdp_per_capita.csv"},
    "transform": [
        {
            "fold": ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"],
            "as": ["Year", "GDP_per_capita"]
        },
        {
          "calculate": "year(datum.Year)",
          "as": "Year"
        },
        {
          "calculate": "datum['Country Code'] + '_' + datum.Year",
          "as": "primary_key"
        },
        {
            "lookup": "primary_key",
            "from": {
                "data": {
                    "url": "data/oecd_gender_pay_gap.csv"
                },
                "key": "primary_key",
                "fields": ["Unadjusted gender wage gap (%)"]
            }
        },
        {
            "lookup": "primary_key",
            "from": {
                "data": {
                    "url": "data/world_bank_income_groups.csv"
                },
                "key": "primary_key",
                "fields": ["Income classifications (World Bank (2017))"]
            }
        },
        {
            "filter": {
                "selection": "select"
            }
        },
        {
            "filter": "datum['Unadjusted gender wage gap (%)'] != ''"
        }
    ],
    "mark": {
        "type": "circle",
        "size": 500
    },
    "title": "Wage Gap vs GDP per capita",
    "width": 1500,
    "height": 600,
    "selection": {
        "select": {
            "type": "single",
            "fields": ["Year"],
            "init": {
                "Year": 2010
            },
            "bind": {
                "input": "range",
                "min": 2000,
                "max": 2016,
                "step": 1
            }
        }
    },
    "encoding": {
        "x": {
            "field": "GDP_per_capita",
            "type": "quantitative",
            "axis": {"title": "GDP per capita"},
            "scale": {
               "type": "log",
                "nice": true,
                "domain": [1000,1000000]
            }
            
        },
        "y": {
            "field": "Unadjusted gender wage gap (%)",
            "type": "quantitative",
            "axis": {"title": "Gender wage gap"},
            "scale": {"domain": [0,45]}
        },
        "color": {
            "field": "Income classifications (World Bank (2017))",
            "type": "nominal",
            "scale": {
                "domain": ["Low income", "Lower-middle income", "Upper-middle income", "High income", "Not categorized"],
                "range": ["#f60606", "#f7a3a3", "#81d9de", "#0678ad", "#a2a2a2"]
            },
            "legend": {"title": "Income level"}
        },
        "tooltip": [
                    {
                        "field": "Country Name",
                        "type": "nominal"
                    },
                    {
                        "field": "GDP_per_capita",
                        "type": "quantitative"
                    },
                    {
                        "field": "Unadjusted gender wage gap (%)",
                        "type": "quantitative"
                    }
                ],
                "opacity": {"value": 0.4}
    }
};



// Embed the visualization in the container with id `vis`
vegaEmbed('#vis4', vlSpec);