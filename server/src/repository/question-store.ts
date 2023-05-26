import { Store } from '../config/database';

const makeQuestionStore = ({ database }: Store) => {
  const find = async () => {
    try {
      return await database.question.findFirstOrThrow();
    } catch (err) {
      // TODO: handle err
    }
  };

  const findMany = async () => {
    try {
      return await database.question.findMany();
    } catch (err) {
      // TODO: handle err
    }
  };

  return {
    find,
    findMany
  };
};

export default makeQuestionStore;
