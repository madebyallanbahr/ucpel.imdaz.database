const express = require("express");
const router = require('./router');
const port = 5000;
const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server on! in port ${port}`);
});
