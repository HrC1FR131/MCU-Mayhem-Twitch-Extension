// // On loading of the extension, get the user's username and store the info in the database
// window.Twitch.ext.onAuthorized(function (auth) {
//   console.log("The JWT that will be passed to the EBS is", auth.token);
//   console.log("The channel ID is", auth.channelId);
// });

import { BACKEND } from "../utils";

// // Get username from user id
// getUsername;

// I need to write a bypass;
// something where the user's username will still get added to the database and the connection will be made
// even if a twitch connection doesn't occur
export let username: string = "Player1";
export function addUser() {
  username = "user" + Math.floor(Math.random() * 10000).toString();
  console.log("Adding user:", username);
  const formData = new FormData();
  formData.append("username", username);

  fetch(BACKEND + "/create_player", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("User added:", data);
    })
    .catch((error) => {
      console.error("Error adding user:", error);
    });
}
