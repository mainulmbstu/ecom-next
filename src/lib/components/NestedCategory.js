import { Axios } from "../helpers/AxiosInstance";
import NestedCategoryData from "./NestedCategoryData";
import "./nestedCategory.css";
const NestedCategory = async () => {
  // let { data } = await Axios.get(`/api/both/category-list`);
  return (
    <div>
      <NestedCategoryData />
      {/* <NestedCategoryData data={data} /> */}
    </div>
  );
};

export default NestedCategory;
