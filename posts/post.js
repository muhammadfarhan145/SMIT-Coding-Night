const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser) {
    window.location.href = "../index.html";
}

function getPosts(sortBy = "latest") {
    const feedCol = document.getElementById("feedCol");
    let posts = JSON.parse(localStorage.getItem("post")) || [];

    if (sortBy === "latest") {
        posts.sort((a, b) => b.id - a.id);
    }

    if (sortBy === "oldest") {
        posts.sort((a, b) => a.id - b.id);
    }

    if (sortBy === "mostLiked") {
        posts.sort((a, b) => b.like - a.like);
    }

    feedCol.innerHTML = "";

    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.dataset.id = post.id;
        postDiv.innerHTML = `
            <div class="postCaption_IconsDiv">
                <p class="postCaption">${post.postText}</p>
                <div class="postIcons">
                    <i class="fa-regular fa-heart fa-xl likeBtn ${post.liked ? 'liked' : ''}"></i><span class="counter">${post.like}</span>
                    <i class="fa-regular fa-comment fa-xl"></i>
                    <i class="fa-regular fa-paper-plane fa-xl"></i>
                </div>
            </div>
            <div class="authorData">
                <div>
                    <div class="userImg_Name">
                        <img src="../Assets//Profile_pic2.png" class="authorImg" />
                        <p>${post.postAuthor}</p>
                    </div>
                    <i class="fa-solid fa-trash fa-lg deleteBtn"></i>
                </div>
            </div>
        `;

        feedCol.appendChild(postDiv)
    });
}

getPosts();

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        const postId = e.target.closest(".post").dataset.id;

        let posts = JSON.parse(localStorage.getItem("post")) || [];
        posts = posts.filter(p => p.id != postId);

        localStorage.setItem("post", JSON.stringify(posts));
        getPosts();
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("likeBtn")) {
        const postId = e.target.closest(".post").dataset.id;

        let posts = JSON.parse(localStorage.getItem("post")) || [];
        let post = posts.find(p => p.id == postId);

        post.liked = !post.liked;

        if (post.liked) {
            post.like++;
        } else {
            post.like--;
        }

        localStorage.setItem("post", JSON.stringify(posts));
        getPosts();
    }
});



document.getElementById("latestTab").addEventListener("click", () => {
    getPosts("latest");
});

document.getElementById("mostLikedTab").addEventListener("click", () => {
    getPosts("mostLiked");
});

document.getElementById("oldestTab").addEventListener("click", () => {
    getPosts("oldest");
});
