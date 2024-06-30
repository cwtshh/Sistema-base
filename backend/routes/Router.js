const express = require('express');
const router = express();

router.get('/', (req, res) => {
    res.send("API funcionando");
});

router.use("/users", require("./UserRoutes"));


module.exports = router;