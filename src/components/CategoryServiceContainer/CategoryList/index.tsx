import Link from "next/link";
import { categories } from "@/const/Categories";
import { Category } from "../../../../Types";
const CategoryList = () => {
  return (
    <div className="place-items-center grid grid-cols-3 w-full md:w-full md:grid-cols-10 md:m-0 mt-24 m-auto border-b">
      {categories.map((category) => {
        return (
          <Category
            key={category.id}
            id={category.id}
            category={category.category}
            icon={category.icon}
          />
        );
      })}
    </div>
  );
};

const Category = (props: Category) => {
  return (
    <Link href={`/products?category=${encodeURIComponent(props.id)}`}>
      <div className="flex items-center gap-3 my-3 text-center text-lg font-semibold hover:text-midGreen hover:underline ransition-all rounded ">
        <div className="flex justify-center">{props.icon}</div>
        <div>{props.category}</div>
      </div>
    </Link>
  );
};

export default CategoryList;
