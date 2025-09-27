import { z } from "zod";
import { boardService } from "../services/board.service";
import { cardService } from "../services/card.service";

export const getBoardsTool = {
  name: "get-boards",
  definition: {
    title: "Get Boards",
    description: "Get all boards for the current user",
    inputSchema: {},
  },
  handler: async () => {
    const response = await boardService.getBoards();
    // on success, return the data
    if (!response.error) {
      const boardsList = response.data.map((board: any) => {
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
    } else {
      // on error, return the error
      return {
        content: [{ type: "text", text: response.error }],
      };
    }
  },
};

export const getBoardByNameTool = {
  name: "get-board-by-name",
  definition: {
    title: "Get Board by Name",
    description: "Get a Trello board by name",
    inputSchema: { name: z.string().describe("The name of the board to get") },
  },
  handler: async ({ name }: { name: string }) => {
    const response = await boardService.getBoardByName(name.trim());

    // on success, return the data
    if (!response.error) {
      return {
        content: [{ type: "text", text: JSON.stringify(response.data) }],
      };
    } else {
      // on error, return the error
      return {
        content: [{ type: "text", text: JSON.stringify(response.error) }],
      };
    }
  },
};

export const getBoardByIdTool = {
  name: "get-board-by-id",
  definition: {
    title: "Get Board by ID",
    description: "Get a Trello board by id",
    inputSchema: { id: z.string().describe("The id of the board to get") },
  },
  handler: async ({ id }: { id: string }) => {
    const response = await boardService.getBoardById(id.trim());
    // on success, return the data
    if (!response.error) {
      return {
        content: [{ type: "text", text: JSON.stringify(response.data) }],
      };
    } else {
      // on error, return the error
      return {
        content: [{ type: "text", text: JSON.stringify(response.error) }],
      };
    }
  },
};

export const getListsByBoardIdTool = {
  name: "get-lists-by-board-id",
  definition: {
    title: "Get Lists by Board ID",
    description: "Get a Trello lists by board id",
    inputSchema: {
      id: z.string().describe("The id of the board to get lists"),
    },
  },
  handler: async ({ id }: { id: string }) => {
    const response = await boardService.getListsByBoardId(id.trim());

    // on success, return the data
    if (!response.error) {
      return {
        content: [{ type: "text", text: JSON.stringify(response.data) }],
      };
    } else {
      // on error, return the error
      return {
        content: [{ type: "text", text: JSON.stringify(response.error) }],
      };
    }
  },
};

/**
 * Get all cards for a board
 * @param boardId - The ID of the board to get cards for
 * @returns {Promise<any>} - A promise that resolves to an array of cards
 */

export const getCardsByBoardIdTool = {
  name: "get-cards-by-board-id",
  definition: {
    title: "Get Cards by Board ID",
    description: "Get a Trello cards by board id",
    inputSchema: {
      id: z.string().describe("The id of the board to get cards"),
    },
  },
  handler: async ({ id }: { id: string }) => {
    const response = await cardService.getCardsByBoardId(id.trim());
    // on success, return the data
    if (!response.error) {
      const cards = response.data.map((card: any) => {
        return {
          id: card.id,
          name: card.name,
          description: card.desc,
          url: card.url,
        };
      });

      return {
        content: [{ type: "text", text: JSON.stringify(cards) }],
      };
    } else {
      // on error, return the error
      return {
        content: [{ type: "text", text: JSON.stringify(response.error) }],
      };
    }
  },
};
