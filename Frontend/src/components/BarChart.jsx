import { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data }) => {
  const day = data?.map((item) => item.label) || [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];
  const revenue = data?.map((item) => item.totalRevenue) || [
    4.4, 5.05, 4.14, 10, 2.27, 3.5, 4.2,
  ];

  const options = useMemo(
    () => ({
      options: {
        chart: {
          height: "100%",
          maxWidth: "100%",
          type: "bar",
          fontFamily: "Inter, sans-serif",
          dropShadow: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            width: "1"
          },
        },
        stroke: {
          curve: "smooth",
          width: [0, 0.5],
        },
        tooltip: {
          enabled: false,
          style: {
            fontSize: "10px",
            fontFamily: undefined,
          },
          x: {
            show: false,
          },
        },
        grid: {
          show: true,
          strokeDashArray: 4,
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "category",
          categories: [
            "Sat",
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
          ],
          labels: {
            style: {
              colors: "#2E2E30",
              fontSize: "10px",
              fontFamily: "Inter, sans-serif",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          type: "numeric",
          categories: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    }),
    [day]
  );

  const [series, setSeries] = useState([
    {
      name: "Inflation",
      type: "column",
      data: [4.4, 5.05, 4.14, 10, 2.27, 3.5, 4.2, 4.4, 5.05, 4.14, 10, 2.27, 3.5, 4.2],
      color: "#D9D9D9",
    },
  ]);

  useEffect(() => {
    if (data) {
      const newSeries = [
        {
          type: "column",
          data: revenue,
          color: "#D9D9D9",
        },
        {
          type: "line",
          data: revenue,
          color: "#2A2A2A",
          Zindex: 1,
        },
      ];
      setSeries(newSeries);
    }
  }, [data]);

  return (
    <div className="app">
      <div className="row">
        <div
          style={{
            boxSizing: "border-box",
            border: "2px solid #c9c9c9",
            borderRadius: "1.1rem",
            overflow: "hidden",
            backgroundColor: "#ffffff",
          }}
          className="mixed-chart"
        >
          <Chart
            options={options.options}
            series={series}
            type="line"
            width="813"
            height={213}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
