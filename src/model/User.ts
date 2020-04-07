import { INVALID_NUMBER } from '@/constant';

class User implements UserI {
  CreatedAt: string;

  DeletedAt: string;

  ID: number;

  UpdatedAt: string;

  name: string;

  role: number;

  token: string;

  constructor(name = '', role = INVALID_NUMBER, token = '', ID = INVALID_NUMBER,
    CreatedAt = '', UpdatedAt = '', DeletedAt = '') {
    this.name = name;
    this.role = role;
    this.token = token;
    this.ID = ID;
    this.CreatedAt = CreatedAt;
    this.UpdatedAt = UpdatedAt;
    this.DeletedAt = DeletedAt;
  }
}

export default User;
