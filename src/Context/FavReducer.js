import { AGREGAR_FAVORITOS, DATA_A_MOSTRAR, DATA_COMPLETA } from '../types';
// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case AGREGAR_FAVORITOS:
      return {
        ...state,
        favs:
          state.favs.filter(
            (a) => a.created_at_i === action.payload.created_at_i
          ).length === 0
            ? [...state.favs, action.payload]
            : state.favs.filter(
                (a) => a.created_at_i !== action.payload.created_at_i
              ),
      };

    case DATA_COMPLETA:
      return {
        ...state,
        totalData: action.payload,
        dataToShow: action.payload.slice(0, 6),
      };

    case DATA_A_MOSTRAR:
      return {
        ...state,
        dataToShow: state.totalData.slice(
          action.payload * 6 - 6,
          action.payload * 6
        ),
      };

    default:
      return state;
  }
};
