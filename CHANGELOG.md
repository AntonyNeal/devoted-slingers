# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-08

### Added

#### SDK (@devoted-slingers/matchmaking-sdk)
- Generic abstract data sources for building matchmaking applications
  - `UserProfileDataSource` - User management
  - `MatchmakingDataSource` - Swipe actions and match logic
  - `MessagingDataSource` - Chat and messaging
  - `GeoLocationDataSource` - Location-based features
- MTG-specific data sources
  - `MTGProfileDataSource` - MTG player preferences
  - `DeckDataSource` - Deck management
  - `ScryfallDataSource` - Card search with Scryfall API
- Comprehensive TypeScript type definitions
  - User profiles with preferences
  - Match status and swipe actions
  - Message types and conversations
  - Geolocation coordinates
  - MTG formats, colors, experience levels
  - Deck structures with mainboard/sideboard/commander
  - Scryfall card data types
- Multi-tenant support types
- ES module format for modern JavaScript

#### Backend (@devoted-slingers/backend)
- Express REST API server
  - Matchmaking endpoints (potential matches, swipe, get matches)
  - User profile endpoints (get, update, search)
  - Health check endpoint
- Real-time messaging with Socket.IO
  - Match room management
  - Message broadcasting
  - Typing indicators
- PostgreSQL database integration
  - Automatic schema creation
  - Connection pooling
  - Parameterized queries
- Multi-tenant architecture
  - Tenant middleware
  - Tenant-specific filtering
- Security features
  - CORS configuration
  - Helmet security headers
  - JWT authentication infrastructure
  - Rate limiting ready
- Concrete implementations of SDK data sources
  - `PostgresUserProfileDataSource`
  - `PostgresMatchmakingDataSource`

#### Frontend (@devoted-slingers/frontend)
- React 18 single-page application
- Pages
  - **Swipe Page** - Tinder-style card swiping with gesture support
  - **Matches Page** - View all matches with click-to-chat navigation
  - **Chat Page** - Real-time messaging with typing indicators
  - **Deck Builder Page** - Create decks with Scryfall card search
  - **Profile Page** - User and MTG preferences management
- Components
  - `SwipeCard` - Animated swipeable card component
- Services
  - API service with Axios for backend communication
  - Socket service for WebSocket connections
- Routing with React Router
- Styling with TailwindCSS
  - Responsive design
  - Custom color palette
  - Reusable component classes
- Gesture support with @react-spring/web and @use-gesture/react
- TypeScript throughout

#### Documentation
- Comprehensive README.md
  - Project overview
  - Architecture diagram
  - Feature list
  - Installation instructions
  - API documentation
  - SDK usage examples
  - Environment variable reference
- PROJECT_SUMMARY.md
  - Detailed implementation summary
  - Architecture highlights
  - Technology stack
  - Security summary
  - Future enhancements
- CONTRIBUTING.md
  - Development setup
  - Code style guidelines
  - Testing guidelines
  - Pull request process
  - Areas for contribution
- DEPLOYMENT.md
  - Multiple deployment options (VPS, Docker, Cloud)
  - Environment setup
  - Database configuration
  - Security considerations
  - Monitoring and scaling
  - Cost estimates
- CHANGELOG.md (this file)

#### Development Tools
- Monorepo structure with npm workspaces
- TypeScript configuration for all packages
- ESLint configuration for code quality
- Jest configuration for testing
- Build scripts for all packages
- Development scripts with hot reload

#### Database Schema
- `tenants` table - Multi-tenant support
- `users` table - User profiles
- `mtg_profiles` table - MTG-specific data
- `swipes` table - Like/pass actions
- `matches` table - Matched users
- `messages` table - Chat messages
- `decks` table - Deck lists
- Appropriate indexes for performance

### Security
- CodeQL security analysis: 0 vulnerabilities
- TypeScript strict mode enabled
- Input validation on API endpoints
- Parameterized database queries
- CORS and security headers configured
- Environment variable configuration
- Multi-tenant isolation

### Quality
- All packages build successfully
- All packages lint successfully
- ES modules throughout for modern JavaScript
- Full TypeScript type coverage
- Consistent code style

## Future Roadmap

### Version 1.1.0 (Planned)
- User authentication and registration
- Profile pictures/avatar upload
- Deck import/export functionality
- Push notifications
- Email notifications

### Version 1.2.0 (Planned)
- Advanced matching algorithm
- User blocking/reporting
- Tournament organization
- Trading features
- Deck statistics

### Version 2.0.0 (Planned)
- Mobile app (React Native)
- Advanced search filters
- Social features (friends, groups)
- Event management
- In-app purchases

---

[1.0.0]: https://github.com/AntonyNeal/devoted-slingers/releases/tag/v1.0.0
