// Script

let loginForm = document.querySelector("form");

loginForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    let email =
        document.getElementById("email").value;

    let password =
        document.getElementById("password").value;

    fetch("https://pitch-booker.onrender.com/users/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })

    })

    .then(res => res.json())

    .then(data => {

        if(data.success){

          showToast("Login Success ✅");

            // SAVE USER
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data.user)
            );

            // REDIRECT
            window.location =
                "/find ground/find-grounds.html";

        }
        else{

            alert(data.message);

        }

    })

    .catch(err => {

        console.log(err);

       showToast("Invalid Credentials ❌");

    });
function showToast(message){

    let toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}
});
