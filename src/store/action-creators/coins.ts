import { CoinsAction, CoinsActionsEnum, ICoin } from "../../types/coins";
import { Dispatch } from "redux";
import axios from "axios";

export const fetchCoins = () => {
  return async (dispatch: Dispatch<CoinsAction>) => {
    try {
      dispatch({ type: CoinsActionsEnum.FETCH_COINS });
      const response = await axios.get<ICoin[]>(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=15"
      );

      dispatch({
        type: CoinsActionsEnum.FETCH_COINS_SUCCESS,
        payload: response.data.map((item) => ({ ...item, liked: false })),
      });
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

export const updateCoin = (
  coinIdToUpdate: string,
  ...args: Partial<ICoin>[]
) => {
  return (dispatch: Dispatch<CoinsAction>) => {
    dispatch({
      type: CoinsActionsEnum.UPDATE_COIN,
      payload: { id: coinIdToUpdate, params: args },
    });
  };
};

export const getCoinsFiltered = (...args: Partial<ICoin>[]) => {
  return (dispatch: Dispatch<CoinsAction>) => {
    dispatch({
      type: CoinsActionsEnum.GET_COINS_FILTERED,
      payload: args,
    });
  };
};
