const express = require("express");
const router = express.Router();
let mongodb = require('../../function/mongodb');

let Auth  = 'MASTER_QC_USER';
let user  = 'USER';


const d = new Date();
let day = d;

router.post('/register', async (req, res) => {
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = {"return":'NOK'}
    let findDB = await mongodb.find(Auth,user,{"ID":input['ID']});

    if(findDB.length == 0){
        input['date'] = day;
        var ins = await mongodb.insertMany(Auth,user,[input]);
        output = {"return":'OK'}
    }
    


    res.json(output);
});

router.post('/login', async (req, res) => {
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = {"return":'NOK'}
    let findDB = await mongodb.find(Auth,user,{"ID":input['ID']});
    console.log(findDB['PASS']);
    console.log(input['PASS']);
    if(findDB.length > 0){

        if(findDB[0]['PASS'] === input['PASS']){
            output = {
                "ID":findDB[0]['ID'],
                "NAME":findDB[0]['NAME'],
                "LV":findDB[0]['LV'] || '1',
                "return":'OK',

                "Section":findDB[0]['Section'],
                "Def":findDB[0]['Def'],
                "LOCATION":findDB[0]['LOCATION'],
            
            }
        }else{
            output = {"return":'PASSWORD INCORRECT'}
        }

        
    }
    
    console.log(output)
    return res.json(output);
});

router.post('/re_login', async (req, res) => {
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = {"return":'NOK'}
    let findDB = await mongodb.find(Auth,user,{"ID":input['ID']});

    if(findDB.length > 0){

        
            output = {
                "ID":findDB[0]['ID'],
                "NAME":findDB[0]['NAME'],
                "LV":findDB[0]['LV'] || '1',
                "return":'OK',

                "Section":findDB[0]['Section'],
                "Def":findDB[0]['Def'],
                "LOCATION":findDB[0]['LOCATION'],
                "LOCATION":findDB[0]['LOCATION']||"",
                "SIGNATURE":findDB[0]['SIGNATURE']||"",
            
            }
     

        
    }
    
    console.log(output)
    return res.json(output);
});

router.post('/newpass', async (req, res) => {
    //-------------------------------------
    console.log(req.body);
    let input = req.body;
    //-------------------------------------
    let output = {"return":'NOK'}
    let findDB = await mongodb.find(Auth,user,{"ID":input['ID']});

    // console.log(findDB);

    if(findDB.length > 0){
        console.log("---?");

        if(findDB[0]['PASS'] === input['PASS']){           
            let upd = await mongodb.update(Auth,user,{ "ID":input['ID'] }, { $set: {"PASS":input['NEWPASS'],"EDIT":day} });
            output = {"return":'OK'}
        }else{
            output = {"return":'PASSWORD INCORRECT'}
        }
       
    }

    return res.json(output);
});


module.exports = router;