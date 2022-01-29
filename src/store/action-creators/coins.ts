import { CoinsAction, CoinsActionsEnum, ICoin } from "types/coins";
import { Dispatch } from "redux";
import axios from "axios";
import { BASE_URL } from "util/config";
import { store } from "../index";

export const fetchCoins = () => {
  return async (dispatch: Dispatch<CoinsAction>) => {
    try {
      if (!store.getState().coinsState.isFetching) {
        dispatch({ type: CoinsActionsEnum.FETCH_COINS });
        const response = await axios.get<ICoin[]>(
          `${BASE_URL}/coins/markets?vs_currency=usd&per_page=4&page=${
            store.getState().coinsState.page
          }}`
        );
        dispatch({
          type: CoinsActionsEnum.FETCH_COINS_SUCCESS,
          payload: response.data.map((item) => ({ ...item, liked: false })),
        });
      }
    } catch (error) {
      dispatch({
        type: CoinsActionsEnum.FETCH_COINS_ERROR,
        payload:
          error instanceof Error
            ? error.message
            : "Unknown error occurred, check console for more details",
      });
    }
  };
};

export const updateCoin = (coinIdToUpdate: string, args: Partial<ICoin>) => {
  return (dispatch: Dispatch<CoinsAction>) => {
    dispatch({
      type: CoinsActionsEnum.UPDATE_COIN,
      payload: { id: coinIdToUpdate, params: args },
    });
  };
};
