import Link from "next/link";
import { categories } from "@/const/Categories";
import { Category } from "../../../../Types";
const CategoryList = () => {
  return (
    <div className="place-items-center grid grid-cols-3 w-full md:w-full md:grid-cols-5 md:m-0 md:border-none mt-24 m-auto">
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
    <Link href={`/category?id=${encodeURIComponent(props.id)}`}>
      <div className="text-center m-3">
        <div className="flex justify-center">{props.icon}</div>
        <div>{props.category}</div>
      </div>
    </Link>
  );
};

export default CategoryList;
