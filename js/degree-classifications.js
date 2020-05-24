// // import {vl} from '@vega/vega-lite-api'
// // import * as d3 from 'd3';
// console.log("i am here");
// // import {printTable} from '@uwdata/data-utilities';
// console.log(4);




// admissions_by_demographic_csv = d3 FileAttachment("data/admissions_data_1.csv");
// admissions_by_demographic_text = admissions_by_demographic_csv.text();
// admissions_by_demographic_data = d3.csvParse(admissions_by_demographic_text, d3.autoType);

// // printTable(admissions_by_demographic_data);
d3.csv("data/admissions_data_2.csv").then(function(data) {
    console.log(data);
});

var vlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {"url": "data/admissions_data_2.csv"},
    mark: 'bar',
    title: "Degree Classification by Gender",
    width: 500,
    height: 300,
    transform: [
        {
            calculate: "if(datum.Classification_of_First_Degree == 'First', 1, if(datum.Classification_of_First_Degree == 'Upper second', 2, if(datum.Classification_of_First_Degree == 'Lower second', 3, if(datum.Classification_of_First_Degree == 'Third/Pass', 4, 0))))",
            as: "degree_type_ordering"
        }
        // {
        //     calculate: "datum.Number * 100",
        //     as: "percentage"
        // }
    ],
    encoding: {
        x: {
            field: 'Number',
            type: 'quantitative',
            axis: {title: '% of total'},
            stack: 'normalize'
        },
        y: {
            field: 'Sex',
            type: 'nominal',
            axis: {title: 'Gender'}
        },
        color: {
            field: 'Classification_of_First_Degree',
            type: 'nominal',
            scale: {
                "domain": ["First", "Upper second", "Lower second", "Third/Pass"],
                "range": ["#c7c7c7", "#e7ba52", "#aec7e8", "#1f77b4"]
            },
            legend: {title: 'Degree Classification'}
        },
        tooltip: {
            field: 'Classification_of_First_Degree',
            type: 'nominal',
        },
        order: {
            field: 'degree_type_ordering',
            type: 'quantitative',
            sort: 'ascending'
        }
    }
    };

// Embed the visualization in the container with id `vis`
vegaEmbed('#vis2', vlSpec);