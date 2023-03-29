import Image from "next/image";
const CategoryList: React.FC<CategoryProps> = (props: CategoryProps) => {
  return (
    <div className="grid grid-cols-6 place-items-center h-[5rem] ">
      <Category image="assets/profile.svg" cateName="Accomodations" />
      <Category image="assets/profile.svg" cateName="Vehicles" />
      <Category image="assets/profile.svg" cateName="Sports" />
      <Category image="assets/profile.svg" cateName="Restaurants" />
      <Category image="assets/profile.svg" cateName="Hospital" />
      <Category image="assets/profile.svg" cateName="Others" />
    </div>
  );
};
interface CategoryProps {
  children?: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[];
  image: string;
  cateName?: string;
}
const Category = (props: CategoryProps) => {
  const size = 32;

  return (
    <div className="text-center m-3">
      <div className="flex justify-center">
        <Image
          priority
          src={props.image}
          height={size - 8}
          width={size - 8}
          alt="Profile Hamburger"
        />
      </div>

      <div>{props.cateName}</div>
    </div>
  );
};

export default CategoryList;
