import React, { useEffect, useState } from 'react';
import {
  HashRouter, Route, Routes,
} from 'react-router-dom';
import { checkToken, initToken } from './utils/token';
import Login from './page/login';
import PageFrame from './page/page-frame';
import { routers } from './page/route';
import { useSetIsLogin } from './store/user/hooks';

function App() {
  const setLogin = useSetIsLogin();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    initToken();
    checkToken().then((isLogin) => {
      setLogin(isLogin);
      setLoading(false);
    });
  }, [setLogin]);

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          {routers.map((page) => (
            <Route
              key={page.path}
              path={page.path}
              element={(
                <PageFrame>
                  {page.component}
                </PageFrame>
              )}
            />
          ))}
        </Routes>
        {isLoading ? <div className="load-wrap" /> : null}
      </div>
    </HashRouter>
  );
}

export default App;
