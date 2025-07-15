# MCP (Model Context Protocol) Setup

This project is configured to use Microsoft's Playwright MCP for browser automation capabilities in Cursor.

## What is MCP?

Model Context Protocol (MCP) allows AI assistants to interact with external tools and services. In this case, we're using the Playwright MCP to enable browser automation capabilities.

## Setup

The MCP server is already configured and ready to use. The following files have been set up:

- `.cursorrules` - Cursor configuration and project guidelines
- `.cursor/settings.json` - MCP server configuration
- `scripts/start-mcp-server.js` - Script to manually start the MCP server
- `package.json` - Added `mcp:start` script

## Usage

### Automatic Connection

Cursor should automatically connect to the Playwright MCP server when you open the project. The server will be started automatically when needed.

### Manual Start

If you need to start the MCP server manually:

```bash
npm run mcp:start
```

### What You Can Do

With the Playwright MCP connected, you can:

1. **Browser Automation**: Control web browsers programmatically
2. **Web Testing**: Run automated tests and capture screenshots
3. **Web Scraping**: Extract data from websites
4. **UI Testing**: Test your application's user interface
5. **Automation Workflows**: Create complex browser-based workflows

### Example Commands

Once connected, you can ask Cursor to:

- "Take a screenshot of the homepage"
- "Test the login functionality"
- "Navigate to the about page and check the content"
- "Automate form submission"
- "Extract data from a specific website"

## Troubleshooting

If the MCP connection isn't working:

1. Make sure you're using the latest version of Cursor
2. Check that the `@playwright/mcp` package is installed: `npm list @playwright/mcp`
3. Try restarting Cursor
4. Run `npm run mcp:start` to manually start the server

## Configuration Files

- **`.cursorrules`**: Project-specific rules and context for Cursor
- **`.cursor/settings.json`**: MCP server configuration
- **`scripts/start-mcp-server.js`**: Manual server startup script

## Dependencies

- `@playwright/mcp`: The MCP server package (installed as dev dependency)
- `@playwright/test`: Playwright testing framework (already installed)

## Security Note

The MCP server runs locally and only provides browser automation capabilities. It doesn't expose any external network access or security risks.
