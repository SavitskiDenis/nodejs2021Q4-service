import { IsNumber, IsString } from "class-validator";

/**
 * Column dto class for request
 */
export class ColumnDTO {
  @IsString()
  title: string;

  @IsNumber()
  order: number;
}