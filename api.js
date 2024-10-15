const express = require("express");
const router = express.Router();

router.use(require("./flow/001/getsap"));
router.use(require("./flow/001/01BP12GAS"));
router.use(require("./flow/001/02GWGAS"));
router.use(require("./flow/001/03BP12PH"));
router.use(require("./flow/001/04BP12PAL"));
router.use(require("./flow/001/05BP12KNG"));
router.use(require("./flow/001/06BP12PVD"));
router.use(require("./flow/001/07HESGAS"));
router.use(require("./flow/001/08HESPH"));
router.use(require("./flow/001/09HESISN"));
router.use(require("./flow/001/10HESPAL"));

//INSFINISH getsap
// router.use(require("./flow/004/flow004"))
router.use(require("./flow/login/login"))
router.use(require("./flow/testflow/testflow"));

module.exports = router;

