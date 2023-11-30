import React from "react";
import Header from "./header";
import SearchBar from "./searchbar";
import PeopleList from "./peoplelist";

const Sidebar = () => {
  return (
    <div className=" flex flex-col ">
      <Header />
      <SearchBar />
      <PeopleList />
    </div>
  );
};

export default Sidebar;
