# Armiyau Yushau - Professional Football Player Portfolio

A modern, professional React portfolio website for Armiyau Yushau, a talented football player representing Katsina United and Nigeria U-20 national team.

## 🚀 Features

- **Modern React Architecture**: Built with React 18, TypeScript, and styled-components
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Professional UI/UX**: Clean, modern design with professional football player aesthetics
- **Performance Optimized**: Fast loading times and optimized assets
- **SEO Friendly**: Properly structured with meta tags and semantic HTML

## 🎯 Sections

- **Hero Section**: Dynamic introduction with player information and call-to-action
- **Information Cards**: Key player stats (birth place, date, weight, height)
- **About Section**: Detailed biography, stats, and career information
- **Skills Section**: Animated skill bars showing football abilities
- **Portfolio Pages**: Blog, Awards, and Contact sections

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Styled-components with custom theme system
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Build Tool**: Create React App
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter & Playfair Display)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohashyne/armiyau-portfolio.git
   cd armiyau-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗️ Available Scripts

### `npm start`
Runs the app in development mode with hot reloading.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder with optimizations.

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App setup.

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Site footer
│   │   └── Layout.tsx          # Main layout wrapper
│   ├── Home/
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Information.tsx     # Info cards section
│   │   ├── About.tsx           # About section
│   │   └── Skills.tsx          # Skills section
│   └── UI/
│       ├── Preloader.tsx       # Loading animation
│       └── ScrollToTop.tsx     # Scroll to top button
├── pages/
│   ├── Home.tsx                # Main landing page
│   ├── Blog.tsx                # Blog page
│   ├── BlogSingle.tsx          # Individual blog post
│   ├── Awards.tsx              # Awards page
│   └── Contact.tsx             # Contact page
├── styles/
│   ├── GlobalStyles.ts         # Global CSS styles
│   └── theme.ts                # Theme configuration
└── App.tsx                     # Main app component
```

## 🎨 Design System

### Colors
- **Primary**: #ff6b35 (Orange)
- **Secondary**: #1a1a1a (Dark)
- **Accent**: #ffd700 (Gold)
- **Background**: #ffffff (White)
- **Grey Scale**: Multiple shades for text and UI elements

### Typography
- **Primary Font**: Inter (Clean, modern sans-serif)
- **Secondary Font**: Playfair Display (Elegant serif for headings)

### Spacing
Consistent spacing scale from 0.25rem to 16rem using theme system.

## 📱 Responsive Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 🔧 Customization

### Theme Configuration
Edit `src/styles/theme.ts` to customize:
- Colors
- Fonts
- Spacing
- Breakpoints
- Shadows
- Border radius

### Content Updates
Update player information in respective component files:
- Personal info: `src/components/Home/Information.tsx`
- Biography: `src/components/Home/About.tsx`
- Skills: `src/components/Home/Skills.tsx`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deployment Options

#### 🌐 Render (Recommended)
This project is configured for automatic deployment to Render:

1. **Push to GitHub** (already done)
2. **Connect to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Static Site"
   - Connect your GitHub repository: `mohashyne/armiyau-portfolio`
   - Render will auto-detect the configuration from `render.yaml`
3. **Deploy**: Render will automatically build and deploy your site
4. **Live URL**: Your site will be available at `https://armiyau-portfolio.onrender.com`

#### Other Options
- **Netlify**: Drag and drop the build folder
- **Vercel**: Connect GitHub repository for automatic deployments
- **GitHub Pages**: Use `gh-pages` package
- **Firebase Hosting**: Use Firebase CLI

## 📄 Assets

Ensure all images are placed in `public/assets/images/` with the following structure:
```
public/assets/
├── images/
│   ├── banner/
│   │   ├── banner-bg.jpg
│   │   ├── banner.png
│   │   └── sign.png
│   ├── about/
│   │   └── about.png
│   ├── logo/
│   │   └── logo.png
│   └── gallery/
│       ├── g1.jpg
│       ├── g2.jpg
│       └── ...
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please contact:
- **Email**: [contact-email]
- **GitHub Issues**: Create an issue in this repository

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Original design inspiration from football portfolio templates
- Framer Motion for smooth animations
- React community for excellent documentation
- Font Awesome for beautiful icons
- Google Fonts for typography

---

**Built with ❤️ for Armiyau Yushau**
