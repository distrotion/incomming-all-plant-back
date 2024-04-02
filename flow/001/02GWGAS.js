const express = require("express");
const router = express.Router();
let mongodb = require('../../function/mongodbGWGAS');
var axios = require('axios');

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

router.post('/02GWGAS/getmaster', async (req, res) => {
  //-------------------------------------
  console.log("----02GWGAS/getincomming----");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = [];
 

  console.log(output)



  return res.json(output);
});





module.exports = router;