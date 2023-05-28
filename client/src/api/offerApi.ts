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

  const addToFavourite = async ({ data }: { data: any }) => {
    const requestConfig = {
      url: `/offers/favourite`,
      method: HTTP_METHOD.POST,
      data
    };

    const result = await axiosInstance(requestConfig);
    return result.data;
  };

  const getUserFavourites = () => ({
    url: `/favourites`,
    method: HTTP_METHOD.GET
  });

  return {
    getOffersRequestConfig,
    getOfferRequestConfig,
    addToFavourite,
    getUserFavourites
  };
};

export default makeOfferApi;
