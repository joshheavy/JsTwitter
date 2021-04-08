document.getElementById("register").onclick = function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var fullName = document.getElementById("fullName").value;
    var country = document.getElementById("country").value;

    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(userCredential){
        //Sign in a user
        var user = userCredential.user;

        firebase.firestore().collection("users").doc().set({
            Username: fullName,
            UserId: user.uid,
            Email: email,
            Password: password,
            Country: country
        }).then(function(){
            window.location.href = "index.html";
        }).catch((error) => {
            console.log(error);
        })
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });

}