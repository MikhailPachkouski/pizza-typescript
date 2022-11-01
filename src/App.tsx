import React, {useState} from "react";
import './App.css';
import '../src/scss/app.scss'
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PizzaInfo from "./pages/PizzaInfo";



// export const MyContext = React.createContext();

function App() {
    // const [searchValue, setSearchValue] = useState('');

    return (
        <div className="wrapper">
            {/*<MyContext.Provider value={{searchValue, setSearchValue}}>*/}
                <Header/>
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path='/' element={<Home/>}/>
                            <Route path='/cart' element={<Cart/>}/>
                            <Route path='/pizza/:id' element={<PizzaInfo/>}/>
                            <Route path='/*' element={<NotFound/>}/>
                        </Routes>
                    </div>
                </div>
            {/*</MyContext.Provider>*/}
        </div>
    );
}

export default App;
