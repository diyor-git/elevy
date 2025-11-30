import { ProjectListDto } from './project-list.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectDetailDto extends ProjectListDto {
  @ApiProperty() description: string;
  @ApiProperty({ required: false }) description_long?: string;
  @ApiProperty({ required: false }) website?: string;
  @ApiProperty({ required: false }) email?: string;
  @ApiProperty() founded: Date;
  @ApiProperty({ required: false, type: [String] }) techStack?: string[];
  @ApiProperty({ required: false }) seekingInvestors?: boolean;
  @ApiProperty({ required: false }) productLink?: string;
}
