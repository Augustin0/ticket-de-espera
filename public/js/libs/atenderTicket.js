var socketIo = io();
let params = new URLSearchParams(window.location.search);
if (!params.has("escritorio")) {
    window.location = "index.html"
    throw new Error("El escritorio es obligatorio");
}
let escritorio = params.get("escritorio");
document.getElementById("title").innerText = "Escritorio " + escritorio;
document.getElementById("next").addEventListener("click", () => {
    socketIo.emit("atender", escritorio, (data) => {
        if (!data.error) {
            document.getElementById("ticket").innerText = data.message
        } else {
            window.location = "index.html"

        }
    })
})