export interface User {
  _id: string;
  email: string;
  image: string;
  gamesPlayed: Array<string>;
  supporter: boolean;
  vip: boolean;
}
