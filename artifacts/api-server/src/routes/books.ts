
import { Router, type IRouter } from "express";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { dynamodb } from "../lib/dynamodb";

const router: IRouter = Router();

const s3 = new S3Client({
  region: "ap-southeast-2",
});

// Existing endpoint: retrieve books from DynamoDB.
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

// New endpoint: generate a temporary URL for The Great Gatsby PDF.
router.get("/books/book001/pdf-url", async (_req, res) => {
  try {
    const command = new GetObjectCommand({
      Bucket: "kindle-reading-experience",
      Key: "books/book001.pdf",
      ResponseContentType: "application/pdf",
      ResponseContentDisposition: "inline",
    });

    const url = await getSignedUrl(s3, command, {
      expiresIn: 900,
    });

    res.json({ url });
  } catch (error) {
    console.error("Failed to generate PDF URL:", error);
    res.status(500).json({
      error: "Failed to generate PDF URL",
    });
  }
});

export default router;
