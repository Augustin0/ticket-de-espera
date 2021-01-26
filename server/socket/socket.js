const { io } = require("../init");
const { Controll_tickets } = require("../control_tickets/control_tickets");
let ticketManager = new Controll_tickets();

io.on("connection", (user) => {


    user.on("nextTicket", (calback) => {
        let info = ticketManager.siguiente();
        calback(info)
        console.log(info);

    });


    user.broadcast.emit("estadoActual", { ultimoTiket: ticketManager.getEstado(), ultimos4: ticketManager.getUltimos4() });

    user.on("atender", (escritorio, calback) => {
        if (!escritorio) return calback({ error: true, message: 'El escritorio es obligatorio' });
        let message = ticketManager.atender(escritorio);
        user.broadcast.emit("estadoActual", { ultimoTiket: ticketManager.getEstado(), ultimos4: ticketManager.getUltimos4() });

        calback({ error: false, message })
    });


})