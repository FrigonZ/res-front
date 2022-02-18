import React, { useEffect, useState } from 'react';
import { checkToken, initToken } from './auth/token';
import Login from './page/login';
import Main from './page/main';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    initToken();
    setIsLogin(checkToken());
  }, []);

  return (
    <div className="App">
      {isLogin ? <Main setLogin={setIsLogin} /> : <Login setLogin={setIsLogin} />}
    </div>
  );
}

export default App;
