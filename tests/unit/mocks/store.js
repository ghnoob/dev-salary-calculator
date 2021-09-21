import { jest } from "@jest/globals";

export const $store = {
  state: {
    technologies: [
      { id: 1, name: "PHP" },
      { id: 2, name: "C#" },
      { id: 3, name: "Java" },
      { id: 4, name: "JavaScript" },
    ],
    rates: [
      {
        id: 1,
        technology_id: 1,
        seniority: "senior",
        language: "english",
        average_salary_in_cents: "10000000",
        gross_margin_in_cents: "200000",
        currency: "ars",
      },
      {
        id: 2,
        technology_id: 4,
        seniority: "senior",
        language: "english",
        average_salary_in_cents: "8000000",
        gross_margin_in_cents: "200000",
        currency: "ars",
      },
      {
        id: 3,
        technology_id: 2,
        seniority: "semi_senior",
        language: "spanish",
        average_salary_in_cents: "6500000",
        gross_margin_in_cents: "99900",
        currency: "ars",
      },
      {
        id: 4,
        technology_id: 2,
        seniority: "senior",
        language: "english",
        average_salary_in_cents: "2000",
        gross_margin_in_cents: "100",
        currency: "ars",
      },
    ],
  },
  commit: jest.fn(),
};

export const emptyStore = {
  state: {
    technologies: [
      { id: 1, name: "PHP" },
      { id: 2, name: "C#" },
      { id: 3, name: "Java" },
      { id: 4, name: "JavaScript" },
    ],
    rates: [],
  },
  commit: jest.fn(),
};
