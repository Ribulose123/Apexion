'use client'
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => <div className="h-[350px] flex items-center justify-center text-[#797A80]">Loading chart...</div>
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
  const lineSeries = [{
    name: "Cummulative ROI",
    data: [2000, 3000, 3500, 4300, 4600, 5000, 5500, 6000, 6500, 7000, 7500, 8000],
  }, {
    name: "Cummulative Profit",
    data: [2100, 3300, 4000, 4200, 4700, 5200, 5700, 6200, 6700, 7200, 7700, 8200],
  }];

  // Data for bar chart
  const barSeries = [{
    name: "Profit",
    data: [5, 8, 12, 15, 2, 16, 32, 22, 5, 10, -5, -8, -2, 15, 12, 10, 15, 18, 22, 8, 32, 22, 10, -5]
  }];

  // Options for line chart
  const lineOptions: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: ["#01BC8D", "#F23645"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: [3, 3],
    },
    grid: { show: false },
    xaxis: {
      categories: ["1k", "2k", "3k", "4k", "5k", "6k", "7k", "8k", "9k", "10k", "11k", "12k"],
      labels: { style: { colors: '#797A80' } },
      axisBorder: { show: true, color: '#2D3748' },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: { colors: '#797A80' },
        formatter: (value) => `${(value / 1000).toFixed(0)}k`
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      floating: true,
      offsetY: -25,
      offsetX: -5,
      fontSize: '12px',
      labels: { colors: '#E8E8E8' },
      
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (value) => `${value.toLocaleString()}` }
    }
  };

  // Options for bar chart
  const barOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        columnWidth: '70%',
        colors: {
          ranges: [{
            from: -100,
            to: 0,
            color: '#F23645'
          }, {
            from: 0.1,
            to: 100,
            color: '#01BC8D'
          }]
        }
      }
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: '#2D3748',
      strokeDashArray: 0,
      yaxis: { lines: { show: false } },
      xaxis: { lines: { show: false } }
    },
    xaxis: {
      categories: [
        '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm',
        '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am'
      ],
      labels: {
        style: { colors: Array(24).fill('#797A80'), fontSize: '10px' }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: { colors: '#797A80' },
        formatter: (value) => value === 0 ? '0' : `${Math.abs(value)}`
      }
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (value) => `${value}` }
    }
  };

  return (
    <div className="">
      {/* Tabs toggle */}
      <div className="flex space-x-10 border-b border-[#141E32]">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-[16px] pb-2 ${
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
      
      {/* Statistics */}
      {activeTab === "Statistics" && (
        <div className="mt-5">
          {/* Statistics toggle */}
          <div className="flex items-center gap-6">
            {["Overview", "Trade"].map((tab) => (
              <button
                key={tab}
                className={`text-[14px] ${
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
                <button className="border  px-3 py-1  text-[14px] hover:bg-[#439A8610] transition-colors">
                  Export
                </button>
              </div>
              
              {mounted && (
                <>
                  <ReactApexChart
                    options={lineOptions}
                    series={lineSeries}
                    type="line"
                    height={350}
                  />
                  <div className="mt-8">
                    <ReactApexChart
                      options={barOptions}
                      series={barSeries}
                      type="bar"
                      height={350}
                    />
                  </div>
                </>
              )}
            </div>
          )}
            {/* Trade */}
          {activeStats === "Trade" &&(
            <div className="flex items-center justify-center">
              <h2 className="text-green-300">No Trade yet</h2>
            </div>
          )}
        </div>
      )}

      {/* trades */}
      {activeTab === "trades" && (
         <div className="flex items-center justify-center">
              <h2 className="text-green-300">No Trade yet</h2>
            </div>
      )}
      {/* Follower(s) */}
      {activeTab === "Follower(s)" && (
         <div className="flex items-center justify-center">
              <h2 className="text-green-300">No Follower(s) yet</h2>
            </div>
      )}
    </div>
  );
};

export default CopyChart;