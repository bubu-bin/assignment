import { Repository } from '../repository';

const makeListQuestions = ({ repository }: { repository: Repository }) => {
  const execute = async () => {
    const questions = await repository.questionStore.findMany();

    return questions;
  };

  return { execute };
};

export default makeListQuestions;

export type ListQuestions = ReturnType<typeof makeListQuestions>;
