
import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages.js";
import { Game } from "./Game.js";

export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);

        socket.on("close", () => {
            this.removeUser(socket);
        });
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);

        // clear pending user if they leave
        if (this.pendingUser === socket) {
            this.pendingUser = null;
        }

        // remove game if player leaves
        this.games = this.games.filter(game => {
            if (game.player1 === socket || game.player2 === socket) {
                return false;
            }
            return true;
        });
    }

    private addHandler(socket: WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());

            console.log("Received:", message);

            // 🎯 Matchmaking
            if (message.type === INIT_GAME) {
                if(this.pendingUser){
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }else{
                    this.pendingUser = socket;
                }
                //this.handleMatchmaking(socket);
            }

            // ♟️ Moves
            if (message.type === MOVE) {
                const game = this.games.find(
                    g => g.player1 === socket || g.player2 === socket
                );

                if (game) {
                    game.makeMove(socket, message.move);
                }
            }
        });
    }

    private handleMatchmaking(socket: WebSocket) {
        // prevent self-match
        if (this.pendingUser && this.pendingUser !== socket) {
            const game = new Game(this.pendingUser, socket);
            this.games.push(game);

            this.pendingUser = null;
        } else {
            this.pendingUser = socket;

            socket.send(JSON.stringify({
                type: "WAITING"
            }));
        }
    }
}