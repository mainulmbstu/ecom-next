export const generateMetadata = async ({ params }) => {
  let { slug } = await params;
  return {
    title: slug,
    description: slug,
  };
};

const CategoryPage = async ({ params }) => {
  let { slug } = await params;

  return <div>{slug}</div>;
};

export default CategoryPage;
