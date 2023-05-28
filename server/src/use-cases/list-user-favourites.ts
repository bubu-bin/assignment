import { USER_ID } from '..';
import { Repository } from '../repository';

const makeListUserFavourites = ({ repository }: { repository: Repository }) => {
  const execute = async () => {
    const favouriteOffers = await repository.offerStore.findFavouritesOffers({
      where: {
        userId: USER_ID
      },
      include: {
        offer: true
      }
    });

    return favouriteOffers;
  };

  return { execute };
};

export default makeListUserFavourites;

export type ListUserFavourites = ReturnType<typeof makeListUserFavourites>;
