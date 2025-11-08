# Contributing to Devoted Slingers

Thank you for your interest in contributing to Devoted Slingers! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher
- PostgreSQL 14 or higher
- Git

### Initial Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/AntonyNeal/devoted-slingers.git
   cd devoted-slingers
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup PostgreSQL:
   ```bash
   createdb devoted_slingers
   ```

4. Configure environment variables:
   ```bash
   cp apps/backend/.env.example apps/backend/.env
   cp apps/frontend/.env.example apps/frontend/.env
   # Edit .env files with your configuration
   ```

5. Build the SDK:
   ```bash
   npm run build --workspace=packages/matchmaking-sdk
   ```

## Development Workflow

### Running the Application

Start the backend (Terminal 1):
```bash
npm run dev --workspace=apps/backend
```

Start the frontend (Terminal 2):
```bash
npm run dev --workspace=apps/frontend
```

The frontend will be available at http://localhost:5173

### Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Build all packages:
   ```bash
   npm run build
   ```

4. Run linters:
   ```bash
   npm run lint
   ```

5. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

6. Push and create a pull request

## Code Style

### TypeScript
- Use TypeScript strict mode
- Provide type annotations for function parameters and returns
- Use interfaces for object shapes
- Avoid `any` types when possible

### React
- Use functional components with hooks
- Keep components small and focused
- Use meaningful component and variable names
- Follow React best practices

### Naming Conventions
- **Files**: PascalCase for components, camelCase for utilities
- **Components**: PascalCase
- **Functions/Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

## Project Structure

### SDK Development
Location: `packages/matchmaking-sdk/`

When adding new data sources:
1. Create abstract class in `src/sources/`
2. Add types in `src/types/index.ts`
3. Export from `src/index.ts`
4. Document usage in README

### Backend Development
Location: `apps/backend/`

When adding API endpoints:
1. Create route file in `src/routes/`
2. Implement data source in `src/services/`
3. Add middleware if needed in `src/middleware/`
4. Update database schema in `src/db/index.ts` if needed

### Frontend Development
Location: `apps/frontend/`

When adding UI features:
1. Create components in `src/components/`
2. Create pages in `src/pages/`
3. Add API calls in `src/services/api.ts`
4. Use existing Tailwind classes when possible

## Testing

### Running Tests
```bash
npm run test
```

### Writing Tests
- Place test files next to the code they test
- Use `.test.ts` or `.spec.ts` extensions
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies

## Database Changes

When modifying the database schema:
1. Update `apps/backend/src/db/index.ts`
2. Test migration on a local database
3. Document schema changes in PR description

## Pull Request Process

1. **Update Documentation**: Update README.md if needed
2. **Test Your Changes**: Ensure all builds and tests pass
3. **Lint Your Code**: Run `npm run lint`
4. **Write Clear Commits**: Use descriptive commit messages
5. **Create PR**: Provide detailed description of changes
6. **Address Feedback**: Respond to review comments

## Commit Message Guidelines

Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(frontend): add deck search functionality
fix(backend): correct match status update
docs(readme): update installation instructions
```

## Areas for Contribution

### High Priority
- User authentication/registration
- Unit tests for SDK
- Integration tests for API
- E2E tests for frontend
- Performance optimizations

### Features
- Deck statistics
- Tournament organization
- Image upload for avatars
- Advanced search filters
- Notification system

### Documentation
- API reference documentation
- SDK usage examples
- Deployment guides
- Architecture diagrams

### Quality
- Test coverage improvements
- Performance benchmarks
- Accessibility improvements
- Mobile responsiveness

## Getting Help

- Open an issue for bugs or feature requests
- Ask questions in discussions
- Review existing issues before creating new ones

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project guidelines

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Devoted Slingers! 🎴
