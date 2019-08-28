export class User {
  constructor(id: number, userName: string, friends: string[], name: string) {
    this.id = id;
    this.userName = userName;
    this.friends = [];
    this.name = name;
  }
  id: number;
  userName: string;
  password: string;
  friends: string[];
  avatar: any;
  name: string;
}
