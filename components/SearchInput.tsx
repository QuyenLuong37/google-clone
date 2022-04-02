import { MicrophoneIcon, SearchIcon } from "@heroicons/react/outline";
import { Button, message, Modal, Spin } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import { useRecoilState } from "recoil";
import { getSearchResults } from "../libs/search";
import { searchInputState, searchResultsState } from "../state/searchAtom";
import styles from '../styles/SearchInput.module.css';

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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [voiceNotFound, setVoiceNotFound] = useState(false);
  const [isInitVoiceSearch, setIsInitVoiceSearch] = useState(true);
  const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement> | any) => {
    console.log("🚀 key: ", e.key)
    setShowSuggest(true);
    setSearchInput(e.target.value);
  };
  const onKeyDownSearch = async (e: any) => {
    console.log("🚀 key: ", e.key)
    if (e.key === 'Enter') {
      router.push(`/results?q=${encodeURI(searchInput)}`);
    }
  };

  useEffect(() => {
    if (searchInput) {
      // getSearchResults(searchInput).then(res => {
      //     setSearchResults(res);
      // });
    }
  }, [searchInput, setSearchResults])

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
  
  useEffect(() => {
    console.log("listening: ", listening);
    let timeout: any;
    if (listening) {
      setIsInitVoiceSearch(false);
      timeout = setTimeout(() => {
        console.log("🚀finalTranscript", finalTranscript)
        if (finalTranscript) {
          setShowVoiceSearch(false);
          router.push(`/results?q=${encodeURI(finalTranscript)}`);
        } else {
          setIsSpeaking(false);
          setVoiceNotFound(true);
        }
        
        setIsInitVoiceSearch(true);
        SpeechRecognition.stopListening();
      }, 6000);
      return () => {
        clearTimeout(timeout)
      }
    } else if (!isInitVoiceSearch) {
      if (finalTranscript) {
        setShowVoiceSearch(false);
        router.push(`/results?q=${encodeURI(finalTranscript)}`);
      } else {
        // setIsSpeaking(false);
        // setVoiceNotFound(true);
      }
    }
  }, [listening, finalTranscript]);

  useEffect(() => {
    console.log("🚀voiceNotFound", voiceNotFound)
    if (voiceNotFound) {
      let timeout = setTimeout(() => {
        setShowVoiceSearch(false)
        setVoiceNotFound(false);
        setIsInitVoiceSearch(true);
        SpeechRecognition.stopListening();
      }, 6000);
      
      return () => clearTimeout(timeout);
    }
  }, [voiceNotFound]);
  useEffect(() => {
    console.log("transcript: ", transcript);
    if (transcript) {
      setIsSpeaking(listening);
    }
  }, [transcript]);
  // useEffect(() => {
  //   console.log("interimTranscript: ", interimTranscript);
  // }, [interimTranscript]);
  useEffect(() => {
    console.log("finalTranscript: ", finalTranscript);
    // console.log("listening: ", listening);
    // if (!listening && finalTranscript) {
    //   setShowVoiceSearch(false);
    //   router.push(`/results?q=${encodeURI(finalTranscript)}`);
    // }
  }, [finalTranscript]);
  
  
  const onFocusSearchInput = () => {
    if (searchInput) {
      setShowSuggest(true);
    } else {
      setShowSuggest(false);
    }
  };

  const onClickVoice = () => {
    if (!isMicrophoneAvailable) {
      // Render some fallback contentt
      message.error("Vui lòng cho phép trình duyệt truy cập micro!");
    } else if (!browserSupportsSpeechRecognition) {
      message.error("Trình duyệt không hỗ trợ!");
    } else {
      setShowVoiceSearch(true)
      setIsInitVoiceSearch(true);
      SpeechRecognition.startListening();
    } 
  }

  const closeShowVoice = () => {
    setShowVoiceSearch(false);
    setIsInitVoiceSearch(true);
    SpeechRecognition.stopListening();
  }

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

  return (
    <div
      ref={ref}
      className=" relative max-w-md sm:max-w-xl w-full flex items-center  transition duration-200   mx-auto group"
    >
      <Spin spinning={isSpeaking} />
      {/* <Button type="primary" onClick={() => startListening()}>
        Start listening
      </Button> */}
      {/* <Button type="primary" onClick={() => getRecognition()}>
        getRecognition
      </Button> */}

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
          onKeyDown={(e) => onKeyDownSearch(e)}
          className="outline-none px-2 flex-grow"
          type="text"
        />

        <svg
          onClick={() => onClickVoice()}
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
        visible={showVoiceSearch}
        centered={false}
        width={800}
        bodyStyle={{ padding: "6rem" }}
        footer={null}
        onCancel={() => setShowVoiceSearch(false)}
        
      >
        <div className="grid grid-cols-[1fr_auto] gap-4 justify-between" >
          <div>
            {/* <div className={styles.listening}>
              {!voiceNotFound ? finalTranscript ? `${finalTranscript}...` : 'Listening...' : '' }
            </div> */}
            {!voiceNotFound && !isSpeaking && <div className={styles.listening}>
              Listening...
            </div>}
            {isSpeaking && finalTranscript && <div className={styles.listening}>
            {finalTranscript}
            </div>}
            { voiceNotFound && <div className={styles.listening}>
              Please check your microphone or audio levels.
            </div>}
            
          </div>
          <div className="relative cursor-pointer group"  onClick={() => closeShowVoice()}>
            <span className={isSpeaking ? "absolute animate-ping bg-red-200 rounded-full h-full w-full opacity-75 inline-flex" : 'absolute  rounded-full h-full w-full inline-flex'}>
            </span>
            <MicrophoneIcon className="h-40 w-40 stroke-red-500 shadow-lg transition duration-200 hover:shadow-2xl rounded-full p-10 border border-gray-200 text-gray-400 cursor-pointer z-50" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SearchInput;
