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

    const offers = await repository.offerStore.findMany({
      where: {
        productCategory: { name: params.productCategory }
      },
      include: {
        productCategory: true,
        userFavouriteOffers: true
      }
    });

    const filters = form.formData.map((f) => ({
      filterName: f.question.name,
      filterValue: f.answer
    }));

    return offers.filter(
      (offer) => offer.productCategory.name === params.productCategory
    );
  };

  return { execute };
};

export default makeListOffers;

export type ListOffers = ReturnType<typeof makeListOffers>;
