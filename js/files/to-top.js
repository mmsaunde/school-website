let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");

    let pos = document.documentElement.scrollTop || document.body.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);

    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }

    scrollProgress.addEventListener("click", () => {
        // document.documentElement.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    scrollProgress.style.background = `conic-gradient(#cd212a ${scrollValue}%, #808080 ${scrollValue}%)`;
};
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// let calcScrollValue = () => {
//     let scrollProgress = document.getElementById("progress");
//     let progressValue = document.getElementById("progress-value");
//     let navbar = document.querySelector("nav");

//     let pos = document.documentElement.scrollTop || document.body.scrollTop;
//     let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//     let scrollValue = Math.round((pos * 100) / calcHeight);

//     // Handle progress visibility
//     if (pos > 100) {
//         scrollProgress.style.display = "grid";
//     } else {
//         scrollProgress.style.display = "none";
//     }

//     // Click to scroll back to top
//     scrollProgress.addEventListener("click", () => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     });

//     // Update progress bar color
//     scrollProgress.style.background = `conic-gradient(#cd212a ${scrollValue}%, #808080 ${scrollValue}%)`;

//     // Handle navigation opacity
//     if (pos > 50) {
//         navbar.classList.add("scrolled");
//     } else {
//         navbar.classList.remove("scrolled");
//     }
// };

// // Run on scroll and page load
// window.onscroll = calcScrollValue;
// window.onload = calcScrollValue;
