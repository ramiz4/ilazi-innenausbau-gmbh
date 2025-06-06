# Ilazi Innenausbau GmbH - Corporate Website

![Angular](https://img.shields.io/badge/Angular-19.2-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.2-06B6D4)
![License](https://img.shields.io/badge/License-Private-yellow)

A modern, responsive corporate website for **Ilazi Innenausbau GmbH**, a leading Swiss interior construction company specializing in professional interior finishing services across Switzerland.

## 🏢 About the Company

Ilazi Innenausbau GmbH is a dynamic interior construction company founded in 2021 in Regensdorf, Switzerland. We provide comprehensive interior finishing services including:

- **Drywall Construction** - Professional installation of gypsum board systems
- **Wall & Ceiling Cladding** - High-quality surface finishing solutions  
- **Insulation & Acoustics** - Energy-efficient and sound-dampening solutions
- **Tile Work** - Expert installation of wall and floor coverings

## 🚀 Technology Stack

- **Framework**: Angular 19.2.14
- **Language**: TypeScript 5.5
- **Styling**: TailwindCSS 3.2.7 with custom design system
- **Email Service**: EmailJS integration for contact forms
- **Build Tool**: Angular CLI
- **Testing**: Jasmine & Karma
- **Code Quality**: Prettier, ESLint, and automated import organization

## 📁 Project Structure

```
src/
├── app/
│   ├── header/           # Navigation header with theme switcher
│   ├── footer/           # Company footer with contact info
│   ├── home/             # Main landing page components
│   │   ├── hero/         # Hero section with call-to-action
│   │   ├── about/        # Company information and services
│   │   ├── gallery/      # Project showcase gallery
│   │   ├── references/   # Customer testimonials
│   │   ├── partner/      # Partner companies showcase
│   │   └── contact/      # Contact form with EmailJS
│   ├── career/           # Career opportunities page
│   ├── privacy/          # Privacy policy (GDPR compliant)
│   ├── imprint/          # Legal imprint (Swiss law compliant)
│   └── not-found/        # 404 error page
├── assets/               # Images, logos, and static resources
└── environments/         # Environment configurations
```

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ilazi-innenausbau-gmbh
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

The application will automatically reload when you change source files.

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run watch` | Build in watch mode |
| `npm test` | Run unit tests |
| `npm run test:ci` | Run tests in CI mode with coverage |
| `npm run lint` | Check code formatting |
| `npm run lint:fix` | Fix code formatting issues |

## 🎨 Features

### ✨ Modern Design
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Dark/Light Mode**: Theme switcher with system preference detection
- **Smooth Animations**: CSS transitions and hover effects
- **Professional UI**: Corporate color scheme with red accent colors

### 🔧 Technical Features
- **Angular 19**: Latest Angular framework with standalone components
- **TypeScript**: Full type safety and modern JavaScript features
- **Progressive Web App**: Optimized for performance and mobile devices
- **SEO Optimized**: Meta tags and semantic HTML structure
- **Accessibility**: WCAG compliant with proper ARIA labels

### 📧 Contact Integration
- **EmailJS Integration**: Serverless contact form functionality
- **Form Validation**: Real-time validation with user feedback
- **Success Notifications**: User-friendly confirmation messages

### 🏗️ Architecture
- **Standalone Components**: Modern Angular architecture
- **OnPush Change Detection**: Optimized performance
- **Reactive Forms**: Form handling with validation
- **Service Architecture**: Separation of concerns

## 🏗️ Build & Deployment

### Production Build
```bash
npm run build
```
Build artifacts will be stored in the `dist/` directory.

### Build Optimization
- **AOT Compilation**: Ahead-of-time compilation for smaller bundles
- **Tree Shaking**: Dead code elimination
- **Minification**: CSS and JavaScript optimization
- **Asset Optimization**: Image compression and optimization

## 🧪 Testing

### Unit Tests
```bash
npm test
```
Run unit tests via [Karma](https://karma-runner.github.io) with Jasmine framework.

### Test Coverage
```bash
npm run test:ci
```
Generate test coverage reports with ChromeHeadless.

## 🎯 Code Quality

### Formatting & Linting
```bash
npm run lint        # Check formatting
npm run lint:fix    # Auto-fix issues
```

### Code Organization
- **Prettier**: Consistent code formatting
- **Import Organization**: Automatic import sorting
- **TypeScript Strict Mode**: Enhanced type checking

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)  
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Contact Information

**Ilazi Innenausbau GmbH**
- 📍 Address: Boulevard Lilienthal 40, 8152 Opfikon Glattpark, Switzerland
- 📧 Email: info@ilazi-ausbau.ch
- 🌐 Website: [ilazi-ausbau.ch](https://ilazi-ausbau.ch)

## 🤝 Contributing

This is a private corporate website. For internal development:

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

This project is proprietary software owned by Ilazi Innenausbau GmbH. All rights reserved.
