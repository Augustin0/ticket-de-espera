var socketIo = io();

const elementId = (id) => {
    return document.getElementById(id);

}
let messsageBox = elementId("lblNuevoTicket")
socketIo.on("connect", () => {
    console.log("Conectado al server");
});
socketIo.on("disconnect", () => {
    console.log("Desconectado al server");
});

elementId("next").addEventListener("click", () => {
    socketIo.emit("nextTicket", (message) => {
        console.log(message);
        messsageBox.innerText = message

    })

});

socketIo.on("estadoActual", (data) => {
    messsageBox.innerText = data.ultimoTiket;

})