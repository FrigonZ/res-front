import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { checkToken, initToken } from './auth/token';
import Login from './page/login';
import Main from './page/main';
import { store } from './store';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    initToken();
    setIsLogin(checkToken());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        {isLogin ? <Main setLogin={setIsLogin} /> : <Login />}
      </div>
    </Provider>

  );
}

export default App;
