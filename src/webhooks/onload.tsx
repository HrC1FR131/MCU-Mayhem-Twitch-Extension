import { BACKEND } from "../utils";
// import dotenv from "dotenv";
// dotenv.config({ path: "../../.env" });
declare global {
  interface Window {
    Twitch: any;
  }
}

export let username: string;

// On loading of the extension, get the user's username and store the info in the database
// Can run at any time during the application
interface Auth {
  token: string;
  channelId: string;
  clientId: string;
  userId: string;
}

function createUserAccount(name: string) {
  const formData = new FormData();
  formData.append("username", name);

  fetch(BACKEND + "/create_player", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("User account created successfully");
      } else {
        console.error("Error creating user account:", response.statusText);
      }
    })
    .catch((err) => {
      console.error("Error sending data to backend:", err);
    });
}

window.Twitch.ext.onAuthorized(function (auth: Auth) {
  const oauthToken = auth.token;

  const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID; // Replace with your Twitch client ID
  fetch("https://api.twitch.tv/helix/users", {
    method: "GET",
    headers: {
      "Client-ID": clientId!,
      Authorization: `Bearer ${oauthToken}`,
    },
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.data && data.data.length > 0) {
        const username = data.data[0].login; // Twitch username
        console.log("Fetched username:", username);

        // Send the username to your backend to create the user account
        createUserAccount(username);
      } else {
        console.error("Error fetching Twitch user data:", data);
      }
    })
    .catch((err) => {
      console.error("Error fetching user info:", err);
    });
});

// testing bypass function
// export function addUser() {
//   username = "user" + Math.floor(Math.random() * 10000).toString();
//   console.log("Adding user:", username);
//   const formData = new FormData();
//   formData.append("username", username);

//   fetch(BACKEND + "/create_player", {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("User added:", data);
//     })
//     .catch((error) => {
//       console.error("Error adding user:", error);
//     });
// }
