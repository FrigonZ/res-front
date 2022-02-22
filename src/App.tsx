import React, { useEffect } from 'react';
import {
  HashRouter, Route, Routes,
} from 'react-router-dom';
import { checkToken, initToken } from './auth/token';
import Login from './page/login';
import PageFrame from './page/page-frame';
import { routers } from './page/route';
import { useSetIsLogin } from './store/user/hooks';

function App() {
  const setLogin = useSetIsLogin();

  useEffect(() => {
    initToken();
    const isLogin = checkToken();
    setLogin(isLogin);
  }, [setLogin]);

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          {routers.map((page) => (
            <Route
              path={page.path}
              element={(
                <PageFrame>
                  {page.component}
                </PageFrame>
              )}
            />
          ))}
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
