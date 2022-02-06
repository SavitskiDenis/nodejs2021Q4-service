import { IsArray, IsString } from "class-validator";
import { ColumnDTO } from "../columns/column.dto";
/**
 * Board dto class for request
 */
export class BoardDTO {
  @IsString()
  title: string;

  @IsArray()
  columns: ColumnDTO[];
}