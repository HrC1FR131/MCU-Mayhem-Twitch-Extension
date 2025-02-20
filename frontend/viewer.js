twitch.onAuthorized(function (auth) {
  // save our credentials
  token = auth.token;
  tuid = auth.userId;
  // enable the button
  $("#cycle").removeAttr("disabled");
  setAuth(token);
  $.ajax(requests.get);
});
