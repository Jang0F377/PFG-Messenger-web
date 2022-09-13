export interface User {
  _id: string;
  _rev: string;
  email: string;
  image: string;
  gamesPlayed: Array<string>;
  supporter: boolean;
  vip: boolean;
}

export interface GeneralReference {
  _key: string;
  _ref: string;
  _type: string;
}

export interface Sesh {
  game: string;
  proposedDay: string;
  proposedTime: string;
  recipients: [
    {
      _ref: string;
      _key: string;
      _type: string;
    }
  ];
  sentFrom: {
    _ref: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  usersConfirmed: Array<GeneralReference>;
  usersDeclined: Array<GeneralReference>;
}
