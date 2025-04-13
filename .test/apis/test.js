const http = require("http");

http.get("http://localhost:3000/test", (res) => {
  res.on("data", (chunk) => {
    console.log("==========================================Received chunk========================================== \n", chunk.toString());
  });
});