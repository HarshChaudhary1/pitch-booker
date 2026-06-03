const express = require("express");

const router = express.Router();

const db = require("../db");

/* ================= SAVE BOOKING ================= */

router.post("/", (req,res)=>{

   let {
    ground,
    location,
    price,
    date,
    slot,
    user_email
} = req.body;

    let sql = `
        INSERT INTO bookings
        (ground, location, price, booking_date, slot,user_email)
        VALUES (?, ?, ?, ?, ?,?)
    `;

    db.query(
        sql,
        [ground, location, price, date, slot,user_email],
        (err,result)=>{

            if(err){
                console.log(err);
                res.send("Booking Failed");
            } else {
                res.send("Booking Saved ✅");
            }
        }
    );

});

/* ================= GET BOOKINGS ================= */

router.get("/", (req,res)=>{

    let sql = "SELECT * FROM bookings";

    db.query(sql,(err,result)=>{

        if(err){
            res.send("Error Fetching");

        } else {
            res.json(result);
        }

    });

});
/* ================= DELETE BOOKING ================= */

router.delete("/:id",(req,res)=>{

    let id = req.params.id;

    let sql = `
        DELETE FROM bookings
        WHERE id = ?
    `;

    db.query(sql,[id],(err,result)=>{

        if(err){

            console.log(err);

            res.status(500).send("Delete Failed");

        }
        else{

            res.send("Booking Deleted ✅");

        }

    });

});

/* ================= USER BOOKINGS ================= */

router.get("/user/:email",(req,res)=>{

    let email = req.params.email;

    let sql = `
        SELECT * FROM bookings
        WHERE user_email = ?
    `;

    db.query(sql,[email],(err,result)=>{

        if(err){

            console.log(err);

            res.status(500).send("Error");

        }
        else{

            res.json(result);

        }

    });

});

module.exports = router;