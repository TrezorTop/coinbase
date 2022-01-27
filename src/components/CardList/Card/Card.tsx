import React, { FC } from "react";
import classes from "./Card.module.scss";
import { ICoin } from "../../../types/coins";

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
  liked,
  likeClicked,
}) => {
  return (
    <div className={classes.Card}>
      name: {name}{" "}
      <button onClick={() => likeClicked(id, !liked)}>
        liked: {liked.toString()}
      </button>
    </div>
  );
};

export default Card;
