import React, { FC, useCallback, useRef, useState } from "react";
import classes from "./Cards.module.scss";
import Card from "./Card/Card";
import { fetchCoins } from "store/action-creators/coins";
import { useActions } from "hooks/useActions";
import { FilterFilled } from "@ant-design/icons";
import { useTypedSelector } from "hooks/useTypedSelector";
import { filterArrayObjectsByParams } from "../../util/filter-array-objects-by-params";

interface ICardsState {
  isFiltered: boolean;
  filteredCoinsId: string[];
}

const Cards: FC = () => {
  const [state, setState] = useState<ICardsState>({
    isFiltered: false,
    filteredCoinsId: [],
  });

  const { coins, isFetching, errorMessage } = useTypedSelector(
    (state) => state.coinsState
  );

  const { fetchCoins, updateCoin, deleteCoin } = useActions();

  const listElement = useRef<HTMLDivElement>(null);

  const likeButtonHandler = (id: string, liked: boolean) => {
    updateCoin(id, { liked });
  };

  const deleteButtonHandler = (id: string) => {
    deleteCoin(id);
  };

  const filterButtonHandler = () => {
    setState(() => {
      return {
        isFiltered: !state.isFiltered,
        filteredCoinsId: filterArrayObjectsByParams(coins, { liked: true }).map(
          (item) => item.id
        ),
      };
    });
  };

  const memoizedScroll = useCallback(() => {
    const { current } = listElement;
    if (!current || state.isFiltered) return;
    const { scrollTop, scrollHeight, offsetHeight } = current;

    const maxScrollTop = scrollHeight - offsetHeight;
    if (scrollTop > maxScrollTop - 100) fetchCoins();
  }, [state]);

  return (
    <div className={classes.Cards} ref={listElement} onWheel={memoizedScroll}>
      <div className={classes.Settings}>
        <div>
          <FilterFilled
            onClick={filterButtonHandler}
            className={[
              classes.Icon,
              state.isFiltered ? classes.Positive : null,
            ].join(" ")}
          />
          - Show only liked
        </div>
      </div>

      {isFetching && <div>Loading...</div>}

      {errorMessage && <div>{errorMessage}</div>}

      {!state.isFiltered
        ? coins.map((coin) => (
            <Card
              key={coin.id}
              id={coin.id}
              name={coin.name}
              image={coin.image}
              market_cap_rank={coin.market_cap_rank}
              current_price={coin.current_price}
              high_24h={coin.high_24h}
              low_24h={coin.low_24h}
              liked={coin.liked}
              likeClicked={likeButtonHandler}
              deleteClicked={deleteButtonHandler}
            />
          ))
        : coins
            .filter((item) => state.filteredCoinsId.includes(item.id))
            .map((coin) => (
              <Card
                key={coin.id}
                id={coin.id}
                name={coin.name}
                image={coin.image}
                market_cap_rank={coin.market_cap_rank}
                current_price={coin.current_price}
                high_24h={coin.high_24h}
                low_24h={coin.low_24h}
                liked={coin.liked}
                likeClicked={likeButtonHandler}
                deleteClicked={deleteButtonHandler}
              />
            ))}
    </div>
  );
};

export default Cards;
