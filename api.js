const express = require("express");
const router = express.Router();

router.use(require("./flow/001/getsap"));
router.use(require("./flow/001/01BP12GAS"));
router.use(require("./flow/001/02GWGAS"));
router.use(require("./flow/001/03BP12PH"));

//INSFINISH getsap
// router.use(require("./flow/004/flow004"))
router.use(require("./flow/login/login"))
router.use(require("./flow/testflow/testflow"));

module.exports = router;

