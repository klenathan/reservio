import Link from "next/link";
import {categories} from "@/const/Categories";
import {Category} from "../../../../Types";

interface categoryListProps {
    categoryActive?: string
}

interface categoryProps extends Category{
    active?: boolean
}

const CategoryList = (props: categoryListProps) => {
    return (
        <div
            className="place-items-center snap-x overflow-auto flex gap-4 md:overflow-hideden  w-full md:gap md:w-full md:justify-around md:m-0 m-auto border-b">
            {categories.map((category) => {
                return (
                    <CategoryCard
                        active={props.categoryActive == category.id}
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

const CategoryCard = (props: categoryProps) => {
    return (
        <Link
            className={`snap-center flex lg:flex-col items-center gap-3 my-3 text-center text-lg hover:text-midGreen hover:underline transition-all 
            ${props.active ? "font-bold underline" : "font-semibold" }`}
            href={`/products?category=${encodeURIComponent(props.id)}`}
        >
            <div className="flex justify-center">{props.icon}</div>
            <div>{props.category}</div>
        </Link>
    );
};

export default CategoryList;
