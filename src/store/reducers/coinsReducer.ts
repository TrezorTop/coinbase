import { CoinsAction, CoinsActionsEnum, ICoinsState } from "../../types/coins";

const initialState: ICoinsState = {
  coins: [],
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
      };
    case CoinsActionsEnum.FETCH_COINS_SUCCESS:
      return {
        isFetching: false,
        errorMessage: null,
        coins: action.payload,
      };
    case CoinsActionsEnum.FETCH_COINS_ERROR:
      return {
        isFetching: false,
        errorMessage: action.payload,
        coins: state.coins,
      };
    case CoinsActionsEnum.UPDATE_COIN:
      return {
        isFetching: false,
        errorMessage: null,
        coins: state.coins.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.params }
            : item
        ),
      };
    default:
      return state;
  }
};
