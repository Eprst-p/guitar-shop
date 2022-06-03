import request from 'axios';
import {toast} from 'react-toastify';
import {ErrorType} from '../types/error';
import {ErrorsCode} from '../settings/errors-code';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case ErrorsCode.BAD_REQUEST:
        toast.warning(`${response.statusText}: ${response.data.messages.join(' ')}`);
        break;
      case ErrorsCode.NOT_FOUND:
        toast.warning(response.statusText);
        break;
      case ErrorsCode.SERVER_ERROR:
        toast.warning('Внутренняя ошибка сервера');
        break;
      default:
        toast.warning('Что-то пошло не так,но мы не знаем, что именно. Такая жизнь.');
        break;
    }
  }
};
