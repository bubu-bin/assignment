import useCases from '../use-cases';
import makeGetProductCategories from './get-product-categories';
import makeGetUser from './get-user';
import makeGetQuestions from './get-questions';
import makePostForm from './post-form';
import makeGetFormData from './get-form-data';
import makeGetOffers from './get-offers';
import makePatchForm from './patch-form';
import makeGetInterDependentQuestions from './get-inter-dependent-questions';

const getProductCategories = makeGetProductCategories({
  listProductCategories: useCases.listProductCategories
});
const getUser = makeGetUser({
  showUser: useCases.showUser
});
const getQuestions = makeGetQuestions({
  listQuestions: useCases.listQuestions
});
const addForm = makePostForm({ addForm: useCases.addForm });
const getFormData = makeGetFormData({ listFormData: useCases.listFormData });
const getOffers = makeGetOffers({ listOffers: useCases.listOffers });
const patchForm = makePatchForm({ editForm: useCases.editForm });
const getInterDependentQuestions = makeGetInterDependentQuestions({
  listInterDependentQuestions: useCases.listInterDependentQuestion
});

export default {
  getProductCategories,
  getUser,
  getQuestions,
  addForm,
  getFormData,
  getOffers,
  patchForm,
  getInterDependentQuestions
};
