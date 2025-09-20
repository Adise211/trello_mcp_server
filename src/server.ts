// Load environment variables FIRST, before importing any other modules
import dotenv from "dotenv";
dotenv.config();

import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { boardService } from "./services/board.service";
import { listService } from "./services/list.service";
import { cardService } from "./services/card.service";
import {
  cardSchema,
  CardLabel,
  createCardSchema,
  updateCardSchema,
} from "./schema/card.schema";

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});

// Get Trello boards
server.registerTool(
  "get-boards",
  {
    title: "Get Boards",
    description: "Get all boards for the current user",
    inputSchema: {},
  },
  async () => {
    const response = await boardService.getBoards();
    const data = await response;
    const boardsList = data.map((board: any) => {
      return {
        id: board.id,
        name: board.name,
        description: board.desc,
        url: board.url,
      };
    });

    return {
      content: [{ type: "text", text: JSON.stringify(boardsList) }],
    };
  }
);

// Get Trello board by name
server.registerTool(
  "get-board-by-name",
  {
    title: "Get Board by Name",
    description: "Get a Trello board by name",
    inputSchema: { name: z.string().describe("The name of the board to get") },
  },
  async ({ name }) => {
    const response = await boardService.getBoardByName(name.trim());
    const data = await response;

    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

// Get Trello board by id
server.registerTool(
  "get-board-by-id",
  {
    title: "Get Board by ID",
    description: "Get a Trello board by id",
    inputSchema: { id: z.string().describe("The id of the board to get") },
  },
  async ({ id }) => {
    const response = await boardService.getBoardById(id.trim());
    const data = await response;

    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

// Get Trello lists by board ID
server.registerTool(
  "get-lists-by-board-id",
  {
    title: "Get Lists by Board ID",
    description: "Get a Trello lists by board id",
    inputSchema: {
      id: z.string().describe("The id of the board to get lists"),
    },
  },
  async ({ id }) => {
    const response = await boardService.getListsByBoardId(id.trim());
    const data = await response;

    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

// Get Trello list by id
server.registerTool(
  "get-list-by-id",
  {
    title: "Get List by ID",
    description: "Get a Trello list by id",
    inputSchema: { id: z.string().describe("The id of the list to get") },
  },
  async ({ id }) => {
    const response = await listService.getListById(id.trim());
    const data = await response;
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

// Get Trello cards by list ID
server.registerTool(
  "get-cards-by-list-id",
  {
    title: "Get Cards by List ID",
    description: "Get a Trello cards by list id",
    inputSchema: {
      id: z.string().describe("The id of the list to get cards"),
    },
  },
  async ({ id }) => {
    const response = await listService.getCardsByListId(id.trim());
    const data = await response;

    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

// Get Trello cards by board id
server.registerTool(
  "get-cards-by-board-id",
  {
    title: "Get Cards by Board ID",
    description: "Get a Trello cards by board id",
  },
  async ({ id }) => {
    const response = await boardService.getListsByBoardId(id.trim());
    const data = await response;
    const cards = data.map(async (list: any) => {
      const listCards = await listService.getCardsByListId(list.id);
      return listCards.map((card: any) => {
        return {
          id: card.id,
          name: card.name,
          description: card.desc,
          url: card.url,
        };
      });
    });
    return {
      content: [{ type: "text", text: JSON.stringify(cards) }],
    };
  }
);

// Create a Trello card
server.registerTool(
  "create-card",
  {
    title: "Create Card",
    description: "Create a Trello card",
    inputSchema: createCardSchema.shape,
  },
  async ({ name, listId, description, dueDate, labels }) => {
    const response = await cardService.createCard(
      listId.trim(),
      name.trim(),
      description.trim(),
      dueDate.trim(),
      labels.map((label: CardLabel) => ({
        id: label.id,
        idBoard: label.idBoard,
        name: label.name,
        color: label.color,
      }))
    );
    const data = await response;
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

// Update a Trello card
server.registerTool(
  "update-card",
  {
    title: "Update Card",
    description: "Update a Trello card",
    inputSchema: updateCardSchema.shape,
  },
  async ({ id, name, description, dueDate, labels }) => {
    const response = await cardService.updateCard(
      id.trim(),
      name.trim(),
      description.trim(),
      dueDate.trim(),
      labels.map((label: CardLabel) => ({
        id: label.id,
        idBoard: label.idBoard,
        name: label.name,
        color: label.color,
      }))
    );
    const data = await response;
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

// Delete a Trello card
server.registerTool(
  "delete-card",
  {
    title: "Delete Card",
    description: "Delete a Trello card",
  },
  async ({ id }) => {
    const response = await cardService.deleteCard(id.trim());
    const data = await response;
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);
// Add a comment to a Trello card
server.registerTool(
  "add-comment-to-card",
  {
    title: "Add Comment to Card",
    description: "Add a comment to a Trello card",
    inputSchema: {
      id: z.string().describe("The id of the card to add a comment to"),
      comment: z.string().describe("The comment to add to the card"),
    },
  },
  async ({ id, comment }) => {
    const response = await cardService.addCommentToCard(
      id.trim(),
      comment.trim()
    );
    const data = await response;
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

// Add an attachment to a Trello card
server.registerTool(
  "add-attachment-to-card",
  {
    title: "Add Attachment to Card",
    description: "Add an attachment to a Trello card",
    inputSchema: {
      id: z.string().describe("The id of the card to add an attachment to"),
      attachment: z
        .instanceof(File)
        .describe("The attachment to add to the card")
        .refine((file) => file.size > 0 && file.type.startsWith("image/"), {
          message: "Attachment must be a file and an image",
        }),
    },
  },
  async ({ id, attachment }) => {
    const response = await cardService.addAttachmentToCard(
      id.trim(),
      attachment
    );
    const data = await response;
    if (data.error) {
      return {
        content: [{ type: "text", text: JSON.stringify(data.error) }],
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

// Move a Trello card to a list
server.registerTool(
  "move-card-to-list",
  {
    title: "Move Card to List",
    description: "Move a Trello card to a list",
    inputSchema: {
      id: z.string().describe("The id of the card to move to a list"),
      listId: z.string().describe("The id of the list to move the card to"),
    },
  },
  async ({ id, listId }) => {
    const response = await cardService.moveCardToList(id.trim(), listId.trim());
    const data = await response;
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

// ### RESOURCES ###

// Add a dynamic greeting resource
server.registerResource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  {
    title: "Greeting Resource", // Display name for UI
    description: "Dynamic greeting generator",
  },
  async (uri, { name }) => ({
    contents: [
      {
        uri: uri.href,
        text: `Hello, ${name}!`,
      },
    ],
  })
);

// Register the "card" resource template
server.registerResource(
  "card",
  new ResourceTemplate("card://{id}", {
    // The "list" function: enumerate all cards that exist
    list: async () => {
      // Fetch all boards
      const boards = await boardService.getBoards();

      // Fetch all cards for each board
      const allCards: any[] = [];
      for (const board of boards) {
        const lists = await boardService.getListsByBoardId(board.id);
        for (const list of lists) {
          const cards = await listService.getCardsByListId(list.id);
          allCards.push(...cards);
        }
      }
      console.log(
        "cards names",
        allCards.map((card) => card.name)
      );
      // Return URIs for each card
      return {
        resources: allCards.map((card) => ({
          uri: `card://${card.id}`,
          name: card.name,
          description: card.desc || "",
          mimeType: "application/json",
        })),
      };
    },
  }),
  {
    title: "Card Resource",
    description: "Dynamically generated Trello cards",
  },
  // The "read" function: fetch one specific card by ID
  async (uri, { id }) => {
    const card = await cardService.getCardById(id!.toString().trim());
    return {
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify(card, null, 2),
          mimeType: "application/json",
        },
      ],
    };
  }
);

// Static resource
server.registerResource(
  "config",
  "config://app",
  {
    title: "Application Config",
    description: "Application configuration data",
    mimeType: "text/plain",
  },
  async (uri) => ({
    contents: [
      {
        uri: uri.href,
        text: "App configuration here",
      },
    ],
  })
);

async function main() {
  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("🚀 Server started...");
}

main();
