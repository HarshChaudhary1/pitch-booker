const express = require("express");
const router = express.Router();
const db = require("../db");

/* ================= TEST ================= */

router.get("/test", (req, res) => {
    db.query("SELECT 1 + 1 AS result", (err, result) => {
        if (err) {
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

router.post("/", (req, res) => {

    let {
        user_email,
        matches_played,
        runs,
        wickets,
        strike_rate
    } = req.body;

    // Check if user already has data
    let checkSql = `SELECT * FROM performance WHERE user_email = ?`;

    db.query(checkSql, [user_email], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Error checking performance");
        }

        if (result.length > 0) {

            // ✅ Already exists → UPDATE
            let updateSql = `
                UPDATE performance
                SET
                    matches_played = ?,
                    runs = ?,
                    wickets = ?,
                    strike_rate = ?
                WHERE user_email = ?
            `;

            db.query(
                updateSql,
                [matches_played, runs, wickets, strike_rate, user_email],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Update Failed");
                    }
                    res.send("Performance Updated ✅");
                }
            );

        } else {

            // ✅ New user → INSERT
            let insertSql = `
                INSERT INTO performance
                (user_email, matches_played, runs, wickets, strike_rate)
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(
                insertSql,
                [user_email, matches_played, runs, wickets, strike_rate],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Save Failed");
                    }
                    res.send("Performance Saved ✅");
                }
            );

        }

    });

});

/* ================= LEADERBOARD ================= */

router.get("/leaderboard", (req, res) => {

    let sql = `
        SELECT 
            users.name,
            performance.matches_played,
            performance.runs,
            performance.wickets,
            performance.strike_rate

        FROM performance

        JOIN users

        ON performance.user_email = users.email

        ORDER BY performance.runs DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log("DATABASE ERROR:", err);
            return res.status(500).send("Database Error");
        }

        res.json(result);

    });

});

module.exports = router;