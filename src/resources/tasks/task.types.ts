/**
 * Task payload type for request
 */
export type TaskPayloadType = {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  columnId: string | null;
};