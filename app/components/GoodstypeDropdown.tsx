import React, { useState, useRef, useEffect } from "react";

interface GoodsType {
  id: number;
  label: string;
  value: string;
}

const goodsTypes: GoodsType[] = [
  { id: 1, label: "Paket", value: "paket" },
  { id: 2, label: "Halvpall", value: "halvpall" },
  { id: 3, label: "Helpall", value: "helpall" },
  { id: 4, label: "Halv Lastbil (LTL)", value: "ltl" },
  { id: 5, label: "Hel Lastbil (FTL)", value: "ftl" },
];

const GoodsTypeDropdown = () => {
  const [selectedGoodsType, setSelectedGoodsType] = useState<GoodsType | null>(
    null
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null); // Reference to the component

  useEffect(() => {
    // Function to check if click is outside of component
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectGoodsType = (goodsType: GoodsType): void => {
    setSelectedGoodsType(goodsType);
    setIsDropdownVisible(false);
  };

  return (
    <div ref={ref} className="flex flex-col md:mb-0 relative">
      <span className="label-text mb-2">Välj godstyp</span>
      <div
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        className="input input-bordered w-full bg-white cursor-pointer flex items-center pl-3"
      >
        {selectedGoodsType ? selectedGoodsType.label : "Välj godstyp"}
      </div>
      {isDropdownVisible && (
        <div className="absolute z-10 w-full bg-white rounded shadow-md mt-20">
          <div className="max-h-60 overflow-y-auto">
            {goodsTypes.map((goodsType) => (
              <div
                key={goodsType.id}
                className="p-2 hover:bg-gray-100 flex items-center"
                onClick={() => handleSelectGoodsType(goodsType)}
              >
                {goodsType.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoodsTypeDropdown;
