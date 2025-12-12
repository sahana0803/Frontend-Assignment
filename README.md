# Test Your Knowledge - Quiz Application

A beautiful, interactive quiz application built with HTML, CSS, and JavaScript, matching the Figma prototype design.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Assumptions](#assumptions)
- [Time Spent](#time-spent)
- [Deployment](#deployment)

## 🛠 Tech Stack

This project is built using **vanilla web technologies** (no frameworks or build tools):

- **HTML5**: Semantic markup and structure
- **CSS3**: Styling with modern features including:
  - CSS Grid and Flexbox for layout
  - CSS Gradients and animations
  - Custom fonts from Google Fonts
  - Responsive design with media queries
- **JavaScript (ES6+)**: 
  - Vanilla JavaScript (no dependencies)
  - DOM manipulation
  - Event handling
  - State management

## 🚀 Setup Instructions

### Local Development

1. **Clone the repository** (or download the project files):
   ```bash
   git clone <repository-url>
   cd frontend-development
   ```

2. **Open the project**:
   - Simply open `index.html` in any modern web browser
   - No build process or package installation required
   - No server needed - works directly from the file system

3. **Alternative: Use a local server** (optional, for better development experience):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Then open http://localhost:8000 in your browser
   ```

### File Structure

```
frontend development/
├── index.html          # Main HTML file
├── css/
│   └── styles.css     # All styling and design
├── js/
│   └── script.js      # Quiz logic and functionality
├── images/
│   ├── best-of-luck.png  # Decorative speech bubble image
│   └── main-image.gif    # Cat paw animated GIF
├── .gitignore         # Git ignore file
└── README.md          # Project documentation
```

## ✨ Key Features

### Core Functionality
- **Interactive Quiz Interface**: Clean, modern design with smooth transitions
- **Progress Tracking**: Visual progress indicators showing current question status
- **Question Navigation**: Previous/Next buttons with proper state management
- **Answer Selection**: Click to select answers with visual feedback (multiple selections allowed)
- **Score Calculation**: Automatic score calculation based on correct answers
- **Results Page**: Beautiful results page with animated score display
- **Quiz Reset**: "Start Again" functionality to retake the quiz

### Design Features
- **Gradient Backgrounds**: Beautiful aurora-like gradient background matching Figma design
- **Card-based Layout**: White rounded card container with elegant styling
- **Typography**: Elegant serif font (DM Serif Display) for titles, modern sans-serif for content
- **Smooth Animations**: Page transitions, score animations, and hover effects
- **Decorative Elements**: Cat paw GIF and speech bubble image on the first question
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices

### User Experience
- **Visual Feedback**: Selected answers are highlighted with gradient backgrounds
- **Progress Visualization**: Progress lines change color based on question status (visited/completed/active)
- **Smooth Transitions**: Page transitions when moving between quiz and results
- **Accessibility**: Semantic HTML and proper button states

## 📝 Assumptions

1. **Multiple Answer Selection**: The quiz allows users to select multiple answers per question. The score is calculated by checking if the correct answer is included in the selected answers.

2. **Answer Persistence**: Selected answers are preserved when navigating between questions using Previous/Next buttons.

3. **Fixed Score Display**: The results page displays a fixed score of 62% with an animated counter effect (as per design requirements).

4. **Decorative Elements**: The cat paw GIF and speech bubble image are only displayed on the first question (index 0) to match the design prototype.

5. **No Form Validation**: Users can submit the quiz even if they haven't answered all questions. The score calculation handles unanswered questions gracefully.

6. **Browser Compatibility**: The application is designed for modern browsers that support ES6+ JavaScript and CSS3 features.

7. **No Backend Required**: All functionality is client-side only, with no server-side processing or data persistence.

## ⏱ Time Spent

- **Planning & Design Analysis**: ~1 hour
  - Reviewing Figma prototype
  - Understanding requirements
  - Planning component structure

- **HTML Structure**: ~30 minutes
  - Creating semantic markup
  - Setting up quiz and results containers
  - Adding decorative elements

- **CSS Styling**: ~3 hours
  - Matching Figma design specifications
  - Implementing gradients and animations
  - Responsive design implementation
  - Cross-browser compatibility testing

- **JavaScript Functionality**: ~2.5 hours
  - Quiz state management
  - Question navigation logic
  - Answer selection and tracking
  - Score calculation
  - Results page animations

- **Testing & Refinement**: ~1 hour
  - Testing all features
  - Fixing bugs and edge cases
  - Responsive design testing
  - Browser compatibility testing

**Total Estimated Time: ~8 hours**

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts to link your project and deploy.

3. **Alternative: Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a static site and deploy

### Deploy to Netlify

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy --prod
   ```
   Follow the prompts to set up and deploy.

3. **Alternative: Deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your project folder, or
   - Connect your GitHub repository for continuous deployment

### Deploy to GitHub Pages

1. **Push your code to GitHub**

2. **Go to repository Settings → Pages**

3. **Select source branch** (usually `main` or `master`)

4. **Your site will be available at**: `https://<username>.github.io/<repository-name>`

## 🎮 How to Use

1. Open the application in your web browser
2. Answer all questions by clicking on your preferred answer(s)
3. Use the navigation arrows to move between questions
4. Click "Submit" on the last question to see your results
5. Click "Start Again" to retake the quiz

## 🎨 Design Notes

- The design closely matches the provided Figma prototype
- Uses custom Google Fonts: DM Serif Display, Inter, Manrope, and Caveat Brush
- Color scheme: Blue gradients (#BECFEE, #71C6E2, #D9F4FA) with dark text (#15313D)
- All measurements and spacing match the Figma specifications

## 🌍 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📦 Customization

To add more questions, edit the `quizQuestions` array in `js/script.js`:

```javascript
const quizQuestions = [
    {
        question: "Your question here?",
        answers: ["Option 1", "Option 2", "Option 3"],
        correctAnswer: 0  // Index of correct answer (0, 1, or 2)
    }
];
```

---

**Note**: This is a front-end only application with no backend dependencies. All functionality is implemented using vanilla JavaScript, HTML, and CSS.
