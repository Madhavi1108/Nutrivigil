# 🚀 Welcome to NutriVigil!

This guide will help you get started with the NutriVigil project quickly and efficiently.

## 📖 What is NutriVigil?

NutriVigil is an educational AI-powered nutrition analysis application that uses:
- **Google Gemini v2.5** for food image recognition
- **API Ninjas** for nutrition data
- **React + Node.js** for a modern full-stack architecture

## 🎯 Quick Start Guide

### Step 1: Prerequisites Check ✅

Before you begin, ensure you have:
- [ ] **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- [ ] **npm** (comes with Node.js)
- [ ] **Git** - [Download here](https://git-scm.com/)
- [ ] **Modern web browser** (Chrome or Firefox recommended)
- [ ] **Text editor** (VS Code, Sublime, etc.)

Check your installations:
```bash
node --version    # Should show v14 or higher
npm --version     # Should show 6 or higher
git --version     # Should show 2.x or higher
```

### Step 2: Clone the Repository 📥

```bash
git clone https://github.com/Gagan021-5/Nutrivigil.git
cd Nutrivigil
```

### Step 3: Install Dependencies 📦

#### Backend Dependencies
```bash
cd backend
npm install
```

#### Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 4: Set Up Environment Variables 🔑

This is crucial for the application to work!

1. Navigate to backend directory:
```bash
cd backend
```

2. Copy the example environment file:
```bash
cp .env.example .env
```

3. Get your API keys:
   - **Gemini API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - **API Ninjas Key**: Visit [API Ninjas](https://api-ninjas.com/)

4. Open `.env` file and add your keys:
```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_actual_gemini_key_here
NINJA_API_KEY=your_actual_api_ninjas_key_here
```

5. Verify `.env` is in `.gitignore`:
```bash
cat .gitignore | grep ".env"
```
You should see `.env` listed (this prevents accidentally committing your keys).

**Need more help?** See [ENV_QUICKSTART.md](./ENV_QUICKSTART.md) for detailed instructions.

### Step 5: Run the Application 🚀

#### Start Backend Server
Open a terminal in the `backend` directory:
```bash
cd backend
npm run dev
```

You should see:
```
Server running on http://localhost:3000
```

#### Start Frontend Server
Open a **new terminal** in the `frontend` directory:
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 6: Access the Application 🌐

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the NutriVigil homepage!

## 🧪 Verify Everything Works

1. **Upload a food image** through the web interface
2. **Check the console** in both terminal windows for any errors
3. **View results** - you should see nutrition analysis

If you encounter errors, see [Troubleshooting](#-troubleshooting) below.

## 📚 Understanding the Project Structure

```
NutriVigil/
│
├── backend/           # Node.js + Express API
│   ├── controller/    # Request handlers
│   ├── services/      # External API integrations
│   ├── middleware/    # Request processing
│   ├── utils/         # Helper functions
│   ├── scripts/       # Utility scripts
│   └── index.js       # Server entry point
│
├── frontend/          # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── contexts/   # State management
│   │   └── i18n/       # Translations
│   └── vite.config.js  # Vite configuration
│
└── [documentation files]
```

## 🛠️ Development Workflow

### Making Changes

1. **Create a new branch**:
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes** in the appropriate files

3. **Test your changes**:
```bash
# Backend tests
cd backend
node scripts/testErrorHandling.js

# Frontend (check browser console)
```

4. **Commit your changes**:
```bash
git add .
git commit -m "Add: description of your changes"
```

5. **Push and create PR**:
```bash
git push origin feature/your-feature-name
```

### Key Files to Know

#### Backend
- **`backend/index.js`** - Server entry point
- **`backend/controller/analyze.js`** - Main analysis logic
- **`backend/services/googleservices.js`** - Gemini API calls
- **`backend/services/ninjaServices.js`** - Nutrition API calls
- **`backend/utils/apiErrorHandler.js`** - Error handling
- **`backend/utils/retryHandler.js`** - API retry logic

#### Frontend
- **`frontend/src/App.jsx`** - Main app component
- **`frontend/src/main.jsx`** - Entry point
- **`frontend/src/pages/`** - Page components
- **`frontend/src/components/`** - Reusable components

## 🐛 Troubleshooting

### Backend Won't Start

**Error: Port 3000 already in use**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port in .env
PORT=3001
```

**Error: Cannot find module**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

**Error: Invalid API key**
- Check your `.env` file is in the `backend/` directory
- Verify no extra spaces in your API keys
- Ensure keys are valid and active

### Frontend Won't Start

**Error: Cannot find module**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Error: Port 5173 already in use**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### API Errors

**Gemini API errors**
- Verify your API key at [Google AI Studio](https://makersuite.google.com/app/apikey)
- Check rate limits
- Ensure proper image format

**Nutrition API errors**
- Verify your API key at [API Ninjas](https://api-ninjas.com/)
- Check request format
- Review API documentation

## 📖 Next Steps

Now that you're set up, explore:

1. **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
2. **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - All documentation
3. **[SECURITY.md](./SECURITY.md)** - Security guidelines
4. **[CODE-OF-CONDUCT.md](./CODE-OF-CONDUCT.md)** - Community standards

## 🤝 Getting Help

Need assistance?

1. **Check Documentation**:
   - [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)
   - [README.md](./README.md)
   - [ENV_QUICKSTART.md](./ENV_QUICKSTART.md)

2. **Search Issues**: Check if your problem is already reported
   - [GitHub Issues](https://github.com/Gagan021-5/Nutrivigil/issues)

3. **Open an Issue**: If you found a bug or have a question
   - Provide clear description
   - Include error messages
   - Share environment details

## ✅ Quick Command Reference

```bash
# Clone repository
git clone https://github.com/Gagan021-5/Nutrivigil.git
cd Nutrivigil

# Backend setup
cd backend
npm install
cp .env.example .env
# (Add your API keys to .env)
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev

# Testing
cd backend
node scripts/testErrorHandling.js

# Create feature branch
git checkout -b feature/your-feature-name
```

## 🎓 Learning Resources

### Understanding the Stack

- **React**: [Official Docs](https://react.dev/)
- **Node.js**: [Official Docs](https://nodejs.org/en/docs/)
- **Express**: [Official Docs](https://expressjs.com/)
- **Vite**: [Official Docs](https://vitejs.dev/)

### API Documentation

- **Google Gemini**: [API Documentation](https://ai.google.dev/)
- **API Ninjas**: [Nutrition API](https://api-ninjas.com/api/nutrition)

## 🎉 You're Ready!

Congratulations! You now have NutriVigil running locally. Start exploring, making changes, and contributing!

**Happy Coding! 🚀**

---

**Questions?** Open an issue or check our [documentation](./DOCUMENTATION_INDEX.md).