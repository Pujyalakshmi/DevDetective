//Variables
const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style; /* document.documentElement returns the <html> element. */
const get = (param) => document.getElementById(`${param}`);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;

// Event Listeners
btnsubmit.addEventListener("click", function () {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
});

input.addEventListener(
  "keydown",
  function (e) {
    if (e.key == "Enter") {
      if (input.value !== "") {
        getUserData(url + input.value);
      }
    }
  },
  false
);

input.addEventListener("input", function () {
  noresults.style.display = "none";
});

btnmode.addEventListener("click", function () {
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

// Functions

//API CALL
function getUserData(gitUrl) {
  fetch(gitUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updateProfile(data);
    })
    .catch((error) => {
      throw error;
    });
}


//RENDER
function updateProfile(data) {
  if (data.message !== "Not Found") {
    noresults.style.display = "none";
    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }
    avatar.src = `${data.avatar_url}`;
    userName.innerText = data.name === null ? data.login : data.name;
    user.innerText = `@${data.login}`;
    user.href = `${data.html_url}`;
    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  } else {
    noresults.style.display = "block";
  }
}



//SWITCH TO DARK MODE - activateDarkMode()
function darkModeProperties() {
  root.setProperty("--lm-bg", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  darkMode = true;
  console.log("darkmode changed to " + darkMode);
  localStorage.setItem("dark-mode", true);  
  console.log("setting dark mode to true");

}

//SWITCH TO LIGHT MODE - activateLightMode()
function lightModeProperties() {
  root.setProperty("--lm-bg", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  darkMode = false;
  console.log("darkmode changed to " + darkMode);

  localStorage.setItem("dark-mode", false);
  console.log("setting dark mode to false");
}


//INITIALISE UI
function init() {
  //initialise dark-mode variable to false;
  //darkMode = true -> dark mode enable karna h 
  //darMode = false -> light mode enable karna h 
  darkMode = false;

  //HW
// const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const value = localStorage.getItem("dark-mode");

  if(value === null) {
    console.log("null k andar");
    localStorage.setItem("dark-mode", darkMode);
    lightModeProperties();
  }
  else if(value == "true") {
    console.log("truer k andar");
    darkModeProperties();
  }
  else if(value == "false") {
    console.log("false k andar");
    lightModeProperties();
  }


  //by default, eddiejaoude ki info show krre h UI pr
  getUserData(url + "eddiejaoude");
}

init();

//line 92 explanation
/*
data.created_at: This likely represents a timestamp or date string stored in the data object. The format of this date string should be something like "YYYY-MM-DDTHH:MM:SS" (ISO 8601 format), where "T" separates the date and time components.

.split("T"): This part of the code uses the JavaScript split() method to split the data.created_at string into an array of two elements. The "T" character is used as the separator. After this operation, you'll have an array like this: ["YYYY-MM-DD", "HH:MM:SS"].

.shift(): The shift() method is then called on the resulting array. This method removes and returns the first element of an array, which, in this case, is "YYYY-MM-DD." So, after this operation, you'll have "YYYY-MM-DD" as a string.

.split("-"): Finally, another split() operation is performed on the "YYYY-MM-DD" string, this time using the "-" character as the separator. This splits the string into an array of its components, representing the year, month, and day. After this operation, you'll have an array like this: ["YYYY", "MM", "DD"].
*/

//line 79 code explanation
/* 
This function is designed to be used when you want to validate param1 for null or empty string and take specific styling actions on param2 and its previous sibling element based on the result of the validation
*/