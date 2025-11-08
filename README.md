# Devoted Slingers - MTG Matchmaking App

<div align="center">
  <h3>🎴 Tinder for Magic: The Gathering 🎴</h3>
  <p>Connect with MTG players, share decks, and find your perfect playgroup</p>
</div>

## 🌟 Overview

Devoted Slingers is a modern matchmaking application for Magic: The Gathering players. Built with React 18, Vite, TailwindCSS on the frontend and Express with PostgreSQL on the backend, it features a reusable SDK that makes it easy to adapt for other matchmaking scenarios.

## 🏗️ Architecture

This is a monorepo containing:

- **`@devoted-slingers/matchmaking-sdk`** - Generic, reusable matchmaking SDK
- **`@devoted-slingers/frontend`** - React + Vite + TailwindCSS frontend
- **`@devoted-slingers/backend`** - Express + PostgreSQL backend

### Monorepo Structure

```
devoted-slingers/
├── packages/
│   └── matchmaking-sdk/          # Reusable SDK
│       ├── src/
│       │   ├── sources/          # Data source abstractions
│       │   │   ├── UserProfileDataSource.ts
│       │   │   ├── MatchmakingDataSource.ts
│       │   │   ├── MessagingDataSource.ts
│       │   │   ├── GeoLocationDataSource.ts
│       │   │   ├── MTGProfileDataSource.ts
│       │   │   ├── DeckDataSource.ts
│       │   │   └── ScryfallDataSource.ts
│       │   └── types/            # TypeScript type definitions
│       └── package.json
└── apps/
    ├── frontend/                 # React application
    │   ├── src/
    │   │   ├── components/       # Reusable components
    │   │   ├── pages/           # Page components
    │   │   ├── services/        # API & socket services
    │   │   └── hooks/           # Custom React hooks
    │   └── package.json
    └── backend/                  # Express API
        ├── src/
        │   ├── routes/          # API routes
        │   ├── services/        # Data source implementations
        │   ├── middleware/      # Express middleware
        │   ├── db/             # Database configuration
        │   └── config/         # App configuration
        └── package.json
```

## 🎯 Features

### Core Features
- ✨ **Swipe Matching** - Tinder-style card swiping interface
- 💬 **Real-time Chat** - WebSocket-based messaging with Socket.IO
- 🎴 **Deck Sharing** - Share and view MTG decks
- 🌍 **Geolocation** - Find players nearby
- 🏢 **Multi-tenant** - Support multiple organizations/communities

### MTG-Specific Features
- 🃏 **Scryfall Integration** - Search and browse MTG cards
- 📊 **Deck Management** - Create and share Commander, Modern, Standard decks
- 🎯 **Format Preferences** - Match based on favorite formats
- 🎨 **Color Identity** - Filter by favorite color combinations
- 📈 **Experience Levels** - Match with players of similar skill

### Generic SDK Features

The SDK provides abstract data sources that can be implemented for any matchmaking scenario:

- **UserProfile** - Generic user management
- **Matchmaking** - Swipe actions and match creation
- **Messaging** - Real-time chat capabilities
- **GeoLocation** - Distance-based matching
- **MTGProfile** - MTG-specific profile data
- **Deck** - Deck management and sharing
- **Scryfall** - MTG card search (concrete implementation included)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL 14+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AntonyNeal/devoted-slingers.git
   cd devoted-slingers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup PostgreSQL database**
   ```bash
   createdb devoted_slingers
   ```

4. **Configure environment variables**
   
   Backend (`apps/backend/.env`):
   ```bash
   cp apps/backend/.env.example apps/backend/.env
   # Edit .env with your database credentials
   ```

   Frontend (`apps/frontend/.env`):
   ```bash
   cp apps/frontend/.env.example apps/frontend/.env
   ```

5. **Build the SDK**
   ```bash
   npm run build --workspace=packages/matchmaking-sdk
   ```

6. **Start development servers**
   
   Terminal 1 - Backend:
   ```bash
   npm run dev --workspace=apps/backend
   ```

   Terminal 2 - Frontend:
   ```bash
   npm run dev --workspace=apps/frontend
   ```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3001`.

## 📦 SDK Usage

The SDK is designed to be framework-agnostic and reusable. Here's how to use it in your own project:

### Installation

```bash
npm install @devoted-slingers/matchmaking-sdk
```

### Basic Usage

```typescript
import { 
  UserProfileDataSource, 
  MatchmakingDataSource,
  ScryfallDataSource 
} from '@devoted-slingers/matchmaking-sdk';

// Implement abstract data sources for your backend
class MyUserProfileSource extends UserProfileDataSource {
  async getUserProfile(userId: string) {
    // Your implementation
  }
  // ... implement other methods
}

// Use concrete implementations
const scryfall = new ScryfallDataSource();
const cards = await scryfall.searchCards('Lightning Bolt');
```

### Creating Custom Data Sources

Extend the abstract classes to create your own implementations:

```typescript
import { UserProfileDataSource, UserProfile } from '@devoted-slingers/matchmaking-sdk';

export class MongoUserProfileSource extends UserProfileDataSource {
  private db: MongoDB;

  async initialize() {
    this.db = await connectToMongo();
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    return await this.db.collection('users').findOne({ _id: userId });
  }

  // ... implement other required methods
}
```

## 🔧 Development

### Build All Packages

```bash
npm run build
```

### Run Tests

```bash
npm run test
```

### Lint Code

```bash
npm run lint
```

### Clean Build Artifacts

```bash
npm run clean
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

- `tenants` - Multi-tenant support
- `users` - User profiles and authentication
- `mtg_profiles` - MTG-specific user data
- `swipes` - Swipe actions (like/pass)
- `matches` - Matched users
- `messages` - Chat messages
- `decks` - MTG deck lists

The database schema is automatically created when the backend starts.

## 🔌 API Endpoints

### Matchmaking
- `GET /api/matchmaking/potential` - Get potential matches
- `POST /api/matchmaking/swipe` - Record a swipe action
- `GET /api/matchmaking/matches` - Get user's matches
- `GET /api/matchmaking/matches/:matchId` - Get specific match
- `PATCH /api/matchmaking/matches/:matchId` - Update match status

### Users
- `GET /api/users/:userId` - Get user profile
- `PATCH /api/users/:userId` - Update user profile
- `POST /api/users/search` - Search for users

### WebSocket Events
- `join-match` - Join a match room
- `send-message` - Send a message
- `new-message` - Receive a message
- `typing` - User typing indicator
- `user-typing` - Receive typing indicator

## 🎨 Customization

### Frontend Theming

Edit `apps/frontend/tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

### Adding New Data Sources

1. Create an abstract class in `packages/matchmaking-sdk/src/sources/`
2. Export it from `packages/matchmaking-sdk/src/index.ts`
3. Implement it in your backend (e.g., `apps/backend/src/services/`)

## 🧪 Testing

```bash
# Test SDK
npm run test --workspace=packages/matchmaking-sdk

# Test backend
npm run test --workspace=apps/backend
```

## 📝 Environment Variables

### Backend

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:5173 |

### Frontend

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | http://localhost:3001/api |
| `VITE_SOCKET_URL` | Socket.IO server URL | http://localhost:3001 |

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

## 📄 License

MIT

## 🙏 Acknowledgments

- [Scryfall API](https://scryfall.com/docs/api) for MTG card data
- Magic: The Gathering is © Wizards of the Coast

---

<div align="center">
  Made with ❤️ for the MTG community
</div>
