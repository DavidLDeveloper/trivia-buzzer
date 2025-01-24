# trivia-buzzer

Websocket based multi-user trivia buzzer using Bun runtime.

## Usage

**Development Server:** `npm run dev`
**Development Server(node):** `npm run dev:node`
**Build:** `npm run build`
**Build:** `npm run build:node`
**Production Server:** `npm run start`

Server will run on `process.env.PORT` or on port 3000.

## Views

### Home
**Path:** `/`
Name entry. On submission will navigate to `/buzzer`

### Buzzer
**Path:** `/buzzer`
Game buzzer. Tap/click to buzz in. Locks until controller sends event.

### Controller
**Path:** `/control`
Game controller. Reset control sends activation command to players.

## Todo
- Allow multiple rooms.
- Style screens.
- Optimize speed by converting to binary parser.
