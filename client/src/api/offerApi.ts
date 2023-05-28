import axiosInstance from '.';
import { HTTP_METHOD } from '../constants';
import { FormTypeDefinition, ProductCategoryDefinition } from './types';

const makeOfferApi = ({
  productCategory,
  formType
}: {
  productCategory?: ProductCategoryDefinition;
  formType?: FormTypeDefinition;
}) => {
  const getOffersRequestConfig = () => ({
    url: `/offers`,
    method: HTTP_METHOD.GET,
    params: {
      productCategory
    }
  });

  const getOfferRequestConfig = async ({ id }: { id: string }) => {
    const requestConfig = {
      url: `/offers/${id}`,
      method: HTTP_METHOD.GET,
      params: {
        productCategory
      }
    };

    const result = await axiosInstance(requestConfig);
    return result.data;
  };

  return {
    getOffersRequestConfig,
    getOfferRequestConfig
  };
};

export default makeOfferApi;
