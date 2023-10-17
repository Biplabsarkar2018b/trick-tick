import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
const url = "https://api.unsplash.com/photos?page=";
const headers = {
  Authorization: "Client-ID rRgwnuGucrAIksyJXAdki2HRU5vsksSbzyCDUJDEgdo",
};
const MasonryLayout = () => {
  const [photoData, setphotoData] = useState([]);
  const [page, setpage] = useState(1);
  const loadingRef = useRef(null);

  const fetchData = () => {
    console.log(`Page value is ${page}`);
    axios
      .get(`${url}${page}`, { headers: headers })
      .then((res) => {
        console.log(res.data);
        // Extract the array of photos from the response
        const newPhotos = res.data;
        setphotoData((prevItems) => [...prevItems, ...newPhotos]);
        setpage((val)=>val+1)
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  };
  const handleScroll = () => {
    if (
      loadingRef.current &&
      window.innerHeight + window.scrollY >= loadingRef.current.offsetTop
    ) {
      fetchData();
    }
  };
  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  

  return (
    <div className="flex flex-col relative photospagescrollbar">
      {/* Photo Masonry Layout */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 mt-8">
        {/* Photo Item */}
        {photoData &&
          photoData.map((photoUrl, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden mb-5"
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
                  {photoUrl?.user?.first_name} {photoUrl?.user?.lastname_name}
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
      
    </div>
  );
};

export default MasonryLayout;
