import { Router } from 'express';
import controllers from '../controllers';

const routes = Router();

routes.get('/product_categories', controllers.getProductCategories);
routes.get('/user', controllers.getUser);
routes.get('/questions', controllers.getQuestions);

export default routes;
