const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
        }
    }
}));

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-domain.com'] 
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting for contact form
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        error: 'Too many contact form submissions, please try again later.'
    }
});

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// Email configuration
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'shekharxsingh57@gmail.com',
            pass: process.env.EMAIL_PASS // App password required for Gmail
        }
    });
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Please provide a valid email address'
            });
        }

        const transporter = createTransporter();

        // Email to yourself (notification)
        const notificationEmail = {
            from: process.env.EMAIL_USER || 'shekharxsingh57@gmail.com',
            to: 'shekharxsingh57@gmail.com',
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Portfolio Contact</h2>

                    <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
                        <p><strong style="color: #6366f1;">Name:</strong> ${name}</p>
                        <p><strong style="color: #6366f1;">Email:</strong> ${email}</p>
                        <p><strong style="color: #6366f1;">Subject:</strong> ${subject}</p>
                    </div>

                    <div style="margin: 20px 0;">
                        <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
                        <div style="padding: 15px; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 5px; line-height: 1.6;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>

                    <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px; font-size: 12px; color: #666;">
                        <p><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
                        <p><strong>From:</strong> Portfolio Website Contact Form</p>
                    </div>
                </div>
            `
        };

        // Auto-reply email to sender
        const autoReplyEmail = {
            from: process.env.EMAIL_USER || 'shekharxsingh57@gmail.com',
            to: email,
            subject: 'Thank you for contacting me!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #6366f1; text-align: center; margin-bottom: 20px;">Thank You for Reaching Out!</h2>

                    <div style="text-align: center; margin: 20px 0;">
                        <img src="https://via.placeholder.com/100x100/6366f1/ffffff?text=SS" alt="Shekhar Singh" style="border-radius: 50%; width: 100px; height: 100px;">
                    </div>

                    <p style="color: #333; line-height: 1.6;">Hi <strong>${name}</strong>,</p>

                    <p style="color: #333; line-height: 1.6;">
                        Thank you for taking the time to contact me! I've received your message and I'm excited to connect with you.
                    </p>

                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #6366f1; margin-top: 0;">Your message summary:</h3>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p style="font-style: italic;">"${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"</p>
                    </div>

                    <p style="color: #333; line-height: 1.6;">
                        I typically respond to messages within <strong>24-48 hours</strong>. If your inquiry is urgent, 
                        feel free to connect with me on LinkedIn or check out my latest projects on GitHub.
                    </p>

                    <div style="text-align: center; margin: 30px 0;">
                        <a href="https://www.linkedin.com/in/shekhar-singh-a5b43b377" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #0077b5; color: white; text-decoration: none; border-radius: 5px;">LinkedIn</a>
                        <a href="https://github.com/shekhar-codes" style="display: inline-block; margin: 0 10px; padding: 10px 20px; background-color: #333; color: white; text-decoration: none; border-radius: 5px;">GitHub</a>
                    </div>

                    <p style="color: #333; line-height: 1.6;">
                        Looking forward to our conversation!
                    </p>

                    <p style="color: #333; line-height: 1.6;">
                        Best regards,<br>
                        <strong>Shekhar Singh</strong><br>
                        <span style="color: #666;">AI/ML Engineer & Python Developer</span>
                    </p>

                    <div style="border-top: 1px solid #e0e0e0; margin-top: 30px; padding-top: 20px; text-align: center; font-size: 12px; color: #666;">
                        <p>This is an automated response. Please do not reply directly to this email.</p>
                    </div>
                </div>
            `
        };

        // Send both emails
        await transporter.sendMail(notificationEmail);
        await transporter.sendMail(autoReplyEmail);

        res.status(200).json({
            success: true,
            message: 'Message sent successfully! I\'ll get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send message. Please try again later.'
        });
    }
});

// Analytics endpoint (optional)
app.post('/api/analytics', (req, res) => {
    const { event, data } = req.body;

    // Log analytics data (in production, you might want to use a proper analytics service)
    console.log(`Analytics Event: ${event}`, data);

    res.status(200).json({ success: true });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Page not found'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Email configured for: ${process.env.EMAIL_USER || 'shekharxsingh57@gmail.com'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;