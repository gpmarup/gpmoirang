const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes - this fixes the main VS Code network issue
app.use(cors({
    origin: [
        'http://localhost:5500',  // VS Code Live Server default port
        'http://localhost:5501',  // VS Code Live Server alternative port
        'http://127.0.0.1:5500',  // Local IP version
        'http://127.0.0.1:5501',  // Local IP version
        'http://localhost:8080',  // http-server default port
        'file://'                 // Direct file access
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// API routes to test network connectivity
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API connection successful!',
        timestamp: new Date().toISOString(),
        environment: 'Node.js Express Server',
        cors: 'Enabled',
        origin: req.get('Origin') || 'No origin header',
        userAgent: req.get('User-Agent') || 'No user agent'
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        server: 'Express',
        cors: 'configured',
        timestamp: new Date().toISOString()
    });
});

// Test endpoint that simulates common API patterns
app.post('/api/echo', (req, res) => {
    res.json({
        received: req.body,
        echo: 'Data received successfully',
        headers: {
            contentType: req.get('Content-Type'),
            origin: req.get('Origin')
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        path: req.path,
        message: 'The requested resource was not found'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('CORS enabled for VS Code Live Server compatibility');
    console.log('Available endpoints:');
    console.log('  GET  /api/test   - Test API connectivity');
    console.log('  GET  /api/health - Health check');
    console.log('  POST /api/echo   - Echo request data');
    console.log('\nTo fix VS Code network issues:');
    console.log('1. Run this server: npm start');
    console.log('2. Open index.html in VS Code with Live Server');
    console.log('3. Test the API endpoints from the web interface');
});