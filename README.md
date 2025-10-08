# 🚀 Shekhar Singh - Portfolio Website

A modern, fully responsive, and interactive fullstack portfolio website showcasing Shekhar Singh's work as an AI/ML Engineer, Data Scientist, and Python Developer.

## ✨ Features

- **Modern Design**: Sleek, cinematic UI with smooth animations and transitions
- **Fully Responsive**: Perfect display on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, particle animations, and smooth scrolling
- **Contact Form**: Functional email integration with auto-reply
- **Performance Optimized**: Fast loading with optimized assets
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Nodemailer** - Email functionality
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting

## 📁 Project Structure

```
shekhar-portfolio/
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── app.js              # Frontend JavaScript
├── server.js           # Backend server
├── package.json        # Node.js dependencies
├── .env                # Environment variables
├── post-2_1.jpg        # Profile image
└── README.md           # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Gmail account for email functionality

### Installation

1. **Clone or download the project files**
```bash
# If using git
git clone <repository-url>
cd shekhar-portfolio

# Or simply extract the downloaded files
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Edit .env file with your details
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

4. **Start the development server**
```bash
# Development mode with auto-restart
npm run dev

# Or production mode
npm start
```

5. **Open in browser**
```
http://localhost:3000
```

## 📧 Email Setup

To enable the contact form functionality:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Update .env file** with your Gmail credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

## 🎨 Customization

### Personal Information
Edit the following in `index.html`:
- Profile image: Replace `post-2_1.jpg`
- Personal details: Update name, title, bio
- Skills: Modify skills section
- Projects: Update project information
- Social links: Change LinkedIn, GitHub URLs

### Styling
Modify `style.css` to customize:
- Color scheme (CSS variables in `:root`)
- Animations and transitions
- Layout and spacing
- Typography

### Functionality
Enhance `app.js` for additional features:
- Add new animations
- Modify interactive effects
- Extend form functionality

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Backend API Endpoints

### POST /api/contact
Send contact form messages
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "subject": "Subject",
  "message": "Message content"
}
```

### GET /health
Server health check
```json
{
  "status": "OK",
  "timestamp": "2025-10-08T09:00:00.000Z"
}
```

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Platform Deployment
The project can be deployed on:
- **Heroku**: Add `Procfile` with `web: node server.js`
- **Vercel**: Configure as Node.js project
- **Netlify**: Deploy frontend as static site
- **Railway**: Direct Node.js deployment

## 📊 Performance Features

- **Lazy loading** for images and sections
- **Minified assets** for faster loading
- **Optimized animations** with CSS transforms
- **Compressed responses** with gzip
- **Rate limiting** for API endpoints

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration
- **Rate limiting** on contact form
- **Input validation** and sanitization
- **Environment variable** protection

## 🎯 SEO Optimization

- Semantic HTML5 structure
- Meta tags and descriptions
- Open Graph tags
- Proper heading hierarchy
- Alt tags for images
- Schema markup ready

## 📱 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🔄 Future Enhancements

- [ ] Blog section integration
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Database integration for contact messages
- [ ] Admin panel for content management
- [ ] Analytics dashboard
- [ ] Progressive Web App (PWA) features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Shekhar Singh**
- 🌐 Portfolio: [Your Website URL]
- 💼 LinkedIn: [https://www.linkedin.com/in/shekhar-singh-a5b43b377](https://www.linkedin.com/in/shekhar-singh-a5b43b377)
- 🐱 GitHub: [https://github.com/shekhar-codes](https://github.com/shekhar-codes)
- 📧 Email: [shekharxsingh57@gmail.com](mailto:shekharxsingh57@gmail.com)

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Inspiration from modern portfolio designs
- Node.js and Express.js communities

---

**Built with ❤️ and modern web technologies**

*If you found this project helpful, please give it a ⭐ on GitHub!*