import ImageGallery from "./components/ImageGallery";
import Search from "./components/Search";
import React from "react";

function App() {
  return (
    <div className="grid">
      <Search />
      <ImageGallery />
    </div>
  );
}

export default App;
