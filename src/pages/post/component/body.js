import React from "react";
//import FbImageLibrary from "react-fb-image-grid";
import Photogrid from "react-facebook-photo-grid";

function Body(props) {
  return (
    <div className="mt-3">
      <p className="font-14">{props.post?.post?.body}</p>
      <div>
        {/* <FbImageLibrary
        images={[
          "https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg",
          "https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg",
          "https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg",
          "https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg",
          "https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg",
          "https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg",
        ]}
      /> */}

        <Photogrid
          images={[
            "https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg",
            "https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg",
            "https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg",
            "https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg",
            "https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg",
            "https://www.teahub.io/photos/full/51-513680_facebook-cover-wallpaper.jpg",
          ]} //required
          //width={600} //optional according to your need
          //maxWidth={400} //optional according to your need
        ></Photogrid>
      </div>
    </div>
  );
}

export default Body;
