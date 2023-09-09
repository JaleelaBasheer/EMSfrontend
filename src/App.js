import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootswatch/dist/quartz/bootstrap.min.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Add from './pages/Add';
import View from './pages/View';
import Edit from './pages/Edit';

function App() {
  return (
    <div>
     
         <Header/>
         <Routes>
          <Route path ='/' element = {<Home/>}/>
          <Route path ='/add' element = {<Add/>}/>
          <Route path ='/view/:id' element = {<View/>}/>
          <Route path ='/edit/:id' element = {<Edit/>}/>

         </Routes>

         <Footer/>
        
    </div>
  );
}

export default App;
