"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";

interface IFormInput {
  fromCountry: string;
  toCountry: string;
  goodsType: string;
  weight: number;
}

const ShippingForm: React.FC = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    // Här kan du hantera inskick av formuläret, till exempel API-anrop
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid lg:grid-cols-5 lg:gap-x-6"
      >
        <div>
          <label
            htmlFor="fromCountry"
            className="block text-sm font-medium text-gray-700"
          >
            Från land
          </label>
          <select
            {...register("fromCountry")}
            id="fromCountry"
            name="fromCountry"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {/* Options for fromCountry */}
          </select>
        </div>

        <div>
          <label
            htmlFor="toCountry"
            className="block text-sm font-medium text-gray-700"
          >
            Till land
          </label>
          <select
            {...register("toCountry")}
            id="toCountry"
            name="toCountry"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {/* Options for toCountry */}
          </select>
        </div>

        <div>
          <label
            htmlFor="goodsType"
            className="block text-sm font-medium text-gray-700"
          >
            Välj godstyp
          </label>
          <select
            {...register("goodsType")}
            id="goodsType"
            name="goodsType"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {/* Options for goodsType */}
          </select>
        </div>

        <div>
          <label
            htmlFor="weight"
            className="block text-sm font-medium text-gray-700"
          >
            Vikt
          </label>
          <input
            {...register("weight")}
            id="weight"
            name="weight"
            type="number"
            placeholder="KG"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end items-center">
          <button type="submit" className="btn btn-primary">
            Beräkna pris
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
