# 404IQFound

**Learn by Testing Yourself!**

404IQFound is a web-based quiz application that lets you challenge your knowledge across multiple categories and modes. It features:
- Practice and Timed modes (15 seconds per question)
- Randomized question pools 
- Hints to eliminate incorrect options
- Progress tracking and feedback
- Dark/light theme toggle
- Session-based question order persistence
- Shareable results with custom messages

**🌐 Visit the live site: [404IQFound](https://404iqfound.vercel.app/)**

## 🛠️ Technologies

- React with TypeScript
- Vite
- Tailwind CSS & shadcn-ui
- Framer Motion for animations
- React Context API for state management
- Lucide Icons

## 🚀 Getting Started

### Prerequisites

- Node.js (>=16) and npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_REPO_URL>
cd quiz-streak-mastery-copy

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

Open the provided localhost URL in your browser to explore the app.

### Building for Production

```bash
npm run build
# or
yarn build
```

The optimized files will be output to the `dist/` folder, ready for deployment.

### Deployment

You can deploy the `dist/` folder to any static hosting service (Vercel, Netlify, GitHub Pages).

## 📂 Project Structure

```
public/
  └─ favicon.ico        # App icon and static assets
src/
  ├─ components/        # Reusable UI components (QuizCard, CategoryCard, etc.)
  ├─ context/           # React Context for quiz state
  ├─ data/              # Quiz data and types
  ├─ views/             # Main view pages (LandingView, QuizView, etc.)
  ├─ services/          # Leaderboard or other services
  ├─ App.tsx            # Application entry component
  └─ main.tsx           # Client-side bootstrap
README.md               # Project documentation
vite.config.ts          # Vite configuration
tailwind.config.js      # Tailwind CSS configuration
```

## ⚙️ Configuration

- Environment variables (if any) can be placed in a `.env` file at the root.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open a pull request.

---

Made by Kabilesh C
