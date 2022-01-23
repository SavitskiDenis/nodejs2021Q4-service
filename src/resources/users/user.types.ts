/**
 * User payload type for request
 */
export type UserPayloadType = {
  name: string,
  login: string,
  password: string,
  salt: string | undefined;
};