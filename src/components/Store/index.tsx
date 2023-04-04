import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { RxDotFilled } from "react-icons/rx";
import { BsFacebook, BsInstagram, BsTiktok, BsYoutube } from "react-icons/bs";
import Link from "next/link";
interface ISocialMedia {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
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
    <div className="grid grid-cols-1 md:grid-cols-3 md:border md:border-black md:m-8 md:rounded-md">
      <div className="flex flex-col items-center justify-center md:p-8 p-2">
        <Image
          src={props.store.image}
          alt={props.store.name}
          width={150}
          height={150}
          className="rounded-full"
        />
        <div>{props.store.name}</div>
        <div>@{props.store.vendor}</div>
      </div>
      <div className="md:p-8 p-2">
        <div>
          <span className="font-bold">About:</span> {props.store.about}
        </div>
        <div>
          <span className="font-bold">Phone:</span> {props.store.phone}
        </div>
        <div className="flex items-center">
          <span className="font-bold">Social Media:</span>{" "}
          {props.store.socialMedia.facebook ? (
            <Link className="mx-1" href={props.store.socialMedia.facebook}>
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
          {props.store.socialMedia.tiktok ? (
            <Link className="mx-1" href={props.store.socialMedia.tiktok}>
              {" "}
              <BsTiktok />{" "}
            </Link>
          ) : (
            ""
          )}
          {props.store.socialMedia.youtube ? (
            <Link className="mx-1" href={props.store.socialMedia.youtube}>
              {" "}
              <BsYoutube />{" "}
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="md:p-8 p-2">
        <div className="flex">
          <div className="flex items-center font-bold">
            <AiFillStar /> {""} {props.store.rating} / 5.0
          </div>
          <div className="flex items-center">
            <RxDotFilled />
            <div className="font-bold mr-1">{props.store.review}</div>
            {props.store.review > 1 ? "reviews" : "review"}
          </div>
        </div>
        <div>
          <span className="font-bold">Service provides: </span>{" "}
          {props.store.service} services
        </div>
      </div>
    </div>
  );
};

export default Store;
