import Link from "next/link";
import { categories } from "@/const/Categories";
import { Category } from "../../../../Types";
const CategoryList = () => {
  return (
    <div className="place-items-center snap-x overflow-auto flex gap-4 md:overflow-hideden  w-full md:gap md:w-full md:justify-around md:m-0 m-auto border-b">
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
    <Link
      className="snap-center flex lg:flex-col items-center gap-3 my-3 text-center text-lg font-semibold hover:text-midGreen hover:underline transition-all"
      href={`/products?category=${encodeURIComponent(props.id)}`}
    >
      <div className="flex justify-center">{props.icon}</div>
      <div>{props.category}</div>
    </Link>
  );
};

export default CategoryList;
