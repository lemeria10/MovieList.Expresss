import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
    const { movieId,status,rating,notes, } = req.body;

    //verify exists
    const movie = await prisma.movie.findUnique({
        where: {
            id: req.params.id,
        },
    });
    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }
    //check if addded already
    const existingWatchList = await prisma.WatchListItem.findUnique({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId
            }
        },
    });
    if (existingWatchList) {
        return res.status(400).json({ message: "Movie already in watchlist" });
    }
    const watchListItem = await prisma.WatchListItem.create({
        data: {
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes
        }
    });
    res.status(201).json({
        status: "success",
        data: {
            watchListItem,
        },
    });
    console.log("Added to watchlist:",
        
        watchListItem);
};

/**
 * Remove movie from watchlist
 * Deletes watchlist item
 * Ensures only owner can delete
 * Requires protect middleware
 */
const removeFromWatchlist = async (req, res) => {
  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can delete
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};

export { addToWatchlist, removeFromWatchlist };
