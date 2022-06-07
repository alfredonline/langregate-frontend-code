import React, { useEffect, useState } from "react";
import WrapperContainer from "../Components/WrapperContainer";
import axios from "axios";
import SavedContentUserInfo from "../Components/SavedContentUserInfo";
import UserSavedContentBtns from "../Components/UserSavedContentBtns";
import UserSavedContentArrRender from "../Components/UserSavedContentArrRender";
import LoadingScreen from "../Screens/LoadingScreen";
import ModalArticle from "../Screens/ArticleFullScreen";
import { checkIfTokenIsValid } from "../Functions/CheckIfTokenIsValid";

function UserLists() {
  const [loading, setLoading] = useState(true);
  const [arrNameToPassDown, setArrNameToPassDown] = useState([]);
  const [usersName, setUsersName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState();
  const [articles, setArticles] = useState();
  const [movies, setMovies] = useState();
  const [series, setSeries] = useState();

  const updateModalState = (item) => {
    setShowModal(!showModal);
    setCurrentModal(
      <ModalArticle
        id={item.articleID}
        media={item.media}
        overview={item.articleSummary}
        link={item.link}
        topics={item.topic}
        score={item._score}
        header={item.articleHeader}
        author={item.author}
        closeModal={() => setShowModal(false)}
        deleteMode={true}
        removeItemFromUserVisibility={(idToDelete) =>
          deleteItemFromArrArticle(articles, idToDelete)
        }
      />
    );
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      let checkToken = await checkIfTokenIsValid();
      if (checkToken === "USER CAN PASS") {
        const data = await axios.get("https://api.langregate.com/api/viewSavedContent")
        setUsersName(data.data.usersName);
        setArticles(data.data.articles);
        setMovies(data.data.movies);
        setSeries(data.data.series);
        setArrNameToPassDown("articles");
        setLoading(false);
      }
    }
    getData();
  }, []);

  const deletedItems = [];

  const deleteItemFromArrArticle = (arrToModify, id) => {
    deletedItems.push(id);
    const filteredArr = arrToModify.filter((item) => {
      return !deletedItems.includes(item.articleID);
    });
    setArticles(filteredArr);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <WrapperContainer>
        <SavedContentUserInfo
          nameOfUser={`${usersName}`}
          arrName={arrNameToPassDown}
        />
        <UserSavedContentBtns
          changeArrFromChild={(value) => {
            setArrNameToPassDown(value);
          }}
          lengthOne={articles && articles.length}
          lengthTwo={movies && movies.length}
          lengthThree={series && series.length}
        />

        <UserSavedContentArrRender
          arrName={arrNameToPassDown}
          articles={articles}
          movies={movies}
          series={series}
          updateModalFromChild={(itemPassedUp) =>
            updateModalState(itemPassedUp)
          }
        />
      </WrapperContainer>
      {showModal && currentModal}
      {showModal && (
        <div
          className="filterArticle"
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </>
  );
}

export default UserLists;
