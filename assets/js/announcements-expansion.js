
var announcements = document.getElementsByClassName("announcement-expand");
var i;

for (i = 0; i < announcements.length; i++) {
    announcements[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.parentElement.parentElement.nextElementSibling;
    if (content.style.display == "" ) {
        content.style.display = "block";
        this.innerHTML = "Show less <<";
    } else {
        content.style.display = "";
        this.innerHTML = "Read more >>";
    }
  });
}
