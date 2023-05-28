import axiosInstance from '.';
import { HTTP_METHOD } from '../constants';
import { FormikValues } from '../types';
import { ProductCategoryDefinition, FormTypeDefinition } from './types';

const makeFormApi = ({
  productCategory,
  formType
}: {
  productCategory: ProductCategoryDefinition;
  formType: FormTypeDefinition;
}) => {
  const getFormDataRequestConfig = () => ({
    url: '/form_data',
    method: HTTP_METHOD.GET,
    params: {
      productCategory,
      formType
    }
  });

  const postForm = async ({ data }: { data: FormikValues }) => {
    const requestConfig = {
      url: '/form',
      method: HTTP_METHOD.POST,
      data: {
        ...data,
        productCategory,
        formType
      }
    };

    return await axiosInstance(requestConfig);
  };

  const patchForm = async ({ data }: { data: FormikValues }) => {
    const requestConfig = {
      url: '/form',
      method: HTTP_METHOD.PATCH,
      data: {
        ...data,
        productCategory,
        formType
      }
    };

    return await axiosInstance(requestConfig);
  };

  return {
    getFormDataRequestConfig,
    postForm,
    patchForm
  };
};

export default makeFormApi;
