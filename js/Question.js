export class Question {
    constructor(question, r1 , r2 , r3, r4, gr) {
        this.question = question;
        this.goodAnswer = gr;
        this.choice1 = r1;
        this.choice2 = r2;
        this.choice3 = r3;
        this.choice4 = r4;
    }
    getAnswer()  {
        return this.goodAnswer
    }
    getQuestion() {
        return this.question;
    }
    getChoice() {
        return [this.choice1,this.choice2,this.choice3,this.choice4];
    }
}