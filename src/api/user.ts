import ajax from '@/util/ajax';
import { BASE_API } from './index';

const USER_API = `${BASE_API}/user`;

export const GET_INFO = (): Promise<AjaxResponseI<UserI>> => ajax.get(USER_API);
