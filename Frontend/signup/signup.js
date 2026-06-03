let signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e)=>{

    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    fetch("https://pitch-booker.onrender.com/users/signup",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            name,
            email,
            password
        })

    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

        if(data.message === "Signup Success"){

            window.location = "login.html";

        }

    })

    .catch(err => {

        console.log(err);

        alert("Signup Failed");

    });

});
