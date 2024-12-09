let uName = document.querySelector(".name");
let uEmail = document.querySelector(".new_email");
let uPass = document.querySelector(".new_pass");
let logEmail = document.querySelector(".log_Email");
let logPass = document.querySelector(".log_Pass");
let dataContainer = [];

if (localStorage.getItem("storageData") != null) {
  dataContainer = JSON.parse(localStorage.getItem("storageData"));
}
function dataCollected() {
  let signUpData = {
    userName: uName.value,
    userEmail: uEmail.value.toLowerCase(),
    userPass: uPass.value.toLowerCase(),
  };
  for (var i = 0; i < dataContainer.length; i++) {
    if (
      signUpData.userName === dataContainer[i].userName &&
      signUpData.userEmail === dataContainer[i].userEmail &&
      signUpData.userPass === dataContainer[i].userPass
    ) {
      swal("❌👨🏾‍💻", "Data is Duplicated, please Try Again 🔄️", {
        icon: "warning",
      });
      uName.value = "";
      uEmail.value = "";
      uPass.value = "";
      return;
    }
  }
  if (signUpData.userName && signUpData.userEmail && signUpData.userPass) {
    dataContainer.push(signUpData);
    localStorage.setItem("storageData", JSON.stringify(dataContainer));
    uName.value = "";
    uEmail.value = "";
    uPass.value = "";
    swal("Congratulations 🥳❤️", "You Created Your Email 👨🏾‍💻", "success");
  } else {
    document.querySelector("#log_mas").classList.replace("d-none", "d-block");
  }
}

function checker(ele) {
  let regex={
    log
  }
  for (let i = 0; i < dataContainer.length; i++) {
    if (
      logEmail.value.toLowerCase() === dataContainer[i].userEmail &&
      logPass.value === dataContainer[i].userPass
    ) {
      ele.classList.add("is-valid");
      ele.classList.remove("is-invalid");
      localStorage.setItem("loginUser", JSON.stringify(dataContainer[i]));
      document.querySelector("#login").setAttribute("href", "./home.html");
      document
        .querySelector("#wrong_mas")
        .classList.replace("d-block", "d-none");
      return;
    } else {
      ele.classList.add("is-invalid");
      ele.classList.remove("is-valid");
      document.querySelector("#login").removeAttribute("href", "./home.html");
      document
        .querySelector("#wrong_mas")
        .classList.replace("d-none", "d-block");
    }
  }
}

function loginData() {
  if (logEmail.value == "" || logPass.value == "") {
    document.querySelector("#log_mas").classList.replace("d-none", "d-block");
  } else {
    document.querySelector("#log_mas").classList.replace("d-block", "d-none");
  }
}
(function () {
  const uPage = JSON.parse(localStorage.getItem("loginUser"));
  let yPage = ``;
  for (let i = 0; i < dataContainer.length; i++) {
    yPage = `<div class="container d-flex justify-content-center align-items-center">
    <div class="card rounded-0 w-50 position-absolute top-50">
    <h1 class="text-info text-opacity-75 d-flex justify-content-center align-items-center pt-5 pb-5">Welcome ${uPage.userName}</h1>
    </div>
    </div>`;
    document.querySelector("#homePage").innerHTML = yPage;
  }
})();

function logout() {
  swal({
    title: "Are you sure you want to log out?🥺💔",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willLogout) => {
    if (willLogout) {
      localStorage.removeItem("loginUser");
      window.location.href = "./index.html";
    }else{
      swal({title:"You Are Still Here Awesome 🥳❤️"});
    }
  });
}

