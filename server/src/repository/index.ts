import makeQuestionStore from './question-store';
import makeProductCategoryStore from './product-category-store';
import makeOptionStore from './option-store';
import database from '../config/database';
import makeUserStore from './user-store';
import makeFormStore from './form-store';
import makeFormDataStore from './form-data-store';
import makePurchaseStore from './purchase-store';
import makeOfferStore from './offer-store';

const questionStore = makeQuestionStore({ database });
const productCategoryStore = makeProductCategoryStore({ database });
const optionStore = makeOptionStore({ database });
const userStore = makeUserStore({ database });
const formStore = makeFormStore({ database });
const formDataStore = makeFormDataStore({ database });
const offerStore = makeOfferStore({ database });
const purchaseStore = makePurchaseStore({ database });

const repository = {
  questionStore,
  productCategoryStore,
  optionStore,
  userStore,
  formStore,
  formDataStore,
  offerStore,
  purchaseStore
};

export default repository;
export type Repository = typeof repository;
