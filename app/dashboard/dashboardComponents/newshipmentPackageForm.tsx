import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateShipmentDetails } from "@/app/store/shipmentDetailsSlice";
import Image from "next/image";
import LoadingSkeleton from "@/app/components/ui/LoadingSkeleton";

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
      className={`border p-4 flex flex-col items-center justify-center rounded ${
        isSelected ? "border-gray-500" : ""
      }`}
      onClick={onSelect}
      style={{ height: "180px" }}
    >
      <div className="mb-2 w-16 h-16 flex items-center justify-center">
        {imagePath && (
          <Image src={imagePath} alt={name} width={200} height={200} />
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
  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.shipmentDetails);

  const [selectedOption, setSelectedOption] = useState<string>("Paket");
  const [description, setDescription] = useState<string>("");
  const [dimensions, setDimensions] = useState({
    length: "",
    width: "",
    height: "",
  });
  const [weight, setWeight] = useState<string>("");
  const [count, setCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (details.packageDetails) {
      setDescription(details.description || "");
      setWeight(
        details.packageDetails.weight !== 0
          ? details.packageDetails.weight.toString()
          : ""
      );
      setDimensions({
        length:
          details.packageDetails.dimensions.length !== 0
            ? details.packageDetails.dimensions.length.toString()
            : "",
        width:
          details.packageDetails.dimensions.width !== 0
            ? details.packageDetails.dimensions.width.toString()
            : "",
        height:
          details.packageDetails.dimensions.height !== 0
            ? details.packageDetails.dimensions.height.toString()
            : "",
      });
      setCount(details.count || 1);
      setSelectedOption(details.packageType || "Paket");
    }
    setIsLoading(false);
  }, [details]);

  const handleDimensionChange = (
    dimension: keyof typeof dimensions,
    value: string
  ) => {
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [dimension]: value,
    }));

    dispatch(
      updateShipmentDetails({
        packageDetails: {
          ...details.packageDetails,
          dimensions: {
            ...details.packageDetails.dimensions,
            [dimension]: value ? parseFloat(value) : 0,
          },
        },
      })
    );
  };

  const handleWeightChange = (value: string) => {
    setWeight(value);

    dispatch(
      updateShipmentDetails({
        packageDetails: {
          ...details.packageDetails,
          weight: value ? parseFloat(value) : 0,
        },
      })
    );
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setCount(1);
    dispatch(
      updateShipmentDetails({
        packageType: option,
        count: 1,
        packageDetails: {
          ...details.packageDetails,
          isStackable: true,
        },
      })
    );
  };

  const handleDecrement = () => {
    const newCount = count > 1 ? count - 1 : 1;
    setCount(newCount);
    dispatch(updateShipmentDetails({ count: newCount }));
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    dispatch(updateShipmentDetails({ count: newCount }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDescription(value);
    dispatch(
      updateShipmentDetails({
        description: value,
        packageDetails: {
          ...details.packageDetails,
          content: value,
        },
      })
    );
  };

  const handleStackableChange = (stackable: boolean) => {
    dispatch(
      updateShipmentDetails({
        packageDetails: {
          ...details.packageDetails,
          isStackable: stackable,
        },
      })
    );
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
    <div className="card max-w-lg mx-auto my-4 w-full">
      {isLoading ? (
        <div className="w-full h-screen">
          <LoadingSkeleton />
        </div>
      ) : (
        <div className="card-body bg-base-100 shadow-xl">
          <h2 className="card-title text-lg mb-4">Kolli</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <PackageOption
              name="Paket"
              imagePath="/images/packageship.png"
              isSelected={selectedOption === "Paket"}
              onSelect={() => handleOptionSelect("Paket")}
              count={count}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
            />
            <PackageOption
              name="Pall"
              imagePath="/images/palletship.png"
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
                value={weight}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^[0-9\b]+$/.test(value)) {
                    handleWeightChange(value);
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

          {(selectedOption === "Pall" ||
            selectedOption === "Ospecificerat") && (
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
                    checked={details.packageDetails.isStackable === true}
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
                    checked={details.packageDetails.isStackable === false}
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
          <div className="flex flex-col mb-4 md:mb-0">
            <span className="label-text">Beskrivning (Innehåll)</span>
            <input
              type="text"
              className="input input-bordered w-full"
              value={description}
              onChange={handleDescriptionChange}
              maxLength={30}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewShipmentPackageForm;
