import React, { useEffect, useRef, useState } from "react";
import { MicrophoneIcon, SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { searchInputState, searchResultsState } from "../state/searchAtom";
import { getSearchResults } from "../libs/search";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button, message, Modal, Spin } from "antd";
import styles from '../styles/SearchInput.module.css'

function SearchInput() {
  const [searchInput, setSearchInput]: any = useRecoilState(searchInputState);
  const [searchResults, setSearchResults]: any =
    useRecoilState(searchResultsState);
  const [showSuggest, setShowSuggest] = useState(false);
  const router = useRouter();
  const ref: any = useRef(null);
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const [spinning, setSpinning] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSuggest(true);
    setSearchInput(e.target.value);
    // if (e.target.value) {
    //     getSearchResults(searchInput).then(res => {
    //         setSearchResults(res);
    //     });
    // }
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSuggest(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      console.log("unbind");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const onFocusSearchInput = () => {
    if (searchInput) {
      setShowSuggest(true);
    } else {
      setShowSuggest(false);
    }
  };

  useEffect(() => {
    console.log("listening: ", listening);
    setSpinning(listening);
  }, [listening]);
  useEffect(() => {
    console.log("transcript: ", transcript);
  }, [transcript]);
  useEffect(() => {
    console.log("interimTranscript: ", interimTranscript);
  }, [interimTranscript]);
  useEffect(() => {
    console.log("finalTranscript: ", finalTranscript);
    console.log("listening: ", listening);
  }, [finalTranscript]);

  // col1        col2        col3
  // col1        col2        col3
  // col1        col2        col3
  // col1        col2        col3
  // col1        col2        col3

  const startListening = async () => {
    if (!isMicrophoneAvailable) {
      // Render some fallback contentt
      message.error("Vui lòng cho phép trình duyệt truy cập micro!");
    } else if (!browserSupportsSpeechRecognition) {
      message.error("Trình duyệt không hỗ trợ!");
    } else {
      setSpinning(true);
      SpeechRecognition.startListening({ language: "ccc" });
    }
  };

  const getRecognition = async () => {
    console.log("transcript: ", transcript);
    console.log("interimTranscript: ", interimTranscript);
    console.log("finalTranscript: ", finalTranscript);
    console.log("listening: ", listening);
    console.log(
      "browserSupportsSpeechRecognition: ",
      browserSupportsSpeechRecognition
    );
    console.log("isMicrophoneAvailable: ", isMicrophoneAvailable);
    console.log("sdadsadSA: ", SpeechRecognition.getRecognition());
  };

  const navigateToResults = (query: any) => {
    setShowSuggest(false);
    router.push(`/results?q=${encodeURI(query)}`);
  };

  const onClickMic = () => {
    console.log("🚀onClickMic")
  
  }

  return (
    <div
      ref={ref}
      className=" relative max-w-md sm:max-w-xl w-full flex items-center  transition duration-200   mx-auto group"
    >
      <Spin spinning={spinning} />
      <Button type="primary" onClick={() => startListening()}>
        Start listening
      </Button>
      <Button type="primary" onClick={() => getRecognition()}>
        getRecognition
      </Button>

      <div
        className={
          searchResults?.items?.length > 0 && showSuggest
            ? "focus-within:shadow-md py-[10px] px-3 border rounded-3xl flex items-center w-full rounded-br-none rounded-bl-none"
            : "focus-within:shadow-md py-[10px] px-3 border rounded-3xl flex items-center w-full"
        }
      >
        <svg
          className="w-5 fill-gray-400"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
        <input
          onFocus={() => onFocusSearchInput()}
          value={searchInput}
          onChange={(e) => onChangeSearch(e)}
          className="outline-none px-2 flex-grow"
          type="text"
        />

        <svg
          onClick={() => setShowVoice(true)}
          className="cursor-pointer w-6"
          focusable="false"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4285f4"
            d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"
          ></path>
          <path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path>
          <path
            fill="#fbbc05"
            d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"
          ></path>
          <path
            fill="#ea4335"
            d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"
          ></path>
        </svg>
      </div>
      {searchResults?.items?.length > 0 && (
        <div className={showSuggest ? "block" : "hidden"}>
          <div className="group-focus-within:shadow-lg absolute top-full z-20 bg-white left-0 right-0  py-2 border rounded-br-3xl  rounded-bl-3xl border-t-0">
            {searchResults?.items?.map((item: any, index: number) => {
              return (
                <div
                  onClick={() => navigateToResults(item?.title)}
                  key={index}
                  className="grid grid-cols-[auto_1fr] items-center gap-3 cursor-pointer transition duration-200 hover:bg-gray-100  px-4 py-2"
                >
                  <SearchIcon className="h-4 text-gray-400 " />
                  <p
                    className="line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: item.htmlTitle }}
                  ></p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Modal
        title={null}
        visible={showVoice}
        centered={false}
        width={800}
        bodyStyle={{ padding: "6rem" }}
        footer={null}
        onCancel={() => setShowVoice(false)}
        
      >
        <div className="grid grid-cols-[1fr_auto] gap-4 justify-between" >
          <div>
            <div className={styles.listening}>
              {finalTranscript ? `${finalTranscript}...` : 'Listening...' }
            </div>
          </div>
          <div className="relative cursor-pointer group"  onClick={() => setShowVoice(false)}>
            <span className={spinning ? "absolute animate-ping bg-red-200 rounded-full h-full w-full opacity-75 inline-flex" : 'absolute  rounded-full h-full w-full inline-flex'}>
            </span>
            <MicrophoneIcon className="h-40 w-40 stroke-red-500 shadow-lg transition duration-200 hover:shadow-2xl rounded-full p-10 border border-gray-200 text-gray-400 cursor-pointer z-50" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SearchInput;
