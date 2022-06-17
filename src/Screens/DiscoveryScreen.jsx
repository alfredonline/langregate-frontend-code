import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import NewsItemCard from "../Components/Cards/NewsItemCard";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import TopicArr from "../Data/TopicArr";
import LanguageArr from "../Data/LanguagesArr";
import Title from "../Components/Title";
import CenterWrapper from "../Components/CenterWrapper";
import FlexWrapper from "../Components/FlexWrapper";
import axios from "axios";
import ModalArticle from "./ArticleFullScreen";
import LoadingScreen from "./LoadingScreen";

function DiscoveryScreen() {
  const [preferredTopic, setPreferredTopic] = useState("Politics");
  const [preferredLanguage, setPreferredLanguage] = useState("French");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
        credit={item.link}
        closeModal={() => setShowModal(false)}
        lang={item.language}
      />
    );
  };

  useEffect(() => {
    async function callData() {
      let request = await axios
        .get(`/news/${preferredLanguage}/${preferredTopic}`)
        .catch((err) => {
          console.log(err);
        });
      setData(request.data);
      setIsLoading(false);

      setData(request.data);
      setIsLoading(false);
    }
    callData();
  }, [preferredTopic, preferredLanguage]);

  if (isLoading || !data) {
    return <LoadingScreen />;
  }

  return (
    <div className="REL">
      <CenterWrapper>
        <Box
          display="flex"
          sx={{ marginTop: "100px", display: "flex", columnGap: "20px" }}
        >
          <Autocomplete
            onChange={(e) =>
              e.target.lastChild.data &&
              setPreferredLanguage(e.target.lastChild.data)
            }
            disablePortal
            id="combo-box-demo"
            options={LanguageArr}
            sx={{ width: 150 }}
            renderInput={(params) => <TextField {...params} label="Language" />}
          />
          <Autocomplete
            onChange={(e) =>
              e.target.lastChild.data &&
              setPreferredTopic(e.target.lastChild.data)
            }
            disablePortal
            id="combo-box-demo"
            options={TopicArr}
            sx={{ width: 160 }}
            renderInput={(params) => (
              <TextField {...params} label="News Topics" />
            )}
          />
        </Box>

        <Title
          mainHeading={`Articles About ${preferredTopic} in ${preferredLanguage}`}
          secondHeading={`Save, share, translate and explore articles in ${preferredLanguage}`}
        />

        <FlexWrapper>
          {data &&
            !isLoading &&
            data.articles &&
            data.articles.map((item) => {
              return (
                <div onClick={() => updateModalState(item)}>
                  <NewsItemCard
                    title={item.title}
                    key={item._id}
                    media={item.media}
                    overview={item.summary}
                    id={item._id}
                    lang={item.language}
                    credit={item.link}
                    fullObjOfArticle={item}
                    key={item.id}
                  />
                </div>
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
    </div>
  );
}

export default DiscoveryScreen;
