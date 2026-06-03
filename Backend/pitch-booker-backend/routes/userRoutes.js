const express = require("express");

const router = express.Router();

const db = require("../db");

/* ================= SIGNUP ================= */

router.post("/signup", (req,res)=>{

    let {
        name,
        email,
        password
    } = req.body;

    let sql = `
        INSERT INTO users(name,email,password)
        VALUES(?,?,?)
    `;

    db.query(sql,[name,email,password],(err,result)=>{

        if(err){

            console.log(err);

            res.status(500).json({
                message:"Signup Failed"
            });

        }
        else{

            res.json({
                message:"Signup Success"
            });

        }

    });

});
/* ================= LOGIN ================= */

router.post("/login", (req,res)=>{

    let {
        email,
        password
    } = req.body;

    let sql = `
        SELECT * FROM users
        WHERE email = ? AND password = ?
    `;

    db.query(sql,[email,password],(err,result)=>{

        if(err){

            console.log(err);

            res.status(500).json({
                message:"Login Failed"
            });

        }
        else{

            if(result.length > 0){

                res.json({
                    success:true,
                    message:"Login Success",
                    user:result[0]
                });

            }
            else{

                res.json({
                    success:false,
                    message:"Invalid Email or Password"
                });

            }

        }

    });

});

module.exports = router;