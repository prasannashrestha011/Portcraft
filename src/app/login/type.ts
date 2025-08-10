export type UserMetaData = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  storagePath: string;
};

export type JsonPayload = {
  uid: string;
  email: string;
  name: string;
  iat: Date;
  exp: Date;
};
export type ParticipantMetaData = {
  uid: string;
  displayName: string;
  photoURL: string;
};
