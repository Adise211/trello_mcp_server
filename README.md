# Trello MCP Server

A Model Context Protocol (MCP) server that provides AI assistants with access to Trello's functionality. This server enables AI models to interact with Trello boards, lists, and cards programmatically.

## Prerequisites

- Node.js >= 18.0.0
- npm or yarn package manager
- Trello API credentials (API key and token)

## Installation

1. Clone this repository:

```bash
git clone <repository-url>
cd trello_mcp_server
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Configuration

### Getting Trello API Credentials

To use this MCP server, you need to obtain your Trello API key and token. Follow these steps:

1. Visit the [Trello REST API documentation](https://support.atlassian.com/trello/docs/getting-started-with-trello-rest-api/)
2. Follow the instructions to create a Power-Up and generate your API credentials
3. Once you have your API key and token, you'll add them to your MCP client configuration

### MCP Client Configuration

This is an MCP (Model Context Protocol) server that needs to be configured in your MCP client (Cursor or Claude Desktop).

#### For Cursor

Add the following configuration to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "trello-mcp-server": {
      "type": "stdio",
      "command": "node",
      "args": ["<path_to_this_project>/trello_mcp_server/dist/index.js"],
      "env": {
        "TRELLO_API_KEY": "your_api_key",
        "TRELLO_TOKEN": "your_token"
      }
    }
  }
}
```

#### For Claude Desktop

Add the following configuration to your Claude Desktop MCP settings:

```json
{
  "mcpServers": {
    "trello-mcp-server": {
      "type": "stdio",
      "command": "node",
      "args": ["<path_to_this_project>/trello_mcp_server/dist/index.js"],
      "env": {
        "TRELLO_API_KEY": "your_api_key",
        "TRELLO_TOKEN": "your_token"
      }
    }
  }
}
```

**Important Notes:**

- Replace `<path_to_this_project>` with the absolute path to your cloned repository
- Replace `your_api_key` and `your_token` with your actual Trello credentials
- Make sure the path points to the compiled `dist/index.js` file

## Usage

Once configured in your MCP client (Cursor or Claude Desktop), the Trello MCP server will be automatically available to AI assistants. You can then interact with Trello through natural language commands like:

- "Show me all my Trello boards"
- "Create a new card in my project board"
- "Move the 'Fix bug' card to the 'In Progress' list"
- "Add a comment to card XYZ"

### Using with MCP Inspector

To inspect and test the MCP server:

```bash
npm run inspect
```

## API Tools Reference

### Board Tools

| Tool                    | Description                         | Parameters      |
| ----------------------- | ----------------------------------- | --------------- |
| `get-boards`            | Get all boards for the current user | None            |
| `get-board-by-name`     | Get a Trello board by name          | `name` (string) |
| `get-board-by-id`       | Get a Trello board by ID            | `id` (string)   |
| `get-lists-by-board-id` | Get all lists for a specific board  | `id` (string)   |
| `get-cards-by-board-id` | Get all cards for a specific board  | `id` (string)   |

### List Tools

| Tool                   | Description                       | Parameters    |
| ---------------------- | --------------------------------- | ------------- |
| `get-list-by-id`       | Get a Trello list by ID           | `id` (string) |
| `get-cards-by-list-id` | Get all cards for a specific list | `id` (string) |

### Card Tools

| Tool                     | Description                     | Parameters                                                                                                          |
| ------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `create-card`            | Create a new Trello card        | `name` (string), `listId` (string), `desc` (string, optional), `due` (string, optional), `labels` (array, optional) |
| `update-card`            | Update an existing Trello card  | `id` (string), `name` (string, optional), `desc` (string, optional), `due` (string, optional)                       |
| `delete-card`            | Delete a Trello card            | `id` (string)                                                                                                       |
| `add-comment-to-card`    | Add a comment to a card         | `id` (string), `text` (string)                                                                                      |
| `add-attachment-to-card` | Add an attachment to a card     | `id` (string), `attachment` (File)                                                                                  |
| `move-card-to-list`      | Move a card to a different list | `id` (string), `listId` (string)                                                                                    |

## Example Usage

Here's how an AI assistant can interact with Trello through this MCP server:

### Natural Language Commands

- **"Show me all my Trello boards"** → Lists all available boards
- **"Find the 'Project Alpha' board"** → Searches for a specific board by name
- **"What lists are in my project board?"** → Retrieves all lists within a board
- **"Create a new task card in the 'To Do' list"** → Adds a new card to a specific list
- **"Update the 'Fix bug' card description"** → Modifies existing card details
- **"Move the 'Review PR' card to 'Done'"** → Moves cards between lists
- **"Add a comment to card XYZ"** → Adds comments to existing cards
- **"Delete the completed card ABC"** → Removes cards from boards

### Workflow Management

The MCP server enables AI assistants to help with:

- **Project tracking**: Moving cards through workflow stages
- **Task management**: Creating, updating, and organizing cards
- **Team collaboration**: Adding comments and managing card assignments
- **Board organization**: Structuring lists and managing board content

## Limitations

**Note**: This MCP server currently provides a limited set of Trello tools. More functionality will be added over time as the project evolves.

## Support

For issues and questions:

- Check the [Trello API documentation](https://support.atlassian.com/trello/docs/getting-started-with-trello-rest-api/)
- Review the project's issue tracker
- Create a new issue if you encounter problems

## Security Notes

- Keep your API credentials secure and never share them
- The token provides full access to your Trello account
- Regularly rotate your API credentials
- Monitor your API usage through Trello's interface
