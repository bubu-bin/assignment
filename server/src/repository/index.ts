import makeQuestionStore from './question-store';
import makeProductCategoryStore from './product-category-store';
import makeOptionStore from './option-store';
import database from '../config/database';
import makeUserStore from './user-store';
import makeFormStore from './form-store';
import makeFormDataStore from './form-data-store';

const questionStore = makeQuestionStore({ database });
const productCategoryStore = makeProductCategoryStore({ database });
const optionStore = makeOptionStore({ database });
const userStore = makeUserStore({ database });
const formStore = makeFormStore({ database });
const formDataStore = makeFormDataStore({ database });

const repository = {
  questionStore,
  productCategoryStore,
  optionStore,
  userStore,
  formStore,
  formDataStore
};

export default repository;
export type Repository = typeof repository;
