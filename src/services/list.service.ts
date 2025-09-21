const TRELLO_BASE_URL = "https://api.trello.com/1";

/**
 * Get all lists for a board
 * @param boardId - The ID of the board to get lists for
 * @returns {Promise<any>} - A promise that resolves to an array of lists
 */
export const getBoardLists = async (boardId: string): Promise<any> => {
  try {
    const response = await fetch(
      `${TRELLO_BASE_URL}/boards/${boardId}/lists?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`
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
 * Get a list by its ID
 * @param listId - The ID of the list to get
 * @returns {Promise<any>} - A promise that resolves to the list
 */
export const getListById = async (listId: string): Promise<any> => {
  try {
    const response = await fetch(
      `${TRELLO_BASE_URL}/lists/${listId}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`
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
 * Create a list
 * @param boardId - The ID of the board to create the list on
 * @param listName - The name of the list to create
 * @returns {Promise<any>} - A promise that resolves to the created list
 */
export const createList = async (
  boardId: string,
  listName: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${TRELLO_BASE_URL}/boards/${boardId}/lists?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
      {
        method: "POST",
        body: JSON.stringify({ name: listName }),
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
 * Update a list
 * @param listId - The ID of the list to update
 * @param listName - The name of the list to update
 * @returns {Promise<any>} - A promise that resolves to the updated list
 */
export const updateList = async (
  listId: string,
  listName: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${TRELLO_BASE_URL}/lists/${listId}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
      {
        method: "PUT",
        body: JSON.stringify({ name: listName }),
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
 * Delete a list
 * @param listId - The ID of the list to delete
 * @returns {Promise<any>} - A promise that resolves to the deleted list
 */
export const deleteList = async (listId: string): Promise<any> => {
  try {
    const response = await fetch(
      `${TRELLO_BASE_URL}/lists/${listId}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
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

/**
 * Get all cards for a list
 * @param listId - The id of the list to get cards for
 * @returns {Promise<any>} - A promise that resolves to an array of cards
 */
export const getCardsByListId = async (listId: string): Promise<any> => {
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

export const listService = {
  getBoardLists,
  getListById,
  createList,
  updateList,
  deleteList,
  getListCards,
  getCardsByListId,
};
