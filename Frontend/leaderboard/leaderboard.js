let leaderboardBody =
document.getElementById("leaderboardBody");

let topPlayers =
document.getElementById("topPlayers");


let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location = "/login/login.html";
}

let userNameEl = document.getElementById("userName");
if (userNameEl && loggedInUser) {
    userNameEl.innerText = loggedInUser.name;
}

/* ================= LOAD LEADERBOARD ================= */

function loadLeaderboard(){

    fetch("https://pitch-booker.onrender.com/performance/leaderboard")

    .then(res => {

        if(!res.ok){

            throw new Error("Server Error");

        }

        return res.json();

    })

    .then(players => {

        console.log(players);

        leaderboardBody.innerHTML = "";

        topPlayers.innerHTML = "";

        /* ================= NO DATA ================= */

        if(players.length === 0){

            leaderboardBody.innerHTML = `

                <tr>

                    <td colspan="7">
                        No Performance Data Found
                    </td>

                </tr>

            `;

            return;

        }

        /* ================= TOP 3 PLAYERS ================= */

        players.slice(0,3).forEach((player,index)=>{

            let medals = ["🥇","🥈","🥉"];

            let card = document.createElement("div");

            card.classList.add(
                "player-card",
                `rank${index+1}`
            );

            card.innerHTML = `

                <span class="medal">
                    ${medals[index]}
                </span>

                <img src="
                https://cdn-icons-png.flaticon.com/512/3135/3135715.png
                ">

                <h3>${player.name}</h3>

                <p>Runs: ${player.runs}</p>

            `;

            topPlayers.appendChild(card);

        });

        /* ================= TABLE ================= */

        players.forEach((player,index) => {

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

        console.log("FETCH ERROR:");

        console.log(err);

    });

}

/* ================= INITIAL LOAD ================= */

loadLeaderboard();
