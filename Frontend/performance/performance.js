const express = require("express");

const router = express.Router();

const db = require("../db");

/* ================= SAVE PERFORMANCE ================= */

router.post("/", (req,res)=>{

    let {
        user_email,
        matches_played,
        runs,
        wickets,
        strike_rate
    } = req.body;

    let sql = `
        INSERT INTO performance
        (
            user_email,
            matches_played,
            runs,
            wickets,
            strike_rate
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_email,
            matches_played,
            runs,
            wickets,
            strike_rate
        ],
        (err,result)=>{

            if(err){

                console.log(err);

                res.status(500).send(
                    "Performance Save Failed"
                );

            } else {

                res.send(
                    "Performance Saved ✅"
                );

            }

        }
    );

});

/* ================= LEADERBOARD ================= */

router.get("/leaderboard",(req,res)=>{

    let sql = `
        SELECT 
            users.name,
            performance.matches_played,
            performance.runs,
            performance.wickets,
            performance.strike_rate

        FROM performance

        INNER JOIN users

        ON performance.user_email = users.email

        ORDER BY performance.runs DESC
    `;

    db.query(sql,(err,result)=>{

        if(err){

            console.log(err);

            return res.status(500).send("Database Error");

        }

        res.json(result);

    });

});

module.exports = router;