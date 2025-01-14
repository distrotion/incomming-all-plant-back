const express = require("express");
const router = express.Router();
let mongodb = require('../../function/mongodbBP12PVD');
var axios = require('axios');
var request = require('request');

let masterDB = "master_IC";
let PATTERN = "PATTERN";
//
let GRAPH_TABLE = "GRAPH_TABLE";
let TYPE = "TYPE";
let UNIT = "UNIT";
let ITEMs = "ITEMs";
let MACHINE = "MACHINE";
let METHOD = "METHOD";
let INSTRUMENTS = "INSTRUMENTS";
let RESULTFORMAT = "RESULTFORMAT";
let SPECIFICATION = "SPECIFICATION";
let TOLERANCE = "TOLERANCE";
let GRAPHTYPE = "GRAPHTYPE";
let CALCULATE = "CALCULATE";
let LOAD = "LOAD";
let CORETYPE = "CORETYPE";
let FREQUENCY = "FREQUENCY";
let PATTERN_01 = "PATTERN_01";

let MAININC = "MAIN_INCOMMING";
let MAIN = "MAIN";

const d = new Date();
let day = d;

router.post('/06BP12PVD/getmaster', async (req, res) => {
  //-------------------------------------
  console.log("----06BP12PVD/getmaster----");
  console.log(req.body);
  let input = req.body;
  let find1 = [];
  let find2 = [];
  let find3 = [];
  let find4 = [];
  let find5 = [];
  let find6 = [];
  let find7 = [];
  let find8 = [];
  let find9 = [];

  let DATA = [];
  let PATTERNs = [];
  //-------------------------------------
  if (input['MATNR'] != undefined) {

    find1 = await mongodb.find(masterDB, TYPE, { "activeid": "active_id" });
    find2 = await mongodb.find(masterDB, ITEMs, { "activeid": "active_id" });
    find3 = await mongodb.find(masterDB, MACHINE, { "activeid": "active_id" });
    find4 = await mongodb.find(masterDB, RESULTFORMAT, {});
    find5 = await mongodb.find(masterDB, GRAPHTYPE, {});
    find6 = await mongodb.find(masterDB, INSTRUMENTS, {});
    find7 = await mongodb.find(masterDB, CALCULATE, { "activeid": "active_id" });
    find8 = await mongodb.find(masterDB, SPECIFICATION, { "activeid": "active_id" });
    find9 = await mongodb.find(masterDB, UNIT, { "activeid": "active_id" });

    PATTERNs = await mongodb.find(PATTERN, PATTERN_01, { "CP": `${input['MATNR']}` });
    // DATA = await mongodb.find(MAININC, MAIN, { "MATNR": `${input['MATNR']}` });


  }


  return res.json({ "PATTERN": PATTERNs, "TYPE": find1, "ITEMS": find2, "METHOD": find3, "RESULTFORMAT": find4, "GRAPHTYPE": find5, "INSTRUMENTS": find6, "CALCULATE": find7, "SPECIFICATION": find8, "UNIT": find9 });
});


router.post('/06BP12PVD/GETdata', async (req, res) => {
  //-------------------------------------
  console.log("----06BP12PVD/GETdata----");
  console.log(req.body);
  let input = req.body;

  //-------------------------------------
  let output = []
  //CUST_LOT/MATNR
  if (input['CHARG'] != undefined && input['CUST_LOT'] != undefined&& input['MATNR'] != undefined) {
    output = await mongodb.find(MAININC, MAIN, { "CHARG": `${input['CHARG']}`, "CUST_LOT": `${input['CUST_LOT']}` , "MATNR": `${input['MATNR']}` });
    completedata(input['CHARG'], input['CUST_LOT'])
  }


  return res.json(output);
});

