import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./test.css";

const Test = () => {
  const [likeData, setLikeData] = useState([
    { id: "", like: false, dislike: false },
  ]);
  console.log("likeData", likeData);
  const [data, setData] = useState([
    { id: 1, name: "hello1" },
    { id: 2, name: "hello2" },
    { id: 3, name: "hello3" },
    { id: 4, name: "hello4" },
    { id: 5, name: "hello5" },
    { id: 6, name: "hello6" },
  ]);
//   const handleLike = (type, id) => {


//     if (type == "like") {
//       setLikeData([...likeData, { id: id, like: true, dislike: false }]);
//     } else {
//       setLikeData([...likeData, { id: id, like: false, disLike: true }]);
//     }
//   };

  const handleLike = (type, id) => {
    setLikeData(prevLikeData => {
      const updatedLikeData = prevLikeData.map(item =>
        item.id === id ? { ...item, like: type === 'like', dislike: type === 'dislike' } : item
      );

      const isIdPresent = updatedLikeData.some(item => item.id === id);
      
      if (!isIdPresent) {
        updatedLikeData.push({ id, like: type === 'like', dislike: type === 'dislike' });
      }

      return updatedLikeData;
    });
  };


  //   console.log("okkk", likeData.filter((item)=> item.id==3));

  const isDisliked = (id) => {
    const item = likeData.find(item => item.id === id);
    return item ? item.dislike : false;
  };
  const isLiked = (id) => {
    const item = likeData.find(item => item.id === id);
    return item ? item.like : false;
  };
  return (
    <div>
      {data.map((item) => {
        return (
          <div>
            <p>{item.name}</p>
            <Link
              onClick={() => {
                handleLike("like", item.id);
              }}
              className={isLiked(item.id) ? 'active' : ''}

            >
              Like{" "}
            </Link>
            <Link
              onClick={() => {
                handleLike("dislike", item.id);
              }}
                className={isDisliked(item.id) ? 'active' : ''}
            >
              Dislike{" "}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Test;
