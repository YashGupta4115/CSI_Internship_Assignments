import { Routes, Route } from 'react-router-dom';
import FormAndFormValidation from '../src/Components/form/formPage.jsx';
import DropDown from '../src/Components/dropDown/dropDown.component.jsx';
import LandingPage from './Components/landingPage/landingPage.component.jsx';
import Test from './Components/form/test.jsx';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<FormAndFormValidation />} />
            <Route path='/landingPage' element={<LandingPage />}></Route>
        </Routes>
    )
}

export default App;
