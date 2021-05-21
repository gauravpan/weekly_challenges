const fetch = require("node-fetch");

const url =
  process.argv[2] || "http://localhost:8000"; /* server: node ./server.js */
let count = 10000;
console.log(`🚀 fetching "${url}" ${count} times...`);

fetchCountTimes(url);

async function fetchCountTimes(url) {
  const startTime = Date.now();
  let all = [];
  for (count; count > 0; count--) {
    all.push(fetch(`${url}`));
  }

  // 1.
  let responses = await promiseAllWithCallback(all, (response) => {
    // console.log("for each",response);
  });

  //2. or just
  // let responses = await Promise.all(all);

  // console.log("-------responses", responses);
  const endTime = Date.now();
  console.log("Done in ", (endTime - startTime) / 1000, " seconds");
}

async function promiseAllWithCallback(arr, callback) {
  return new Promise((resolve, reject) => {
    let resolvedAll = [];
    let resolvedCount = 0;
    arr.forEach(async function (promisE) {
      try {
        let resolved = await promisE;
        callback(resolved);
        resolvedAll.push(resolved);
        resolvedCount++;
        if (arr.length === resolvedCount) resolve(resolvedAll);
      } catch (error) {
        console.log(
          "😭 Got error but still trying to resolve other promises😀."
        );
        resolvedCount++;
        resolvedAll.push(null);
        if (arr.length === resolvedCount) resolve(resolvedAll);
      }
    });
  });
}
