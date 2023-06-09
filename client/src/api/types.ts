export interface Question {
  isInterDependent: boolean;
  order: string;
  prompt: string;
  createdAt: Date;
  updatedAt: Date;
  inputType: InputTypeDefinition;
  questionType: QuestionTypeDefinition;
  productCategory: ProductCategory['name'];
  id: number;
  name: string;
  placeholder?: string;
  options: Array<Omit<Option, 'questionId'>>;
  textFieldType: 'numeric' | 'text';
  isMulti: boolean;
  interDependentQuestionsId: number[];
}

export interface QuestionWithAnswer {
  isInterDependent: boolean;
  order: string;
  prompt: string;
  createdAt: Date;
  updatedAt: Date;
  inputType: InputTypeDefinition;
  questionType: QuestionTypeDefinition;
  productCategory: ProductCategory['name'];
  id: number;
  name: string;
  placeholder?: string;
  options: Array<Omit<Option, 'questionId'>>;
  value: any;
  textFieldType: 'numeric' | 'text';
  isMulti: boolean;
  interDependentQuestionsId: number[];
}

export interface UserFavouriteOffers {
  id: number;
  userId: number;
  offerId: number;
}

export interface Offer {
  productCategoryId: number;
  amount: number;
  name: string;
  opinionsCount: number;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Option {
  value: string;
  id: number;
  questionId: number;
}

export interface ProductCategory {
  name: ProductCategoryDefinition;
  id: number;
}

export enum ProductCategoryDefinition {
  CAR_DEAL = 'CAR_DEAL',
  VEHICLE_INSURANCE = 'VEHICLE_INSURANCE'
}

export enum InputTypeDefinition {
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  TEXT = 'TEXT'
}

export enum QuestionTypeDefinition {
  OPTION = 'OPTION',
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT'
}

export enum FormTypeDefinition {
  SEARCH = 'SEARCH',
  PURCHASE = 'PURCHASE'
}
