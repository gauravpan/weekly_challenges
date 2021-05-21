// Check server
// Server to slow down some requests

const express = require("express");
const app = express();
const port = 8000;

function Delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("ok");
    }, ms);
  });
}

let count = 0;
app.get("/", async (req, res) => {
  count++;
  if (count % 2 === 0) {
    let _count = count;
    await Delay(5000);
    console.log("5sec wait finish for ", _count);
    console.log("respond to count ", _count);
    res.json({ count: _count });
  } else {
    console.log("respond to count ", count);
    res.json({ count });
  }
});

app.get("/:count", async (req, res) => {
  let count = req.params.count;
  if (count % 2 === 0) {
    await Delay(5000);
    console.log("5sec wait finish for ", count);
  }
  console.log("respond to count ", count);
  res.json({ count });
});

app.listen(port, () => {
  console.log(`💻 Server listening at http://localhost:${port}`);
});
