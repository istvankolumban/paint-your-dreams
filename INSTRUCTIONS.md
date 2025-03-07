# Paint Your Dreams - Project Instructions

## Project Overview
Paint Your Dreams is an Angular-based web application that helps users explore and manage artistic services and creative workshops.

## Development Guidelines

### Code Structure
- Follow Angular best practices and style guides
- Maintain component-based architecture
- Keep components small and focused
- Use proper TypeScript types and interfaces

### File Organization
- Components should be in their own folders with associated files
- Shared services go in the `services` folder
- Common components belong in `shared` folder
- Assets (images, etc.) go in the `assets` folder

### Coding Standards
1. Use TypeScript features appropriately
2. Write clean, maintainable code
3. Follow consistent naming conventions
4. Include proper documentation and comments
5. Implement proper error handling
6. Write unit tests for new features

### Project Structure
```
src/
├── app/
│   ├── auth/          # Authentication
│   ├── pages/         # Main page components
│   ├── services/      # Shared services
│   ├── shared/        # Reusable components
│   └── ...
├── assets/           # Static files
└── environments/     # Environment configs
```

### Tests
- Use the following command when you run the tests: ng test --no-watch --browsers ChromeHeadless
- The tests should be written in Jasmine/Karma
- When you write a test, never update the component or service
- Tests should pass

### Todos

Home page - carousel item: 
- I am not 