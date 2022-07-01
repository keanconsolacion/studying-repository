const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit("message", message, (error) => {
    //Event acknowledgements
    if(error) return console.log(error); 
    console.log("Message delivered.");
  });
});

socket.on("sendLocation", (location) => {
  console.log(location);
})

document.querySelector("#shareLocationBtn").addEventListener("click", () => {
  if (!navigator.geolocation) return alert("Geolocation not available");

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { longitude, latitude } = pos.coords;
      socket.emit("sendLocation", { longitude, latitude }, () => {
        console.log("Location shared!");
      });
    },
    (err) => {
      alert(err.message);
    }
  );
});
