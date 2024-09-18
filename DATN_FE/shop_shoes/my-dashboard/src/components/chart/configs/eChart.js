const eChart = {
  options: {
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",

      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [
        "Chờ xác nhận",
        "Chờ thanh toán",
        "Chờ lấy hàng",
        "Chờ giao hàng",
        "Đã giao",
        "Đã huỷ",
      ],
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top', 
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#ffffff'],
      },
      offsetY: -20, 
      formatter: (val) => val,
    },
    yaxis: {
      tickAmount: 5,
      decimalsInFloat: 0,
      labels: {
        show: false,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  },
};

export default eChart;
