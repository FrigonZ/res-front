import React, { useEffect, useState } from 'react';
import {
  HashRouter, Route, Routes,
} from 'react-router-dom';
import { checkToken, initToken } from './utils/token';
import Login from './page/login';
import PageFrame from './page/page-frame';
import { routers } from './page/route';
import { useSetIsLogin } from './store/user/hooks';
import { useFetchDishes } from './page/dish/hooks';

function App() {
  const setLogin = useSetIsLogin();
  const fetchDishes = useFetchDishes();
  const [isLoading, setLoading] = useState(true);

  // 初始化登录状态
  useEffect(() => {
    setLoading(true);
    initToken();
    checkToken().then((isLogin) => {
      setLogin(isLogin);
      setLoading(false);
    });
  }, [setLogin]);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

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
