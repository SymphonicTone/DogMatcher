export const getDogBreeds = async () => {
  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/dogs/breeds",
    { credentials: "include" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch dog breeds");
  }
  return response.json();
};

export const fetchDogIds = async (
  size: number = 25,
  sort: string = "breed:asc"
) => {
  try {
    const response = await fetch(
      `https://frontend-take-home-service.fetch.com/dogs/search?size=${size}&sort=${sort}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    return data.resultIds;
  } catch (error) {
    console.error("Failed to fetch dog IDs: " + error);
  }
};

export const fetchDogsByIds = async (dogIds: string[]) => {
  try {
    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dogIds),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch dog by IDs: " + error);
  }
};
