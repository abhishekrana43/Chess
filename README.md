# ♟️ Real-Time Chess Server (WebSocket)

A real-time multiplayer chess server built using **Node.js**, **WebSockets**, and **chess.js**.
This project allows two players to connect, get matched automatically, and play chess in real time.

---

## 🚀 Features

* 🔌 WebSocket-based real-time communication
* ♟️ Automatic matchmaking (1v1)
* 🎯 Turn-based move validation
* 🧠 Powered by `chess.js` for game rules
* 🏁 Game over detection
* 👥 Multi-user support

---

## 📁 Project Structure

```
.
├── GameManager.ts   # Handles users, matchmaking, and games
├── Game.ts          # Game logic and move validation
├── messages.js      # Message type constants
├── server.ts        # WebSocket server entry point (if applicable)
```

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/chess-server.git

# Go into the project
cd chess-server

# Install dependencies
npm install
```

---

## ▶️ Running the Server

```bash
npm run dev
```

or

```bash
node dist/server.js
```

---

## 🔌 WebSocket API

### 1. Start Game

Client sends:

```json
{
  "type": "init_game"
}
```

### 2. Server Responses

#### Waiting for opponent

```json
{
  "type": "WAITING"
}
```

#### Game started

```json
{
  "type": "game_start",
  "payload": {
    "color": "white" // or "black"
  }
}
```

---

### 3. Make Move

Client sends:

```json
{
  "type": "move",
  "payload": {
    "from": "e2",
    "to": "e4"
  }
}
```

---

### 4. Move Broadcast

```json
{
  "type": "move",
  "payload": {
    "from": "e2",
    "to": "e4"
  }
}
```

---

### 5. Game Over

```json
{
  "type": "game_over",
  "payload": {
    "winner": "white"
  }
}
```

---

## 🧠 How It Works

1. User connects via WebSocket
2. Sends `init_game`
3. Server:

   * waits for opponent OR
   * matches instantly if someone is waiting
4. Game starts → players assigned colors
5. Players send moves
6. Server validates and broadcasts moves
7. Game ends → result sent to both players

---

## ⚠️ Known Limitations

* Only supports 2-player games (no spectators)
* No reconnection handling
* No persistent storage (games reset on server restart)
* Basic matchmaking (single queue)

---

## 🔮 Future Improvements

* ✅ Add game timers (blitz/rapid)
* ✅ Player reconnection support
* ✅ Spectator mode
* ✅ ELO rating system
* ✅ Database integration

---

## 📦 Dependencies

* `ws` – WebSocket server
* `chess.js` – Chess rules and validation

---

## 🤝 Contributing

Pull requests are welcome!
Feel free to open issues for bugs or feature suggestions.

---

## 📄 License

MIT License

---

## 💡 Author

Built by you 🚀
Feel free to improve and expand!

