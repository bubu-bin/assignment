import { Repository } from '../repository';

const makeShowUser = ({ repository }: { repository: Repository }) => {
  const execute = async () => {
    return await repository.userStore.find({ id: 1 });
  };

  return { execute };
};

export default makeShowUser;

export type ShowUser = ReturnType<typeof makeShowUser>;
