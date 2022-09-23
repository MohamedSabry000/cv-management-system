import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import {
  Navbar,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Home,
} from './components';
import { useEffect } from 'react';
import { reset } from './redux/cvs/cvs-slice';

function App() {
  const { user } = useSelector((state: any) => state.cv);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
  }, []);
  return (
    <BrowserRouter>
      <Box>
        <Navbar />
        <Routes>
          {
            user ? (
              <>
                <Route path="/" element={<Home />} />
              </>
            ) : (
              <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset/:id/:token" element={<ResetPassword />} />
              </>
            )
          }
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