router.post('/06BP12PVD/SETgood', async (req, res) => {
  //-------------------------------------
  console.log("----06BP12PVD/SETgood----");
  console.log(req.body);
  let input = req.body;

  let DATA = [];

  //-------------------------------------
  let output = {
    "status": "NOK",
  }
  if (input['CHARG'] != undefined && input['CUST_LOT'] != undefined && input['MATNR'] != undefined) {

    DATA = await mongodb.find(MAININC, MAIN, { "CHARG": `${input['CHARG']}`, "CUST_LOT": `${input['CUST_LOT']}` , "MATNR": `${input['MATNR']}` });
    if (DATA.length === 0) {
      let datainside = {
        "ITEMcode": input['ITEMcode'],
        "status": input['ITEMstatus'],
        "DATAINPUT":input['DATAINPUT'],
        // "specialAccStatus": input['ITEMspecialAccStatus'],
        // "specialAccCOMMENT": input['ITEMspecialAccCOMMENT'],
        // "specialAccPiecesSelected": input['ITEMsPiecesSelected'],
        // "specialAccPic01": input['ITEMspecialAccPic01'],
        // "specialAccPic02": input['ITEMspecialAccPic02'],
        // "specialAccPic03": input['ITEMspecialAccPic03'],
        // "specialAccPic04": input['ITEMspecialAccPic04'],
        // "specialAccPic05": input['ITEMspecialAccPic05'],
        "TS": Date.now()
      }
      let dataset =
      {
        "MATNR": input['MATNR'],
        "CHARG": input['CHARG'],
        "MBLNR": input['MBLNR'],
        "BWART": input['BWART'],
        "MENGE": input['MENGE'],
        "MEINS": input['MEINS'],
        "MAT_FG": input['MAT_FG'],
        "KUNNR": input['KUNNR'],
        "SORTL": input['SORTL'],
        "NAME1": input['NAME1'],
        "CUST_LOT": input['CUST_LOT'],
        "PART_NM": input['PART_NM'],
        "PART_NO": input['PART_NO'],
        "PROCESS": input['PROCESS'],
        "OLDMAT_CP": input['OLDMAT_CP'],
        "STATUS": input['STATUS'],
        "UserNO": input['UserNO'],
        "ListITEM": input['ListITEM'],
        "TS": Date.now()
      }
      dataset[input['ITEMcode']] = datainside;
      if (input['ITEMstatus'] === 'WAIT') {
        dataset[`specialAcc-${input['ITEMcode']}`] = {
          "ITEMcode": input['ITEMcode'],
          "status": input['ITEMstatus'],
          "DATAINPUT":input['DATAINPUT'],
          "specialAccStatus": input['ITEMspecialAccStatus'],
          "specialAccCOMMENT": input['ITEMspecialAccCOMMENT'],
          "specialAccPiecesSelected": input['ITEMsPiecesSelected'],
          "specialAccPic01": input['ITEMspecialAccPic01'],
          "specialAccPic02": input['ITEMspecialAccPic02'],
          "specialAccPic03": input['ITEMspecialAccPic03'],
          "specialAccPic04": input['ITEMspecialAccPic04'],
          "specialAccPic05": input['ITEMspecialAccPic05'],
          "TS": Date.now()
        };
      }

      let SET = await mongodb.insertMany(MAININC, MAIN, [dataset]);
      completedata(input['CHARG'], input['CUST_LOT'])
    } else {

      let datainside = {
        "ITEMcode": input['ITEMcode'],
        "status": input['ITEMstatus'],
        "DATAINPUT":input['DATAINPUT'],
        // "specialAccStatus": input['ITEMspecialAccStatus'],
        // "specialAccCOMMENT": input['ITEMspecialAccCOMMENT'],
        // "specialAccPiecesSelected": input['ITEMsPiecesSelected'],
        // "specialAccPic01": input['ITEMspecialAccPic01'],
        // "specialAccPic02": input['ITEMspecialAccPic02'],
        // "specialAccPic03": input['ITEMspecialAccPic03'],
        // "specialAccPic04": input['ITEMspecialAccPic04'],
        // "specialAccPic05": input['ITEMspecialAccPic05'],
        "TS": Date.now()
      }
      let dataset =
      {
        "TS": Date.now()
      }
      dataset[input['ITEMcode']] = datainside;
      if (input['ITEMstatus'] === 'WAIT') {
        dataset[`specialAcc-${input['ITEMcode']}`] = {
          "ITEMcode": input['ITEMcode'],
          "status": input['ITEMstatus'],
          "DATAINPUT":input['DATAINPUT'],
          "specialAccStatus": input['ITEMspecialAccStatus'],
          "specialAccCOMMENT": input['ITEMspecialAccCOMMENT'],
          "specialAccPiecesSelected": input['ITEMsPiecesSelected'],
          "specialAccPic01": input['ITEMspecialAccPic01'],
          "specialAccPic02": input['ITEMspecialAccPic02'],
          "specialAccPic03": input['ITEMspecialAccPic03'],
          "specialAccPic04": input['ITEMspecialAccPic04'],
          "specialAccPic05": input['ITEMspecialAccPic05'],
          "TS": Date.now()
        };
      }


      let SET = await mongodb.update(MAININC, MAIN, { "CHARG": `${input['CHARG']}`, "CUST_LOT": `${input['CUST_LOT']}` , "MATNR": `${input['MATNR']}`}, { $set: dataset });
      completedata(input['CHARG'], input['CUST_LOT'])
    }


  }


  return res.json(output);
});

