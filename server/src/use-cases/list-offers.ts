import { FormTypeDefinition, ProductCategoryDefinition } from '@prisma/client';
import { GetOffersRequestParams } from '../controllers/get-offers';
import { Repository } from '../repository';

const offers = [
  {
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    price: 123,
    name: 'Insurance Company A',
    opinionsCount: 4
  },
  {
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    price: 456,
    name: 'Insurance Company B',
    opinionsCount: 7
  },
  {
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    price: 789,
    name: 'Insurance Company C',
    opinionsCount: 2
  },
  {
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    price: 321,
    name: 'Insurance Company D',
    opinionsCount: 6
  },
  {
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    price: 654,
    name: 'Insurance Company E',
    opinionsCount: 3
  },
  {
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    price: 987,
    name: 'Insurance Company F',
    opinionsCount: 9
  },
  {
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    price: 135,
    name: 'Insurance Company G',
    opinionsCount: 5
  },
  {
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    price: 246,
    name: 'Insurance Company H',
    opinionsCount: 8
  },
  {
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    price: 579,
    name: 'Insurance Company I',
    opinionsCount: 1
  },
  {
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    price: 753,
    name: 'Insurance Company J',
    opinionsCount: 10
  },
  {
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    price: 864,
    name: 'Insurance Company K',
    opinionsCount: 12
  },
  {
    productCategory: ProductCategoryDefinition.VEHICLE_INSURANCE,
    price: 147,
    name: 'Insurance Company L',
    opinionsCount: 11
  },
  {
    productCategory: ProductCategoryDefinition.CAR_DEAL,
    price: 123,
    name: 'Ford',
    opinionsCount: 4
  },
  {
    productCategory: ProductCategoryDefinition.CAR_DEAL,
    price: 456,
    name: 'Toyota',
    opinionsCount: 7
  },
  {
    productCategory: ProductCategoryDefinition.CAR_DEAL,
    price: 789,
    name: 'Honda',
    opinionsCount: 2
  },
  {
    productCategory: ProductCategoryDefinition.CAR_DEAL,
    price: 321,
    name: 'Chevrolet',
    opinionsCount: 6
  },
  {
    productCategory: ProductCategoryDefinition.CAR_DEAL,
    price: 654,
    name: 'BMW',
    opinionsCount: 3
  },
  {
    productCategory: ProductCategoryDefinition.CAR_DEAL,
    price: 987,
    name: 'Mercedes-Benz',
    opinionsCount: 9
  },
  {
    productCategory: ProductCategoryDefinition.CAR_DEAL,
    price: 135,
    name: 'Audi',
    opinionsCount: 5
  },
  {
    productCategory: ProductCategoryDefinition.CAR_DEAL,
    price: 246,
    name: 'Tesla',
    opinionsCount: 8
  },
  {
    productCategory: ProductCategoryDefinition.CAR_DEAL,
    price: 579,
    name: 'Nissan',
    opinionsCount: 1
  },
  {
    productCategory: ProductCategoryDefinition.CAR_DEAL,
    price: 753,
    name: 'Volkswagen',
    opinionsCount: 10
  },
  {
    productCategory: ProductCategoryDefinition.CAR_DEAL,
    price: 864,
    name: 'Subaru',
    opinionsCount: 12
  },
  {
    productCategory: ProductCategoryDefinition.CAR_DEAL,
    price: 147,
    name: 'Mazda',
    opinionsCount: 11
  }
];

const makeListOffers = ({ repository }: { repository: Repository }) => {
  const execute = async (params: GetOffersRequestParams) => {
    const form = await repository.formStore.find({
      where: {
        productCategory: {
          name: params.productCategory
        },
        formType: {
          name: FormTypeDefinition.SEARCH
        }
      },
      include: {
        formData: {
          include: {
            question: true
          }
        }
      }
    });

    // TODO: check the form if exists
    // TODO: throw error if does not exist

    // TODO: these filters should be applied to find specific offers
    const filters = form.formData.map((f) => ({
      filterName: f.question.name,
      filterValue: f.answer
    }));

    return offers.filter((o) => o.productCategory === params.productCategory);
  };

  return { execute };
};

export default makeListOffers;

export type ListOffers = ReturnType<typeof makeListOffers>;
