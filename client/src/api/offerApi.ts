import { HTTP_METHOD } from '../constants';
import { ProductCategoryDefinition } from './types';

const makeOfferApi = ({
  productCategory
}: {
  productCategory: ProductCategoryDefinition;
}) => {
  const getOffersRequestConfig = () => ({
    url: `/offers`,
    method: HTTP_METHOD.GET,
    params: {
      productCategory
    }
  });

  return {
    getOffersRequestConfig
  };
};

export default makeOfferApi;
