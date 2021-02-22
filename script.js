// https://www.chartjs.org/samples/latest/

const xs = [];
for(let i=0; i<=100; i++) { xs.push(i*1); }

function calc_supply(xs, deltaX) {
  const xShift = deltaX+10;
  return xs.map(x => {
    if (x < xShift) {return null}
    if (x > xShift + 20) {return null}
    return 1/20*(x-xShift)*(x-xShift)+10;
  });
}

function calc_demand(xs, deltaX) {
  const xShift = deltaX+30;
  return xs.map(x => {
    if (x > xShift) {return null}
    if (x < xShift-20) {return null}
    return 1/20*(x-xShift)*(x-xShift)+10;
  });
}

const ctx = document.getElementById("myChart").getContext('2d');

let myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: xs,
    datasets: [
      {
      fill: false,
      borderColor: "#ff1267",
      backgroundColor: "#ff126788",
      label: '供給曲線',
      data: calc_supply(xs, 0),
      pointRadius: 0,
    },
    {
      fill: false,
      borderColor: "#3300ee",
      backgroundColor: "#3300ee88",
      label: '需要曲線',
      data: calc_demand(xs, 0),
      pointRadius: 0,
    }
  ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: "top",
      labels: {
        boxWidth: 20,
        padding: 4
      }
    },
    tooltips: {
      enabled: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false,
          drawBorder: true,
        },
        scaleLabel: {
          display: true,
          labelString: 'Quantity',
        },
        ticks: {
          display: false,
          min:0, max:40
        }
      }],
      yAxes: [{
        gridLines: {
          display: true,
          drawBorder: true,
        },
        scaleLabel: {
          display: true,
          labelString: "Price",
        },
        ticks: {
          min:0, max:40,
          display: false,
        }
      }]
    }
  }
});

var sliders = document.getElementById("sliders");
sliders.addEventListener("input", function() {
  const s = document.getElementById("slider_supply").value;
  const d = document.getElementById("slider_demand").value;
  myChart.data.datasets[0].data = calc_supply(xs, Number(s));
  myChart.data.datasets[1].data = calc_demand(xs, Number(d));
  const clossX = 10 + 1/4*(Number(s) + Number(d));
  myChart.update();
}, false);