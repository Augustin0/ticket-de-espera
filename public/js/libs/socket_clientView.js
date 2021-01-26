var socketIo = io();
const elementId = (id) => {
    return document.getElementById(id);

};
const addHtmlText = (id, data) => {
    elementId(id).innerText = data


};

socketIo.on("estadoActual", (data) => {
    let audio = new Audio("../../audio/new-ticket.mp3");
    audio.play().then(() => {

        addHtmlText("lblTicket1", `Ticket ${data.ultimos4[0].numero}`)
        addHtmlText("lblEscritorio1", `Escritorio ${data.ultimos4[0].escritorio}`)
        addHtmlText("lblTicket2", `Ticket ${data.ultimos4[1].numero}`)
        addHtmlText("lblEscritorio2", `Escritorio ${data.ultimos4[1].escritorio}`)
        addHtmlText("lblTicket3", `Ticket ${data.ultimos4[2].numero}`)
        addHtmlText("lblEscritorio3", `Escritorio ${data.ultimos4[2].escritorio}`)
        addHtmlText("lblTicket4", `Ticket ${data.ultimos4[3].numero}`)
        addHtmlText("lblEscritorio4", `Escritorio ${data.ultimos4[3].escritorio}`)
    })
})