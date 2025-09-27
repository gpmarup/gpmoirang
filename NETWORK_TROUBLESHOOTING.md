# Network Error Troubleshooting: VS Code vs Browser

This document explains common network connectivity issues when developing web applications in VS Code compared to running them directly in a browser, and provides solutions.

## Common Issues

### 1. CORS (Cross-Origin Resource Sharing) Errors

**Problem**: APIs work when accessed directly in browser but fail in VS Code Live Server
**Symptoms**: 
- Console errors like "CORS policy blocked the request"
- Network requests fail with status 0 or CORS errors
- Works in browser but not in VS Code environment

**Solution**:
- Configure server with proper CORS headers
- Use the provided Express server with CORS enabled
- Set up VS Code Live Server with proxy configuration

### 2. Localhost vs 127.0.0.1 Issues

**Problem**: DNS resolution differences between environments
**Symptoms**:
- Works with one address but not the other
- Intermittent connection issues

**Solution**:
- Use 127.0.0.1 instead of localhost for consistency
- Configure both in CORS allowlist
- Set up proper hosts file if needed

### 3. Port Conflicts and Binding Issues

**Problem**: Different ports used by different development servers
**Symptoms**:
- Service unavailable errors
- Connection refused errors

**Solution**:
- Use consistent port configurations
- Check for port conflicts
- Configure VS Code Live Server port settings

### 4. WebSocket Connection Issues

**Problem**: WebSocket connections fail in VS Code environment
**Symptoms**:
- WebSocket connection errors
- Real-time features not working

**Solution**:
- Configure WebSocket proxy in VS Code
- Use secure WebSocket connections (WSS)
- Set up proper WebSocket CORS headers

## Quick Fix Checklist

- [ ] **Install VS Code Live Server Extension**
  ```
  ext install ritwickdey.LiveServer
  ```

- [ ] **Configure VS Code Settings** (see `.vscode/settings.json`)
  - Set proper port (5500)
  - Enable CORS
  - Configure proxy settings

- [ ] **Set up Development Server** with CORS
  ```bash
  npm install
  npm start
  ```

- [ ] **Test Network Connectivity**
  - Open `index.html` in VS Code with Live Server
  - Run the network tests in the web interface
  - Check browser console for errors

- [ ] **Configure Browser Debug Settings** (see `.vscode/launch.json`)
  - Disable web security for development
  - Allow insecure content
  - Set proper debugging ports

## File Structure

```
├── index.html              # Main test interface
├── app.js                  # Network testing JavaScript
├── server.js              # Express server with CORS
├── package.json           # Dependencies and scripts
├── .vscode/
│   ├── settings.json      # VS Code Live Server configuration
│   └── launch.json        # Browser debugging configuration
└── NETWORK_TROUBLESHOOTING.md  # This file
```

## Usage Instructions

### For VS Code Development:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Backend Server**:
   ```bash
   npm start
   ```

3. **Open in VS Code**:
   - Open this project in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"

4. **Test Network Connectivity**:
   - Use the buttons in the web interface to test different connection types
   - Check the results and error messages
   - Compare behavior between VS Code and direct browser access

### For Direct Browser Access:

1. **Serve Files Statically**:
   ```bash
   npm run serve
   ```

2. **Open in Browser**:
   - Navigate to `http://localhost:8080`
   - Run the same network tests
   - Compare results with VS Code environment

## Common Solutions Applied

### 1. CORS Configuration
The Express server includes comprehensive CORS setup:
```javascript
app.use(cors({
    origin: [
        'http://localhost:5500',  // VS Code Live Server
        'http://127.0.0.1:5500',  // Local IP version
        'file://'                 // Direct file access
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
```

### 2. VS Code Live Server Configuration
The `.vscode/settings.json` includes:
- Proper port configuration
- CORS enablement
- Proxy settings for API routing
- Custom browser settings

### 3. Debug Configuration
The `.vscode/launch.json` includes:
- Chrome and Edge debug configurations
- Security flags disabled for development
- Proper localhost URL configuration

### 4. Content Security Policy
The HTML includes flexible CSP headers for development:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self' 'unsafe-inline' 'unsafe-eval' *; connect-src 'self' ws: wss: http: https:;">
```

## Testing the Fix

1. **Run the provided server**: `npm start`
2. **Open in VS Code Live Server**: Right-click `index.html` → "Open with Live Server"
3. **Test all network functionality** using the web interface
4. **Compare with direct browser access** to verify consistent behavior

The network test interface will show:
- Environment information
- Local API connectivity status
- External API connectivity status  
- WebSocket connectivity status
- Specific error messages and solutions

## Additional Resources

- [VS Code Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)  
- [VS Code Debugging Guide](https://code.visualstudio.com/docs/editor/debugging)