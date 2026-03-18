function band(value, avg) {
  if (value == null || avg == null) return null;
  return value >= avg ? "High" : "Low";
}

function getInterpretations(results) {
  const matches = [];

  interpretationTable.forEach(row => {
    const m1 = results[row.metric1];
    const m2 = results[row.metric2];

    if (!m1 || !m2) return;

    const b1 = band(m1.firm, m1.avg);
    const b2 = band(m2.firm, m2.avg);

    if (b1 === row.metric1Band && b2 === row.metric2Band) {
      matches.push(row);
    }
  });

  return matches;
}

function renderInterpretations(results) {
  const box = d3.select("#interpretationBox");
  box.html("");

  const matches = getInterpretations(results);

  if (matches.length === 0) {
    box.append("div").text("No interpretation applies for the latest period.");
    return;
  }

  matches.forEach(m => {
    const block = box.append("div")
      .attr("class", "interpretation-block");

    block.append("h4")
      .text(`${m.metric1} (${m.metric1Band}) × ${m.metric2} (${m.metric2Band})`);

    block.append("p")
      .attr("class", "interpretation-text")
      .text(m.interpretation);

    block.append("p")
      .attr("class", "considerations-text")
      .text(m.considerations);
  });
}