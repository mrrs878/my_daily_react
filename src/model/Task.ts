import { INVALID_NUMBER } from '@/constant';

class Task implements TaskI {
  CreatedAt: string;

  DeletedAt: string;

  ID: number;

  UpdatedAt: string;

  alarmTime: number;

  detail: string;

  label: string;

  status: number;

  title: string;


  constructor(title = '', detail = '', label = '', alarmTime = INVALID_NUMBER,
    CreatedAt = '', DeletedAt = '', ID = INVALID_NUMBER, UpdatedAt = '',
    status = INVALID_NUMBER) {
    this.CreatedAt = CreatedAt;
    this.DeletedAt = DeletedAt;
    this.ID = ID;
    this.UpdatedAt = UpdatedAt;
    this.alarmTime = alarmTime;
    this.detail = detail;
    this.label = label;
    this.status = status;
    this.title = title;
  }

  validate(params: any): string {
    return '';
  }
}

export default Task;
