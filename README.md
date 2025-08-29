# 🍽️ Bar Guantanamera - Restaurant Website

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/ceradevs-projects/v0-guanatamera-restaurant-web)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Built with React](https://img.shields.io/badge/Built%20with-React-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Built with Tailwind CSS](https://img.shields.io/badge/Built%20with-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A modern, responsive restaurant website for **Bar Guantanamera**, showcasing their authentic Cuban cuisine, menu, photo gallery, and location information. Built with cutting-edge web technologies for an exceptional user experience.

## ✨ Features

- **🏠 Hero Section** - Eye-catching introduction with restaurant highlights
- **🍖 Menu Section** - Interactive menu showcasing Cuban specialties
- **📸 Photo Gallery** - Beautiful images of the restaurant and food
- **⭐ Testimonials** - Customer reviews and feedback
- **📍 Location & Map** - Interactive map with restaurant location
- **📱 Order Section** - Easy ordering and contact information
- **📞 Floating Call Button** - Quick access to phone contact
- **🌙 Theme Support** - Light/dark mode toggle
- **📱 Responsive Design** - Optimized for all devices
- **🚀 Performance Optimized** - Fast loading with Next.js

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful, customizable icons
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- **Forms**: [React Hook Form](https://react-hook-form.com/) - Performant forms with validation
- **Deployment**: [Vercel](https://vercel.com/) - Zero-config deployment platform

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ 
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bar-restaurant-web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
bar-restaurant-web/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── common/            # Shared components
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   └── ui/                # UI components
├── data/                  # Static data files
│   ├── gallery-data.json  # Photo gallery data
│   ├── menu-data.json     # Menu items data
│   └── testimonials-data.json
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── public/                # Static assets
│   ├── images/            # Images and media
│   └── docs/              # Documents
├── styles/                # Additional styles
└── types/                 # TypeScript type definitions
```

## 🎨 Available Scripts

- **`pnpm dev`** - Start development server
- **`pnpm build`** - Build for production
- **`pnpm start`** - Start production server
- **`pnpm lint`** - Run ESLint

## 🌐 Deployment

The project is automatically deployed on [Vercel](https://vercel.com/ceradevs-projects/v0-guanatamera-restaurant-web).

### Manual Deployment

1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

## 📱 Features in Detail

### Menu Section
- Interactive menu with categories
- Beautiful food photography
- Responsive grid layout
- Smooth animations

### Photo Gallery
- High-quality restaurant images
- Responsive image grid
- Optimized loading performance
- Video content support

### Location & Map
- Google Maps integration
- Restaurant location details
- Interactive map component
- Contact information

### Order Section
- Easy ordering interface
- Contact forms
- Phone number integration
- Social media links

## 🔧 Configuration

### Google Maps Setup
See [GOOGLE_MAPS_SETUP.md](./GOOGLE_MAPS_SETUP.md) for detailed setup instructions.

### Favicon Configuration
See [FAVICON_SETUP.md](./FAVICON_SETUP.md) for favicon setup.

### Icon Configuration
See [ICONO_BAR_SETUP.md](./ICONO_BAR_SETUP.md) for restaurant icon setup.

## 🎯 Customization

### Adding New Menu Items
Edit `data/menu-data.json` to add new menu categories and items.

### Updating Photos
Add new images to `public/images/gallery/` and update `data/gallery-data.json`.

### Modifying Testimonials
Edit `data/testimonials-data.json` to update customer reviews.

## 🚀 Performance Features

- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Static Generation** - Pre-rendered pages for fast loading
- **Lazy Loading** - Optimized component loading
- **SEO Optimization** - Meta tags and structured data

## 📱 Responsive Design

The website is fully responsive and optimized for:
- 📱 Mobile devices
- 💻 Desktop computers
- 📱 Tablets
- 🖥️ Large screens

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Bar Guantanamera.

## 📞 Contact

- **Restaurant**: Bar Guantanamera
- **Website**: [Live Demo](https://vercel.com/ceradevs-projects/v0-guanatamera-restaurant-web)
- **Development**: Built with modern web technologies

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)

---

**Made with ❤️ for Bar Guantanamera**
