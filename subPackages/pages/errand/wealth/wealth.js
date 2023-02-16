const tabBarBehaviors = require("../../../../behaviors/tabBar-behaviors");

import * as echarts from "../../../../ec-canvas/echarts";

let chart = null;
let nums = [23.5, 54, 41, 13.5, 99, 46.5, 19];

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // new
  });
  canvas.setChart(chart);

  var option = {
    color: ["#6680fb"],
    xAxis: {
      type: "category",
      boundaryGap: false, // 两边不留白
      data: ["20", "58", "41", "13", "99", "46", "19"],
      axisTick: {
        show: true, // 不显示坐标轴刻度线
        alignWithLabel: false,
        tickStyle: {
          color: "#999",
        },
      },
      // 分割线颜色
      axisLine: {
        show: false,
        lineStyle: {
          color: "#e0e2ff",
        },
      },
      // 文本颜色
      axisLabel: {
        color: "#999", // 文字颜色
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: {
          color: "#f9f9f9", // 分割线颜色
        },
      },
      axisLabel: {
        show: false, // 不显示坐标轴上的文字
      },
      axisTick: {
        show: false, // 不显示坐标轴刻度线
      },
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        data: nums,
        type: "line",
        smooth: true,
        areaStyle: {
          // 区域填充渐变颜色
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(102, 128, 251, 1)", // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(255, 255, 255, 0.5)", // 0% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  };

  chart.setOption(option);

  return chart;
}

Page({
  // 在page中使用behaviors
  behaviors: [tabBarBehaviors],
  data: {
    ec: {
      onInit: initChart,
    },
    sumMoney: 0,
  },
  onShow() {
    this.setData({
      sumMoney: nums.reduce((sum, item) => (sum += item), 0).toFixed(2),
    });
  },
});
