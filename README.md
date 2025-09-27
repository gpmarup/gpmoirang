# GPMoirang - Network Error Fix Demo

This project demonstrates and fixes common network connectivity issues between VS Code development environment and browser environments.

## Problem Statement

"Why network error in VS Code but it works in browser?" - This is a common issue developers face when building web applications.

## Common Issues Addressed

- **CORS Policy Errors**: API requests blocked by cross-origin restrictions
- **Localhost vs 127.0.0.1 Issues**: DNS resolution differences
- **Port Conflicts**: Different development servers using different ports
- **WebSocket Connection Problems**: Real-time connections failing in VS Code
- **Development Server Configuration**: Improper setup causing network failures

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open in VS Code with Live Server**:
   - Right-click on `index.html`
   - Select "Open with Live Server"

4. **Test network connectivity** using the web interface

## Features

- **Network Testing Interface**: Interactive web page to test different connection types
- **VS Code Configuration**: Pre-configured settings for Live Server and debugging
- **CORS-Enabled Server**: Express server with proper CORS configuration
- **Comprehensive Documentation**: Detailed troubleshooting guide

## Files Structure

- `index.html` - Main testing interface
- `app.js` - Network testing JavaScript
- `server.js` - Express server with CORS fixes
- `.vscode/` - VS Code configuration files
- `NETWORK_TROUBLESHOOTING.md` - Detailed troubleshooting guide

## Solutions Implemented

✅ **CORS Configuration**: Proper cross-origin headers for VS Code Live Server
✅ **Port Management**: Consistent port configuration across environments  
✅ **WebSocket Support**: Proper WebSocket connection handling
✅ **Debug Configuration**: Browser debugging setup for VS Code
✅ **Environment Detection**: Automatic detection of VS Code vs browser environment

## Usage

The web interface provides interactive tests for:
- Local API connectivity
- External API requests (with CORS)
- WebSocket connections
- Environment information display

Each test shows detailed error messages and solutions when issues occur.

## Contributing

If you encounter other network issues between VS Code and browser environments, please open an issue with:
- Description of the problem
- Environment details (VS Code version, browser, OS)
- Error messages
- Steps to reproduce

## License

MIT License - See LICENSE file for details