import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';

export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
}

export enum JobStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  FILLED = 'filled',
}

export class CreateJobDto {
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsString() role: string;
  @ApiProperty() @IsString() description: string;
  @ApiProperty() @IsString() location: string;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() salaryMin?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() salaryMax?: number;
  @ApiProperty({ enum: JobType }) @IsEnum(JobType) type: JobType;
  @ApiProperty({ enum: ['open', 'closed', 'filled'], default: 'open' }) status?: string; 
}
