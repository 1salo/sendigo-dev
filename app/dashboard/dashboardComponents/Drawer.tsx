import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoSend, IoTrash } from "react-icons/io5";
import Flag from "react-world-flags";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Product } from "@/types";
import { COUNTRIES } from "@/app/_lib/countries";
import { removeFromCart } from "@/app/store/cartSlice";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.products);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  const getCountryCode = (countryNameOrCode: string) => {
    const country = COUNTRIES.find(
      (c) => c.engTitle === countryNameOrCode || c.value === countryNameOrCode
    );
    return country ? country.value : "";
  };

  const calculateVolume = (dimensions: {
    length: number;
    width: number;
    height: number;
  }) => {
    const { length, width, height } = dimensions;
    if (length && width && height) {
      const volumeCm3 = length * width * height;
      const volumeM3 = volumeCm3 / 1000000;
      const decimalPlaces = volumeM3 > 0.9 ? 1 : 2;
      const roundedVolume =
        Math.round(volumeM3 * Math.pow(10, decimalPlaces)) /
        Math.pow(10, decimalPlaces);
      return `${roundedVolume.toFixed(decimalPlaces)} m³`;
    }
    return "0 m³";
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("sv-SE", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <>
      {isOpen && (
        <div className="drawer open">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl">Sändningslista</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          <div className="p-4 flex-grow overflow-y-auto min-w-[400px] max-w-[400px] max-h-[70vh] min-h-[70vh] border-y bg-gray-50">
            {cart.length === 0 ? (
              <p>Sändningslista är tom.</p>
            ) : (
              cart.map((product: Product) => (
                <div key={product.id} className="pb-4 mb-14 bg-white shadow-lg">
                  <div className="p-4 flex justify-between items-start border-b">
                    <div>
                      <p className="text-sm text-gray-600">
                        {product.quantity} kolli
                      </p>
                      {product.packageDetails &&
                        product.packageDetails.dimensions && (
                          <p className="text-sm text-gray-600">
                            {product.packageDetails.weight} kg,{" "}
                            {calculateVolume(product.packageDetails.dimensions)}
                          </p>
                        )}
                    </div>
                    {product.date && (
                      <p className="text-sm text-gray-600">
                        {formatDate(product.date)}
                      </p>
                    )}
                  </div>

                  <div className="p-4 border-b">
                    <h3 className="text-lg font-normal">Avsändare</h3>
                    <div className="text-sm mt-2">
                      <p className="text-base font-normal">
                        {product.sender.companyName}
                      </p>
                      <p className="text-base font-light">
                        {product.sender.address}, {product.sender.postcode}{" "}
                        {product.sender.city}
                      </p>
                      <div className="flex items-center mt-2">
                        <Flag
                          code={getCountryCode(product.sender.country)}
                          className="inline-block w-6 h-4 mr-2"
                        />
                        <p className="text-xs text-gray-500">
                          {product.sender.contactName}, {product.sender.email},{" "}
                          {product.sender.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-b">
                    <h3 className="text-lg font-normal">Mottagare</h3>
                    <div className="text-sm mt-2">
                      <p className="text-base font-normal">
                        {product.receiver.companyName}
                      </p>
                      <p className="text-base font-light">
                        {product.receiver.address}, {product.receiver.postcode}{" "}
                        {product.receiver.city}
                      </p>
                      <div className="flex items-center mt-2">
                        <Flag
                          code={getCountryCode(product.receiver.country)}
                          className="inline-block w-6 h-4 mr-2"
                        />
                        <p className="text-xs text-gray-500">
                          {product.receiver.contactName},{" "}
                          {product.receiver.email}, {product.receiver.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <button className="btn btn-outline">
                        <IoSend size={20} className="mr-2" />
                        Skicka till utkast
                      </button>
                      <button
                        className="btn text-red-500 bg-white border-red-500 hover:bg-red-200"
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        <IoTrash size={20} className="mr-2" />
                        Ta bort
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 pt-4 p-4">
            <div className="flex justify-between mb-4">
              <p className="text-sm">Totalt:</p>
              <p className="text-sm">
                {cart.reduce((total, product) => total + product.quantity, 0)}{" "}
                kolli
              </p>
            </div>
            <button className="btn btn-primary w-full mt-2">
              Beräkna pris
            </button>
          </div>
        </div>
      )}
      {isOpen && <div className="drawer-overlay" onClick={onClose}></div>}
    </>
  );
};

export default Drawer;
