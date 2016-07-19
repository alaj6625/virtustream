'use strict'

//
// Set up
//
var config = require('./config.js');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var router = express.Router();

// Error handling for all endpoints
function handleError(res, message, code) {
    console.log("ERROR: " + message);
    res.status(code || 500).json({"error": message});
}

console.log("start of prog   2");
router.get('/',function(req,res){
     handleError(res, "No endpoint specified", 400);
 });

router.get('/fib',function(req,res){
     handleError(res, "Parameter not supplied", 403);
});

router.get('/fib/:id',function(req,res){
    //
    // Set up some variables
    //
    var fib = [];
    var i;
    var nt = 0;
    var t1 = 0;
    var t2 = 1;

    //calculate fibonacci series
    if ( req.params.id < 0) {
         handleError(res, "The number cannot be negative", 401);
    } else
    if (req.params.id == 0) {
        fib.push(0);
        res.json(fib);
    }else
    if (req.params.id == 1) {
        fib.push(0);
        fib.push(1);
        res.json(fib);
    } else {
        fib.push(0);
        fib.push(1);
        for (i = 2; i <= req.params.id; ++i) {
            nt = t1 + t2;
            t1 = t2;
            t2 = nt;
            fib.push(nt);
        }
        res.json({"fib" : fib});
    }
});

app.use('/',router);

app.listen(config.port,function(){
    console.log("I am listening at  PORT ", config.port);
})