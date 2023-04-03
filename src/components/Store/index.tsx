import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { RxDotFilled } from "react-icons/rx";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import Link from "next/link";
interface ISocialMedia {
  facebook?: string;
  instagram?: string;
}

interface IStore {
  id: string;
  name: string;
  vendor: string;
  image: string;
  about: string;
  phone: string;
  socialMedia: ISocialMedia;
  rating: number;
  review: number;
  service: number;
}

const Store = (props: { store: IStore }) => {
  return (
    <div className="grid grid-cols-3 border border-black m-8 rounded-md">
      <div className="flex flex-col items-center justify-center p-8">
        <Image
          src={props.store.image}
          alt={props.store.name}
          width={150}
          height={150}
          // className="rounded-full"
        />
        <div>{props.store.name}</div>
        <div>@{props.store.vendor}</div>
      </div>
      <div className="p-8">
        <div>
          <span className="font-bold">About:</span> {props.store.about}
        </div>
        <div>
          <span className="font-bold">Phone:</span> {props.store.phone}
        </div>
        <div className="flex items-center">
          <span className="font-bold">Social Media:</span>{" "}
          {props.store.socialMedia.facebook ? (
            <Link className="mx-2" href={props.store.socialMedia.facebook}>
              {" "}
              <BsFacebook />{" "}
            </Link>
          ) : (
            ""
          )}
          {props.store.socialMedia.instagram ? (
            <Link href={props.store.socialMedia.instagram}>
              {" "}
              <BsInstagram />{" "}
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="p-8">
        <div className="flex">
          <div className="flex items-center font-bold">
            <AiFillStar /> {""} {props.store.rating} / 5.0
          </div>
          <div className="flex items-center">
            <RxDotFilled />
            <div className="font-bold">{props.store.review}</div>
            {props.store.review > 1 ? "reviews" : "review"}
          </div>
        </div>
        <div>Service provides: {props.store.service} services</div>
      </div>
    </div>
  );
};

export default Store;
