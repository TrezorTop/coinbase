import {
  CoinsAction,
  CoinsActionsEnum,
  ICoin,
  ICoinsState,
} from "../../types/coins";

const initialState: ICoinsState = {
  coins: [],
  filteredCoins: [],
  isFetching: false,
  errorMessage: null,
};

export const coinsReducer = (
  state = initialState,
  action: CoinsAction
): ICoinsState => {
  switch (action.type) {
    case CoinsActionsEnum.FETCH_COINS:
      return {
        isFetching: true,
        errorMessage: null,
        coins: state.coins,
        filteredCoins: state.filteredCoins,
      };
    case CoinsActionsEnum.FETCH_COINS_SUCCESS:
      return {
        isFetching: false,
        errorMessage: null,
        coins: action.payload,
        filteredCoins: state.filteredCoins,
      };
    case CoinsActionsEnum.FETCH_COINS_ERROR:
      return {
        isFetching: false,
        errorMessage: action.payload,
        coins: state.coins,
        filteredCoins: state.filteredCoins,
      };
    case CoinsActionsEnum.UPDATE_COIN:
      const updateParams = action.payload.params[0];
      return {
        isFetching: false,
        errorMessage: null,
        coins: state.coins.map((item) =>
          item.id === action.payload.id ? { ...item, ...updateParams } : item
        ),
        filteredCoins: state.filteredCoins,
      };
    case CoinsActionsEnum.GET_COINS_FILTERED:
      const filterParams = action.payload[0];
      let coins: ICoin[] = state.coins;

      Object.keys(filterParams).forEach((item) => {
        coins = coins.filter(
          (coin) =>
            coin[item as keyof ICoin] === filterParams[item as keyof ICoin]
        );
      });

      return {
        isFetching: false,
        errorMessage: null,
        coins: state.coins,
        filteredCoins: coins,
      };
    default:
      return state;
  }
};
