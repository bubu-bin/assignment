import { GetQuestionsRequestParams } from '../controllers/get-questions';
import { Repository } from '../repository';

const makeListQuestions = ({ repository }: { repository: Repository }) => {
  const execute = async (params: GetQuestionsRequestParams) => {
    let questions = await repository.questionStore.findMany({
      include: {
        inputType: true,
        options: true,
        questionType: true
      },
      where: {
        formType: {
          name: params.formType
        },
        productCategory: {
          name: params.productCategory
        }
      }
    });

    questions = await Promise.all(
      questions.map(async (question) => {
        const interDependentQuestions =
          await repository.questionStore.findInterDependentQuestions({
            where: {
              leadingQuestionId: question.id
            }
          });

        return {
          ...question,
          interDependentQuestionsId: interDependentQuestions.map(
            (i) => i.interDependentQuestionId
          )
        };
      })
    );

    return questions;
  };

  return { execute };
};

export default makeListQuestions;

export type ListQuestions = ReturnType<typeof makeListQuestions>;
