import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppContainer from '../layouts/AppContainer';
import { CarDeals, Home, InsuranceOffers } from '../pages';

const Router = () => {
  return (
    <Routes>
      <Route element={<AppContainer />}>
        <Route path="/" element={<Home />} />
        <Route path="/car_deals" element={<CarDeals />} />
        <Route path="/insurance_offers" element={<InsuranceOffers />} />
      </Route>
    </Routes>
  );
};

export default Router;
