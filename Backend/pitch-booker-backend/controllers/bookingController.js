const db = require("../db");

/* ================= GET BOOKINGS ================= */

exports.getBookings = (req, res) => {

    const sql = "SELECT * FROM bookings";

    db.query(sql, (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);

    });
};

/* ================= ADD BOOKING ================= */

exports.addBooking = (req, res) => {

    const { ground, location, price, date, slot } = req.body;

    /* CHECK DUPLICATE SLOT */

    const checkSql = `
        SELECT * FROM bookings
        WHERE ground = ?
        AND booking_date = ?
        AND slot = ?
    `;

    db.query(checkSql, [ground, date, slot], (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        if(result.length > 0){

            return res.status(400).json({
                message: "Slot already booked ❌"
            });

        }

        /* INSERT */

        const insertSql = `
            INSERT INTO bookings
            (ground, location, price, booking_date, slot)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            insertSql,
            [ground, location, price, date, slot],
            (err, result) => {

                if(err){
                    return res.status(500).json(err);
                }

                res.json({
                    message: "Booking Successful ✅"
                });

            }
        );

    });

};

/* ================= DELETE BOOKING ================= */

exports.deleteBooking = (req, res) => {

    const sql = "DELETE FROM bookings WHERE id=?";

    db.query(sql, [req.params.id], (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        res.json({
            message: "Booking Deleted"
        });

    });

};