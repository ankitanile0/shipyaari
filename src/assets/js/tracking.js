var ctx = document.getElementById("line4").getContext('2d');


var myChart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: ["10",	"20",	"30",	"40",	"50",	"60",	"70","80",	"90","100"],
      datasets: [{
          label: 'Series 1', // Name the series
          data: [500,	50,	2424,	14040,	14141,	4111,	4544,	47,	5555, 6811], // Specify the data values array
          fill: false,
          borderColor: '#ea16a9', // Add custom color border (Line)
          backgroundColor: '#ea16a9', // Add custom color background (Points and Fill)
          borderWidth: 2 // Specify bar border width
      }]},
  options: {
    responsive: true, // Instruct chart js to respond nicely.
    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
  }
});
