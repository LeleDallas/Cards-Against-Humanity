import { Router, json, Request, Response } from "express";

import { collections } from "../services/database.service";

export const cardsRouter = Router();

cardsRouter.use(json());

cardsRouter.get("/cards", async (_req: Request, res: Response) => {
    try {
        const cards = (await collections.cards!.find({}).toArray());
        return res.status(200).send(cards);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
});