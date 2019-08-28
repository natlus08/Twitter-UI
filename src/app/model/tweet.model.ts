export class Tweet {
  constructor(owner: string) {
    this.owner = owner;
  }
  id: number;
  owner: string;
  text: string;
  image: any;
  createdDateTime: Date;
}
