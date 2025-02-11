export default interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export type SortOption =
  | "breed:asc"
  | "breed:desc"
  | "age:asc"
  | "age:desc"
  | "name:asc"
  | "name:desc";
