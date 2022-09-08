export interface User {
  _id: string;
  email: string;
  image: string;
  gamesPlayed: Array<string>;
  supporter: boolean;
  vip: boolean;
}

export interface SeshInvite {
  recipients: Array<string>;
  game: string;
  hour: number;
  morningOrEvening: string;
  time: string;
  numberConfirmed?: number;
  usersConfirmed?: Array<User>;
}