router.post('/06BP12PVD/SETgoodandDATA', async (req, res) => {
  //-------------------------------------
  console.log("----06BP12PVD/SETgood----");
  console.log(req.body);
  let input = req.body;

  let DATA = [];

  //-------------------------------------
  let output = {
    "status": "NOK",
  }
  if (input['CHARG'] != undefined && input['CUST_LOT'] != undefined && input['MATNR'] != undefined& input['DATASET'] != undefined) {

    DATA = await mongodb.find(MAININC, MAIN, { "CHARG": `${input['CHARG']}`, "CUST_LOT": `${input['CUST_LOT']}` , "MATNR": `${input['MATNR']}` });
    if (DATA.length === 0) {
      let datainside = {
        "ITEMcode": input['ITEMcode'],
        "status": input['ITEMstatus'],
        "DATAINPUT":input['DATAINPUT'],
        // "specialAccStatus": input['ITEMspecialAccStatus'],
        // "specialAccCOMMENT": input['ITEMspecialAccCOMMENT'],
        // "specialAccPiecesSelected": input['ITEMsPiecesSelected'],
        // "specialAccPic01": input['ITEMspecialAccPic01'],
        // "specialAccPic02": input['ITEMspecialAccPic02'],
        // "specialAccPic03": input['ITEMspecialAccPic03'],
        // "specialAccPic04": input['ITEMspecialAccPic04'],
        // "specialAccPic05": input['ITEMspecialAccPic05'],
        "DATASET":input['DATASET'],
        "TS": Date.now()
      }
      let dataset =
      {
        "MATNR": input['MATNR'],
        "CHARG": input['CHARG'],
        "MBLNR": input['MBLNR'],
        "BWART": input['BWART'],
        "MENGE": input['MENGE'],
        "MEINS": input['MEINS'],
        "MAT_FG": input['MAT_FG'],
        "KUNNR": input['KUNNR'],
        "SORTL": input['SORTL'],
        "NAME1": input['NAME1'],
        "CUST_LOT": input['CUST_LOT'],
        "PART_NM": input['PART_NM'],
        "PART_NO": input['PART_NO'],
        "PROCESS": input['PROCESS'],
        "OLDMAT_CP": input['OLDMAT_CP'],
        "STATUS": input['STATUS'],
        "UserNO": input['UserNO'],
        "ListITEM": input['ListITEM'],
        "TS": Date.now()
      }
      dataset[input['ITEMcode']] = datainside;
      if (input['ITEMstatus'] === 'WAIT') {
        dataset[`specialAcc-${input['ITEMcode']}`] = {
          "ITEMcode": input['ITEMcode'],
          "status": input['ITEMstatus'],
          "DATAINPUT":input['DATAINPUT'],
          "specialAccStatus": input['ITEMspecialAccStatus'],
          "specialAccCOMMENT": input['ITEMspecialAccCOMMENT'],
          "specialAccPiecesSelected": input['ITEMsPiecesSelected'],
          "specialAccPic01": input['ITEMspecialAccPic01'],
          "specialAccPic02": input['ITEMspecialAccPic02'],
          "specialAccPic03": input['ITEMspecialAccPic03'],
          "specialAccPic04": input['ITEMspecialAccPic04'],
          "specialAccPic05": input['ITEMspecialAccPic05'],
          "DATASET":input['DATASET'],
          "TS": Date.now()
        };
      }

      let SET = await mongodb.insertMany(MAININC, MAIN, [dataset]);
      completedata(input['CHARG'], input['CUST_LOT'])
    } else {

      let datainside = {
        "ITEMcode": input['ITEMcode'],
        "status": input['ITEMstatus'],
        "DATAINPUT":input['DATAINPUT'],
        // "specialAccStatus": input['ITEMspecialAccStatus'],
        // "specialAccCOMMENT": input['ITEMspecialAccCOMMENT'],
        // "specialAccPiecesSelected": input['ITEMsPiecesSelected'],
        // "specialAccPic01": input['ITEMspecialAccPic01'],
        // "specialAccPic02": input['ITEMspecialAccPic02'],
        // "specialAccPic03": input['ITEMspecialAccPic03'],
        // "specialAccPic04": input['ITEMspecialAccPic04'],
        // "specialAccPic05": input['ITEMspecialAccPic05'],
        "DATASET":input['DATASET'],
        "TS": Date.now()
      }
      let dataset =
      {
        "TS": Date.now()
      }
      dataset[input['ITEMcode']] = datainside;
      if (input['ITEMstatus'] === 'WAIT') {
        dataset[`specialAcc-${input['ITEMcode']}`] = {
          "ITEMcode": input['ITEMcode'],
          "status": input['ITEMstatus'],
          "DATAINPUT":input['DATAINPUT'],
          "specialAccStatus": input['ITEMspecialAccStatus'],
          "specialAccCOMMENT": input['ITEMspecialAccCOMMENT'],
          "specialAccPiecesSelected": input['ITEMsPiecesSelected'],
          "specialAccPic01": input['ITEMspecialAccPic01'],
          "specialAccPic02": input['ITEMspecialAccPic02'],
          "specialAccPic03": input['ITEMspecialAccPic03'],
          "specialAccPic04": input['ITEMspecialAccPic04'],
          "specialAccPic05": input['ITEMspecialAccPic05'],
          "DATASET":input['DATASET'],
          "TS": Date.now()
        };
      }


      let SET = await mongodb.update(MAININC, MAIN, { "CHARG": `${input['CHARG']}`, "CUST_LOT": `${input['CUST_LOT']}` , "MATNR": `${input['MATNR']}`}, { $set: dataset });
      completedata(input['CHARG'], input['CUST_LOT'])
    }


  }


  return res.json(output);
});

