const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(currentUser) {
    window.location.href = "./posts/posts.html";
}

const signInBtn = document.getElementById("signInBtn");
const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("emailInput").value.trim();
    const passwordInput = document.getElementById("passInput").value.trim();
    const message_P = document.getElementById("message_P");

    if(!emailInput || !passwordInput){
        message_P.textContent = "Fill all the fields";
        return;
    }

    if(passwordInput.length < 6){
        message_P.textContent = "Password length must be atleast 6+ characters"
        return;
    }

    signInBtn.disabled = true
    signInBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Logging In...</span>
    `;     

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === emailInput && u.password === passwordInput);

    if(user) { 
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "./posts/posts.html";
    } 
    else {
        signInBtn.disabled = false;
        signInBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i> Sign In
        `;
        message_P.textContent = "Invalid email or password or user doesn't exists";
        return;
    }
});


// const supabaseClient = supabase.createClient("https://queftwxqyuinynpsixqa.supabase.co",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZWZ0d3hxeXVpbnlucHNpeHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTQ5NDEsImV4cCI6MjA3NTQ5MDk0MX0.TWex1aIXHoopzD9q1LR2hOt6hsBY6JN3aAtaXpvM5hc"
// );


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

//     signInBtn.disabled = true
//     signInBtn.innerHTML = `
//         <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
//         <span role="status">Logging In...</span>
//     `; 

//     const { error } = await supabaseClient.auth.signInWithPassword({
//         email: emailInput,
//         password: passwordInput,
//     });

//     if(error) {
//         console.error(error.message);
//         message_P.textContent = error.message;
//         signInBtn.disabled = false;
//         signInBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i> Sign In
//         `;
//         return;
//     }

//     signInBtn.innerHTML = `
//       <i class="fas fa-check text-success"></i> Success!
//     `;
//     setTimeout(() => {
//       window.location.href = "../index.html";
//     }, 800);
// })

