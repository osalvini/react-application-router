const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();



// Define the proxy rules
const domain1Proxy = createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    router: (req) => {
        return req.hostname === 'biometricbarrier.com' ? 'http://localhost:3000' : undefined;
    }
});

const domain2Proxy = createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
    router: (req) => {
        return req.hostname === 'salonaboutbeauty.com' ? 'http://localhost:3002' : undefined;

    }
});

app.use((req, res, next) => {
    console.log('Request: ', req.hostname); // Log hostname to debug
    next();
});

// Use the proxies based on domain names
app.use(domain1Proxy);
app.use(domain2Proxy);

// Default route for unmatched domains
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

// Start the server on port 80
app.listen(80, () => {
    console.log('Proxy server running on port 80');
});
