import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  import { View, Text } from "native-base";
  
  export const RouterPaths = {
    INDEX: "/",
    LOGIN: "/login",
  };
  
  function Home() {
    return <View><Text>Teste View</Text></View>;
  }
  
  function NotFound() {
    return <View><Text>404 - Página não encontrada</Text></View>;
  }
  
  function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={RouterPaths.INDEX} element={<Home />} />
          <Route path="" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default Router;