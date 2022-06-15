import genres from "../Data/GenreArrWithCodes";

const ConvertGenreToIdToText = (id) => {
  return genres.map((genre) => {
    if (genre.id === id) {
      return genre.label;
    }
  });
};

export default ConvertGenreToIdToText;
