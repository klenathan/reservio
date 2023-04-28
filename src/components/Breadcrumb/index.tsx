import { MdNavigateNext } from "react-icons/md";

interface BreadcrumbItem {
  label?: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="text-sm font-medium my-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center">
            {item.href ? (
              <a href={item.href} className="text-gray-500 hover:text-gray-700">
                {item.label}
              </a>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
            {index !== items.length - 1 && (
              <MdNavigateNext size={20} className="text-gray-400" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
