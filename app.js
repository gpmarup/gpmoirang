// Network connectivity testing application
// Addresses common issues between VS Code and browser environments

// Display environment information
function displayEnvironmentInfo() {
    const info = {
        userAgent: navigator.userAgent,
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        port: window.location.port || (window.location.protocol === 'https:' ? '443' : '80'),
        pathname: window.location.pathname,
        isLiveServer: window.location.port === '5500' || window.location.port === '5501', // Common Live Server ports
        isLocalhost: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    };
    
    const envElement = document.getElementById('environment-info');
    envElement.innerHTML = `
        <strong>Current Environment:</strong><br>
        Protocol: ${info.protocol}<br>
        Hostname: ${info.hostname}<br>
        Port: ${info.port}<br>
        Path: ${info.pathname}<br>
        Is Live Server: ${info.isLiveServer ? 'Yes' : 'No'}<br>
        Is Localhost: ${info.isLocalhost ? 'Yes' : 'No'}<br>
        User Agent: ${info.userAgent.substring(0, 100)}...
    `;
}

// Test local API connection
async function testLocalAPI() {
    const resultElement = document.getElementById('local-api-result');
    resultElement.className = 'result loading';
    resultElement.textContent = 'Testing local API connection...';
    
    try {
        // Try to create a simple local server endpoint simulation
        const response = await fetch('./api/test', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.ok) {
            const data = await response.text();
            resultElement.className = 'result success';
            resultElement.textContent = `Success: ${data}`;
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        resultElement.className = 'result error';
        resultElement.textContent = `Error: ${error.message}\n\nThis is expected if no local API server is running.\nSolution: Start a development server with proper CORS configuration.`;
    }
}

// Test external API with CORS considerations
async function testExternalAPI() {
    const resultElement = document.getElementById('external-api-result');
    resultElement.className = 'result loading';
    resultElement.textContent = 'Testing external API connection...';
    
    try {
        // Use a public API that supports CORS
        const response = await fetch('https://httpbin.org/json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            resultElement.className = 'result success';
            resultElement.textContent = `Success: Connected to external API\nResponse: ${JSON.stringify(data, null, 2)}`;
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        resultElement.className = 'result error';
        resultElement.textContent = `Error: ${error.message}\n\nCommon causes:\n- CORS policy blocking the request\n- Network connectivity issues\n- Firewall or proxy blocking the request\n\nSolutions:\n- Use a CORS proxy\n- Configure server to allow cross-origin requests\n- Check VS Code settings for proxy configuration`;
    }
}

// Test WebSocket connection
function testWebSocket() {
    const resultElement = document.getElementById('websocket-result');
    resultElement.className = 'result loading';
    resultElement.textContent = 'Testing WebSocket connection...';
    
    try {
        // Test WebSocket connection to a public echo service
        const ws = new WebSocket('wss://echo.websocket.org');
        
        ws.onopen = function() {
            resultElement.className = 'result success';
            resultElement.textContent = 'WebSocket connection opened successfully!';
            ws.send('Hello WebSocket!');
        };
        
        ws.onmessage = function(event) {
            resultElement.textContent += `\nReceived: ${event.data}`;
            ws.close();
        };
        
        ws.onerror = function(error) {
            resultElement.className = 'result error';
            resultElement.textContent = `WebSocket Error: ${error}\n\nCommon causes in VS Code:\n- Live Server doesn't support WebSocket proxying\n- Port conflicts\n- Security restrictions\n\nSolutions:\n- Use a dedicated development server\n- Configure WebSocket proxy\n- Check VS Code WebSocket settings`;
        };
        
        ws.onclose = function() {
            if (resultElement.className === 'result success') {
                resultElement.textContent += '\nWebSocket connection closed cleanly.';
            }
        };
        
        // Set timeout for connection attempt
        setTimeout(() => {
            if (ws.readyState === WebSocket.CONNECTING) {
                ws.close();
                resultElement.className = 'result error';
                resultElement.textContent = 'WebSocket connection timeout\n\nThis might indicate network issues or WebSocket blocking.';
            }
        }, 5000);
        
    } catch (error) {
        resultElement.className = 'result error';
        resultElement.textContent = `WebSocket Error: ${error.message}`;
    }
}

// Enhanced error handling for common VS Code issues
function handleVSCodeSpecificIssues() {
    // Check if running in VS Code Live Server
    if (window.location.port === '5500' || window.location.port === '5501') {
        console.log('Running in VS Code Live Server environment');
        
        // Add specific configurations for Live Server
        const meta = document.createElement('meta');
        meta.setAttribute('http-equiv', 'Content-Security-Policy');
        meta.setAttribute('content', "default-src 'self' 'unsafe-inline' 'unsafe-eval' *; connect-src 'self' ws: wss: http: https:;");
        document.head.appendChild(meta);
    }
    
    // Add global error handler for network issues
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
        if (event.reason.message && event.reason.message.includes('CORS')) {
            console.warn('CORS issue detected. Consider using a development server with proper CORS configuration.');
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayEnvironmentInfo();
    handleVSCodeSpecificIssues();
    
    // Auto-test on load to demonstrate differences
    console.log('Application loaded. Environment:', {
        isVSCodeLiveServer: window.location.port === '5500' || window.location.port === '5501',
        protocol: window.location.protocol,
        hostname: window.location.hostname
    });
});