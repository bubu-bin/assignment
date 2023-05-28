import { Router } from 'express';
import controllers from '../controllers';

const routes = Router();

// TODO: into seperate routes
// TODO: handle params checking
routes.get('/product_categories', controllers.getProductCategories);
routes.get('/user', controllers.getUser);
routes.get('/questions', controllers.getQuestions);
routes.get('/form_data', controllers.getFormData);
routes.get('/offers', controllers.getOffers);
routes.post('/form', controllers.addForm);
routes.patch('/form', controllers.patchForm);
routes.get(
  '/inter_dependent_questions',
  controllers.getInterDependentQuestions
);

export default routes;
