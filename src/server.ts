import dotenv from "dotenv";

// Load environment variables FIRST, before importing any other modules
dotenv.config();

console.log(
  ".env variables loaded?",
  process.env.TRELLO_API_TOKEN,
  process.env.TRELLO_SECRET
);

import { getBoardById, getBoards } from "./services/boards.service";

async function main() {
  const boards: any = await getBoards();
  console.log(
    boards.map((board: any) => {
      return {
        id: board.id,
        name: board.name,
      };
    })
  );
  const board = await getBoardById("61ab910a87599f0b1e59abf0");
  console.log(board);
}

main().catch(console.error);
