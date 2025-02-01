# trivia-buzzer

Websocket based multi-user trivia buzzer using Bun runtime.

## Usage

**Development Server:** `npm run dev` -- Run development server.

**Build:** `npm run build` -- Build app out to /dist folder.

**Production Server:** `npm run start` -- Run production server from /dist folder.

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

## Program Flow

<pre>
          ┌───────────────────http─response────────────────────┐         
          │                                                    │         
┌─────────┼──────────────────────────┐                         │         
│ ┌───────┴────────┐    Server       │                         │         
│ │  Static Views  │                 │                         │         
│ │   ┌──────┐     │                 │                         │         
│ │   │ Home │     │                 │                ┌────────▼────────┐
│ │   │  '/' │     │                 │                │     Client      │
│ │   └──────┘     │                 │                │ ┌─────────────┐ │
│ │  ┌─────────┐   ◄─────────────────┼──http─request──┼─┼Route Request│ │
│ │  │  Game   │   │                 │                │ └─────────────┘ │
│ │  │'/buzzer'│   │   ┌───────────┐ │                │  ┌──────────┐   │
│ │  └─────────┘   │   │   Event   ◄─┼──web─socket────┼──►Game Event│   │
│ │ ┌───────────┐  │   │ Controller│ │                │  └──────────┘   │
│ │ │Controller │  │   └───────────┘ │                └─────────────────┘
│ │ │'/control' │  │                 │                                   
│ │ └───────────┘  │                 │                                   
│ └────────────────┘                 │                                   
└────────────────────────────────────┘                                   
</pre>

## Todo

- Style Controller View
- Allow multiple rooms.
- Enable controller view to see all connected user names.
- Log events in controller screen.
- Show green/red connection indicator.

### Done

- Converted routes and websockets to Bun.serve().
- Styled Home and Game view.
- Added sound.
