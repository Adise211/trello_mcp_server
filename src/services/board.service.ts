const TRELLO_BASE_URL = "https://api.trello.com/1";

/**
 * Get all boards for the current user
 * @returns {Promise<any>} - A promise that resolves to an array of boards
 */
export const getBoards = async (): Promise<any> => {
  const response = await fetch(
    `${TRELLO_BASE_URL}/members/me/boards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  return response.json();
};

/**
 * Get a board by its ID
 * @param boardId - The ID of the board to get
 * @returns {Promise<any>} - A promise that resolves to the board
 */
export const getBoardById = async (boardId: string): Promise<any> => {
  const response = await fetch(
    `${TRELLO_BASE_URL}/boards/${boardId}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  return response.json();
};

/**
 * Get a board by its name
 * @param boardName - The name of the board to get
 * @returns {Promise<any>} - A promise that resolves to the board
 */
export const getBoardByName = async (boardName: string): Promise<any> => {
  const boards: any = await getBoards();
  return boards.find((board: any) => board.name === boardName);
};

/**
 * Create a board
 * @param boardName - The name of the board to create
 * @returns {Promise<any>} - A promise that resolves to the created board
 */
export const createBoard = async (boardName: string): Promise<any> => {
  const response = await fetch(
    `${TRELLO_BASE_URL}/boards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
    {
      method: "POST",
      body: JSON.stringify({ name: boardName }),
    }
  );
};

export const getListsByBoardId = async (boardName: string): Promise<any> => {
  const response = await fetch(
    `${TRELLO_BASE_URL}/boards/${boardName}/lists?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  return response.json();
};

export const boardService = {
  getBoards,
  getBoardById,
  getBoardByName,
  createBoard,
  getListsByBoardId,
};
