import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ContextUser } from "../ContextUser";
import axios from "axios";
import NewsItemCard from "../Components/Cards/NewsItemCard";
import FlexWrapper from "../Components/FlexWrapper";
import Title from "../Components/Title";
import LoadingScreen from "./LoadingScreen";
import ModalArticle from "./ArticleFullScreen";
import { checkIfTokenIsValid } from "../Functions/CheckIfTokenIsValid";
import CenterWrapper from "../Components/CenterWrapper";
import MediaCard from "../Components/Cards/MediaCard";
import { Box } from "@mui/system";
import MiniMediaCard from "../Components/MiniMediaCard";
import SmallTitle from "../Components/SmallTitle";
import RegisteredUserLandingBanner from "../Components/RegisteredUserLandingBanner";
import SelectItemBtn from "../Components/SelectItemBtn";
import genreArr from "../Data/GenreArrWithCodes";
import convertGenre from "../Functions/convertGenre";
import TrendingMovies from "../Components/LandingSections/TrendingMovies";
import NothingFoundScreen from "./NothingFoundScreen";

function LandingRegisteredUser() {
  const [loading, setLoading] = useState(true);
  const [articlesToRender, setArticlesToRender] = useState();
  const [moviesToRender, setMoviesToRender] = useState();
  const [seriesToRender, setSeriesToRender] = useState();
  const [targetLanguage, setTargetLanguage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState();
  const [userGenres, setUserGenres] = useState();
  const [userInterests, setUserInterests] = useState();
  const [showUserInterests, setShowUserInterests] = useState(false);
  const [showUserGenres, setShowUserGenres] = useState(false);

  const fetchArticles = async (interest) => {
    const newArticles = await axios
      .get(`https://api.langregate.com/news/${targetLanguage}/${interest}`)
      .catch((err) => {
        console.log(err);
      });
    setArticlesToRender(newArticles.data.articles);
  };

  const updateInterestContainer = (interest) => {
    setShowUserInterests(false);
    fetchArticles(interest);
  };

  const fetchMedia = async (mediaType, query) => {
    const mediaFetch = await axios.get(
      `https://api.langregate.com/${mediaType}-genres/${targetLanguage}/${convertGenre(genreArr, query)}`
    );

    if (mediaType === "movies") {
      setMoviesToRender(mediaFetch.data);
    } else {
      setSeriesToRender(mediaFetch.data);
    }
  };

  const updateGenreContainer = (mediaType, genre) => {
    fetchMedia(mediaType, genre);
  };

  const updateModalState = (item) => {
    setShowModal(!showModal);
    setCurrentModal(
      <ModalArticle
        id={item._id}
        media={item.media}
        overview={item.summary}
        link={item.link}
        topics={item.topic}
        score={item._score}
        header={item.title}
        author={item.author}
        closeModal={() => setShowModal(false)}
      />
    );
  };

  const { usersName, setUsersName } = useContext(ContextUser);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      let checkToken = await checkIfTokenIsValid();
      if (checkToken === "USER CAN PASS") {
        const data = await axios.get("https://api.langregate.com/api/viewCuratedContent");

        setUserInterests(data.data.userInterests);
        setUserGenres(data.data.userGenres);

        if (data.data.usersArticles) {
          data.data.usersArticles.length = 6;
        }

        setArticlesToRender(data.data.usersArticles);
        setTargetLanguage(data.data.targetLanguage);

        if (data.data.usersMovies) {
          data.data.usersMovies.length = 9;
        }

        if (data.data.usersSeries) {
          data.data.usersSeries.length = 9;
        }

        setMoviesToRender(data.data.usersMovies);
        setSeriesToRender(data.data.usersSeries);

        if (!usersName) {
          setUsersName(data.data.usersName);
        }
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <CenterWrapper>
        <RegisteredUserLandingBanner
          targetLanguage={targetLanguage && targetLanguage}
          name={usersName && usersName}
        />
        <SmallTitle heading={`Movies in ${targetLanguage} for ${usersName}`} />
        <div className="wrapMiniMovies">
          {moviesToRender &&
            moviesToRender.map((item) => {
              return (
                <MiniMediaCard
                  bg={`https://www.themoviedb.org/t/p/w1280/${
                    item.backdrop_path || item.poster_path
                  }`}
                  movieName={item.original_title}
                  link={item.id}
                  genres={item.genre_ids}
                />
              );
            })}
        </div>
        {articlesToRender && articlesToRender.length !== 0 && (
          <>
            <Box sx={{ marginTop: "10px" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Title
                mainHeading={`Hi ${usersName}`}
                secondHeading={`Here are some articles in ${targetLanguage} based on your interests`}
              />
              <SelectItemBtn
                typeOfContent={"Topics"}
                triggerFunc={() => setShowUserInterests(!showUserInterests)}
              />
            </div>
            {showUserInterests && (
              <div className="wrapMediaTypeBtns">
                {userInterests &&
                  userInterests.map((item) => {
                    return (
                      <div
                        className="changeMediaTypeBtn"
                        onClick={() => updateInterestContainer(item)}
                      >
                        {item}
                      </div>
                    );
                  })}
              </div>
            )}
            <FlexWrapper>
              {articlesToRender &&
                articlesToRender.map((item) => {
                  return (
                    <div onClick={() => updateModalState(item)}>
                      <NewsItemCard
                        title={item.title}
                        media={item.media}
                        overview={item.summary}
                        id={item._id}
                        lang={item.language}
                        deleteMode={true}
                        fullObjOfArticle={item}
                        key={item.id}
                      />
                    </div>
                  );
                })}
            </FlexWrapper>
          </>
        )}
        <br /> <br /> <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title
            mainHeading={`${
              targetLanguage && targetLanguage
            } movies you may like`}
            secondHeading={`To change your target language, go to settings`}
            sx={{ marginBottom: "30px" }}
          />
          <SelectItemBtn
            typeOfContent={"Genres"}
            triggerFunc={() => setShowUserGenres(!showUserGenres)}
          />
        </div>
        {showUserGenres && (
          <div className="wrapMediaTypeBtns">
            {userGenres &&
              userGenres.map((item) => {
                return (
                  <div
                    className="changeMediaTypeBtn"
                    onClick={() => updateGenreContainer("movie", item)}
                  >
                    {item}
                  </div>
                );
              })}
          </div>
        )}
        <FlexWrapper>
          {moviesToRender &&
            moviesToRender.map((item) => {
              return (
                <MediaCard
                  bg={item.poster_path}
                  link={`/movies/${item.id}`}
                  data={item}
                  key={item.id}
                />
              );
            })}
          {moviesToRender && moviesToRender.length === 0 && (
            <NothingFoundScreen />
          )}
        </FlexWrapper>
        <TrendingMovies
          region={targetLanguage}
          lang={targetLanguage}
          isRegisteredUser={true}
        />
        <br /> <br /> <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title
            mainHeading={` ${
              targetLanguage && targetLanguage
            } series you may like.`}
            secondHeading={`To change your target language, go to settings`}
            sx={{ marginTop: "30px", marginBottom: "30px" }}
          />
          <SelectItemBtn
            typeOfContent={"Genres"}
            triggerFunc={() => setShowUserGenres(!showUserGenres)}
          />
        </div>
        {showUserGenres && (
          <div className="wrapMediaTypeBtns">
            {userGenres &&
              userGenres.map((item) => {
                return (
                  <div
                    className="changeMediaTypeBtn"
                    onClick={() => updateGenreContainer("series", item)}
                  >
                    {item}
                  </div>
                );
              })}
          </div>
        )}
        <FlexWrapper>
          {seriesToRender &&
            seriesToRender.map((item) => {
              return (
                <MediaCard
                  bg={item.poster_path}
                  link={`/tv/${item.id}`}
                  data={item}
                  key={item.id}
                />
              );
            })}
          {seriesToRender && seriesToRender.length === 0 && (
            <NothingFoundScreen />
          )}
        </FlexWrapper>
      </CenterWrapper>
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

export default LandingRegisteredUser;
