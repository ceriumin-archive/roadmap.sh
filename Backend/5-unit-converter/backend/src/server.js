const http = require("http");
const router = require("./router");

const PORT = 3000;
const server = http.createServer(router);

server.listen(PORT, "localhost", () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
