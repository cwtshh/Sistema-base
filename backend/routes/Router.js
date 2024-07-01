const express = require('express');
const router = express();

router.get('/', (req, res) => {
    res.send("API funcionando");
});

router.use("/users", require("./UserRoutes"));
router.use("/notas", require("./NotasRoutes"));
router.use("/admin", require("./AdminRoutes"));


module.exports = router;