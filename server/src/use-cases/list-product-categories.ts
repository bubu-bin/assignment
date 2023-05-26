import { Repository } from '../repository';

const makeListProductCategories = ({
  repository
}: {
  repository: Repository;
}) => {
  const execute = async () => {
    const productCategories = await repository.productCategoryStore.findMany();

    return productCategories;
  };

  return { execute };
};

export default makeListProductCategories;

export type ListProductCategories = ReturnType<
  typeof makeListProductCategories
>;
