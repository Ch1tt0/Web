const canvasElement = document.getElementById("moneyChart");
const moneyDisplay = document.getElementById("moneyDisplay");

const labels = [1];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Money",
      data: [0],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const config = {
  type: "line",
  data: data,
};

const moneyChart = new Chart(canvasElement, config);

function addData(chart, label, newData) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(newData);
  });
  chart.update();
}

let money = 1;

setInterval(function () {
  data.datasets[0].data.push(money);
  labels.push(labels.length + 1);

  moneyChart.update();
  moneyDisplay.innerText = money.toFixed(2);

  money += (Math.random() - 0.5) * 1.5 * 2;
  money = Math.max(0, money); // Money doesn't go into negatives.
}, 500);
