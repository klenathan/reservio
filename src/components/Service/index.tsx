import Service from "./service";

const services = [
  {
    id: 1,
    name: "[Sai Gon] Tren Nhung Dam May - Chillies Concert Tour",
    place: "SEC District 7, Ho Chi Minh City",
    store: "Volleyball Court A",
    time: "16:00 - 22:00 | 20/05/2023",
    price: 550000,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
  },
  {
    id: 2,
    name: "[Ha Noi] Tren Nhung Dam May - Chillies Concert Tour",
    place: "SEC District 7, Ho Chi Minh City",
    store: "Volleyball Court A",
    time: "16:00 - 22:00 | 20/05/2023",
    price: 550000,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
  },
  {
    id: 3,
    name: "[Da Nang] Tren Nhung Dam May - Chillies Concert Tour",
    place: "SEC District 7, Ho Chi Minh City",
    store: "Volleyball Court A",
    time: "16:00 - 22:00 | 20/05/2023",
    price: 550000,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
  },
  {
    id: 4,
    name: "[Da Nang] Tren Nhung Dam May - Chillies Concert Tour",
    place: "SEC District 7, Ho Chi Minh City",
    store: "Volleyball Court A",
    time: "16:00 - 22:00 | 20/05/2023",
    price: 550000,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
  },
];
const ServiceList = () => {
  return (
    <div className="grid grid-cols-3 place-items-center">
      {services.map((service, index) => {
        return <Service key={service.id} service={service} />;
      })}
    </div>
  );
};

export default ServiceList;
