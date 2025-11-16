# Contributing to FreeQRCodeWebsite

First off, thank you for considering contributing to FreeQRCodeWebsite! 🎉 It's people like you that make this project awesome.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **Actual behavior**
- **Screenshots** if applicable
- **Browser/Device information** (if relevant)
- **Any error messages** you see

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Clear title and description**
- **Use case**: Why would this feature be useful?
- **Possible implementation** (if you have ideas)
- **Examples** of how it might work

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code, add tests if applicable
3. Ensure the test suite passes (`npm test`)
4. Make sure your code lints (`npm run lint`)
5. Write a clear commit message
6. Submit the pull request!

### Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/FreeQRCodeWebsite.git
cd FreeQRCodeWebsite

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint
```

### Project Structure

```
src/
├── components/     # React components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
├── data/           # Static data and presets
└── styles/         # Style files
```

### Coding Standards

- **TypeScript**: We use TypeScript for type safety
- **React**: Functional components with hooks
- **Styling**: Tailwind CSS for styling
- **Testing**: Write tests for new features and bug fixes
- **Naming**: Use descriptive, clear names for variables and functions
- **Comments**: Add comments for complex logic, but prefer self-documenting code

### Commit Messages

Write clear, descriptive commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally

Examples:
```
Add dark mode toggle to header
Fix QR code generation error on mobile devices
Update documentation for new API endpoint
```

### Testing

- Write tests for new features
- Ensure all existing tests pass
- Aim for good test coverage
- Test on multiple browsers/devices when possible

### Questions?

Don't hesitate to ask questions by opening an issue or starting a discussion. We're here to help!

## Recognition

Contributors will be recognized in the project's README and release notes. Thank you for making FreeQRCodeWebsite better! 🙏

