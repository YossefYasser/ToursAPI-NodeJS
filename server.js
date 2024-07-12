const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" }); // config must be before app
const app = require("./index");
// console.log(process.env);
const port = 8080 || process.env.PORT;
app.listen(port, () => {
  console.log("listening on port " + port);
});
