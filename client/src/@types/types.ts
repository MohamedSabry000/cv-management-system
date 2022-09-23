export type CV = {
  _id: string;
  name: string;
  email: string;
}

export type User = {
  name: string;
  email: string;
  token: string;
}

export type Section = {
  _id: string;
  title: string;
  cvId: string;
}
