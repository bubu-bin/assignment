import axiosInstance from '.';
import { HTTP_METHOD } from '../constants';

const makePurchaseApi = () => {
  const post = async ({ data }: { data: any }) => {
    const requestConfig = {
      url: `/purchase`,
      method: HTTP_METHOD.POST,
      data
    };

    const result = await axiosInstance(requestConfig);
    return result.data;
  };

  return {
    post
  };
};

export default makePurchaseApi;
