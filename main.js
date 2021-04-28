import "./sass/style.scss";
import { headers } from "./settings.js";

const formOne = document.querySelector("#form-1");
const formTwo = document.querySelector("#form-2");
window.addEventListener("DOMContentLoaded", init);

function post(data) {
  const postData = JSON.stringify(data);
  fetch("https://ezone-43a6.restdb.io/rest/form", {
    method: "post",
    headers: headers,
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function init() {
  document.querySelector("#join-button").addEventListener("click", displayForm);
}

function displayForm() {
  document.querySelector("#sign-up-form").classList.remove("hidden");
  document.querySelector("#join-button").classList.add("hidden");
  document.querySelector("#landing-page").classList.add("blurred");
  
  document.querySelector("#next").classList.remove("hidden");
  document.querySelector("#close-1").addEventListener("click", closeForm);
  document.querySelector("#close-2").addEventListener("click", closeForm);
  document.querySelector("#close-3").addEventListener("click", closeForm);
  document.querySelector("#next").addEventListener("click", validateForm);
  document.querySelector("#back").addEventListener("click", backToPrevious);
  document.querySelector("#previous").addEventListener("click", backToPrevious);
}

//auto-fill for google 




function validateForm() {
  if (!formOne.elements.name.checkValidity()) {
    document.querySelector("#error-2").classList.add("hidden");
    document.querySelector("#error-1").classList.remove("hidden");
  } else if (!formOne.elements.email.checkValidity()) {
    document.querySelector("#error-1").classList.add("hidden");
    document.querySelector("#error-2").classList.remove("hidden");
  } else {
    document.querySelector("#form-one").classList.add("hidden");
    document.querySelector("#form-two").classList.remove("hidden");
    document.querySelector("#submit").classList.remove("hidden");
  }
}

//cosing function
function closeForm() {
  document.querySelector("#sign-up-form").classList.add("hidden");
  document.querySelector("#join-button").classList.remove("hidden");
  document.querySelector("#landing-page").classList.remove("blurred");
  location.reload();
}


//back button funcion
function backToPrevious() {
  document.querySelector("#form-one").classList.remove("hidden");
  document.querySelector("#form-two").classList.add("hidden");
}


//submit
document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();

  if (formOne.checkValidity()) {
    //interest
    const interests = [];
    const interestsEls = document.querySelectorAll("[name=interests]:checked");
    interestsEls.forEach((el) => interests.push(el.value));
//genre
    const genre = [];
    const genreEls = document.querySelectorAll("[name=genre]:checked");
    genreEls.forEach((el) => genre.push(el.value));

    //games
    const games = [];
    const gamesEls = document.querySelectorAll("[name=games]:checked");
    gamesEls.forEach((el) => games.push(el.value));

    post({
      name: formOne.elements.name.value,
      email: formOne.elements.email.value,
      region: formOne.elements.region.value,
      age:formOne.elements.age.value,
      genre:genre,
      interests: interests,
      games:games,
     
    });
  
    document.querySelector("#form-two").classList.add("hidden");
    document.querySelector("#form-three").classList.remove("hidden");
  }
});
formOne.setAttribute("novalidate", true);
formTwo.setAttribute("novalidate", true);

