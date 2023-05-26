import useCases from '../use-cases';
import makeGetProductCategories from './get-product-categories';
import makeGetUser from './get-user';
import makeGetQuestions from './get-questions';

const getProductCategories = makeGetProductCategories({
  listProductCategories: useCases.listProductCategories
});

const getUser = makeGetUser({
  showUser: useCases.showUser
});

const getQuestions = makeGetQuestions({
  listQuestions: useCases.listQuestions
});

export default {
  getProductCategories,
  getUser,
  getQuestions
};
