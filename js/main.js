// on page load
window.onload = function() {
    if(localStorage.getItem("theme") == "dark") {
        document.getElementById("body").className = "dark";
        document.getElementById("dark_light").innerHTML = "🌞";
    }
    else {
        document.getElementById("body").className = "light";
        document.getElementById("dark_light").innerHTML = "🌛";
    }
}

function toggleDarkLight() {
    var body = document.getElementById("body");
    var currentClass = body.className;
    body.className = currentClass == "dark" ? "light" : "dark";
    // document.getElementsByClassName("text")[0].className = currentClass == "dark" ? "text light" : "text dark";
    // document.getElementsByClassName("point")[0].className = currentClass == "dark" ? "point light" : "point dark";
    localStorage.setItem("theme", body.className);
    // change button text
    var button = document.getElementById("dark_light");
    button.innerHTML = currentClass == "dark" ? "🌛" : "🌞";
  }