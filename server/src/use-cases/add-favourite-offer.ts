import { USER_ID } from '..';
import { PostFavouriteOfferBody } from '../controllers/post-favourite-offer';
import { Repository } from '../repository';
import _ from 'lodash';

const makeAddFavouriteOffer = ({ repository }: { repository: Repository }) => {
  const execute = async ({ data }: { data: PostFavouriteOfferBody }) => {
    await repository.offerStore.addFavouriteOffer({
      data: {
        offerId: Number(data.id),
        userId: USER_ID
      }
    });
  };

  return { execute };
};

export default makeAddFavouriteOffer;

export type AddFavouriteOffer = ReturnType<typeof makeAddFavouriteOffer>;
