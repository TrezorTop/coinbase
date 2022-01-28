import React, { FC } from "react";
import classes from "./Card.module.scss";
import { ICoin } from "../../../types/coins";
import DotLeader from "../../UI/DotLeader/DotLeader";

interface ICardProps extends ICoin {
  likeClicked: (id: string, liked: boolean) => void;
}

const Card: FC<ICardProps> = ({
  id,
  name,
  market_cap_rank,
  image,
  current_price,
  high_24h,
  low_24h,
  likeClicked,
  liked,
}) => {
  return (
    <div className={classes.Card}>
      <div className={classes.Container}>
        <div className={classes.CoinImage}>
          <img src={image} alt={id} />
        </div>
        <div className={classes.CoinInfo}>
          <div className={classes.InfoRow}>
            <span>Market rank:</span>
            <DotLeader />
            <span>{market_cap_rank}</span>
          </div>
          <div className={classes.InfoRow}>
            <span>Coin:</span>
            <DotLeader />
            <span>{name}</span>
          </div>
          <div className={classes.InfoRow}>
            <span>Price:</span>
            <DotLeader />
            <span>{current_price}</span>
          </div>
        </div>
      </div>
      <div className={classes.CardFooter}>
        <div>
          <span>24h highest:</span>
          <span>{high_24h}</span>
        </div>
        <div>
          <span>24h lowest:</span>
          <span>{low_24h}</span>
        </div>
        <button onClick={() => likeClicked(id, !liked)}>
          liked: {liked.toString()}
        </button>
      </div>
    </div>
  );
};

export default Card;
