import React, { Dispatch, SetStateAction } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";

interface BreedOption {
  value: string;
  label: string;
}

interface BreedSelectorProps {
  breeds: string[];
  sort: "breed:asc" | "breed:desc";
  setSort: Dispatch<SetStateAction<"breed:asc" | "breed:desc">>;
  selectedBreeds: string[];
  setSelectedBreeds: Dispatch<SetStateAction<string[]>>;
  loadDogs: (
    sort: "breed:asc" | "breed:desc",
    query: number,
    breeds: string[],
    filter?: boolean
  ) => Promise<void>;
}

const BreedSelector = ({
  breeds,
  sort,
  setSort,
  selectedBreeds,
  setSelectedBreeds,
  loadDogs,
}: BreedSelectorProps) => {
  const breedOptions: BreedOption[] = breeds.map((breed) => ({
    value: breed,
    label: breed,
  }));

  const selectedBreedOptions = selectedBreeds.map((breed) => ({
    value: breed,
    label: breed,
  }));

  const handleChange = (selectedOptions: MultiValue<BreedOption>) => {
    const currentOptions = selectedOptions.map((option) => option.value);
    setSelectedBreeds(currentOptions);
    loadDogs(sort, 0, currentOptions, true);
  };

  const switchSort = () => {
    const newSort = sort === "breed:asc" ? "breed:desc" : "breed:asc";
    setSort(newSort);
    loadDogs(newSort, 0, selectedBreeds, true);
  };

  const customStyles: StylesConfig<BreedOption, true> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "black",
      borderColor: "gray",
      color: "white",
      padding: "5px",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "black",
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "black",
      color: "white",
      ":hover": {
        backgroundColor: "gray",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "gray",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white",
      ":hover": {
        backgroundColor: "red",
        color: "black",
      },
    }),
  };

  return (
    <div className="w-full flex flex-row relative gap-4 items-center justify-center">
      <Select
        isMulti
        options={breedOptions}
        value={selectedBreedOptions}
        onChange={handleChange}
        placeholder="Select dog breeds..."
        styles={customStyles}
        closeMenuOnSelect={false}
        isSearchable
      />
      <button
        onClick={switchSort}
        className="border-2 px-2 rounded-xl border-gray-500 hover:border-blue-500"
      >
        Change Sort
      </button>
    </div>
  );
};

export default BreedSelector;
