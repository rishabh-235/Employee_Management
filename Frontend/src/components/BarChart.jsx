import { useEffect, useState, useMemo } from "react";
import Chart from "react-apexcharts";
import { useGetClosedLeadsQuery } from "../redux/slices/API/lead.apiSlice";

const BarChart = () => {
  const { data: closedLeadsData } = useGetClosedLeadsQuery();

  const day = closedLeadsData?.map((item) => item.day);

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
            horizontal: false,
            borderRadius: 20,
            width: "0",
            borderRadiusApplication: "end",
          },
        },
        stroke: {
          show: true,
          curve: "smooth",
          width: 0,
        },
        tooltip: {
          enabled: true,
          style: {
            fontSize: "10px",
            fontFamily: undefined,
          },
          x: {
            show: false,
          },
        },
        states: {
          hover: {
            filter: {
              type: "darken",
            },
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: "darken",
            },
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
          categories: day,
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
          show: false,
        },
      },
    }),
    [day]
  );

  const [series, setSeries] = useState([
    {
      name: "Closed",
      type: "column",
      data: [
        4.4, 5.05, 4.14, 10, 2.27, 3.5, 4.2, 4.4, 5.05, 4.14, 10, 2.27, 3.5,
        4.2,
      ],
      color: "#D9D9D9",
    },
  ]);

  useEffect(() => {
    if (closedLeadsData) {
      const revenue = closedLeadsData.map((item) => item.closedCount);
      const newSeries = [
        {
          type: "column",
          data: revenue,
          color: "#D9D9D9",
        },
      ];
      setSeries(newSeries);
    }
  }, [closedLeadsData]);

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
