import React, { useState } from "react";

interface PackageOptionProps {
  name: string;
  imagePath?: string;
  isSelected: boolean;
  onSelect: () => void;
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

const PackageOption: React.FC<PackageOptionProps> = ({
  name,
  imagePath,
  isSelected,
  onSelect,
  count,
  onDecrement,
  onIncrement,
}) => {
  const handleDecrementClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onDecrement();
  };

  const handleIncrementClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onIncrement();
  };

  return (
    <div
      className={`border p-4 flex flex-col items-center justify-center ${
        isSelected ? "border-black" : ""
      }`}
      onClick={onSelect}
      style={{ height: "180px" }}
    >
      <div className="mb-2 w-16 h-16  flex items-center justify-center">
        {imagePath && (
          <img src={imagePath} alt={name} className="w-full h-full" />
        )}
        {!imagePath && <span>{name.slice(0, 1)}</span>}
      </div>
      <span className="font-bold">{name}</span>
      {isSelected && (
        <div className="flex items-center mt-2">
          <button
            onClick={handleDecrementClick}
            className="btn btn-primary btn-sm"
          >
            -
          </button>
          <span className="input input-bordered w-12 h-8 text-center">
            {count}
          </span>
          <button
            onClick={handleIncrementClick}
            className="btn btn-primary btn-sm"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

const NewShipmentPackageForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Paket"); // Initialize with "Paket"
  const [isStackable, setIsStackable] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({
    weight: "",
    length: "",
    width: "",
    height: "",
  });
  const [count, setCount] = useState<number>(1);

  const handleDimensionChange = (
    dimension: keyof typeof dimensions,
    value: string
  ) => {
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [dimension]: value,
    }));
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setCount(1);
    setIsStackable(null);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  let note = "";
  if (selectedOption === "Pall") {
    note =
      "Stapelbart: Ovansida är helt plan, täcker hela pallens yta och klarar likvärdig pall och vikt ovanpå. Godset är emballerat i tåligt material och sticker ej utanför pallen";
  } else if (selectedOption === "Ospecificerat") {
    note =
      "Stapelbart: Godset måste vara väl skyddat och emballerat i ett tåligt material som kan vara t.ex. trä, plast eller metall. Ovansidan på godset måste vara helt plan och måste tåla sin egen vikt ovanpå.";
  } else {
    note =
      "Notera: Paketet måste kunna bli roterat i alla 3 dimensioner samt kunna ha liknande paket staplade ovanpå sig, annars välj ospecificerat";
  }

  return (
    <div className="card max-w-lg bg-base-100 shadow-xl mx-auto my-4">
      <div className="card-body">
        <h2 className="card-title text-lg mb-4">Kolli</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <PackageOption
            name="Paket"
            imagePath="/images/parcel.png"
            isSelected={selectedOption === "Paket"}
            onSelect={() => handleOptionSelect("Paket")}
            count={count}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
          />
          <PackageOption
            name="Pall"
            imagePath="/images/pallet.png"
            isSelected={selectedOption === "Pall"}
            onSelect={() => handleOptionSelect("Pall")}
            count={count}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
          />
          <PackageOption
            name="Ospecificerat"
            imagePath="/images/question.png"
            isSelected={selectedOption === "Ospecificerat"}
            onSelect={() => handleOptionSelect("Ospecificerat")}
            count={count}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
          />
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="weight" className="label-text mb-1">
            Vikt per kolli
          </label>
          <div className="relative w-full max-w-lg">
            <input
              id="weight"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              className="input input-bordered w-full pl-4 pr-12"
              value={dimensions.weight}
              onChange={(e) => {
                // Ensure only numeric input
                const value = e.target.value;
                if (value === "" || /^[0-9\b]+$/.test(value)) {
                  handleDimensionChange("weight", value);
                }
              }}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span>kg</span>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="length" className="label-text mb-1">
              Längd
            </label>
            <div className="relative">
              <input
                id="length"
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                className="input input-bordered w-full pl-4 pr-12"
                value={dimensions.length}
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    /^[0-9\b]+$/.test(e.target.value)
                  ) {
                    handleDimensionChange("length", e.target.value);
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span>cm</span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="width" className="label-text mb-1">
              Bredd
            </label>
            <div className="relative">
              <input
                id="width"
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                className="input input-bordered w-full pl-4 pr-12"
                value={dimensions.width}
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    /^[0-9\b]+$/.test(e.target.value)
                  ) {
                    handleDimensionChange("width", e.target.value);
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span>cm</span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="height" className="label-text mb-1">
              Höjd
            </label>
            <div className="relative">
              <input
                id="height"
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                className="input input-bordered w-full pl-4 pr-12"
                value={dimensions.height}
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    /^[0-9\b]+$/.test(e.target.value)
                  ) {
                    handleDimensionChange("height", e.target.value);
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span>cm</span>
              </div>
            </div>
          </div>
        </div>

        {(selectedOption === "Pall" || selectedOption === "Ospecificerat") && (
          <div className="mb-4">
            <span className="text-sm font-semibold">
              Är ditt gods stapelbart?
            </span>
            <div className="flex">
              <label className="flex items-center mr-4 mt-4">
                <input
                  type="radio"
                  name="stackable"
                  className="radio checked:bg-black"
                  value="ja"
                  checked={isStackable === "ja"}
                  onChange={() => setIsStackable("ja")}
                  // Checked state should be dynamically set based on state or form library
                />
                <span className="ml-2">Ja</span>
              </label>
              <label className="flex items-center mt-4">
                <input
                  type="radio"
                  name="stackable"
                  className="radio checked:bg-black"
                  value="nej"
                  checked={isStackable === "nej"}
                  onChange={() => setIsStackable("nej")}
                  // Checked state should be dynamically set based on state or form library
                />
                <span className="ml-2">Nej</span>
              </label>
            </div>
          </div>
        )}

        <div className="mb-4 bg-gray-200">
          <span className="text-xs">{note}</span>
        </div>
        <div className="flex flex-col mb-4 md:mb-0">
          <span className="label-text">Beskrivning (Innehåll)</span>
          <input type="text" className="input input-bordered w-full" />
        </div>
      </div>
    </div>
  );
};

export default NewShipmentPackageForm;
