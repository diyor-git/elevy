import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateJobDto } from './dto/create-job.dto';


interface FindAllParams {
  search?: string;
  category?: string;
  stage?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  // --- PROJECTS ---
  async create(dto: CreateProjectDto, creatorId: string) {
    return this.prisma.project.create({ data: { ...dto, creatorId } });
  }

async findAll(params: { page?: number; limit?: number; category?: string; stage?: string; search?: string }) {
  const { page = 1, limit = 6, category, stage, search } = params;

  const where: any = {};
  if (category && category !== 'all') where.category = category;
  if (stage && stage !== 'all') where.stage = stage;
  if (search) where.name = { contains: search, mode: 'insensitive' };

  const total = await this.prisma.project.count({ where });

  const currentPage = Math.max(page, 1);
  const projects = await this.prisma.project.findMany({
    where,
    skip: (currentPage - 1) * limit,
    take: limit,
    select: {
      id: true,
      name: true,
      image: true,
      category: true,
      stage: true,
      teamSize: true,
      createdAt: true,
      description: true,
    },
  });

  return { projects, total, page: currentPage, totalPages: Math.ceil(total / limit) };
}

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: { tasks: false, jobs: true, teamMembers: true, messages: false },
    });
  }

  async update(id: string, dto: UpdateProjectDto, userId: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new Error('Project not found');
    if (project.creatorId !== userId) throw new Error('Not authorized');
    return this.prisma.project.update({ where: { id }, data: dto });
  }

  async remove(id: string, userId: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new Error('Project not found');
    if (project.creatorId !== userId) throw new Error('Not authorized');
    return this.prisma.project.delete({ where: { id } });
  }

  // --- TEAM ---
  async addMember(projectId: string, userId: string, requesterId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project || project.creatorId !== requesterId) throw new Error('Not authorized');
    return this.prisma.project.update({ where: { id: projectId }, data: { teamMembers: { connect: { id: userId } } }, include: { teamMembers: true } });
  }

  async removeMember(projectId: string, userId: string, requesterId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    if (!project || project.creatorId !== requesterId) throw new Error('Not authorized');
    return this.prisma.project.update({ where: { id: projectId }, data: { teamMembers: { disconnect: { id: userId } } }, include: { teamMembers: true } });
  }

  // --- TASKS ---
  async createTask(projectId: string, dto: CreateTaskDto, userId: string) {
    return this.prisma.task.create({ data: { ...dto, projectId, assigneeId: dto.assigneeId || null } });
  }

  async updateTask(taskId: string, dto: UpdateTaskDto) {
    return this.prisma.task.update({ where: { id: taskId }, data: dto });
  }

  async deleteTask(taskId: string) {
    return this.prisma.task.delete({ where: { id: taskId } });
  }

  // --- JOBS ---
  async createJob(projectId: string, dto: CreateJobDto) {
    return this.prisma.jobPosting.create({ data: { ...dto, projectId, status: dto.status || 'open', } });
  }

  async updateJob(jobId: string, dto: UpdateJobDto) {
    return this.prisma.jobPosting.update({ where: { id: jobId }, data: dto });
  }

  async deleteJob(jobId: string) {
    return this.prisma.jobPosting.delete({ where: { id: jobId } });
  }

  // --- MESSAGES ---
  async createMessage(projectId: string, dto: CreateMessageDto, userId: string) {
    return this.prisma.message.create({ data: { ...dto, projectId, userId } });
  }
}