router.post('/06BP12PVD/test', async (req, res) => {
  //-------------------------------------
  console.log("----06BP12PVD/test----");
  console.log(req.body);
  let input = req.body;

  //-------------------------------------
  let output = []
  //CUST_LOT
  if (input['CHARG'] != undefined && input['CUST_LOT'] != undefined && input['MATNR'] != undefined) {
    completedata(input['CHARG'], input['CUST_LOT'])
  }


  return res.json(output);
});

async function completedata(CHARG, CUST_LOT) {
  let gogo = true;
  let DATA = await mongodb.find(MAININC, MAIN, { "CHARG": CHARG, "CUST_LOT": CUST_LOT });
  if (DATA.length > 0) {
    for (let i = 0; i < DATA[0]['ListITEM'].length; i++) {
      if (DATA[0][DATA[0]['ListITEM'][i]] == undefined) {
        gogo = false;
      } else {
        if (DATA[0][DATA[0]['ListITEM'][i]]['status'] == 'reject') {
          gogo = false;
        }
      }


    }
    console.log(gogo);
    if (gogo) {
      console.log(DATA[0])
      console.log(`0000000000${DATA[0]['MATNR']}`)
      console.log(CHARG)
      request.post(
        'http://tp-portal.thaiparker.co.th/API_QcReport/ZBAPI_getZPPIN006_IN',
        {
          json: {
            "PERNR_ID": `${DATA[0]['UserNO']}`,
            "AUARTID": "ZPM1",
            "P_MATNR": `0000000000${DATA[0]['MATNR']}`,
            "P_CHARG": `${CHARG}`,
            "P_BWART": "321"
          }
  
        },
    
        function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body);
          }
        }
      );
      console.log('SEND TO SAP')
    }
  }



}





module.exports = router;