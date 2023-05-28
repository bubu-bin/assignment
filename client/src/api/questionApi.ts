import axiosInstance from '.';
import { HTTP_METHOD } from '../constants';
import { FormTypeDefinition, ProductCategoryDefinition } from './types';

const makeQuestionApi = ({
  productCategory,
  formType
}: {
  productCategory: ProductCategoryDefinition;
  formType: FormTypeDefinition;
}) => {
  const getQuestionsRequestConfig = () => ({
    url: `/questions`,
    method: HTTP_METHOD.GET,
    params: {
      productCategory,
      formType
    }
  });

  const getInterDependentQuestions = async ({ params }: { params: any }) => {
    const requestConfig = {
      url: `/inter_dependent_questions`,
      method: HTTP_METHOD.GET,
      params
    };

    const { data } = await axiosInstance(requestConfig);
    return data;
  };

  return { getQuestionsRequestConfig, getInterDependentQuestions };
};

export default makeQuestionApi;
