import { z } from "zod";
import { cardService } from "../services/card.service";
import {
  CardLabel,
  createCardSchema,
  updateCardSchema,
} from "../schema/card.schema";

export const createCardTool = {
  name: "create-card",
  definition: {
    title: "Create Card",
    description: "Create a Trello card",
    inputSchema: createCardSchema.shape,
  },
  handler: async ({ name, listId, description, dueDate, labels }: any) => {
    const response = await cardService.createCard(
      listId.trim(),
      name.trim(),
      description.trim(),
      dueDate?.trim() || "",
      labels?.map((label: CardLabel) => ({
        id: label.id,
        idBoard: label.idBoard,
        name: label.name,
        color: label.color,
      })) || []
    );
    if (response.error) {
      return {
        content: [{ type: "text", text: `Error: ${response.error}` }],
      };
    } else {
      return {
        content: [
          { type: "text", text: JSON.stringify(response.data, null, 2) },
        ],
      };
    }
  },
};

export const updateCardTool = {
  name: "update-card",
  definition: {
    title: "Update Card",
    description: "Update a Trello card",
    inputSchema: updateCardSchema.shape,
  },
  handler: async ({ id, name, description, dueDate, labels }: any) => {
    const response = await cardService.updateCard(
      id.trim(),
      name.trim(),
      description.trim(),
      dueDate?.trim() || "",
      labels?.map((label: CardLabel) => ({
        id: label.id,
        idBoard: label.idBoard,
        name: label.name,
        color: label.color,
      })) || []
    );
    if (response.error) {
      return {
        content: [{ type: "text", text: `Error: ${response.error}` }],
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
    };
  },
};

export const deleteCardTool = {
  name: "delete-card",
  definition: {
    title: "Delete Card",
    description: "Delete a Trello card",
    inputSchema: {
      id: z.string().describe("The id of the card to delete"),
    },
  },
  handler: async ({ id }: { id: string }) => {
    const response = await cardService.deleteCard(id.trim());
    if (response.error) {
      return {
        content: [{ type: "text", text: `Error: ${response.error}` }],
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
    };
  },
};

export const addCommentToCardTool = {
  name: "add-comment-to-card",
  definition: {
    title: "Add Comment to Card",
    description: "Add a comment to a Trello card",
    inputSchema: {
      id: z.string().describe("The id of the card to add a comment to"),
      comment: z.string().describe("The comment to add to the card"),
    },
  },
  handler: async ({ id, comment }: { id: string; comment: string }) => {
    const response = await cardService.addCommentToCard(
      id.trim(),
      comment.trim()
    );
    if (response.error) {
      return {
        content: [{ type: "text", text: `Error: ${response.error}` }],
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
    };
  },
};

export const addAttachmentToCardTool = {
  name: "add-attachment-to-card",
  definition: {
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
  handler: async ({ id, attachment }: { id: string; attachment: File }) => {
    const response = await cardService.addAttachmentToCard(
      id.trim(),
      attachment
    );
    if (response.error) {
      return {
        content: [{ type: "text", text: `Error: ${response.error}` }],
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
    };
  },
};

export const moveCardToListTool = {
  name: "move-card-to-list",
  definition: {
    title: "Move Card to List",
    description: "Move a Trello card to a list",
    inputSchema: {
      id: z.string().describe("The id of the card to move to a list"),
      listId: z.string().describe("The id of the list to move the card to"),
    },
  },
  handler: async ({ id, listId }: { id: string; listId: string }) => {
    const response = await cardService.moveCardToList(id.trim(), listId.trim());
    if (response.error) {
      return {
        content: [{ type: "text", text: `Error: ${response.error}` }],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: `✅ Card '${response.data.name}' moved to list ${response.data.idList}`,
        },
      ],
    };
  },
};
