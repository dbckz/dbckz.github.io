// // import {vl} from '@vega/vega-lite-api'
// // import * as d3 from 'd3';
// console.log("i am here");
// // import {printTable} from '@uwdata/data-utilities';
// console.log(4);




// admissions_by_demographic_csv = d3 FileAttachment("data/admissions_data_1.csv");
// admissions_by_demographic_text = admissions_by_demographic_csv.text();
// admissions_by_demographic_data = d3.csvParse(admissions_by_demographic_text, d3.autoType);

// // printTable(admissions_by_demographic_data);
d3.csv("data/admissions_data_1.csv").then(function(data) {
    console.log(data);
});

var vlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {"url": "data/admissions_data_1.csv"},
    mark: 'bar',
    title: "Percentage of ethnic + gender + school meal group entering higher education",
    width: 500,
    height: 500,
    transform: [
        {
            calculate: "datum.entry_rate * 100",
            as: "pc"
        }
    ],
    encoding: {
        x: {
            field: 'pc',
            type: 'quantitative',
            axis: {title: '% Undergraduate Entry Rate'}
        },
        y: {
            field: 'category_variable',
            type: 'nominal',
            axis: {title: 'Demographic Group'},
            sort: {
                field: 'entry_rate',
                order: 'ascending'
            }
        },
        color: {
            field: 'sex',
            type: 'nominal',
            scale: {
                "domain": ["M", "F"],
                "range": ["#9467bd","#c7c7c7"]
            },
            legend: {title: 'Gender'}
        }
    }
    };

// Embed the visualization in the container with id `vis`
vegaEmbed('#vis', vlSpec);