export type ColumnPayload = {
  title: string,
  order: number
};

export type BoardPayload = {
  title: string,
  columns: ColumnPayload[]
};