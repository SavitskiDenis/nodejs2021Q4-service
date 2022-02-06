/**
 * Column type for response
 */
export type ColumnResponse = {
  id: string;
  title: string;
  order: number;
};

/**
 * Column type for response
 */
export type BoardResponse = {
  id: string;
  title: string;
  columns: ColumnResponse[];
};
