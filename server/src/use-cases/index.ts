import repository from '../repository';
import makeListProductCategories from './list-product-categories';
import makeShowUser from './show-user';
import makeListQuestions from './list-questions';

const listProductCategories = makeListProductCategories({ repository });
const showUser = makeShowUser({ repository });
const listQuestions = makeListQuestions({ repository });

export default {
  listProductCategories,
  showUser,
  listQuestions
};
