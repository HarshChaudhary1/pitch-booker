// ================= SELECT ELEMENTS =================
let slots = document.querySelectorAll(".slot");
let confirmBtn = document.querySelector(".confirm_btn");
let toast = document.getElementById("toast");

let today = new Date().toISOString().split("T")[0];

let dateInput = document.getElementById("bookingDate");

dateInput.setAttribute("min", today);

// ================= LOAD SELECTED GROUND =================
let ground = JSON.parse(localStorage.getItem("selectedGround"));
let loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);
if(!loggedInUser){

    window.location = "/login/login.html";

}

if (ground) {

    document.getElementById("groundName").innerText =
        ground.name;

    document.getElementById("groundLocation").innerText =
        ground.location;

    document.getElementById("groundPrice").innerText =
        "₹" + ground.price + "/hour";

    document.getElementById("groundImage").src =
        ground.image;
}

// ================= NAVIGATION =================
function goToDashboard(){

    window.location = "/dashboard/dashboard.html";

}

// ================= SLOT SELECTION =================
slots.forEach(slot => {

    slot.addEventListener("click", () => {

        if(slot.disabled) return;

        slots.forEach(s => s.classList.remove("active"));

        slot.classList.add("active");

        document.getElementById("slotError").innerText = "";

    });

});

// ================= DATE CHANGE =================
dateInput.addEventListener("change", (e) => {

    blockBookedSlots(e.target.value);

});

// ================= TOAST =================
function showToast(message = "Booking Successful ✅") {

    toast.innerHTML = `
        ${message}
        <div class="toast_progress"></div>
    `;

    toast.classList.add("show");

    let progress = document.querySelector(".toast_progress");

    progress.style.animation = "none";

    progress.offsetHeight;

    progress.style.animation = null;

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}

// ================= BLOCK BOOKED SLOTS =================
function blockBookedSlots(selectedDate){

    fetch("http://localhost:5000/bookings")

    .then(res => res.json())

    .then(bookings => {

        slots.forEach(slot => {

            let isBooked = bookings.some(b =>

                b.booking_date === selectedDate &&
                b.slot === slot.innerText &&
                b.ground === ground.name

            );

            if(isBooked){

                slot.disabled = true;

                slot.style.background = "#ccc";

                slot.style.cursor = "not-allowed";

            }
            else{

                slot.disabled = false;

                slot.style.background = "";

                slot.style.cursor = "pointer";

            }

        });

    });

}

// ================= CONFIRM BOOKING =================
confirmBtn.addEventListener("click", () => {

    let date = dateInput.value;

    let selectedSlot =
        document.querySelector(".slot.active");

    let valid = true;

    // ================= CLEAR ERRORS =================
    document.getElementById("dateError").innerText = "";

    document.getElementById("slotError").innerText = "";

    // ================= VALIDATE DATE =================
    if (!date) {

        document.getElementById("dateError").innerText =
            "Please select a date";

        valid = false;
    }

    else if (date < today) {

        document.getElementById("dateError").innerText =
            "Past dates are not allowed";

        valid = false;
    }

    // ================= VALIDATE SLOT =================
    if (!selectedSlot) {

        document.getElementById("slotError").innerText =
            "Please select a time slot";

        valid = false;
    }

    if (!valid) return;

    // ================= BUTTON LOADING =================
    confirmBtn.innerText = "Booking...";

    confirmBtn.disabled = true;

    confirmBtn.style.background = "#888";

    // ================= BOOKING DATA =================
    let bookingData = {

        ground: ground.name,

        location: ground.location,

        price: ground.price,

        date: date,

        slot: selectedSlot.innerText,
        user_email: loggedInUser.email

    };

    // ================= SAVE TO BACKEND =================
    fetch("http://localhost:5000/bookings", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(bookingData)

    })

    .then(res => res.text())

    .then(data => {

        console.log(data);

        // update blocked slots
        blockBookedSlots(date);

        // success
        confirmBtn.innerText = "Booked ✅";

        confirmBtn.style.background = "#4caf50";

        showToast();

        setTimeout(() => {

            // reset button
            confirmBtn.innerText = "Confirm Booking";

            confirmBtn.disabled = false;

            confirmBtn.style.background = "#fca311";

            // clear form
            dateInput.value = "";

            slots.forEach(s => {

                s.classList.remove("active");

                s.disabled = false;

                s.style.background = "";

            });

        }, 3000);

    })

    .catch(err => {

        console.log(err);

        showToast("Booking Failed ❌");

        confirmBtn.innerText = "Confirm Booking";

        confirmBtn.disabled = false;

        confirmBtn.style.background = "#fca311";

    });

});

// ================= INITIAL LOAD =================
if(dateInput.value){

    blockBookedSlots(dateInput.value);

}