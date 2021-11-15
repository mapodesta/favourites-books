import React, { useReducer } from 'react';
import { AGREGAR_FAVORITOS, DATA_A_MOSTRAR, DATA_COMPLETA } from '../types';
import favReducer from './FavReducer';
import favContext from './FavContext';
import clienteAxios from '../config/axios';

const FavState = (props) => {
  const initalState = {
    totalData: [],
    dataToShow: [],
    error: false,
    favs: [],
  };

  const [state, dispatch] = useReducer(favReducer, initalState);

  const obtenerData = async (value) => {
    try {
      let respuesta = await clienteAxios.get(
        `search_by_date?query=${value}&hitsPerPage=24`
      );
      dispatch({
        type: DATA_COMPLETA,
        payload: respuesta.data.hits,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dataPagination = async (value) => {
    try {
      dispatch({
        type: DATA_A_MOSTRAR,
        payload: value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addFavs = async (value) => {
    try {
      dispatch({
        type: AGREGAR_FAVORITOS,
        payload: value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <favContext.Provider
      value={{
        obtenerData,
        dataPagination,
        addFavs,
        totalData: state.totalData,
        dataToShow: state.dataToShow,
        favs: state.favs,
      }}
    >
      {props.children}
    </favContext.Provider>
  );
};

export default FavState;
