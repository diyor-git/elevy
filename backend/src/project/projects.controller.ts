import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TeamMemberDto } from './dto/team-member.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('startups')
@Controller('startups')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // --- PROJECTS ---
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Post() create(@Body() dto: CreateProjectDto, @Req() req) { return this.projectsService.create(dto, req.user.id); }
  @Get() findAll() { return this.projectsService.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.projectsService.findOne(id); }
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateProjectDto, @Req() req) { return this.projectsService.update(id, dto, req.user.id); }
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Delete(':id') remove(@Param('id') id: string, @Req() req) { return this.projectsService.remove(id, req.user.id); }

  // --- TEAM ---
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Post(':id/team') addMember(@Param('id') id: string, @Body() dto: TeamMemberDto, @Req() req) { return this.projectsService.addMember(id, dto.userId, req.user.id); }
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Delete(':id/team') removeMember(@Param('id') id: string, @Body() dto: TeamMemberDto, @Req() req) { return this.projectsService.removeMember(id, dto.userId, req.user.id); }

  // --- TASKS ---
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Post(':id/tasks') createTask(@Param('id') id: string, @Body() dto: CreateTaskDto, @Req() req) { return this.projectsService.createTask(id, dto, req.user.id); }
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Patch('tasks/:taskId') updateTask(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDto) { return this.projectsService.updateTask(taskId, dto); }
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Delete('tasks/:taskId') deleteTask(@Param('taskId') taskId: string) { return this.projectsService.deleteTask(taskId); }

  // --- JOBS ---
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Post(':id/jobs') createJob(@Param('id') id: string, @Body() dto: CreateJobDto) { return this.projectsService.createJob(id, dto); }
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Patch('jobs/:jobId') updateJob(@Param('jobId') jobId: string, @Body() dto: UpdateJobDto) { return this.projectsService.updateJob(jobId, dto); }
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Delete('jobs/:jobId') deleteJob(@Param('jobId') jobId: string) { return this.projectsService.deleteJob(jobId); }

  // --- MESSAGES ---
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Post(':id/messages') createMessage(@Param('id') id: string, @Body() dto: CreateMessageDto, @Req() req) { return this.projectsService.createMessage(id, dto, req.user.id); }
}
