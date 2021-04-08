firebase.auth().onAuthStateChanged(function (user) {
    // User is signed in.
    console.log(user);
  if (user) {
      document.getElementById("logout").onclick = function () {
        firebase
          .auth()
          .signOut()
          .then(function () {
            window.location.href = "login.html";
          })
          .catch((error) => {
            console.log(error);
          });
      };

      document.getElementById("sendTweet").onclick = function () {
        var sendTweet = document.getElementById("message-text").value;
        var myTimeStamp = firebase.firestore.Timestamp.fromDate(new Date());
          firebase
            .firestore()
            .collection("posts")
            .doc()
            .set({
              userId: user.uid,
              posts: sendTweet,
              time: myTimeStamp
            })
            .then(() => {
              window.location.href = "index.html";
            })
            .catch((error) => {
              console.log(error);
            });
      }
  } else {
    // No user is signed in.
  }
});

