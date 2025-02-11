import React, { Dispatch, SetStateAction } from "react";
import { MultiValue, StylesConfig } from "react-select";
import dynamic from "next/dynamic";
import { SortOption } from "@/app/types";

const Select = dynamic(
  () =>
    import("react-select") as unknown as Promise<
      typeof import("react-select").default<BreedOption, true>
    >,
  { ssr: false }
);

interface BreedOption {
  value: string;
  label: string;
}

interface BreedSelectorProps {
  breeds: string[];
  sort: SortOption;
  setSort: Dispatch<SetStateAction<SortOption>>;
  selectedBreeds: string[];
  setSelectedBreeds: Dispatch<SetStateAction<string[]>>;
  loadDogs: (
    sort: SortOption,
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

  const switchSort = (sortType: string) => {
    switch (sortType) {
      case "breed":
        const breedSort = sort === "breed:asc" ? "breed:desc" : "breed:asc";
        setSort(breedSort);
        loadDogs(breedSort, 0, selectedBreeds, true);
        break;
      case "name":
        const nameSort = sort === "name:asc" ? "name:desc" : "name:asc";
        setSort(nameSort);
        loadDogs(nameSort, 0, selectedBreeds, true);
        break;
      case "age":
        const ageSort = sort === "age:asc" ? "age:desc" : "age:asc";
        setSort(ageSort);
        loadDogs(ageSort, 0, selectedBreeds, true);
        break;
    }
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
    input: (provided) => ({
      ...provided,
      color: "white",
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
    <div className="w-full flex flex-row relative gap-4 px-4">
      <Select
        isMulti
        instanceId="breed-select"
        options={breedOptions}
        value={selectedBreedOptions}
        onChange={handleChange}
        placeholder="Select dog breeds..."
        styles={customStyles}
        closeMenuOnSelect={false}
        isSearchable
      />
      <button
        onClick={() => switchSort("breed")}
        className="border-[1px] p-[11px] rounded-md bg-black border-gray-500 hover:border-gray-400 min-h-[38px] w-48 "
      >
        Sort by Breed:{" "}
        {sort.includes("breed")
          ? sort === "breed:asc"
            ? "A-Z"
            : "Z-A"
          : "A-Z"}
      </button>
      <button
        onClick={() => switchSort("name")}
        className="border-[1px] p-[11px] rounded-md bg-black border-gray-500 hover:border-gray-400 min-h-[38px] w-48 "
      >
        Sort by Name:{" "}
        {sort.includes("name") ? (sort === "name:asc" ? "A-Z" : "Z-A") : "A-Z"}
      </button>
      <button
        onClick={() => switchSort("age")}
        className="border-[1px] p-[11px] rounded-md bg-black border-gray-500 hover:border-gray-400 min-h-[38px] w-48 "
      >
        Sort by Age:{" "}
        {sort.includes("age") ? (sort === "age:asc" ? "0-14" : "14-0") : "0-14"}
      </button>
    </div>
  );
};

export default BreedSelector;
