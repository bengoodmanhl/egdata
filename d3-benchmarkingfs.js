function wrapText(text, width) {
      text.each(function () {
        const textEl = d3.select(this);
        const words = textEl.text().split(/\s+/).reverse();
        let line = [];
        let lineNumber = 0;
        const lineHeight = 1.1;
        const y = textEl.attr("y");
        const x = textEl.attr("x");

        let tspan = textEl.text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", "0em");

        let word;
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = textEl.append("tspan")
              .attr("x", x)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + "em")
              .text(word);
          }
        }
      });
    }

    let benchmarkFirms = new Set();
    let currentFirm = null;

    d3.csv("bankingandcredit.csv").then(raw => {

      const data = raw.map(d => ({
        firm: d.Firm,
        date: d.Date,
        complaints: +d["Complaints per 1000"],
        closed: +d["Closed"],
        upheld: +d["Upheld%"] * 100,
        closed8: +d["Closed 8 weeks+%"] * 100,
        foscases: +d["FOS new cases#"],
        fosupheld: +d["FOS Upheld%"] * 100,
        fosperm: +d["FOS cases per 1m"]
      }));

      const periods = [...new Set(data.map(d => d.date))];

      const metrics = [
        { key: "complaints", label: "Complaints per 1000", format: d => d.toFixed(2) },
        { key: "closed", label: "Closed", format: d => d.toFixed(0) },
        { key: "upheld", label: "Upheld%", format: d => d.toFixed(2) + "%" },
        { key: "closed8", label: "Closed 8 weeks+%", format: d => d.toFixed(2) + "%" },
        { key: "foscases", label: "FOS new cases#", format: d => d.toFixed(0) },
        { key: "fosupheld", label: "FOS Upheld%", format: d => d.toFixed(2) + "%" },
        { key: "fosperm", label: "FOS cases per 1m", format: d => d.toFixed(0) }
      ];

      const maxByMetric = {
        complaints: d3.max(data, d => d.complaints),
        closed: d3.max(data, d => d.closed),
        upheld: d3.max(data, d => d.upheld),
        closed8: d3.max(data, d => d.closed8),
        foscases: d3.max(data, d => d.foscases),
        fosupheld: d3.max(data, d => d.fosupheld),
        fosperm: d3.max(data, d => d.fosperm)
      };

      const firms = [...new Set(data.map(d => d.firm))].sort();

      const firmOptions = d3.select("#firmOptions");

      firms.forEach((f, i) => {
        const row = firmOptions.append("div").attr("class", "firm-item");

        const left = row.append("input")
          .attr("type", "radio")
          .attr("name", "firmChoice")
          .attr("value", f)
          .attr("id", "firm_left_" + i)
          .property("checked", i === 0)
          .on("change", function () {
            currentFirm = this.value;

            right.property("checked", false)
                 .property("disabled", true);
            benchmarkFirms.delete(f);

            d3.selectAll(".benchmark-box").each(function(dFirm) {
              if (dFirm !== currentFirm) {
                d3.select(this).property("disabled", false);
              }
            });

            render(currentFirm);
          });

        row.append("label")
          .attr("for", "firm_left_" + i)
          .text(" " + f);

        const right = row.append("input")
          .attr("type", "checkbox")
          .attr("class", "benchmark-box")
          .attr("id", "firm_right_" + i)
          .datum(f)
          .property("disabled", i === 0)
          .on("change", function () {
            if (this.checked) benchmarkFirms.add(f);
            else benchmarkFirms.delete(f);
            render(currentFirm);
          });
      });

      currentFirm = firms[0];

      function buildSeries(metric, firm) {
        const firmSeries = data
          .filter(d => d.firm === firm)
          .map(d => ({ date: d.date, value: d[metric] }));

        const others = periods.map(period => {
          const rows = data.filter(d =>
            d.date === period &&
            d.firm !== firm &&
            (benchmarkFirms.size === 0 || benchmarkFirms.has(d.firm))
          );
          return { date: period, value: d3.mean(rows, r => r[metric]) };
        });

        const lastPeriod = periods[periods.length - 1];
        const lastFirm = firmSeries.find(d => d.date === lastPeriod).value;
        const lastOthers = others.find(d => d.date === lastPeriod).value;
        const pctDiff = ((lastFirm - lastOthers) / lastOthers) * 100;

        firmSeries.push({ date: "Final", value: lastFirm });
        others.push({ date: "Final", value: lastOthers });

        return { firmSeries, others, lastFirm, pctDiff, allPeriods: [...periods, "Final"] };
      }

      function drawChart(container, series, label, metricKey) {
        const width = 120, height = 400;
        const margin = { top: 35, right: 5, bottom: 15, left: 5 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = container.append("svg")
          .attr("width", width)
          .attr("height", height);

        const g = svg.append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scalePoint()
          .domain(series.allPeriods)
          .range([0, innerWidth])
          .padding(0.5);

        const y = d3.scaleLinear()
          .domain([0, maxByMetric[metricKey]])
          .nice()
          .range([innerHeight, 0]);

        const firmArea = d3.area()
          .curve(d3.curveCatmullRom.alpha(0.5))
          .x(d => x(d.date))
          .y0(innerHeight)
          .y1(d => y(d.value));

        g.append("path")
          .datum(series.firmSeries)
          .attr("fill", "#3aa6a1")
          .attr("opacity", 1)
          .attr("d", firmArea);

        const avgArea = d3.area()
          .curve(d3.curveCatmullRom.alpha(0.5))
          .x(d => x(d.date))
          .y0(innerHeight)
          .y1(d => y(d.value));

        g.append("path")
          .datum(series.others)
          .attr("class", "area-others")
          .attr("d", avgArea);

        const line = d3.line()
          .curve(d3.curveCatmullRom.alpha(0.5))
          .x(d => x(d.date))
          .y(d => y(d.value));

        g.append("path")
          .datum(series.firmSeries)
          .attr("class", "line-firm")
          .attr("d", line);

        const finalX = x("Final");
        const finalY = y(series.lastFirm);
        const pctColor = series.pctDiff >= 0 ? "green" : "red";

        g.append("circle")
          .attr("cx", finalX)
          .attr("cy", finalY)
          .attr("r", 5)
          .attr("fill", "#c4473a");

        const labelX = innerWidth - 4;

        const valueLabelY = Math.max(14, Math.min(innerHeight - 24, finalY - 4)) - 30;
        const pctLabelY   = Math.max(28, Math.min(innerHeight - 8,  finalY + 16)) - 30;

        g.append("text")
          .attr("x", labelX)
          .attr("y", valueLabelY)
          .attr("text-anchor", "end")
          .style("font-size", "10px")
          .text(metrics.find(m => m.key === metricKey).format(series.lastFirm));

        g.append("text")
          .attr("x", labelX)
          .attr("y", pctLabelY)
          .attr("text-anchor", "end")
          .style("font-size", "12px")
          .style("fill", pctColor)
          .text(`${series.pctDiff >= 0 ? "+" : ""}${series.pctDiff.toFixed(1)}%`);

        svg.append("text")
          .attr("x", width / 2)
          .attr("y", 18)
          .attr("class", "chart-title")
          .text(label)
          .call(wrapText, width - 10);

        g.append("text")
          .attr("x", 0)
          .attr("y", innerHeight + 12)
          .attr("fill", "#888")
          .style("font-size", "11px")
          .text("2018");

        g.append("text")
          .attr("x", innerWidth)
          .attr("y", innerHeight + 12)
          .attr("text-anchor", "end")
          .attr("fill", "#888")
          .style("font-size", "11px")
          .text("2025");
      }

      function render(firm) {
  const container = d3.select("#charts");
  container.html("");

  const results = {};

  metrics.forEach(m => {
    const series = buildSeries(m.key, firm);
    drawChart(container, series, m.label, m.key);

    results[m.label] = {
      firm: series.lastFirm,
      avg: series.others[series.others.length - 1].value
    };
  });

  // NEW: call the external interpretation engine
  renderInterpretations(results);
}

      render(currentFirm);

    });