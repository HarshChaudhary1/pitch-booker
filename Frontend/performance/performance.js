/* ================= CHECK LOGIN ================= */

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location = "/login/login.html";
}

/* ================= FORM SUBMIT ================= */

let performanceForm = document.getElementById("performanceForm");

performanceForm.addEventListener("submit", (e) => {

    e.preventDefault();

    let matches_played = document.getElementById("matches").value;
    let runs           = document.getElementById("runs").value;
    let wickets        = document.getElementById("wickets").value;
    let strike_rate    = document.getElementById("strikeRate").value;

    fetch("https://pitch-booker.onrender.com/performance", {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
            user_email: loggedInUser.email,
            matches_played,
            runs,
            wickets,
            strike_rate
        })

    })

    .then(res => res.text())

    .then(data => {

        showToast("Performance Saved ✅");

        setTimeout(() => {
            window.location = "/leaderboard/leaderboard.html";
        }, 1500);

    })

    .catch(err => {
        console.log(err);
        showToast("Save Failed ❌");
    });

});

/* ================= SHOW TOAST ================= */

function showToast(message) {

    let toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

}