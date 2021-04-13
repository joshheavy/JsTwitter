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

    // send tweets to database
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
          time: myTimeStamp,
        })
        .then(() => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Pull all the tweets
    firebase.firestore().collection("posts").get()
      .then((querySnapshot) => {

        var content = "";

        querySnapshot.forEach((doc) => {
          var thePost = doc.data().posts;
          var theUserId = doc.data().UserId;
          var thetime = doc.data().time;

          content += '<div class="tweet-header">';
          content += '<span class="fullname">';
          content += "<strong>Jon Vadillo</strong>";
          content += "</span>";
          content += '<span class="username">@JonVadillo</span>';
          content += '<span class="tweet-time">- ' + thetime + "</span>";
          content += "</div>";
          content += "<a>";
          content += '<img class="tweet-card-avatar"';
          content +=
            'src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg"';
          content += 'alt="">';
          content += "</a>";
          content += '<div class="tweet-text">';
          content +=
            '<p class="" lang="es" data-aria-label-part="0">' +thePost +"<br>Resuelto:";
          content += "Corregido – ";
          content +=
            "Una breve historia sobre un error reportado por la comunidad <a";
          content +=
            'href="https://t.co/dqg5hVQXA0" class="twitter-timeline-link"';
          content +=
            'target="_blank"><span class="">https://www.mozilla-hispano.org/</span></a> <a';
          content +=
            'href="" class="twitter-hashtag"><s>#</s><b>firefox</b></a> <a href=""';
          content += 'class="twitter-hashtag"><s>#</s><b>comunidad</b></a>';
          content += '<a href="" class="twitter-hashtag" dir="ltr"></a>';
          content += "</p>";
          content += "</div>";
          content += '<div class="tweet-footer">';
          content += '<a class="tweet-footer-btn">';
          content +=
            '<i class="octicon octicon-comment" aria-hidden="true"></i><span> 18</span>';
          content += "</a>";
          content += '<a class="tweet-footer-btn">';
          content +=
            '<i class="octicon octicon-sync" aria-hidden="true"></i><span> 64</span>';
          content += "</a>";
          content += '<a class="tweet-footer-btn">';
          content +=
            '<i class="octicon octicon-heart" aria-hidden="true"></i><span> 202</span>';
          content += "</a>";
          content += '<a class="tweet-footer-btn">';
          content +=
            '<i class="octicon octicon-mail" aria-hidden="true"></i><span> 155</span>';
          content += "</a>";
          content += "</div>";
        });

        $("#tweets").append(content);
      })
      .catch((error) => {
        console.log(error)
      });
  } else {
    // No user is signed in.
  }
});
