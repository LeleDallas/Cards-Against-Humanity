import { ObjectId } from "mongodb";

export default class Cards {
    constructor(public title: string, public isBlack: boolean, public id?: ObjectId) {}
}