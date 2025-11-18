import { API_NINJAS_KEY } from "@env";

const BASE_URL = "https://api.api-ninjas.com/v1/exercises";

export type Exercise = {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
};

export async function searchExercises(filters: {
  name?: string;
  type?: string;
  muscle?: string;
  difficulty?: string;
  }): Promise<Exercise[]> {
  // build query string dynamically
  const params = new URLSearchParams();

  if (filters.name) params.append("name", filters.name);
  if (filters.type) params.append("type", filters.type);
  if (filters.muscle) params.append("muscle", filters.muscle);
  if (filters.difficulty) params.append("difficulty", filters.difficulty);

  const url = `${BASE_URL}?${params.toString()}`;

  
  const res = await fetch(url, {
    headers: {
      "X-Api-Key": API_NINJAS_KEY,
    },
  });

  if (!res.ok) {
    console.error("API error", res.status, await res.text());
    throw new Error("Failed to fetch exercises");
  }

  return res.json();
}
