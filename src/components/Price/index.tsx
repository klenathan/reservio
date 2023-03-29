const Price = () => {
  return (
    <div className="flex">
      <div className="flex">
        <div className="underline h-full border-y border-l border-black p-1">
          đ
        </div>
        <input
          className="outline-none leading-normal text-base border-y border-r border-black cursor-default w-full"
          type="text"
          name="searchTerm"
          onChange={(e) => {}}
        />
      </div>
      <div className="mx-1">-</div>
      <div className="flex">
        <div className="underline h-full border-y border-l border-black p-1">
          đ
        </div>
        <input
          className="outline-none leading-normal text-base border-y border-r border-black cursor-default w-full"
          type="text"
          name="searchTerm"
          onChange={(e) => {}}
        />
      </div>
    </div>
  );
};

export default Price;
