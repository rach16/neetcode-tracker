# 🚀 NeetCode Tracker

<div align="center">

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A comprehensive LeetCode/NeetCode problem tracker with progress visualization, flashcards, spaced repetition, and algorithm cheat sheets.**

[🌐 Live Demo](https://neetcode-tracker.vercel.app) | [📝 Report Bug](https://github.com/rach16/neetcode-tracker/issues) | [✨ Request Feature](https://github.com/rach16/neetcode-tracker/issues)

</div>

---

## ✨ Features

### 📊 **Progress Tracking**
- Visual dashboard with completion stats by difficulty and category
- Track problems as Todo, In Progress, or Completed
- Real-time progress overview with percentage calculations

### 🔥 **Streak System**
- Daily streak counter to maintain consistency
- Streak visualization and motivation
- Track your longest streak

### 🗂️ **Problem Organization**
- 150+ curated NeetCode problems across 15+ categories
- Filter by difficulty (Easy, Medium, Hard)
- Filter by completion status
- Organized by patterns (Arrays, Graphs, Dynamic Programming, etc.)

### 🃏 **Flashcard System**
- Built-in algorithm pattern flashcards
- Spaced repetition algorithm for optimal learning
- Quiz mode for active recall practice
- Progress tracking for each deck

### ⏱️ **Built-in Timer**
- Track time spent on each problem
- Pomodoro-style timer support
- Historical time tracking

### 📝 **Notes & Solutions**
- Add personal notes for each problem
- Track multiple solution approaches
- Code snippet storage

### 📚 **Algorithm Cheat Sheets**
- Quick reference for common patterns
- Time/space complexity guides
- Implementation tips and tricks

### 💾 **Data Persistence**
- All progress saved to localStorage
- Export/import functionality for backup
- No account required - works offline

### 📱 **Responsive Design**
- Mobile-first design
- Progressive Web App (PWA) ready
- Works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

- **Frontend**: React 19.2 with TypeScript
- **Styling**: Tailwind CSS 4.1
- **Build Tool**: Vite 7.2
- **State Management**: React Context API
- **Data Storage**: localStorage
- **Deployment**: Vercel

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rach16/neetcode-tracker.git
   cd neetcode-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📖 Usage

1. **Browse Problems**: Navigate through categories or use filters to find problems
2. **Update Status**: Click on a problem to mark it as Todo, In Progress, or Completed
3. **Take Notes**: Add your thoughts, solutions, and approaches for each problem
4. **Study Flashcards**: Use the flashcard deck to review algorithm patterns
5. **Track Progress**: Monitor your progress on the dashboard
6. **Maintain Streaks**: Solve at least one problem daily to keep your streak alive!

### 📱 **Mobile Installation**

**On iOS (iPhone/iPad):**
1. Open the app in Safari browser
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right

**On Android:**
1. Open the app in Chrome browser
2. Tap the menu (three dots)
3. Select "Install app" or "Add to Home Screen"
4. Tap "Install"

Once installed, the app works offline and feels like a native mobile app!

---

## 📁 Project Structure

```
neetcode-tracker/
├── public/              # Static assets & PWA files
├── src/
│   ├── components/      # React components
│   │   ├── Dashboard/   # Progress overview & stats
│   │   ├── ProblemList/ # Problem browsing & filtering
│   │   ├── Flashcards/  # Spaced repetition system
│   │   ├── Timer/       # Problem timer
│   │   └── ...
│   ├── context/         # React Context for state
│   ├── data/            # Problem sets & flashcard data
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript definitions
│   └── utils/           # Helper functions
└── ...
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Problem sets inspired by [NeetCode.io](https://neetcode.io)
- Icons and components from the React ecosystem
- Spaced repetition algorithm based on SM-2

---

<div align="center">

**Made with ❤️ for coding interview prep**

⭐ Star this repo if you find it helpful!

</div>
