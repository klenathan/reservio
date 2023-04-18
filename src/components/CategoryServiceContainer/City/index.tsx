import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ICity } from "./cityInterface";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
interface ISearchableDropdown {
  options?: ICity;
  label: string;
  id?: string;
  selectedVal?: string;
  handleChange: any;
}

const SearchableDropdown: React.FC<ISearchableDropdown> = (props) => {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option: any) => {
    setQuery(() => "");
    props.handleChange(option[props.label]);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e: any) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (props.selectedVal) return props.selectedVal;

    return "";
  };

  const filter = (options: any) => {
    return options.filter(
      (option: any) =>
        option[props.label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };
  let style: {
    options: string;
    optionsOpen: string;
    option: string;
    optionSelected: string;
  } = {
    options: `hidden `,
    optionsOpen: `
    block border border-black
    box-border overflow-y-auto absolute
    max-h-72 w-full relative rounded-b-md
    `,
    option: `box-border cursor-pointer block hover:shadow hover:border-oliveGreen hover:bg-limeGreen hover:bg-opacity-20 p-1`,
    optionSelected: `bg-gray-100`,
  };
  return (
    <div>
      <div
        className={`${
          isOpen
            ? "flex border-x border-t border-black rounded-t-md"
            : "flex border border-black rounded-md"
        }`}
      >
        <input
          className="outline-none leading-normal text-base p-1 cursor-default w-full rounded-md"
          ref={inputRef}
          type="text"
          value={getDisplayValue()}
          name="searchTerm"
          onChange={(e) => {
            setQuery(e.target.value);
            props.handleChange(null);
          }}
          onClick={toggle}
        />
        <div>
          {isOpen ? <MdArrowDropDown size={30} /> : <MdArrowDropUp size={30} />}
        </div>
      </div>

      <div className={`${isOpen ? style["optionsOpen"] : style["options"]}`}>
        {filter(props.options).map((option: any, index: any) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`${
                option[props.label] === props.selectedVal
                  ? style["optionSelected"]
                  : style["option"]
              }`}
              key={`${props.id}-${index}`}
            >
              {option[props.label]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchableDropdown;
