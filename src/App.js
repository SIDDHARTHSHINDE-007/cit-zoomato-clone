import Homepage from "./controller/Home/Homepage";
import Searchpage from "./controller/Home/search/SearchPage";
import {Routes,Route}from"react-router-dom";
import RestaurantPage from "./controller/Home/resturatnt/Resturantpage";

function App() {
  return (<> 
  <main className="container-fluid ">
  <Routes>
    <Route path="/"element={<Homepage/>}/>
    <Route path="/Searchpage/:id"element={<Searchpage/>}/>
    <Route path="/Restaurant/:id"element={<RestaurantPage/>}/>
    </Routes>
   
          </main>
        </>
  );
}

export default App;
