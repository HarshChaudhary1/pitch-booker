// ================= SELECT ELEMENTS =================
let bookingList = document.getElementById("bookingList");
let totalBookings = document.getElementById("totalBookings");

// ================= LOGGED IN USER =================
let user = JSON.parse(
    localStorage.getItem("loggedInUser")
);

// ================= BACK BUTTON =================
function goBack(){

    if(document.referrer){

        window.history.back();

    } else {

        window.location =
            "/find ground/find-grounds.html";

    }

}
/* ================= TOAST ================= */

function showToast(message){

    let toast = document.getElementById("toast");

    toast.innerHTML = `

        ${message}

        <div class="toast_progress"></div>

    `;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}


/* ================= LOAD BOOKINGS ================= */
function loadBookings(){

    fetch(`http://localhost:5000/bookings/user/${user.email}`)

    .then(res => res.json())

    .then(bookings => {

        bookingList.innerHTML = "";

        totalBookings.innerText = bookings.length;

        bookings.forEach((booking, index) => {

            let div = document.createElement("div");

            div.classList.add("booking_card");

            div.style.animationDelay =
                `${index * 0.1}s`;
div.innerHTML = `

    <h3>${booking.ground}</h3>

    <p>Date: ${booking.booking_date}</p>

    <p>Slot: ${booking.slot}</p>

    <button onclick="cancelBooking(${booking.id})">
        Cancel
    </button>

`;

            bookingList.appendChild(div);

        });

        renderChart(bookings);

    })

    .catch(err => {

        console.log(err);

    });

}

/* ================= CHART ================= */
function renderChart(bookings){

    /* ================= BOOKINGS PER DAY ================= */

    let dateMap = {};

    bookings.forEach(b => {

        if(!dateMap[b.booking_date]){

            dateMap[b.booking_date] = 0;

        }

        dateMap[b.booking_date]++;

    });

    let dateLabels = Object.keys(dateMap);

    let dateData = Object.values(dateMap);

    if(dateLabels.length === 0){

        dateLabels = ["No Data"];

        dateData = [0];

    }

    let ctx1 =
        document.getElementById("bookingChart");

    if(window.bookingChartInstance){

        window.bookingChartInstance.destroy();

    }

    window.bookingChartInstance = new Chart(ctx1, {

        type: "line",

        data: {

            labels: dateLabels,

            datasets: [{

                label: "Bookings per Day",

                data: dateData,

                borderColor: "#0d1b2a",

                backgroundColor:
                    "rgba(252,163,17,0.3)",

                borderWidth: 2,

                tension: 0.4,

                fill: true

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {
                    beginAtZero: true
                }

            }

        }

    });

    /* ================= BOOKINGS BY SLOT ================= */

    let slotMap = {};

    bookings.forEach(b => {

        if(!slotMap[b.slot]){

            slotMap[b.slot] = 0;

        }

        slotMap[b.slot]++;

    });

    let slotLabels = Object.keys(slotMap);

    let slotData = Object.values(slotMap);

    if(slotLabels.length === 0){

        slotLabels = ["No Data"];

        slotData = [0];

    }

    let ctx2 =
        document.getElementById("slotChart");

    if(window.slotChartInstance){

        window.slotChartInstance.destroy();

    }

    window.slotChartInstance = new Chart(ctx2, {

        type: "bar",

        data: {

            labels: slotLabels,

            datasets: [{

                label: "Bookings per Slot",

                data: slotData,

                backgroundColor: "#fca311"

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {
                    beginAtZero: true
                }

            }

        }

    });

}
function cancelBooking(id){

    fetch(`http://localhost:5000/bookings/${id}`,{

        method:"DELETE"

    })

    .then(res => res.text())

    .then(data => {

        console.log(data);

        showToast("Booking Cancelled ❌");

        loadBookings();

    })

    .catch(err => {

        console.log(err);

    });

}


/* ================= INITIAL LOAD ================= */
loadBookings();