document.getElementById("login").onclick = function () {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      window.location.href = "index.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
};
