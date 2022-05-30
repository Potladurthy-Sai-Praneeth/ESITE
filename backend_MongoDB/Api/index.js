const express = require("express");
const router = express.Router();

require("./Routes/operations")(router);
require("./Routes/cartOp")(router);
require("./Routes/wishlistOp")(router);
require("./Routes/usersOp")(router);

module.exports = router;
