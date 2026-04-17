import "../libs/chart-4.5.1.umd.min.js";

const bazaarAPIURL = "https://api.hypixel.net/v2/skyblock/bazaar";
const bazaarData = {
  success: true || false,
  lastUpdated: 0,
  products: {
    "": {
      product_id: "",
      sell_summary: [
        {
          amount: 0,
          pricePerUnit: 0,
          orders: 0,
        },
      ],
      buy_summary: [
        {
          amount: 0,
          pricePerUnit: 0,
          orders: 0,
        },
      ],
      quick_status: {
        productId: "",
        sellPrice: 0,
        sellVolume: 0,
        sellMovingWeek: 0,
        sellOrders: 0,
        buyPrice: 0,
        buyVolume: 0,
        buyMovingWeek: 0,
        buyOrders: 0,
      },
    },
  },
};

const canvasElement = document.getElementById("moneyChart");
const moneyDisplay = document.getElementById("moneyDisplay");

const labels = [];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Money",
      data: [],
      fill: true,
      borderColor: "rgb(75, 192, 192)",
      tension: 0,
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

function removeOldestData(chart) {
  chart.data.labels.shift();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.shift();
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
}

let money = 0;
let i = 1;

setInterval(function () {
  if (i > 20) {
    removeOldestData(moneyChart);
  }
  addData(moneyChart, i, money);

  moneyDisplay.innerText = money.toFixed(2);

  money += (Math.random() - 0.5) * 1.5 * 2;
  money = Math.max(0, money); // Money doesn't go into negatives.

  i++;
}, 250);
