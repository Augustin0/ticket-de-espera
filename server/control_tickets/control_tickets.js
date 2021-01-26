const { writeSync, writeFileSync } = require("fs");
const { resolve } = require("path");
class Tickets {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio
    }
};
class Controll_tickets {
    constructor() {
        this.ultimo_atendido = 0;
        this.fecha_actual = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        let Database = require("../DATABASE/data.json")
        if (this.fecha_actual === Database.fecha_actual) {
            this.ultimo_atendido = Database.ultimo_atendido;
            this.tickets = Database.tickets;
            this.ultimos4 = Database.ultimos4;

        } else {
            this.iniciarNuevoDia();
        }

    };

    iniciarNuevoDia() {
        this.ultimo_atendido = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.saveData();
    };

    siguiente() {

        this.ultimo_atendido += 1;
        this.tickets.push(new Tickets(this.ultimo_atendido, null))
        this.saveData();
        return `Atendiendo al ticket  N° ${this.ultimo_atendido}`;

    };
    getEstado() {
        return `Atendiendo al ticket  N° ${this.ultimo_atendido}`;
    }
    getUltimos4() {
        return this.ultimos4
    }
    atender(escritorio) {
        if (this.tickets.length == 0) return "No hay pendiente"
        let tiket = this.tickets[0].numero;
        this.tickets.shift();
        this.ultimos4.unshift(new Tickets(tiket, escritorio));

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
            console.log(this.ultimos4);
        }

        this.saveData();
        return `${tiket}`
    }

    saveData() {
        let dia = {
            ultimo_atendido: this.ultimo_atendido,
            fecha_actual: this.fecha_actual,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        };
        let dataString = JSON.stringify(dia);
        let database = resolve(__dirname, "../DATABASE/data.json");
        writeFileSync(database, dataString);
    };

};

module.exports = {
    Controll_tickets
}