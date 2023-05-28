import { GetOfferRequestParams } from '../controllers/get-offer';
import { Repository } from '../repository';

const makeShowOffer = ({ repository }: { repository: Repository }) => {
  const execute = async (params: GetOfferRequestParams) => {
    const offer = repository.offerStore.find({
      where: {
        id: Number(params.id)
      },
      include: {
        productCategory: true
      }
    });

    return offer;
  };

  return { execute };
};

export default makeShowOffer;

export type ShowOffer = ReturnType<typeof makeShowOffer>;
