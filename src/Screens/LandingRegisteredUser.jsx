import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ContextUser } from "../ContextUser";
import axios from "axios";
import NewsItemCard from "../Components/Cards/NewsItemCard";
import FlexWrapper from "../Components/FlexWrapper";
import Title from "../Components/Title";
import LoadingScreen from "./LoadingScreen";
import ModalArticle from "./ArticleFullScreen";
import { checkIfTokenIsValid } from "../SmallFunctions/CheckIfTokenIsValid";
import CenterWrapper from "../Components/CenterWrapper";
import MediaCard from "../Components/Cards/MediaCard";
import { Box } from "@mui/system";

function LandingRegisteredUser() {
  const [loading, setLoading] = useState(true);
  const [articlesToRender, setArticlesToRender] = useState();
  const [moviesToRender, setMoviesToRender] = useState();
  const [seriesToRender, setSeriesToRender] = useState();
  const [targetLanguage, setTargetLanguage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [currentModal, setCurrentModal] = useState();

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
        {articlesToRender && articlesToRender.length !== 0 && (
          <>
            <Box sx={{ marginTop: "10px" }} />

            <Title
              mainHeading={`Hi ${usersName}`}
              secondHeading={`Here are some articles in ${targetLanguage} based on your interests`}
            />
          </>
        )}
        <FlexWrapper sx={{ paddingBottom: "" }}>
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
                  />
                </div>
              );
            })}
        </FlexWrapper>
        <br /> <br /> <br />
        <Title
          mainHeading={`Movies based on your target language`}
          secondHeading={`To change your target language, go to settings`}
          sx={{ marginTop: "30px", marginBottom: "30px" }}
        />
        <FlexWrapper>
          {moviesToRender &&
            moviesToRender.map((item) => {
              return (
                  <MediaCard bg={item.poster_path} link={`/movies/${item.id}`} data={item}/>
              );
            })}
        </FlexWrapper>
        <br /> <br /> <br />
        <Title
          mainHeading={`Series based on your target language`}
          secondHeading={`To change your target language, go to settings`}
          sx={{ marginTop: "30px", marginBottom: "30px" }}
        />
        <FlexWrapper>
          {seriesToRender &&
            seriesToRender.map((item) => {
              return (
                <MediaCard bg={item.poster_path} link={`/tv/${item.id}`} data={item}/>
              );
            })}
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
