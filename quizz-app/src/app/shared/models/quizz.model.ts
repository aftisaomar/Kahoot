import { Question } from './question.model';

export class Quizz {
    public _id: string;
    public titre: string;
    public description: string;
    public createdAt: string;
    public updatedAt: string;

    questions: Question[];
}