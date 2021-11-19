import { Avatar } from './avatar';
import { Company } from './company';
import { Role } from './role';

export interface User {
  id?: number;
  avatar?: Avatar;
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  company?: Company;
  roles?: Role[];
  token?: string;
  isSuper?: boolean;
}
