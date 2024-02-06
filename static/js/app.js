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
    let bubbleValues = [];
  
    // Fill list of values to plot 
    let sampleValue = jData.samples[0].sample_values.slice(0,10).sort((a,b) => a-b);
    let sampleValueAll = jData.samples[0].sample_values;
    let otuIDs = jData.samples[0].otu_ids.slice(0,10).map(id => `OTU ${id}`);
    let otuID = jData.samples[0].otu_ids.map(id => id);
    let otuLabels = jData.samples[0].otu_labels.slice(0,10);
    let otuLabel = jData.samples[0].otu_labels;

    // Store hover text values
    let hoverText = otuLabels.map(label => `${label}`);
    
    sampleValues.push({
      type: 'bar',
      orientation: 'h',
      x: sampleValue.slice(0,10),
      y: otuIDs,
      text: hoverText,
    });
    Plotly.newPlot("bar", sampleValues);

    // Create bubble chart
    bubbleValues.push({
      type: 'scatter',
      mode: 'markers',
      x: otuID,
      y: sampleValueAll,
      text: otuLabel,
      marker: {
          size: sampleValueAll,
          color: otuID,
          colorscale: 'Viridis',
          opacity: 0.7,
          symbol: 'circle'
      },
    });

    let layout = {
      xaxis: {
        title: 'OTU ID'
      }
    };
    Plotly.newPlot("bubble", bubbleValues, layout);

    // List the metadata on the sample-metadata table
    document.getElementById("sample-metadata").innerHTML = 
    `<p>id: ${jData.metadata[0].id}</p>
    <p>ethnicity: ${jData.metadata[0].ethnicity}</p>
    <p>gender: ${jData.metadata[0].gender}</p>
    <p>age: ${jData.metadata[0].age}</p>
    <p>location: ${jData.metadata[0].location}</p>
    <p>bbtype: ${jData.metadata[0].bbtype}</p>
    <p>wfreq: ${jData.metadata[0].wfreq}
    `;
  
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
  let sampleValue = selectedData.sample_values.slice(0,10).sort((a,b) => a-b);
  let sampleValueAll = jData.samples[0].sample_values;
  let otuIDs = selectedData.otu_ids.slice(0,10).map(id => `OTU ${id}`);
  let otuID = selectedData.otu_ids.map(id => id);
  let otuLabels = selectedData.otu_labels.slice(0,10);
  let otuLabel = jData.samples[0].otu_labels;

  // Store hover text values
  let hoverText = otuLabels.map(label => label);
    
  // Update the plot with the new data
  Plotly.update("bar", {
    x: [sampleValue],
    y: [otuIDs],
    text: [hoverText],
  });

  Plotly.update("bubble", {
    x: [otuID],
    y: [sampleValueAll],
    text: [otuLabel],
    marker: {
        size: sampleValueAll,
        color: otuID,
        colorscale: 'Viridis',
        opacity: 0.7,
        symbol: 'circle'
  },
});

  // Get selected sample metadata
  let selectedMetaData = jData.metadata.find(data => data.id === selectedSample);

  // List the metadata on the sample-metadata table
  document.getElementById("sample-metadata").innerHTML = 
  `<p>id: ${selectedMetaData.id}</p>
  <p>ethnicity: ${selectedMetaData.ethnicity}</p>
  <p>gender: ${selectedMetaData.gender}</p>
  <p>age: ${selectedMetaData.age}</p>
  <p>location: ${selectedMetaData.location}</p>
  <p>bbtype: ${selectedMetaData.bbtype}</p>
  <p>wfreq: ${selectedMetaData.wfreq}
  `;
  

}
 