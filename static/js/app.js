// Use the D3 library to read in samples.json from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(data => {
    jData = data;
    init();
});

// Initialize the page with a default plot
function init() {
    // Create empty list to store data
    let sampleValues = [];
  
    // Fill list of values to plot 
      let sampleValue = jData.samples[0].sample_values;
      let otuIDs = jData.samples[0].otu_ids.slice(0,10).map(id => `OTU ${id}`);
      
      sampleValues.push({
        type: 'bar',
        orientation: 'h',
          x: sampleValue.slice(0,10),
          y: otuIDs,
      });
      Plotly.newPlot("plot", sampleValues);
}
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// Create function to be called when dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");

  // Locate the desired dataset
  let selectedData = jData.samples.find(data => data.id === dataset);

  // Create empty list to store data
  let sampleValues = [];

  // Fill list of values to plot 
  for (let i=0; i<selectedData.samples.length; i++) {
    let sampleValue = selectedData.samples[i].sample_values;
    let otuIDs = selectedData.samples[i].otu_ids.slice(0,10).map(id => `OTU ${id}`);
    
    sampleValues.push({
        type: 'bar',
        orientation: 'h',
          x: sampleValue.slice(0,10),
          y: otuIDs,
    });
    }

    Plotly.newPlot("plot", sampleValues);
}
