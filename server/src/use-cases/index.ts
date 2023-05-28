import repository from '../repository';
import makeListProductCategories from './list-product-categories';
import makeShowUser from './show-user';
import makeListQuestions from './list-questions';
import makeAddForm from './add-form';
import makeListFormData from './list-form-data';
import makeListOffers from './list-offers';
import makeEditForm from './edit-form';
import makeListInterDependentQuestions from './list-inter-dependent-questions';
import makeShowOffer from './show-offer';
import makeAddPurchase from './add-purchase';

const listProductCategories = makeListProductCategories({ repository });
const showUser = makeShowUser({ repository });
const listQuestions = makeListQuestions({ repository });
const addForm = makeAddForm({ repository });
const listFormData = makeListFormData({ repository });
const listOffers = makeListOffers({ repository });
const editForm = makeEditForm({ repository });
const listInterDependentQuestion = makeListInterDependentQuestions({
  repository
});
const showOffer = makeShowOffer({ repository });
const addPurchase = makeAddPurchase({ repository });

export default {
  listProductCategories,
  showUser,
  listQuestions,
  addForm,
  listFormData,
  listOffers,
  editForm,
  listInterDependentQuestion,
  showOffer,
  addPurchase
};
