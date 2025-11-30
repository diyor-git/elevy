import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TeamMemberDto {
  @ApiProperty({ description: 'ID пользователя для добавления или удаления из команды' })
  @IsString()
  userId: string;
}