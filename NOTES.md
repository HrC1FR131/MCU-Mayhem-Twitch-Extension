# NOTES

- We're developing a component extension; it displays as part of the video and takes up part of the screen, but can be hidden by viewers
- ?platform=mobile and ?platform=web
- <script src="https://extension-files.twitch.tv/helper/v1/twitch-ext.min.js"></script>; all extensions must import this
- Each extension has a shared secret used to sign and verify JSON web tokens
  - Both the EBS (external backend service) and Twitch create JWTs
  - EBS signs and creates the with the external role to perform API actions
  - Twitch creates them with other roles so EBS can perform user auth
- 30 requests per minute PER EXTENSION VIEWER; we'll be fine

## TWITCH API IN THE FRONT END

- window.Twitch.ext.onAuthorized(function(auth) {
  console.log('The Helix JWT is ', auth.helixToken);
  });

## LOCAL TESTING

- https://dev.twitch.tv/docs/extensions/life-cycle/
-
