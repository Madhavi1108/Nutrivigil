# 📚 NutriVigil Documentation Index

Welcome to the comprehensive documentation for NutriVigil. This index provides quick access to all project documentation.

## 🚀 Getting Started

### For New Users
1. **[README.md](./README.md)** - Project overview and quick start
2. **[START_HERE.md](./START_HERE.md)** - Onboarding guide for new contributors
3. **[ENV_QUICKSTART.md](./ENV_QUICKSTART.md)** - Environment setup walkthrough

### For Developers
1. **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines
2. **[CODE-OF-CONDUCT.md](./CODE-OF-CONDUCT.md)** - Community guidelines

## 📖 Core Documentation

### Setup & Configuration
- **[README.md](./README.md#-local-installation)** - Installation instructions
- **[ENV_QUICKSTART.md](./ENV_QUICKSTART.md)** - Detailed environment configuration
- **[ENV_SECURITY_IMPLEMENTATION.md](./ENV_SECURITY_IMPLEMENTATION.md)** - Security best practices
- **[.env.example](./.env.example)** - Environment variables template

### Project Structure
- **[README.md](./README.md#-project-structure)** - Complete file tree
- **Backend Architecture** - See inline code documentation in:
  - `backend/controller/analyze.js`
  - `backend/services/googleservices.js`
  - `backend/services/ninjaServices.js`
  - `backend/utils/apiErrorHandler.js`
  - `backend/utils/retryHandler.js`

### Features & Implementation
- **[README.md](./README.md#-key-features)** - Feature overview
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical implementation details
- **[CHANGES_LOG.md](./CHANGES_LOG.md)** - Project change history

## 🔒 Security & Policies

- **[SECURITY.md](./SECURITY.md)** - Security policies and vulnerability reporting
- **[ENV_SECURITY_IMPLEMENTATION.md](./ENV_SECURITY_IMPLEMENTATION.md)** - Security implementation guide
- **[CODE-OF-CONDUCT.md](./CODE-OF-CONDUCT.md)** - Community standards

## 🤝 Contributing

### How to Contribute
1. Read **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Full contribution guide
2. Review **[CODE-OF-CONDUCT.md](./CODE-OF-CONDUCT.md)** - Expected behavior
3. Check **[README.md](./README.md#-contributing)** - Quick contribution steps

### Development Guidelines
- Follow the project structure in **[README.md](./README.md#-project-structure)**
- Run tests: `node backend/scripts/testErrorHandling.js`
- Ensure all environment variables are documented in `.env.example`

## 📝 Reference Files

### Quick References
- **[QUICK_REFERENCE.txt](./QUICK_REFERENCE.txt)** - Command reference
- **[SETUP_SUMMARY.txt](./SETUP_SUMMARY.txt)** - Setup summary

### Legal
- **[LICENSE](./LICENSE)** - MIT License terms

## 🔧 Technical Documentation

### Backend Components

#### Controllers
- **`backend/controller/analyze.js`** - Main analysis endpoint handler

#### Services
- **`backend/services/googleservices.js`** - Google Gemini API integration
- **`backend/services/ninjaServices.js`** - API Ninjas nutrition data service

#### Middleware
- **`backend/middleware/upload.js`** - File upload handling with Multer

#### Utilities
- **`backend/utils/apiErrorHandler.js`** - Centralized error handling
- **`backend/utils/retryHandler.js`** - Automatic retry logic for API calls
- **`backend/utils/getmemetype.js`** - MIME type detection
- **`backend/utils/imgconversion.js`** - Image format conversion
- **`backend/utils/parseGeminiJson.js`** - Gemini response parser

#### Scripts
- **`backend/scripts/testErrorHandling.js`** - Error handling test suite

### Frontend Components

#### Core Files
- **`frontend/src/App.jsx`** - Main application component
- **`frontend/src/main.jsx`** - Application entry point

#### Directories
- **`frontend/src/components/`** - Reusable UI components
- **`frontend/src/pages/`** - Page-level components
- **`frontend/src/contexts/`** - React Context providers
- **`frontend/src/hooks/`** - Custom React hooks
- **`frontend/src/i18n/`** - Internationalization files
- **`frontend/src/utils/`** - Utility functions
- **`frontend/src/assets/flags/`** - Language flag icons

## 🧪 Testing & Quality Assurance

### Running Tests
```bash
# Backend error handling tests
cd backend
node scripts/testErrorHandling.js
```

### Code Quality
- Follow ESLint rules (if configured)
- Write meaningful commit messages
- Document new features in relevant files

## 📊 API Documentation

### Environment Variables
See **[ENV_QUICKSTART.md](./ENV_QUICKSTART.md)** for:
- Required API keys
- Configuration options
- Environment-specific settings

### API Integration
- **Google Gemini v2.5** - Image analysis
- **API Ninjas** - Nutrition data lookup

## 🐛 Troubleshooting

Common issues and solutions are documented in:
- **[README.md](./README.md#-troubleshooting)** - General troubleshooting
- **[ENV_QUICKSTART.md](./ENV_QUICKSTART.md)** - Environment-related issues

## 📦 Dependencies

### Backend Dependencies
See `backend/package.json` for:
- Express
- Multer
- Axios
- dotenv
- Other backend dependencies

### Frontend Dependencies
See `frontend/package.json` for:
- React
- Vite
- Tailwind CSS
- Lucide React
- i18next
- Other frontend dependencies

## 🔄 Version History

- **[CHANGES_LOG.md](./CHANGES_LOG.md)** - Detailed changelog

## 📞 Getting Help

### Support Channels
1. **GitHub Issues** - For bugs and feature requests
2. **Documentation** - Check this index first
3. **Community** - Follow our [Code of Conduct](./CODE-OF-CONDUCT.md)

### Before Opening an Issue
- Search existing issues
- Check documentation
- Review troubleshooting guides
- Provide detailed information

## 🎯 Quick Links

| Category | Link |
|----------|------|
| Main README | [README.md](./README.md) |
| Getting Started | [START_HERE.md](./START_HERE.md) |
| Contributing | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| Security | [SECURITY.md](./SECURITY.md) |
| Environment Setup | [ENV_QUICKSTART.md](./ENV_QUICKSTART.md) |
| License | [LICENSE](./LICENSE) |
| Code of Conduct | [CODE-OF-CONDUCT.md](./CODE-OF-CONDUCT.md) |

---

**Note:** All documentation is maintained to stay synchronized with the codebase. If you notice outdated information, please open an issue or submit a pull request.

**Last Updated:** Check commit history for latest changes.