const express = require("express");

const router = express.Router();

const db = require("../db");
router.get("/test", (req, res) => {
    db.query("SELECT 1 + 1 AS result", (err, result) => {
        if(err){
    console.log("DATABASE ERROR:", err);
    return res.status(500).json({ 
        error: err.message, 
        sqlMessage: err.sqlMessage 
    });
}
        res.json({ success: true, result });
    });
});

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

                return res.status(500).send(
                    "Performance Save Failed"
                );

            }

            res.send("Performance Saved ✅");

        }
    );

});

/* ================= LEADERBOARD ================= */

router.get("/leaderboard",(req,res)=>{

    let sql = `
    SELECT 
        users.name AS name,
        SUM(performance.matches_played) AS matches,
        SUM(performance.runs) AS runs,
        SUM(performance.wickets) AS wickets,
        AVG(performance.strike_rate) AS strike_rate

    FROM performance

    JOIN users

    ON performance.user_email = users.email

    GROUP BY users.email, users.name

    ORDER BY runs DESC
`;

    db.query(sql,(err,result)=>{

        if(err){

            console.log("DATABASE ERROR:");
            console.log(err);

            return res.status(500).send("Database Error");

        }

        res.json(result);

    });

});

module.exports = router;