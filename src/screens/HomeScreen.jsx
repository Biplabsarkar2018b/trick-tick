import React, { useState } from "react";
import MasonryLayout from "./MasonryLayout";
import SearchBar from "../components/SearchBar";
// import SearchResults from "./SearchResults";

const HomeScreen = () => {
  const [searchText, setsearchText] = useState("");
  return (
    <div>
      <SearchBar searchText={searchText} setsearchText={setsearchText} />
      {(searchText == "" || searchText == null) && <MasonryLayout />}
    </div>
  );
};

export default HomeScreen;
