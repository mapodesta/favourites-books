import { useContext } from 'react';
import favContext from '../Context/FavContext';
const useFetch = () => {
  const FavContext = useContext(favContext);

  const { obtenerData, totalData, dataToShow, dataPagination, addFavs, favs } =
    FavContext;

  const handleChangePage = (value) => {
    dataPagination(value);
  };

  const handleChangeName = async (value) => {
    localStorage.setItem('selected', value);
    obtenerData(value);
  };

  const handleFavourites = (inf) => {
    inf.like = !inf?.like;
    addFavs(inf);
  };

  localStorage.setItem('data', JSON.stringify(favs));

  return {
    totalData,
    favs,
    dataToShow,
    handleChangeName,
    handleChangePage,
    handleFavourites,
  };
};

export default useFetch;
