firebase.auth().onAuthStateChanged(function (user) {

    if (user) {

        console.log(user)
        //signed in user
        document.getElementById("sendTweets").onclick = function () {
            var sendTweets = document.getElementById("message-text").value;
            var myTimeStamp = firebase.firestore.Timestamp.fromDate(new Date());
        
            firebase.firestore().collection("posts").doc().set({
                userId: user.uid,
                posts: sendTweets,
                time: myTimeStamp,
            }).then(() => {
                window.location.href = "home.html";
            }).catch(function (error) {
                console.log(error);
            })
        }
    } else {
        //user signed out
    }
    

    // Pulling all posts data from firestore
    firebase.firestore().collection("posts").get()
        .then((querySnapshot) => {
            var content = "";

            querySnapshot.forEach((doc) => {
                var thePost = doc.data().posts;
                var theUserId = doc.data().UserId;
                var thetime = doc.data().time;
                // var theDate = thetime.toDate().toDateString();
                // var thedate2 = doc.data().dateAdded;

                // console.log(theDate);

                firebase.firestore().collection("users").where().get()
                    .then((querySnapshot) => {

                        querySnapshot.forEach((doc) => {
                            var theUsersId = doc.data().UserId;
                            var username = user.Username;
                            console.log("Username logged in is:", username);

                            console.log("The Users Ids is:", theUsersId);

                            if (theUserId == theUsersId) {
                                console.log(user.Username);
                            } else {
                                console.log("Logged in user is: ", user.Username);
                            }
                        });
                    }).catch((error) => {
                        
                    });

                content += '<div class="tweet-header">'
                    content += '<span class="fullname">'
                        content += '<strong>Jon Vadillo</strong>'
                    content += '</span>'
                    content += '<span class="username">@JonVadillo</span>'
                    content += '<span class="tweet-time">- '+ thetime +'</span>'
                content += '</div>'
                content += '<a>'
                    content += '<img class="tweet-card-avatar"'
                        content += 'src="https://pbs.twimg.com/profile_images/679974972278849537/bzzb-6H4_bigger.jpg"'
                    content += 'alt="">'
                content += '</a>'
                content += '<div class="tweet-text">'
                    content += '<p class="" lang="es" data-aria-label-part="0">'+ thePost +'<br>Resuelto:'
                        content += 'Corregido – '
                        content += 'Una breve historia sobre un error reportado por la comunidad <a'
                        content += 'href="https://t.co/dqg5hVQXA0" class="twitter-timeline-link"'
                        content += 'target="_blank"><span class="">https://www.mozilla-hispano.org/</span></a> <a'
                        content += 'href="" class="twitter-hashtag"><s>#</s><b>firefox</b></a> <a href=""'
                        content += 'class="twitter-hashtag"><s>#</s><b>comunidad</b></a>'
                        content += '<a href="" class="twitter-hashtag" dir="ltr"></a>'
                    content += '</p>'
                content += '</div>'
                content += '<div class="tweet-footer">'
                    content += '<a class="tweet-footer-btn">'
                        content += '<i class="octicon octicon-comment" aria-hidden="true"></i><span> 18</span>'
                    content += '</a>'
                    content += '<a class="tweet-footer-btn">'
                        content += '<i class="octicon octicon-sync" aria-hidden="true"></i><span> 64</span>'
                    content += '</a>'
                    content += '<a class="tweet-footer-btn">'
                        content += '<i class="octicon octicon-heart" aria-hidden="true"></i><span> 202</span>'
                    content += '</a>'
                    content += '<a class="tweet-footer-btn">'
                        content += '<i class="octicon octicon-mail" aria-hidden="true"></i><span> 155</span>'
                    content += '</a>'
                content += '</div>'
            });

            $('#posts').append(content);

        }).catch(() => { });
});
