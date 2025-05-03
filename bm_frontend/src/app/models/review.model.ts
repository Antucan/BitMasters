export class Review {
    id: number;
    title: string;
    user_id: number;
    product_id: number;
    content: string;
    score: number;
    
    constructor(id: number, title: string, user_id: number, product_id: number, content: string, score: number) {
      this.id = id;
      this.title = title;
      this.user_id = user_id;
      this.product_id = product_id;
      this.content = content;
      this.score = score;
    }
  }