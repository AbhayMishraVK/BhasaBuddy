import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Home/Home';
import Language from './pages/selectLanguage/Language';
import VideoPage from './pages/Hindivideo/HindiVideoPage'; // Assuming VideoPage is where you display video courses
import GameLayout from './components/Game2/Game2';
import CardGame from './components/Game/Game';
import Hindi from './pages/Hindipunjabigujrati page/Hindi';
import PunjabiVideoPage from './pages/Punjabivideo/Punjabi';
import Profile from './pages/Profile/Profile';
// import HomePage from './pages/Home';
import CommunityPage from './pages/Community/Community';
import BlogPage from './pages/Blog/Blog';
import Tips from './pages/Tips/Tips';
import CreateBlog from './pages/CreateBlog/CreateBlog';
import BhashaHomePage from './pages/HomeLocal/BhashaHome';

import LoginForm from './pages/final_login';
import FinalSignup from './pages/final_signup';
import FinalLogin from './pages/final_login';
import FinalForget from './pages/final_forgot_password';
import FinalVerifyOtp from './pages/final_verify_otp';
import FinalSetPassword from './pages/final_set_password';
import FinalLanguage from './pages/final_language';
import VideoDetailPageForHindi from './pages/videorouteforhindi/VideoDetail1';
import BlogPost from './pages/BlogPost/BlogPost';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <main>
          <Routes>
            <Route exact path="/home" element={<Homepage/>} />
            <Route exact path="/selectlanguage" element={<Language/>} />
            <Route path="/learnhindi" element={<VideoPage/>}/> {/* Updated route for Learn Hindi */}
            <Route exact path="/learnpunjabi" element={<PunjabiVideoPage/>} />   
            <Route path="/quiz-game" element={<GameLayout/>}/>
            <Route exact path="/cardgame" element={<CardGame/>} />
            <Route exact path="/courses" element={<Hindi/>} />  

            
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/blogs" element={<BlogPage/>} />
        <Route path="/tips" element={<Tips/>} />    
        <Route path="/createBlog" element={<CreateBlog/>}/> 
        <Route path="/" element={<BhashaHomePage/>}/>

        
            {/* new  */}
             <Route path="/login" element={<LoginForm />}/>
             <Route path="/signup" element={<FinalSignup/>}/>
             <Route path="/forgetPassword" element={<FinalForget/>}/>
             <Route path="/verifyotp" element={<FinalVerifyOtp/>}/>
             <Route path="/setpassword" element={<FinalSetPassword/>}/>
             <Route path="/language" element={<FinalLanguage/>}/>

             <Route path="/video" element={<VideoDetailPageForHindi/>}/>
             <Route path="/blog/post" element={<BlogPost/>}/>


          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
