import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @ApiProperty({ enum: ['open','closed','filled'], required: false }) status?: string;
}
