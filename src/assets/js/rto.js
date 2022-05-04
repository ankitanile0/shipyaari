var options = {
  series: [
    {
      name: "Likes",
      data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
    }
  ],
  chart: {
    height: 350,
    type: "line",
    events: {
      dataPointSelection: function (e, chart, opt) {
        const tooltipEl = opt.w.globals.tooltip.getElTooltip();

        if (opt.selectedDataPoints[0].length) {
          tooltipEl.classList.add("apexcharts-tooltip-active");
        } else {
          tooltipEl.classList.remove("apexcharts-tooltip-active");
        }
      }
    }
  },
  stroke: {
    width: 4,
    curve: "smooth"
  },
  xaxis: {
    type: "datetime",
    categories: [
      "1/11/2000",
      "2/11/2000",
      "3/11/2000",
      "4/11/2000",
      "5/11/2000",
      "6/11/2000",
      "7/11/2000",
      "8/11/2000",
      "9/11/2000",
      "10/11/2000",
      "11/11/2000",
      "12/11/2000",
      "1/11/2001",
      "2/11/2001",
      "3/11/2001",
      "4/11/2001",
      "5/11/2001",
      "6/11/2001"
    ]
  },

  markers: {
    size: 6
  },
  tooltip: {
    shared: false,
    intersect: true,
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      return (
        '<div class="custom-tooltip">' +
        "<span>" +
        w.config.xaxis.categories[dataPointIndex] +
        ": " +
        series[seriesIndex][dataPointIndex] +
        "  <br /> " +
        '<a href="https://google.com" target="_blank">https://google.com</a>' +
        "</span>" +
        "</div>"
      );
    }
  }
};

var chart = new ApexCharts(document.querySelector("#line_chart"), options);
chart.render();
