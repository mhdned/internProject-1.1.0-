/*------<INTIATE SERVER>------*/
const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
/*------<CONFIG SERVER>------*/
dotenv.config({ path: "./config.env" });
/*------<ENV VAR SERVER>------*/
const DB = process.env.DATABASE_LOCAL;
/*------<CONNECT SERVER>------*/
mongoose
  .connect(DB)
  .then(() => console.log(`DATABASE :: SUCCESSFULLY CONNECTED | ✅`))
  .catch((error) => {
    console.log(`ERROR:: ${error}`);
  });
/*------<LESTEN SERVER>------*/
const port = process.env.PORT || 3500;
app.listen(port, "127.0.0.1", () => {
  console.log(`APP RUN :: http://localhost:${port} | 🖥️`);
});
