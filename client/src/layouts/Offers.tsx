import React from 'react';

type OffersProps = { children: React.ReactElement };

// TODO: this should be a HOC that will accept a url and return to children a list of fetched items
// TODO: or better create a useSearch hook or smth that will give you solutions out of the box

const Offers = ({ children }: OffersProps) => {
  return <div>{children}</div>;
};

export default Offers;
