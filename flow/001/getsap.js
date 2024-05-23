const express = require("express");
const router = express.Router();
let mongodb = require('../../function/mongodb');
var axios = require('axios');

let Auth = 'MASTER_QC_USER';
let user = 'USER';


const d = new Date();
let day = d;

router.post('/getsap/getincomming', async (req, res) => {
  //-------------------------------------
  console.log("----getsap/getincomming----");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = [];
  if (input[`IMP_PRCTR`] !== undefined && input[`IMP_WERKS`] !== undefined && input[`LAST_DATE`] !== undefined && input[`LAST_TIME`] !== undefined) {
    try {
      let resp = await axios.post('http://tp-portal.thaiparker.co.th/API_QcReport/ZBAPI_getZPPIN014_OUT', {
        "IMP_PRCTR": input[`IMP_PRCTR`],       //25000,25700 GW-GAS 
        "IMP_WERKS": input[`IMP_WERKS`],        //2200 GW
        "LAST_DATE": input[`LAST_DATE`],
        "LAST_TIME": input[`LAST_TIME`]
      });
      if (resp.status == 200) {
        let returnDATA = resp.data;
        output = returnDATA["Rows"]||[]
      }
    } catch (err) {
      output = [];
    }


    try {
      let resp2 = await axios.post('http://tp-portal.thaiparker.co.th/API_QcReport/ZBAPI_getZPPIN013_OUT', {
        "IMP_PRCTR": input[`IMP_PRCTR`],       //25000,25700 GW-GAS 
        "IMP_WERKS": input[`IMP_WERKS`],        //2200 GW
        "LAST_DATE": input[`LAST_DATE`],
        "LAST_TIME": input[`LAST_TIME`]
      });
      if (resp2.status == 200) {
        let returnDATA2 = resp2.data;
        let  Good = returnDATA2["Rows"]||[]
        for (let i = 0; i < output.length; i++) {
          for (let j = 0; j < Good.length; j++) {

           if(Good[j][`MATNR`] === output[i][`MATNR`] ){
            output[i]['NAME1'] = Good[j][`NAME1`];
            output[i]['SORTL'] = Good[j][`SORTL`];
            break;
           }
            
          }
          
        }
      }
    } catch (err) {
      // output = [];
    }

    // try {
    //   let resp = await axios.post('http://tp-portal.thaiparker.co.th/API_QcReport/ZBAPI_QC_INTERFACE', {
    //     "BAPI_NAME": "ZPPIN014_OUT",
    //     "IMP_PRCTR": input[`IMP_PRCTR`],       //25000,25700 GW-GAS 
    //     "IMP_WERKS": input[`IMP_WERKS`],        //2200 GW
    //     "TABLE_NAME": "PPINCOMING"
    //   });
    //   if (resp.status == 200) {
    //     let returnDATA = resp.data;
    //     output = returnDATA["Records"]||[]
    // //  console.log(output)
    //   }
    // } catch (err) {
    //   output = [];
    // }


    // try {
    //   let resp2 = await axios.post('http://tp-portal.thaiparker.co.th/API_QcReport/ZBAPI_getZPPIN013_OUT', {
    //     "IMP_PRCTR": input[`IMP_PRCTR`],       //25000,25700 GW-GAS 
    //     "IMP_WERKS": input[`IMP_WERKS`],        //2200 GW
    //     "LAST_DATE": input[`LAST_DATE`],
    //     "LAST_TIME": input[`LAST_TIME`]
    //   });
    //   if (resp2.status == 200) {
    //     let returnDATA2 = resp2.data;
    //     let  Good = returnDATA2["Rows"]||[]
    //     for (let i = 0; i < output.length; i++) {
    //       for (let j = 0; j < Good.length; j++) {

    //        if(Good[j][`MATNR`] === output[i][`MATNR`] ){
    //         output[i]['NAME1'] = Good[j][`NAME1`];
    //         output[i]['SORTL'] = Good[j][`SORTL`];
    //         break;
    //        }
            
    //       }
          
    //     }
    //   }
    // } catch (err) {
    //   // output = [];
    // }

  }

  // console.log(output)



  return res.json(output);
});



router.post('/getsap/getincomming_2', async (req, res) => {
  //-------------------------------------
  console.log("----getsap/getincomming_2----");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = [];
  if (input[`IMP_PRCTR`] !== undefined && input[`IMP_WERKS`] !== undefined && input[`LAST_DATE`] !== undefined && input[`LAST_TIME`] !== undefined) {
    

    try {
      let resp = await axios.post('http://tp-portal.thaiparker.co.th/API_QcReport/ZBAPI_QC_INTERFACE', {
        "BAPI_NAME": "ZPPIN014_OUT",
        "IMP_PRCTR": input[`IMP_PRCTR`],       //25000,25700 GW-GAS 
        "IMP_WERKS": input[`IMP_WERKS`],        //2200 GW
        "TABLE_NAME": "PPINCOMING"
      });
      if (resp.status == 200) {
        let returnDATA = resp.data;
        output = returnDATA["Records"]||[]
    //  console.log(output)
      }
    } catch (err) {
      output = [];
    }


   

  }

  // console.log(output)



  return res.json(output);
});




module.exports = router;