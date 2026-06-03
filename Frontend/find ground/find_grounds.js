function bookGround(name, location, price, image){

    let ground = {
        name:name,
        location:location,
        price:price,
        image:image
    };

    localStorage.setItem("selectedGround", JSON.stringify(ground));

    window.location = "/booking/booking.html";
}


let searchInput = document.getElementById("searchInput");
let typeFilter = document.getElementById("typeFilter");
let priceFilter = document.getElementById("priceFilter");

let cards = document.querySelectorAll(".ground_card");

let noResults = document.getElementById("noResults");

function filterGrounds(){

    let visibleCount = 0;

    let searchValue = searchInput.value.toLowerCase();
    let typeValue = typeFilter.value.toLowerCase();
    let priceValue = priceFilter.value;

    cards.forEach(card => {

        let location = card.dataset.location;
        let type = card.dataset.type;
        let price = parseInt(card.dataset.price);

        let show = true;

        if(!location.includes(searchValue)) show = false;
        if(typeValue !== "all" && type !== typeValue) show = false;

        if(priceValue === "low" && price >= 500) show = false;
        if(priceValue === "mid" && (price < 500 || price > 1000)) show = false;

        card.style.display = show ? "block" : "none";

        if(show) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
}
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
// EVENT LISTENERS
searchInput.addEventListener("input", filterGrounds);
typeFilter.addEventListener("change", filterGrounds);
priceFilter.addEventListener("change", filterGrounds);