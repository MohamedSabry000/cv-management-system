export type CV = {
  _id: string;
  name: string;
  email: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type Section = {
  _id: string;
  title: string;
  cvId: string;
}
