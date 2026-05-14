import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userId = "57428262-9d32-48d6-9394-b4b25d1ab7a1";

const movies = [
  {
    title: "Shadow Protocol",
    overview:
      "An ex-intelligence officer uncovers a global cyber conspiracy threatening world security.",
    releaseYear: 2022,
    genres: ["Action", "Thriller"],
    runtime: 128,
    posterUrl: "https://example.com/posters/shadow-protocol.jpg",
    createdBy: userId,
  },
  {
    title: "Midnight Escape",
    overview:
      "Two strangers race against time to escape a city locked under martial law.",
    releaseYear: 2021,
    genres: ["Drama", "Action"],
    runtime: 115,
    posterUrl: "https://example.com/posters/midnight-escape.jpg",
    createdBy: userId,
  },
  {
  title: "Crimson Streets",
  overview: "An undercover cop infiltrates a violent crime empire ruling the city from the shadows.",
  releaseYear: 2020,
  genres: ["Crime", "Thriller"],
  runtime: 124,
  posterUrl: "https://example.com/posters/crimson-streets.jpg",
  createdBy: userId,
},
{
  title: "Broken Horizon",
  overview: "A deep space mission discovers a mysterious signal that could change humanity forever.",
  releaseYear: 2024,
  genres: ["Sci-Fi", "Adventure"],
  runtime: 142,
  posterUrl: "https://example.com/posters/broken-horizon.jpg",
  createdBy: userId,
},
{
  title: "Silent Judgment",
  overview: "A lawyer takes on a case that exposes a powerful corruption network.",
  releaseYear: 2019,
  genres: ["Drama", "Legal", "Thriller"],
  runtime: 118,
  posterUrl: "https://example.com/posters/silent-judgment.jpg",
  createdBy: userId,
},
{
  title: "Neon Run",
  overview: "A street racer gets involved in a futuristic underground racing syndicate.",
  releaseYear: 2023,
  genres: ["Action", "Sci-Fi"],
  runtime: 110,
  posterUrl: "https://example.com/posters/neon-run.jpg",
  createdBy: userId,
},
{
  title: "Last Signal",
  overview: "A scientist intercepts a mysterious transmission that predicts global disasters.",
  releaseYear: 2022,
  genres: ["Mystery", "Sci-Fi"],
  runtime: 130,
  posterUrl: "https://example.com/posters/last-signal.jpg",
  createdBy: userId,
}
];

const main = async () => {
  console.log("Seeding database with movies...");
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`Inserted movie: ${movie.title}`);
  }
  console.log("Database seeding completed.");
};

main()
  .catch((e) => {
    console.error("Error occurred while seeding the database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
