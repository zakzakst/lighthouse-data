import fs from "fs";
import lighthouse from "lighthouse";
import lrDesktopConfig from "lighthouse/core/config/lr-desktop-config.js";
import lrMobileConfig from "lighthouse/core/config/lr-mobile-config.js";
import * as chromeLauncher from "chrome-launcher";

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

const options = {
  logLevel: "info",
  output: "json",
  onlyCategories: ["performance"],
  port: chrome.port,
};

const getLighthouseData = async (url) => {
  // PC時のデータ
  // const runnerResultDesktop = await lighthouse(url, options, lrDesktopConfig);
  // const dataDesktop = getTargetData(runnerResultDesktop, url, "desktop");
  // // SP時のデータ
  // const runnerResultMobile = await lighthouse(url, options, lrMobileConfig);
  // const dataMobile = getTargetData(runnerResultMobile, url, "mobile");
  // return [dataDesktop, dataMobile];

  const runnerResult = await lighthouse(url, options, lrMobileConfig);
  const filePathJson = `./report/list/result.json`;
  fs.writeFileSync(filePathJson, JSON.stringify(runnerResult));
};

// const getTargetData = (result, url, type) => {
//   const performanceScore = result.lhr.categories.performance.score;
//   const audits = result.lhr.audits;
//   const firstContentfulPaint = {
//     score: audits["first-contentful-paint"].score,
//     displayValue: audits["first-contentful-paint"].displayValue,
//   };
//   const largestContentfulPaint = {
//     score: audits["largest-contentful-paint"].score,
//     displayValue: audits["largest-contentful-paint"].displayValue,
//   };
//   const firstMeaningfulPaint = {
//     score: audits["first-meaningful-paint"].score,
//     displayValue: audits["first-meaningful-paint"].displayValue,
//   };
//   const speedIndex = {
//     score: audits["speed-index"].score,
//     displayValue: audits["speed-index"].displayValue,
//   };
//   return {
//     url,
//     type,
//     performanceScore,
//     firstContentfulPaint,
//     largestContentfulPaint,
//     firstMeaningfulPaint,
//     speedIndex,
//   };
// };

// const getDateStr = () => {
//   const date = new Date();

//   const year = date.getFullYear();
//   const month = ("0" + (date.getMonth() + 1)).slice(-2);
//   const day = ("0" + date.getDate()).slice(-2);
//   const hour = ("0" + date.getHours()).slice(-2);
//   const minute = ("0" + date.getMinutes()).slice(-2);
//   const second = ("0" + date.getSeconds()).slice(-2);

//   return year + month + day + "_" + hour + minute + second;
// };

// const arrayToCsv = (arr) => {
//   const rows = [];

//   for (let i = 0; i < arr.length; i++) {
//     const item = arr[i];
//     const cols = [
//       item.url,
//       item.type,
//       item.performanceScore,
//       item.firstContentfulPaint.score,
//       item.firstContentfulPaint.displayValue,
//       item.largestContentfulPaint.score,
//       item.largestContentfulPaint.displayValue,
//       item.firstMeaningfulPaint.score,
//       item.firstMeaningfulPaint.displayValue,
//       item.speedIndex.score,
//       item.speedIndex.displayValue,
//     ];
//     rows.push(cols.join(","));
//   }

//   return rows.join("\n");
// };

const outputResults = async () => {
  const targetUrls = [
    "https://s-ishizaki.sakura.ne.jp/sample/04/index-test-1-none.html",
    // "https://s-ishizaki.sakura.ne.jp/sample/04/index-test-1-auto.html",
    // "https://s-ishizaki.sakura.ne.jp/sample/04/index-test-1-auto-all.html",
    // "https://s-ishizaki.sakura.ne.jp/sample/04/index-test-2-none.html",
    // "https://s-ishizaki.sakura.ne.jp/sample/04/index-test-2-auto.html",
    // "https://s-ishizaki.sakura.ne.jp/sample/04/index-test-2-auto-all.html",
    // "https://s-ishizaki.sakura.ne.jp/sample/04/index-test-3-none.html",
    // "https://s-ishizaki.sakura.ne.jp/sample/04/index-test-3-auto.html",
    // "https://s-ishizaki.sakura.ne.jp/sample/04/index-test-3-auto-all.html",
    // "https://s-ishizaki.sakura.ne.jp/sample/04/index-test-4-none.html",
    // "https://s-ishizaki.sakura.ne.jp/sample/04/index-test-4-auto.html",
    // "https://s-ishizaki.sakura.ne.jp/sample/04/index-test-4-auto-all.html",
  ];

  // const results = [];

  for (let i = 0; i < targetUrls.length; i++) {
    await getLighthouseData(targetUrls[i]);
    // const result = await getLighthouseData(targetUrls[i]);
    // results.push(...result);
  }

  // const dateStr = getDateStr();

  // ファイルを出力
  // const filePathJson = `./report/list/result_${dateStr}.json`;
  // const filePathCsv = `./report/list/result_${dateStr}.csv`;
  // fs.writeFileSync(filePathJson, JSON.stringify(results));
  // fs.writeFileSync(filePathCsv, arrayToCsv(results));
};

await outputResults();

await chrome.kill();
