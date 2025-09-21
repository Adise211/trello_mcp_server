import { z } from "zod";
import { listService } from "../services/list.service";

export const getListByIdTool = {
  name: "get-list-by-id",
  definition: {
    title: "Get List by ID",
    description: "Get a Trello list by id",
    inputSchema: { id: z.string().describe("The id of the list to get") },
  },
  handler: async ({ id }: { id: string }) => {
    const response = await listService.getListById(id.trim());
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

export const getCardsByListIdTool = {
  name: "get-cards-by-list-id",
  definition: {
    title: "Get Cards by List ID",
    description: "Get a Trello cards by list id",
    inputSchema: {
      id: z.string().describe("The id of the list to get cards"),
    },
  },
  handler: async ({ id }: { id: string }) => {
    const response = await listService.getCardsByListId(id.trim());
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
