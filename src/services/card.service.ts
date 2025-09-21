import { CardLabel, cardSchema, updateCardSchema } from "../schema/card.schema";

const TRELLO_BASE_URL = "https://api.trello.com/1";

/**
 * Get a card by its ID
 * @param cardId - The ID of the card to get
 * @returns {Promise<any>} - A promise that resolves to the card
 */
export const getCardById = async (cardId: string): Promise<any> => {
  try {
    const response = await fetch(
      `${TRELLO_BASE_URL}/cards/${cardId}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      return { error: `HTTP ${response.status}: ${errorText}` };
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Get all cards for a list
 * @param listId - The ID of the list to get cards for
 * @returns {Promise<any>} - A promise that resolves to an array of cards
 */
export const getListCards = async (listId: string): Promise<any> => {
  try {
    const response = await fetch(
      `${TRELLO_BASE_URL}/lists/${listId}/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      return { error: `HTTP ${response.status}: ${errorText}` };
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Get all labels for a card
 * @param cardId - The ID of the card to get labels for
 * @returns {Promise<any>} - A promise that resolves to an array of labels
 */

export const getCardLabels = async (cardId: string): Promise<any> => {
  try {
    const response = await fetch(
      `${TRELLO_BASE_URL}/cards/${cardId}/labels?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      return { error: `HTTP ${response.status}: ${errorText}` };
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Create a card
 * @param listId - The ID of the list to create the card on
 * @param cardName - The name of the card to create
 * @param cardDescription - The description of the card to create
 * @param cardDueDate - The due date of the card to create
 * @param cardLabels - The labels of the card to create
 * @param labels - The labels of the card to create
 * @returns {Promise<any>} - A promise that resolves to the created card
 */
export const createCard = async (
  listId: string,
  cardName: string,
  cardDescription: string,
  cardDueDate: string,
  labels: CardLabel[]
): Promise<{ data?: any; error?: string }> => {
  try {
    const card = cardSchema.parse({
      name: cardName,
      description: cardDescription,
      dueDate: cardDueDate,
      labels: labels,
    });
    const response = await fetch(
      `${TRELLO_BASE_URL}/lists/${listId}/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return { error: `HTTP ${response.status}: ${errorText}` };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Update a card
 * @param cardId - The ID of the card to update
 * @param cardName - The name of the card to update
 * @param cardDescription - The description of the card to update
 * @param cardDueDate - The due date of the card to update
 * @param labels - The labels of the card to update
 * @returns {Promise<any>} - A promise that resolves to the updated card
 */
export const updateCard = async (
  cardId: string,
  cardName: string,
  cardDescription: string,
  cardDueDate: string,
  labels: CardLabel[]
): Promise<any> => {
  try {
    const card = updateCardSchema.parse({
      id: cardId,
      name: cardName,
      description: cardDescription,
      dueDate: cardDueDate,
      labels: labels,
    });
    const response = await fetch(
      `${TRELLO_BASE_URL}/cards/${cardId}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
      {
        method: "PUT",
        body: JSON.stringify(card),
      }
    );
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Add a comment to a card
 * @param cardId - The ID of the card to add a comment to
 * @param comment - The comment to add to the card
 * @returns {Promise<any>} - A promise that resolves to the added comment
 */
export const addCommentToCard = async (
  cardId: string,
  comment: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${TRELLO_BASE_URL}/cards/${cardId}/actions/comments?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
      {
        method: "POST",
        body: JSON.stringify({ text: comment }),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      return { error: `HTTP ${response.status}: ${errorText}` };
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Add an attachment to a card
 * @param cardId - The ID of the card to add an attachment to
 * @param attachment - The attachment to add to the card
 * @returns {Promise<any>} - A promise that resolves to the added attachment
 */
export const addAttachmentToCard = async (
  cardId: string,
  attachment: File
): Promise<any> => {
  try {
    const response = await fetch(
      `${TRELLO_BASE_URL}/cards/${cardId}/attachments?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
      {
        method: "POST",
        body: attachment,
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      return { error: `HTTP ${response.status}: ${errorText}` };
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const moveCardToList = async (
  cardId: string,
  listId: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${TRELLO_BASE_URL}/cards/${cardId}/lists?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
      {
        method: "PUT",
        body: JSON.stringify({ listId }),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      return { error: `HTTP ${response.status}: ${errorText}` };
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

/**
 * Delete a card
 * @param cardId - The ID of the card to delete
 * @returns {Promise<any>} - A promise that resolves to the deleted card
 */
export const deleteCard = async (cardId: string): Promise<any> => {
  try {
    const response = await fetch(
      `${TRELLO_BASE_URL}/cards/${cardId}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      return { error: `HTTP ${response.status}: ${errorText}` };
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export const cardService = {
  getCardById,
  getListCards,
  getCardLabels,
  createCard,
  updateCard,
  addCommentToCard,
  addAttachmentToCard,
  moveCardToList,
  deleteCard,
};
