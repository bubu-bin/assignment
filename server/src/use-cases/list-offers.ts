import { FormTypeDefinition, ProductCategoryDefinition } from '@prisma/client';
import { GetOffersRequestParams } from '../controllers/get-offers';
import { Repository } from '../repository';

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

    const products = await repository.productStore.findMany({
      where: {
        productCategory: { name: params.productCategory }
      },
      include: {
        productCategory: true
      }
    });
    // TODO: check the form if exists
    // TODO: throw error if does not exist

    // TODO: these filters should be applied to find specific offers
    const filters = form.formData.map((f) => ({
      filterName: f.question.name,
      filterValue: f.answer
    }));

    return products.filter(
      (product) => product.productCategory.name === params.productCategory
    );
  };

  return { execute };
};

export default makeListOffers;

export type ListOffers = ReturnType<typeof makeListOffers>;
