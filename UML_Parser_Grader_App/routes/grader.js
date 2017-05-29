var express = require('express');
var router = express.Router();
var mysql = require('./database');


var submitGrades = function (req, res) {
    console.log("submitGrades");

    console.log(req.body);

    var TenantInsertQuery = "INSERT INTO "+req.body.tenant_table+"( tenant_id, sjsu_id, comments) VALUES ('" +
        req.body.tenant_id +
        "','" + req.body.studentid +
        "','" + req.body.gradecomments +"')";

    console.log("QUERY to enter tenant details is: " + TenantInsertQuery);

    mysql.fetchData(function(err, results) {

        if (err) {
            throw err;
        } else {

                switch (req.body.tenant_id)
                {
                    case "TA-1":
                        var TenantInsertQuery1 = "INSERT INTO tenant_mapping( sjsu_id, tenant_id, field_name, field_value) VALUES (" +
                            req.body.studentid +
                            ",'" + req.body.tenant_id +
                            "','Grade Achieved'" +
                            ",'" + req.body.grade +"'), ("+
                            req.body.studentid +
                            ",'" + req.body.tenant_id +
                            "','Grade Total'" +
                            ",'A-E')";
                        mysql.fetchData(function(err, results) {

                            if (err) {
                                throw err;
                            } else {
                                    console.log("tenant details inserted!");
                                    json_responses = {
                                        "statusCode" : 200
                                    };
                                    res.send(json_responses);
                                }
                        }, TenantInsertQuery1);
                        break;
                    case "TA-2":
                        var TenantInsertQuery1 = "INSERT INTO tenant_mapping( sjsu_id, tenant_id, field_name, field_value) VALUES (" +
                            req.body.studentid +
                            ",'" + req.body.tenant_id +
                            "','Grade Achieved'" +
                            ",'" + req.body.grade +"'), ("+
                            req.body.studentid +
                            ",'" + req.body.tenant_id +
                            "','Grade Total'" +
                            ",'1-5')";
                        mysql.fetchData(function(err, results) {

                            if (err) {
                                throw err;
                            } else {
                                    console.log("tenant details inserted!");
                                    json_responses = {
                                        "statusCode" : 200
                                    };
                                    res.send(json_responses);
                                }
                        }, TenantInsertQuery1);
                        break;
                    case "TA-3":
                        var TenantInsertQuery1 = "INSERT INTO tenant_mapping( sjsu_id, tenant_id, field_name, field_value) VALUES (" +
                            req.body.studentid +
                            ",'" + req.body.tenant_id +
                            "','Grade Achieved'" +
                            ",'" + req.body.grade +"'), ("+
                            req.body.studentid +
                            ",'" + req.body.tenant_id +
                            "','Grade Total'" +
                            ",'100%')";
                        mysql.fetchData(function(err, results) {

                            if (err) {
                                throw err;
                            } else {
                                    console.log("tenant details inserted!");
                                    json_responses = {
                                        "statusCode" : 200
                                    };
                                    res.send(json_responses);
                                }
                        }, TenantInsertQuery1);
                        break;
                    case "TA-4":
                        var TenantInsertQuery1 = "INSERT INTO tenant_mapping( sjsu_id, tenant_id, field_name, field_value) VALUES (" +
                            req.body.studentid +
                            ",'" + req.body.tenant_id +
                            "','Grade Achieved'" +
                            ",'" + req.body.grade +"'), ("+
                            req.body.studentid +
                            ",'" + req.body.tenant_id +
                            "','Grade Total'" +
                            ",'100')";
                        mysql.fetchData(function(err, results) {

                            if (err) {
                                throw err;
                            } else {
                                    console.log("tenant details inserted!");
                                    res.send({"statusCode" : 200});
                                }
                        }, TenantInsertQuery1);
                        break;
                }
            }
    }, TenantInsertQuery);
};

//following function takes care of cross origin requests. this is because chrome blocks
//requests made to servers of other origins
var all = function(req, res, next) {
    // add details of what is allowed in HTTP request headers to the response headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    // the next() function continues execution and will move onto the requested URL/URI
    next();
};

var options = function(req, res) {
    res.sendStatus(200);
};

module.exports = {
    submitGrades , all , options
};
