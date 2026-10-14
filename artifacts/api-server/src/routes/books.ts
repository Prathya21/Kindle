
import { Router, type IRouter } from "express";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamodb } from "../lib/dynamodb";

const router: IRouter = Router();

router.get("/books", async (_req, res) => {
  try {
    const result = await dynamodb.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_BOOKS_TABLE || "Books",
      }),
    );

    res.json({ books: result.Items ?? [] });
  } catch (error) {
    console.error("Failed to retrieve books:", error);
    res.status(500).json({ error: "Failed to retrieve books" });
  }
});

export default router;

