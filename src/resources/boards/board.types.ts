/**
 * Column payload type for request
 */
export type ColumnPayload = {
  title: string,
  order: number
};

/**
 * Board payload type for request
 */
export type BoardPayload = {
  title: string,
  columns: ColumnPayload[]
};