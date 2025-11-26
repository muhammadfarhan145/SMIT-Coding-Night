// const supabaseClient = supabase.createClient("https://queftwxqyuinynpsixqa.supabase.co",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZWZ0d3hxeXVpbnlucHNpeHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTQ5NDEsImV4cCI6MjA3NTQ5MDk0MX0.TWex1aIXHoopzD9q1LR2hOt6hsBY6JN3aAtaXpvM5hc"
// );

const signUpBtn = document.getElementById("signUpBtn");
const form = document.querySelector(".form");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const emailInput = document.getElementById("emailInput").value.trim();
    const passwordInput = document.getElementById("passInput").value.trim();
    const message_P = document.getElementById("message_P");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let existUser = users.find(u => u.email === emailInput);

    if(!emailInput || !passwordInput){
        message_P.textContent = "Fill all the fields";
        return;
    }

    if(passwordInput.length < 6){
        message_P.textContent = "Password length must be atleast 6+ characters"
        return;
    }

    signUpBtn.disabled = true
    signUpBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Signing Up...</span>
    `;

    if(!existUser) {
        users.push({
            email: emailInput,
            password: passwordInput
        });
        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "../posts/posts.html";
        return;
    }

    return
    signUpBtn.disabled = false;
    signUpBtn.innerHTML = `<i class="fas fa-user-plus"></i> Sign Up
    `;
})


// form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const emailInput = document.getElementById("emailInput").value.trim();
//     const passwordInput = document.getElementById("passInput").value.trim();
//     const message_P = document.getElementById("message_P");

//     if(!emailInput || !passwordInput){
//         message_P.textContent = "Fill all the fields";
//         return;
//     }

//     if(passwordInput.length < 6){
//         message_P.textContent = "Password length must be atleast 6+ characters"
//         return;
//     }

//     signUpBtn.disabled = true
//     signUpBtn.innerHTML = `
//         <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
//         <span role="status">Signing Up...</span>
//     `;

//     const { error } = await supabaseClient.auth.signUp({
//     email: emailInput,
//     password: passwordInput,
//     });

//     if(error) {
//         signUpBtn.disabled = false;
//         signUpBtn.innerHTML = `<i class="fas fa-user-plus"></i> Sign Up
//         `;
//         console.error(error.message);
//         return;
//     }

//     const { error: dbError } = await supabaseClient
//     .from("codingNightUser")
//     .insert({
//         email: emailInput,
//     });

//     if(dbError) {
//         signUpBtn.disabled = false;
//         signUpBtn.innerHTML = `
//         <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
//         <span role="status">Signing In...</span>
//         `;
//         console.error(dbError.message);
//         return;
//     }

//     window.location.href = "../Login/login.html";
// });


