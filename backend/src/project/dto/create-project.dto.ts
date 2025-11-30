import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsEnum, IsDateString, IsBoolean, IsInt } from 'class-validator';
import { StartupStage } from '@prisma/client';

export class CreateProjectDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() description: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() description_long?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() image?: string;
  @ApiProperty() @IsString() category: string;
  @ApiProperty({ enum: StartupStage }) @IsEnum(StartupStage) stage: StartupStage;
  @ApiProperty() @IsInt() teamSize: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() website?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() email?: string;
  @ApiProperty() @IsDateString() founded: string;
  @ApiProperty({ required: false, type: [String] }) @IsArray() @IsOptional() techStack?: string[];
  @ApiProperty({ required: false }) @IsBoolean() @IsOptional() seekingInvestors?: boolean;
  @ApiProperty({ required: false }) @IsString() @IsOptional() productLink?: string;
}
