import express, { Request, Response } from "express";
import { collections } from "../services/database.service";

export const cardsRouter = express.Router();

cardsRouter.use(express.json());

cardsRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const cards = (await collections.cards!.find({}).toArray());
        res.status(200).send(cards);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});