import { IsString } from "class-validator";
/**
 * Login tdo class for request
 */
export class LoginTDO {

  @IsString()
  login: string;

  @IsString()
  password: string;
}
