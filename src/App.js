import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from "react-redux";

import { GlobalStyle } from "./global.styles";

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/auth/auth.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

import { checkUserSession } from "./store/user/user.action";


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());

    
}, [dispatch])

  return (
    <div>
      <GlobalStyle/>
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index={true} element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='sign-in' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />}/>
        </Route>
      </Routes>
    </div>
    
  );
}

export default App;
