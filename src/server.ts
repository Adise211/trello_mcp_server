import dotenv from "dotenv";

// Load environment variables FIRST, before importing any other modules
dotenv.config();

console.log(
  ".env variables loaded?",
  process.env.TRELLO_API_TOKEN,
  process.env.TRELLO_SECRET
);

import { boardService } from "./services/board.service";
import { listService } from "./services/list.service";

async function main() {
  const boards: any = await boardService.getBoards();
  console.log(
    boards.map((board: any) => {
      return {
        id: board.id,
        name: board.name,
      };
    })
  );
  const board = await boardService.getBoardById("61ab910a87599f0b1e59abf0");
  // console.log(board);
  const lists = await listService.getBoardLists("61ab910a87599f0b1e59abf0");
  console.log(lists);
}

main().catch(console.error);
