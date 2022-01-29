export enum CoinsActionsEnum {
  FETCH_COINS = "FETCH_COINS",
  FETCH_COINS_SUCCESS = "FETCH_COINS_SUCCESS",
  FETCH_COINS_ERROR = "FETCH_COINS_ERROR",
  UPDATE_COIN = "CHANGE_COIN",
  DELETE_COIN = "DELETE_COIN",
}

export interface IFetchCoinsAction {
  type: CoinsActionsEnum.FETCH_COINS;
}

export interface IFetchCoinsSuccessAction {
  type: CoinsActionsEnum.FETCH_COINS_SUCCESS;
  payload: ICoin[];
}

export interface IFetchCoinsErrorAction {
  type: CoinsActionsEnum.FETCH_COINS_ERROR;
  payload: string;
}

export interface IUpdateCoinAction {
  type: CoinsActionsEnum.UPDATE_COIN;
  payload: { id: string; params: Partial<ICoin> };
}

export interface IDeleteCoinAction {
  type: CoinsActionsEnum.DELETE_COIN;
  payload: string;
}

export interface ICoin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  high_24h: number;
  low_24h: number;
  liked: boolean;
}

export interface ICoinsState {
  coins: ICoin[];
  isFetching: boolean;
  errorMessage: null | string;
  page: number;
}

export type CoinsAction =
  | IFetchCoinsAction
  | IFetchCoinsSuccessAction
  | IFetchCoinsErrorAction
  | IUpdateCoinAction
  | IDeleteCoinAction;
