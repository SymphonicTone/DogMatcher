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
  sort: string,
  from: number,
  breeds: string[]
) => {
  try {
    const url = new URL(
      `https://frontend-take-home-service.fetch.com/dogs/search?from=${from.toString()}&sort=${sort}`
    );

    if (breeds) {
      breeds.forEach((breed) => url.searchParams.append("breeds", breed));
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dog IDs: ${response.statusText}`);
    }

    const data = await response.json();

    return data.resultIds;
  } catch (error) {
    console.error("Failed to fetch dog IDs:", error);
    return { resultIds: [], next: null };
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
