export type TaskPayloadType = {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  columnId: string | null;
};