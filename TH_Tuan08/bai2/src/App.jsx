import './App.css'
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import RecipesSection from './Recipe.jsx';
import RecipesWithVideos from './RecipesWithVideos.jsx';
import EditorsPick from './EditorsPick.jsx';
import Footer from './Footer.jsx';

function App() {

  return (
    <>
      <Header />
      <Hero></Hero>
      <RecipesSection></RecipesSection>
      <RecipesWithVideos></RecipesWithVideos>
      <EditorsPick></EditorsPick>
      <Footer></Footer>
      {/* Phần nội dung khác */}
    </>
  );
}

export default App
