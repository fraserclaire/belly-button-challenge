// Use the D3 library to read in samples.json from the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(data => {
    jData = data;
    init();
});

// Initialize the page with a default plot
function init() {
    // Make list of names for dropdown menu
    let dropdownSamples = d3.select("#selDataset");
    jData.names.forEach(sample => {
        dropdownSamples.append("option").text(sample).property("value", sample);
    });

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
  // Get sample selected in dropdown
  let selectedSample = d3.select("#selDataset").property("value");

  // Locate the desired dataset
  let selectedData = jData.samples.find(data => data.id === selectedSample);

  // Fill list of values to plot
  let sampleValue = selectedData.sample_values.slice(0,10);
  let otuIDs = selectedData.otu_ids.slice(0,10).map(id => `OTU ${id}`);
    
  // Update the plot with the new data
  Plotly.update("plot", {
    x: [sampleValue],
    y: [otuIDs],
  });
}
