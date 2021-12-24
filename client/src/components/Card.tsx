import React, { ReactElement } from 'react';

interface IProps {
  title: string;
  price: number;
  vegan: boolean;
  img?: string;
}

const Card = function (props: IProps): ReactElement {
  const {
    title, price, vegan, img,
  } = props;
  return (
    <div className="w-64 rounded-md shadow-md relative">
      <img src={img} alt={`${title}`} />
      <h1 className="inline-block ">{title}</h1>
      <span
        className={`absolute h-3 w-3 mx-2 mt-1  rounded-full ${
          vegan ? 'bg-green-400' : 'bg-red-600'
        }`}
      />
      <h2 className="">{price}</h2>
    </div>
  );
};

Card.defaultProps = {
  img: '',
};

export default Card;
