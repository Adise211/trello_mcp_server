import { z } from "zod";

export const labelColorSchema = z.enum([
  "green",
  "yellow",
  "orange",
  "red",
  "purple",
  "blue",
  "sky",
  "lime",
  "pink",
  "black",
]);

export const cardLabelSchema = z.object({
  id: z.string().describe("The id of the label"),
  idBoard: z.string().describe("The id of the board the label is on"),
  name: z.string().describe("The name of the label"),
  color: labelColorSchema.describe("The color of the label"),
});

export const cardSchema = z.object({
  name: z.string().describe("The name of the card"),
  description: z.string().describe("The description of the card"),
  dueDate: z.string().optional().describe("The due date of the card"),
  labels: z
    .array(cardLabelSchema)
    .optional()
    .describe("The labels of the card"),
});

export const createCardSchema = cardSchema.extend({
  listId: z.string().describe("The id of the list to create the card"),
});

export const updateCardSchema = cardSchema.extend({
  id: z.string().describe("The id of the card to update"),
});

export type Card = z.infer<typeof cardSchema>;
export type CardLabel = z.infer<typeof cardLabelSchema>;
