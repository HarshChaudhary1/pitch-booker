let navUser = document.getElementById("navUser");

let user = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if(user){

    navUser.innerHTML = `

        <div class="user_profile">

            <span>👤 ${user.name}</span>

            <button class="logout_btn" onclick="logout()">
                Logout
            </button>

        </div>

    `;
}
else{

    navUser.innerHTML = `

        <a href="/login/login.html">
            Login / Signup
        </a>

    `;
}

function logout(){

    localStorage.removeItem("loggedInUser");

    window.location.reload();

}