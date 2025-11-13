import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async findAllTasks(filters?: any) {
    const query = this.taskRepository.createQueryBuilder('task');

    if (filters?.status) {
      query.andWhere('task.status = :status', { status: filters.status });
    }
    if (filters?.type) {
      query.andWhere('task.type = :type', { type: filters.type });
    }
    if (filters?.assignee_id) {
      query.andWhere('task.assignee_id = :assigneeId', { assigneeId: filters.assignee_id });
    }
    if (filters?.unit_id) {
      query.andWhere('task.unit_id = :unitId', { unitId: filters.unit_id });
    }

    return query.getMany();
  }

  async findTaskById(id: string) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    await this.findTaskById(id);
    await this.taskRepository.update(id, updateTaskDto);
    return this.findTaskById(id);
  }

  async updateTaskStatus(id: string, status: TaskStatus) {
    const updateData: any = { status };
    if (status === TaskStatus.COMPLETED) {
      updateData.completed_at = new Date();
    }
    await this.findTaskById(id);
    await this.taskRepository.update(id, updateData);
    return this.findTaskById(id);
  }

  async deleteTask(id: string) {
    const task = await this.findTaskById(id);
    await this.taskRepository.delete(id);
    return task;
  }
}
