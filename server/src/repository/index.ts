import makeQuestionStore from './question-store';
import makeProductCategoryStore from './product-category-store';
import makeOptionStore from './option-store';
import database from '../config/database';
import makeUserStore from './user-store';

const questionStore = makeQuestionStore({ database });
const productCategoryStore = makeProductCategoryStore({ database });
const optionStore = makeOptionStore({ database });
const userStore = makeUserStore({ database });

const repository = {
  questionStore,
  productCategoryStore,
  optionStore,
  userStore
};

export default repository;
export type Repository = typeof repository;
