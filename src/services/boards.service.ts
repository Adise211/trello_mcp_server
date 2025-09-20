const TRELLO_BASE_URL = "https://api.trello.com/1";

// Get all boards for the current user
export const getBoards = async () => {
  const response = await fetch(
    `${TRELLO_BASE_URL}/members/me/boards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  return response.json();
};

// Get a board by its ID
export const getBoardById = async (boardId: string) => {
  const response = await fetch(
    `${TRELLO_BASE_URL}/boards/${boardId}?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`
  );
  return response.json();
};

// Get a board by its name
export const getBoardByName = async (boardName: string) => {
  const boards: any = await getBoards();
  return boards.find((board: any) => board.name === boardName);
};

export const createBoard = async (boardName: string) => {
  const response = await fetch(
    `${TRELLO_BASE_URL}/boards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
    {
      method: "POST",
      body: JSON.stringify({ name: boardName }),
    }
  );
};
