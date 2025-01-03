import Image from "next/image";
import React, { useState } from "react";
import { ShippingData } from "@/types";

interface PackageOptionProps {
  name: string;
  imagePath?: string;
  isSelected: boolean;
  onSelect: () => void;
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

interface DashboardShippingPackageFormProps {
  updateShippingData: (data: Partial<ShippingData>) => void;
  animationClass?: string;
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
      className={`border p-4 flex flex-col items-center justify-center rounded ${
        isSelected ? "border-gray-500" : ""
      }`}
      onClick={onSelect}
      style={{ height: "180px" }}
    >
      <div className="mb-2 w-16 h-16 flex items-center justify-center">
        {imagePath && (
          <Image src={imagePath} alt={name} width={100} height={100} />
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

const DashboardShippingPackageForm: React.FC<
  DashboardShippingPackageFormProps
> = ({ updateShippingData, animationClass }) => {
  const [selectedOption, setSelectedOption] = useState<string>("Paket");
  const [isStackable, setIsStackable] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<{
    weight: string;
    length: string;
    width: string;
    height: string;
  }>({
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
    const newDimensions = { ...dimensions, [dimension]: value };
    setDimensions(newDimensions);
    updatePackageData(newDimensions, isStackable);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setCount(1);
    setIsStackable(false);
  };

  const handleStackableChange = (stackable: boolean) => {
    setIsStackable(stackable);
    updatePackageData(dimensions, stackable);
  };

  const updatePackageData = (
    newDimensions: {
      weight: string;
      length: string;
      width: string;
      height: string;
    },
    newStackable: boolean
  ) => {
    updateShippingData({
      weight: newDimensions.weight,
      dimensions: {
        length: newDimensions.length,
        width: newDimensions.width,
        height: newDimensions.height,
      },
      stackable: newStackable,
    });
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
    <div
      className={`card max-w-lg bg-base-100 shadow-xl mx-auto my-4 ${animationClass}`}
    >
      <div className="card-body">
        <h2 className="card-title text-lg mb-4">Kolli</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <PackageOption
            name="Paket"
            imagePath="/images/packageship.png"
            isSelected={selectedOption === "Paket"}
            onSelect={() => handleOptionSelect("Paket")}
            count={count}
            onDecrement={() => setCount(Math.max(count - 1, 0))}
            onIncrement={() => setCount(count + 1)}
          />
          <PackageOption
            name="Pall"
            imagePath="/images/palletship.png"
            isSelected={selectedOption === "Pall"}
            onSelect={() => handleOptionSelect("Pall")}
            count={count}
            onDecrement={() => setCount(Math.max(count - 1, 0))}
            onIncrement={() => setCount(count + 1)}
          />
          <PackageOption
            name="Ospecificerat"
            imagePath="/images/question.png"
            isSelected={selectedOption === "Ospecificerat"}
            onSelect={() => handleOptionSelect("Ospecificerat")}
            count={count}
            onDecrement={() => setCount(Math.max(count - 1, 0))}
            onIncrement={() => setCount(count + 1)}
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
              onChange={(e) => handleDimensionChange("weight", e.target.value)}
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
                onChange={(e) =>
                  handleDimensionChange("length", e.target.value)
                }
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
                onChange={(e) => handleDimensionChange("width", e.target.value)}
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
                onChange={(e) =>
                  handleDimensionChange("height", e.target.value)
                }
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
                  checked={isStackable}
                  onChange={() => handleStackableChange(true)}
                />
                <span className="ml-2">Ja</span>
              </label>
              <label className="flex items-center mt-4">
                <input
                  type="radio"
                  name="stackable"
                  className="radio checked:bg-black"
                  value="nej"
                  checked={!isStackable}
                  onChange={() => handleStackableChange(false)}
                />
                <span className="ml-2">Nej</span>
              </label>
            </div>
          </div>
        )}

        <div className="mb-4 bg-gray-200">
          <span className="text-xs">{note}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardShippingPackageForm;
