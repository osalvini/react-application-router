const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy configuration for Biometric Barrier
const domain1Proxy = createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true
});

// Proxy configuration for Salon About Beauty
const domain2Proxy = createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true
});

app.use((req, res, next) => {
    console.log('Request: ', req.hostname);
    next();
});

// Use the proxies based on domain names
app.use((req, res, next) => {
    if (req.hostname === 'biometricbarrier.com') {
        return domain1Proxy(req, res, next);
    } else if (req.hostname === 'salonaboutbeauty.com') {
        return domain2Proxy(req, res, next);
    }
    next();
});

// Default route for unmatched domains
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

// Start the server on port 80
app.listen(80, () => {
    console.log('Proxy server running on port 80');
});
