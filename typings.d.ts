export interface User {
  _id: string;
  _rev: string;
  email: string;
  image: string;
  gamesPlayed: Array<string>;
  supporter: boolean;
  vip: boolean;
}

export interface Sesh {
  game: string;
  proposedDay: string;
  proposedTime: string;
  recipients: Array<User>;
  sentFrom: {
    _ref: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
