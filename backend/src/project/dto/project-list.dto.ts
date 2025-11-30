import { ApiProperty } from '@nestjs/swagger';
import { StartupStage } from '@prisma/client';

export class ProjectListDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty({ required: false }) image?: string;
  @ApiProperty() category: string;
  @ApiProperty({ enum: StartupStage }) stage: StartupStage;
  @ApiProperty() teamSize: number;
  @ApiProperty() createdAt: Date;
  @ApiProperty({ required: false }) jobsCount?: number;
  @ApiProperty({ required: false }) teamCount?: number;
}
