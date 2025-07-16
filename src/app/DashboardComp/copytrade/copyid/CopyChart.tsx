"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-[350px] flex items-center justify-center text-[#797A80]">
      Loading chart...
    </div>
  ),
});

const CopyChart = () => {
  const [activeTab, setActiveTab] = useState("Statistics");
  const [activeStats, setActiveStats] = useState("Overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = ["Statistics", "trades", "Follower(s)"];

  // Data for line chart
  const lineSeries = [
    {
      name: "Cummulative ROI",
      data: [
        2000, 3000, 3500, 4300, 4600, 5000, 5500, 6000, 6500, 7000, 7500, 8000,
      ],
    },
    {
      name: "Cummulative Profit",
      data: [
        2100, 3300, 4000, 4200, 4700, 5200, 5700, 6200, 6700, 7200, 7700, 8200,
      ],
    },
  ];

  // Data for bar chart
  const barSeries = [
    {
      name: "Profit",
      data: [
        5, 8, 12, 15, 2, 16, 32, 22, 5, 10, -5, -8, -2, 15, 12, 10, 15, 18, 22,
        8, 32, 22, 10, -5,
      ],
    },
  ];

  // Data for pie chart
  const pieChartSeries = [67.85, 20.96, 20.96, 0.06];

  // Trading pairs data
  const tradingPairs = [
    {
      pair: "XRP/USDT",
      transactions: 1372,
      pnl: "+1,607.31",
      color: "text-blue-400",
    },
    {
      pair: "SOL/USDT",
      transactions: 623,
      pnl: "+10.21",
      color: "text-teal-400",
    },
    {
      pair: "ENJ/USDT",
      transactions: 583,
      pnl: "+14.86",
      color: "text-yellow-400",
    },
    { pair: "Others", transactions: 2, pnl: "-0.94", color: "text-gray-400" },
  ];

  const tradingRecords = [
    {
      time: "03:19",
      date: "03/19",
      type: "Closed",
      pair: "ENA/USDT",
      status: "Long",
      change: "Close 26%",
      profit: "+0.13 USDT",
      profitPercent: "(+4.38%)",
    },
    {
      time: "03:19",
      date: "03/19",
      type: "Opened",
      pair: "NFT/USDT",
      status: "Short",
      change: "Close 26%",
      entryPrice: "1.0649 USDT",
      quantity: "33 TNT",
    },
    {
      time: "03:19",
      date: "03/19",
      type: "Closed",
      pair: "ENA/USDT",
      status: "Long",
      change: "Close 26%",
      profit: "+0.13 USDT",
      profitPercent: "(+4.38%)",
    },
    {
      time: "03:19",
      date: "03/19",
      type: "Opened",
      pair: "NFT/USDT",
      status: "Short",
      change: "Close 26%",
      entryPrice: "1.0649 USDT",
      quantity: "33 TNT",
    },
    {
      time: "03:19",
      date: "03/19",
      type: "Closed",
      pair: "ENA/USDT",
      status: "Long",
      change: "Close 26%",
      profit: "+0.13 USDT",
      profitPercent: "(+4.38%)",
    },
  ];

  // Options for line chart
  const lineOptions: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: { enabled: false },
      toolbar: { show: false },
      animations: { enabled: false },
    },
    colors: ["#01BC8D", "#F23645"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: [3, 3],
    },
    grid: { show: false },
    xaxis: {
      categories: [
        "1k",
        "2k",
        "3k",
        "4k",
        "5k",
        "6k",
        "7k",
        "8k",
        "9k",
        "10k",
        "11k",
        "12k",
      ],
      labels: {
        style: { colors: "#797A80" },
        trim: true,
        hideOverlappingLabels: true,
      },
      axisBorder: { show: true, color: "#2D3748" },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#797A80" },
        formatter: (value: number) => `${(value / 1000).toFixed(0)}k`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      floating: true,
      offsetY: -25,
      offsetX: -5,
      fontSize: "12px",
      labels: { colors: "#E8E8E8" },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (value: number) => `${value.toLocaleString()}` },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            offsetY: 0,
            offsetX: 0,
          },
        },
      },
    ],
  };

  // Options for bar chart
  const barOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      animations: { enabled: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        columnWidth: "70%",
        colors: {
          ranges: [
            {
              from: -100,
              to: 0,
              color: "#F23645",
            },
            {
              from: 0.1,
              to: 100,
              color: "#01BC8D",
            },
          ],
        },
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#2D3748",
      strokeDashArray: 0,
      yaxis: { lines: { show: false } },
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: [
        "1am",
        "2am",
        "3am",
        "4am",
        "5am",
        "6am",
        "7am",
        "8am",
        "9am",
        "10am",
        "11am",
        "12pm",
        "1pm",
        "2pm",
        "3pm",
        "4pm",
        "5pm",
        "6pm",
        "7pm",
        "8pm",
        "9pm",
        "10pm",
        "11pm",
        "12am",
      ],
      labels: {
        style: { colors: Array(24).fill("#797A80"), fontSize: "10px" },
        rotate: -45,
        hideOverlappingLabels: true,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#797A80" },
        formatter: (value: number) =>
          value === 0 ? "0" : `${Math.abs(value)}`,
      },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (value: number) => `${value}` },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          plotOptions: {
            bar: {
              columnWidth: "50%",
            },
          },
          xaxis: {
            labels: {
              rotate: -90,
              style: {
                fontSize: "8px",
              },
            },
          },
        },
      },
    ],
  };

  // Pie chart options
  const pieChartOptions: ApexOptions = {
    chart: {
      type: "donut",
      background: "transparent",
      animations: { enabled: false },
    },
    labels: ["XRP/USDT", "SOL/USDT", "ENJ/USDT", "Others"],
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#6B7280"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              color: "#fff",
              offsetY: -10,
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: "bold",
              color: "#fff",
              offsetY: 10,
              formatter: function (val: string | number) {
                return `${val}%`;
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: "XRP/USDT",
              fontSize: "14px",
              color: "#fff",
              formatter: function () {
                return "67.85%";
              },
            },
          },
        },
      },
    },
    stroke: {
      width: 0,
    },
    tooltip: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            pie: {
              donut: {
                size: "50%",
              },
            },
          },
        },
      },
    ],
  };

  return (
    <div className="w-full">
      {/* Tabs toggle */}
      <div className="relative">
        <div className="flex space-x-10 border-b border-[#141E32] overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-[16px] pb-2 px-1 ${
                activeTab === tab
                  ? "border-b-2 border-[#439A86] text-[#E8E8E8]"
                  : "text-[#797A80] hover:text-[#E8E8E8]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Statistics */}
      {activeTab === "Statistics" && (
        <div className="mt-5">
          {/* Statistics toggle */}
          <div className="flex items-center gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {["Overview", "Trade"].map((tab) => (
              <button
                key={tab}
                className={`text-[14px] whitespace-nowrap ${
                  activeStats === tab
                    ? "bg-[#439A861F] px-3 py-1 text-[#439A86] rounded-full"
                    : "text-[#797A80] hover:text-[#E8E8E8]"
                }`}
                onClick={() => setActiveStats(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Content */}
          {activeStats === "Overview" && (
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[#E8E8E8] text-[16px] font-medium">
                  Earning Overview
                </p>
                <button className="border px-3 py-1 text-[14px] hover:bg-[#439A8610] transition-colors whitespace-nowrap">
                  Export
                </button>
              </div>

              {mounted && (
                <div className="space-y-8">
                  <div className="  rounded-lg">
                    <ReactApexChart
                      options={lineOptions}
                      series={lineSeries}
                      type="line"
                      height={350}
                    />
                  </div>
                  <div className="  rounded-lg">
                    <ReactApexChart
                      options={barOptions}
                      series={barSeries}
                      type="bar"
                      height={350}
                    />
                  </div>
                </div>
              )}

              <div className="mt-8">
                <h1 className="text-2xl font-bold mb-8 text-[#E8E8E8]">
                  Trading History
                </h1>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-5 ">
                {/* PieChart */}
                {mounted && (
                  <div className=" rounded-lg max-w-[200px]  mt-8">
                    <ReactApexChart
                      options={pieChartOptions}
                      series={pieChartSeries}
                      type="donut"
                      height={350}
                    />
                  </div>
                )}
                {/* Stats */}
                <div>
                  {/* Header row */}
                  <div className="flex text-sm text-gray-400 mb-4">
                    <div className="w-[200px] text-[13px]">
                      Pair/% Of The Total Trades
                    </div>
                    <div className="w-[120px] text-[13px]">
                      Total Transactions
                    </div>
                    <div className="w-[100px] text-[13px]">PNL</div>
                    <div className="flex-1"></div>
                  </div>

                  {/* Data rows */}
                  {tradingPairs.map((pair, index) => (
                    <div
                      key={index}
                      className="flex items-center py-3 "
                    >
                      {/* Pair and percentage */}
                      <div className="flex items-center w-[200px] space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            pair.color === "text-blue-400"
                              ? "bg-blue-400"
                              : pair.color === "text-teal-400"
                              ? "bg-teal-400"
                              : pair.color === "text-yellow-400"
                              ? "bg-yellow-400"
                              : "bg-gray-400"
                          }`}
                        ></div>
                        <span className="text-white text-[14px]">{pair.pair}</span>
                        <span className="text-gray-400 text-sm">
                          {index === 0
                            ? "67.85%"
                            : index === 1
                            ? "0.24%"
                            : index === 2
                            ? "20.96%"
                            : "0.06%"}
                        </span>
                      </div>

                      {/* Transactions */}
                      <div className="w-[120px] text-white">
                        {pair.transactions}
                      </div>

                      {/* PNL */}
                      <div
                        className={`w-[100px] ${
                          pair.pnl.startsWith("+")
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {pair.pnl}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Trading Records */}
              <div className="mt-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Trading Records</h2>
                </div>

                <div className="relative">
                  {/* Vertical dashed line */}
                  <div className="absolute left-12 top-2 bottom-0 w-px border-l-2 border-dashed border-gray-600 h-[30rem]"></div>

                  {tradingRecords.map((record, index) => (
                    <div
                      key={index}
                      className="relative flex items-start mb-8 last:mb-0 pl-12 z-10"
                    >
                      {/* Indicator circle placed directly on the line */}
                      <div className="absolute left-[3.1em] -translate-x-1/2 mt-2">
                        <div
                          className={`rounded-full w-2 h-2 ${
                            record.type === "Closed"
                              ? "bg-white"
                              : "border border-white"
                          }`}
                        ></div>
                      </div>

                      {/* Time label - positioned to the left of the line */}
                      <div className="absolute left-12 top-2 -translate-x-full pr-2 text-right">
                        <div className="text-xs text-white whitespace-nowrap">
                          {record.time}
                        </div>
                        <div className="text-xs text-gray-500 whitespace-nowrap">
                          {record.date}
                        </div>
                      </div>

                      {/* Trading record content - positioned to the right of the line */}
                      <div className="flex ml-2 p-4 -mt-3">
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center space-x-3 ">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                record.type === "Closed"
                                  ? "border border-[#797A80] text-[#797A80]"
                                  : "bg-[#797A80] text-[#E8E8E8]"
                              }`}
                            >
                              {record.type}
                            </span>

                            <span className="text-[#E8E8E8] text-[13px] font-medium">
                              {record.pair}
                            </span>

                            <span
                              className={`text-[12px] px-2 py-1 rounded ${
                                record.status === "Long"
                                  ? "bg-[#439A8614] text-[#439A86]"
                                  : "bg-[#F2364514] text-[#F23645]"
                              }`}
                            >
                              {record.status}
                            </span>

                            <span className="bg-[#F2AF2914] text-[#F2AF2914] text-[12px] px-2 py-1 rounded">
                              {record.change}
                            </span>
                          </div>

                          <div className=" text-sm">
                            {record.profit ? (
                              <div className="text-green-400">
                                <span className="text-gray-300">Profit </span>
                                <span className="text-green-400 font-medium">
                                  {record.profit} {record.profitPercent}
                                </span>
                              </div>
                            ) : (
                              <div className="text-gray-300">
                                <span>Entry Price </span>
                                <span className="text-white font-medium">
                                  {record.entryPrice}
                                </span>
                                <span className="ml-3">Quantity </span>
                                <span className="text-white font-medium">
                                  {record.quantity}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="text-[#797A80] text-sm flex items-center justify-center mx-auto">
                  View All →
                </button>
              </div>
            </div>
          )}

          {/* Trade */}
          {activeStats === "Trade" && (
            <div className="flex items-center justify-center h-[300px]">
              <h2 className="text-green-300">No Trade yet</h2>
            </div>
          )}
        </div>
      )}

      {/* trades */}
      {activeTab === "trades" && (
        <div className="flex items-center justify-center h-[300px]">
          <h2 className="text-green-300">No Trade yet</h2>
        </div>
      )}

      {/* Follower(s) */}
      {activeTab === "Follower(s)" && (
        <div className="mt-5">
          <div className="flex items-center justify-center h-[300px]">
            <h2 className="text-green-300">No Follower(s) yet</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CopyChart;
