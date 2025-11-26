const postButton = document.getElementById("postButton");

const uploadPost = () => {
    const userNameInput = document.getElementById("userName").value.trim();
    const postText = document.getElementById("postText").value.trim();

    if(!userNameInput || !postText){
        alert("Fill all fields");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("post")) ||  [];

    const newPost = {
        id: Date.now(),
        postText: postText,
        postAuthor: userNameInput,
        like: 0,
        createdAt: new Date().toISOString()
    };

    posts.push(newPost);
    
    localStorage.setItem("post", JSON.stringify(posts));
}

postButton.addEventListener("click", uploadPost);