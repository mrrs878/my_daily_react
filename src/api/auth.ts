import { BASE_API } from './index';
import ajax from '../util/ajax';

const API = `${BASE_API}/auth`;

export const LOGIN = (data: LoginReqI): Promise<AjaxResponseI<UserI>> => ajax.post(`${API}/login`, data);
export const LOGIN_BY_GITHUB = (data: string): Promise<AjaxResponseI<UserI>> => ajax.post(`${API}/login`, data);
export const REGISTER = (data: LoginReqI): Promise<AjaxResponseI<UserI>> => ajax.post(`${API}/login`, data);
