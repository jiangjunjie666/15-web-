const links = document.querySelectorAll(".buttons a");
const recommend = document.getElementById("recommend");
const all = document.getElementById("all");
const about = document.getElementById("about");

// 实现tab切换效果
links.forEach((link, index) => {
  link.addEventListener("click", () => {
    if (index === 0) {
      recommend.style.display = "block";
      all.style.display = "none";
      about.style.display = "none";
    } else if (index === 1) {
      all.style.display = "block";
      recommend.style.display = "none";
      about.style.display = "none";
    } else {
      all.style.display = "none";
      recommend.style.display = "none";
      about.style.display = "block";
    }
    link.classList.add("active");
    links.forEach((link, i) => index !== i && link.classList.remove("active"));
  });
});
