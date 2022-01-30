import { IsOptional, IsString } from "class-validator";

/**
 * User dto type for request
 */
export class UserDTO {
  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  salt: string | undefined;
}