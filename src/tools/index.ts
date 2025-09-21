// Export all tools from their respective files
export * from "./board.tools";
export * from "./list.tools";
export * from "./card.tools";

// Export all tools as an array for easy registration
import {
  getBoardsTool,
  getBoardByNameTool,
  getBoardByIdTool,
  getListsByBoardIdTool,
  getCardsByBoardIdTool,
} from "./board.tools";

import { getListByIdTool, getCardsByListIdTool } from "./list.tools";

import {
  createCardTool,
  updateCardTool,
  deleteCardTool,
  addCommentToCardTool,
  addAttachmentToCardTool,
  moveCardToListTool,
} from "./card.tools";

// Define a type for tool structure
export interface Tool {
  name: string;
  definition: {
    title: string;
    description: string;
    inputSchema: any;
  };
  handler: (...args: any[]) => Promise<any>;
}

export const allTools: Tool[] = [
  getBoardsTool,
  getBoardByNameTool,
  getBoardByIdTool,
  getListsByBoardIdTool,
  getCardsByBoardIdTool,
  getListByIdTool,
  getCardsByListIdTool,
  createCardTool,
  updateCardTool,
  deleteCardTool,
  addCommentToCardTool,
  addAttachmentToCardTool,
  moveCardToListTool,
];
