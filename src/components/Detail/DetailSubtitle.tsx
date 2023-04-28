import { FaCheck, FaMapMarkerAlt, FaStar } from "react-icons/fa";

interface Listing {
  rating: number | undefined;
  reviewCount: number | undefined;
  location: string;
  isCertified: boolean;
}

const DetailSubtitle: React.FC<Listing> = ({
  rating,
  reviewCount,
  location,
  isCertified,
}) => {
  const tickIcon = isCertified ? <FaCheck className="mx-1" /> : null;
  const dot = <span className="mx-1">&#8226;</span>;

  return (
    <div className="flex items-center text-gray-600 text-sm font-bold mb-8">
      <div className={`flex items-center }`}>
        <FaStar className="mr-1" />
        {rating ? <span>{rating.toFixed(1)}</span> : <span>0</span>}
      </div>
      {dot}
      <div className="flex items-center">
        <span className="mr-1">{reviewCount}</span>
        <span>reviews</span>
      </div>
      {dot}
      {tickIcon && (
        <div className="flex items-center">
          {tickIcon}
          <span>Certified Vendor</span>
        </div>
      )}
      <div className="flex items-center">
        {dot}
        <FaMapMarkerAlt className="mr-1" />
        <span>{location}</span>
      </div>
    </div>
  );
};

export default DetailSubtitle;
