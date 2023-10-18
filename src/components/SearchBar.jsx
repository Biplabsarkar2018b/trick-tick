import React, { useEffect, useState } from "react";
import axios from "axios";
// import SearchResults from "../screens/SearchResults";
const url = "https://api.unsplash.com/search/photos?";
const headers = {
  Authorization: "Client-ID rRgwnuGucrAIksyJXAdki2HRU5vsksSbzyCDUJDEgdo",
};
const SearchBar = ({ searchText, setsearchText }) => {
  const [photoData, setphotoData] = useState([]);
  const [page, setpage] = useState(1);
  const [isPopUp, setisPopUp] = useState(false);
  const [popUpData, setpopUpData] = useState(null);

  const fetchData = () => {
    console.log(`Page value is ${page} from search bar`);
    console.log(`url : ${url}query=${searchText}`)
    axios
      .get(`${url}query=${searchText}`, { headers: headers })
      .then((res) => {
        console.log(res.data);
        // Extract the array of photos from the response
        const newPhotos = res.data.results;
        setphotoData(newPhotos);
        // setpage((val) => val + 1);
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  };
  const showPopUp = (photodata) => {
    setisPopUp(true);
    setpopUpData(photodata);
    console.log(photodata?.user);
  };
  function openNewTab(url) {
    window.open(url, "_blank");
  }
  const gotoInsta = () => {
    openNewTab(
      `https://www.instagram.com/${popUpData?.user?.social?.instagram_username}`
    );
  };
  const gotoSimilarPhotos = () => {
    openNewTab(`https://unsplash.com/${popUpData?.user?.username}`);
  };
  const gotoTwitter = () => {
    openNewTab(
      `https://www.x.com/${popUpData?.user?.social?.twitter_username}`
    );
  };
  useEffect(() => {
    console.log(searchText);
    if(searchText!='' && searchText!=null) fetchData();
  }, [searchText]);

  return (
    <div>
      <div className="flex justify-center mt-4">
        <input
          className="rounded-full w-4/5 lg:w-2/5 py-2 px-3 bg-gray-400 text-white placeholder:text-white"
          type="text"
          value={searchText}
        //   onChangeCapture={}
          onChange={(e) => setsearchText(e.target.value)}
          placeholder="Search Photos"
        />
      </div>

      {searchText != "" && searchText != null && (
        <div className={`flex flex-col relative photospagescrollbar`}>
          {/* Photo Masonry Layout */}
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 mt-8">
            {/* Photo Item */}
            {photoData &&
              photoData.map((photoUrl, index) => (
                <div
                  onClick={() => showPopUp(photoUrl)}
                  key={index}
                  className="relative rounded-lg overflow-hidden mb-5 hover:cursor-pointer
                hover:shadow-lg hover:transform hover:scale-105 transition-transform"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      className="object-cover w-full h-full"
                      src={photoUrl?.urls?.small}
                      alt={`Photo ${index + 1}`}
                      loading="lazy"
                    />
                  </div>
                  {/* Heart Icon to Like/Dislike */}
                  <div className="flex justify-between">
                    <h1>
                      {photoUrl?.user?.first_name}{" "}
                      {photoUrl?.user?.lastname_name}
                    </h1>
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        // stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      <h1>{photoUrl.likes}</h1>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/* Pop Up On Click */}
          {isPopUp && (
            <div
              onClick={() => setisPopUp(false)}
              className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75"
            >
              <div className="p-4 bg-white rounded-md flex flex-col gap-3">
                <img
                  className="rounded-lg"
                  src={popUpData?.urls?.small}
                  alt=""
                />
                {/* User profile, name, location, Likes in a row*/}
                <div className="flex justify-between">
                  <div className="flex">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={popUpData?.user?.profile_image?.small}
                      alt=""
                    />
                    {/* Name, location in a col */}
                    <div className="flex flex-col">
                      <h1>{popUpData?.user?.name}</h1>
                      <h1>{popUpData?.user?.location}</h1>
                    </div>
                  </div>
                  {/* Likes Count */}
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      // stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    <h1>{popUpData?.likes}</h1>
                  </div>
                </div>
                {/* Social Medias */}
                <div className="flex gap-3">
                  {popUpData?.user?.social?.instagram_username && (
                    <img
                      onClick={gotoInsta}
                      className="w-5 h-5 cursor-pointer"
                      src="/instagram.png"
                      alt=""
                    />
                  )}
                  {popUpData?.user?.social?.twitter_username && (
                    <img
                      onClick={gotoTwitter}
                      className="w-5 h-5 cursor-pointer"
                      src="/twitter.png"
                      alt=""
                    />
                  )}
                </div>
                <h1
                  onClick={gotoSimilarPhotos}
                  className="underline cursor-pointer"
                >
                  Similar Photos
                </h1>
              </div>
            </div>
          )}
        </div>
      )}
      {/* <SearchResults searchparam={searchText} />; */}
    </div>
  );
};

export default SearchBar;
