const socket = io();

//Elements
const form = document.querySelector("#form");
const formInput = document.querySelector("#formInput");
const shareLocBtn = document.querySelector("#shareLocationBtn");
const messages = document.querySelector("#messages");
const sidebar = document.querySelector("#sidebar")

//Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector("#location-message-template").innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

//Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

socket.on("message", (message) => {
  const messageObj = {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  };

  const html = Mustache.render(messageTemplate, messageObj);
  messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (locationMessage) => {
  const html = Mustache.render(locationMessageTemplate, {
    username: locationMessage.username,
    url: locationMessage.url,
    createdAt: moment(locationMessage.createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate,{
    room,
    users
  })
  sidebar.innerHTML = html
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  form.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;

  socket.emit("message", message, (error) => {
    form.removeAttribute("disabled");
    formInput.value = "";
    formInput.focus();

    if (error) return console.log(error);
  });
});

shareLocBtn.addEventListener("click", () => {
  if (!navigator.geolocation) return alert("Geolocation not available");

  shareLocBtn.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((pos) => {
    const { longitude, latitude } = pos.coords;

    socket.emit("locationMessage", { longitude, latitude }, () => {
      shareLocBtn.removeAttribute("disabled");
    });
  });
});
