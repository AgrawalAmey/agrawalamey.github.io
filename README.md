# Amey Agrawal's Personal Website

A terminal-inspired personal website built with Astro, showcasing research publications, blog posts, and projects.

## 🚀 Features

- **Terminal-Inspired Design**: Clean, monospace aesthetic with terminal-style commands
- **Fast & Static**: Built with Astro for optimal performance
- **Research Portfolio**: Organized display of publications with links to PDFs, code, and more
- **Blog**: Technical blog posts with syntax highlighting and responsive images
- **Dark/Light Themes**: Random theme selection from curated terminal themes
- **Responsive**: Mobile-first design that works on all devices

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AgrawalAmey/agrawalamey.github.io.git
   cd agrawalamey.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Your site will be available at `http://localhost:4321`

## 📁 Project Structure

```
/
├── public/             # Static assets (images, PDFs, etc.)
│   ├── cv.pdf         # Your CV
│   ├── images/        # Blog post images
│   └── project-list-thumbnails/  # Project thumbnails
├── src/
│   ├── components/    # Astro components
│   ├── content/       # Content collections
│   │   ├── home.md   # Homepage bio
│   │   ├── posts/    # Blog posts
│   │   └── projects/ # Research publications
│   ├── layouts/      # Page layouts
│   ├── pages/        # Route pages
│   └── styles/       # Global styles
└── astro.config.mjs  # Astro configuration
```

## ✏️ Adding Content

### Research Publications

Add a new `.md` file to `src/content/projects/`:

```markdown
---
title: "Your Paper Title"
published: 2024-01-01
venue: "Conference Name"
authors: "Author 1, Author 2, Author 3"
links:
  pdf: "https://link-to-pdf"
  code: "https://github.com/..."
  video: "https://youtube.com/..."
thumbnail: "/project-list-thumbnails/your-project.png"
---
```

### Blog Posts

Add a new `.md` file to `src/content/posts/`:

```markdown
---
title: "Your Blog Post Title"
published: 2024-01-01
tags: ["tag1", "tag2"]
description: "Brief description"
---

Your content here...
```

### Update Personal Info

1. Edit `src/content/home.md` for your bio
2. Update `src/site.config.ts` with your information:
   - Name
   - Social links
   - Site metadata

## 🎨 Customization

### Profile Image
Replace `src/content/me.jpg` with your profile photo (square format recommended)

### CV
Replace `public/cv.pdf` with your CV

### Themes
The site randomly selects from terminal-inspired themes. To modify:
- Edit the theme list in `src/components/RandomThemeLoader.astro`

## 🚀 Building for Production

```bash
npm run build
```

The built site will be in the `dist/` directory.

## 📦 Deployment

### GitHub Pages (Recommended)

1. Push your code to GitHub
2. The included GitHub Action will automatically build and deploy to GitHub Pages
3. Ensure GitHub Pages is enabled in your repository settings

### Manual Deployment

```bash
npm run build
# Deploy the contents of dist/ to your hosting provider
```

## 🔧 Configuration

### Site Configuration
Edit `src/site.config.ts` to update:
- Site title and description
- Navigation links
- Social media links
- Theme settings

### GitHub Actions
The workflow file `.github/workflows/deploy.yml` handles automatic deployment to GitHub Pages.

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Acknowledgments

Built with:
- [Astro](https://astro.build)
- [MultiTerm Theme](https://github.com/stelcodes/multiterm-astro) (as base)
- Terminal-inspired design elements