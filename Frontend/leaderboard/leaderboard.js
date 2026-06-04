/* ================= NAV USER + LOGOUT ================= */

let navUser = document.getElementById("navUser");
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location = "/login/login.html";
}

if (loggedInUser) {
    navUser.innerHTML = `
        <div class="user_profile">
            <span>👤 ${loggedInUser.name}</span>
            <button class="logout_btn" onclick="logout()">Logout</button>
        </div>
    `;
} else {
    navUser.innerHTML = `<a href="/login/login.html">Login / Signup</a>`;
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location = "/login/login.html";
}

/* ================= LEADERBOARD BODY ================= */

let leaderboardBody = document.getElementById("leaderboardBody");
let topPlayers = document.getElementById("topPlayers");

/* ================= LOAD LEADERBOARD ================= */

function loadLeaderboard() {

    fetch("https://pitch-booker.onrender.com/performance/leaderboard")

    .then(res => {
        if (!res.ok) throw new Error("Server Error");
        return res.json();
    })

    .then(players => {

        leaderboardBody.innerHTML = "";
        topPlayers.innerHTML = "";

        if (players.length === 0) {
            leaderboardBody.innerHTML = `
                <tr>
                    <td colspan="7">No Performance Data Found</td>
                </tr>
            `;
            return;
        }

        /* ===== TOP 3 ===== */
        players.slice(0, 3).forEach((player, index) => {

            let medals = ["🥇", "🥈", "🥉"];
            let card = document.createElement("div");
            card.classList.add("player-card", `rank${index + 1}`);
            card.innerHTML = `
                <span class="medal">${medals[index]}</span>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png">
                <h3>${player.name}</h3>
                <p>Runs: ${player.runs}</p>
            `;
            topPlayers.appendChild(card);

        });

        /* ===== TABLE ===== */
        players.forEach((player, index) => {

            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.matches_played}</td>
                <td>${player.runs}</td>
                <td>${player.wickets}</td>
                <td>${player.strike_rate}</td>
                <td>Turf Arena</td>
            `;
            leaderboardBody.appendChild(row);

        });

    })

    .catch(err => {
        console.log("FETCH ERROR:", err);
        leaderboardBody.innerHTML = `
            <tr>
                <td colspan="7">Failed to load. Please try again.</td>
            </tr>
        `;
    });

}

loadLeaderboard();