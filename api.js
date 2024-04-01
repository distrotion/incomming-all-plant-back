const express = require("express");
const router = express.Router();

router.use(require("./flow/001/getsap"));
// router.use(require("./flow/002/01TOBEREPORT"));
//INSFINISH getsap
// router.use(require("./flow/004/flow004"))
router.use(require("./flow/login/login"))
router.use(require("./flow/testflow/testflow"));

module.exports = router;

