import { IsNumber, IsOptional, IsString } from "class-validator";
/**
 * Task dto class for request
 */
export class TaskDTO {
  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  userId: string | null;

  @IsString()
  @IsOptional()
  columnId: string | null;
}