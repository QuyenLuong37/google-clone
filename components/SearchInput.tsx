import React, { useEffect, useRef, useState } from 'react'
import {SearchIcon} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { searchInputState, searchResultsState } from '../state/searchAtom';
import { getSearchResults } from '../libs/search';

function SearchInput() {
    const [searchInput, setSearchInput]: any = useRecoilState(searchInputState);
    const [searchResults, setSearchResults]: any = useRecoilState(searchResultsState);
    const [showSuggest, setShowSuggest] = useState(false);
    const router = useRouter();
    const ref: any = useRef(null);
    const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowSuggest(true);
        setSearchInput(e.target.value)
    }

    useEffect(() => {
        if (!!searchInput) {
            console.log("🚀 ~ file: SearchInput.tsx ~ line 18 ~ useEffect ~ searchInput", searchInput)
            getSearchResults(searchInput).then(res => {
                setSearchResults(res);
            });
        }
    }, [searchInput, setSearchResults])
    
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
          if (ref.current && !ref.current.contains(event.target)) {
              setShowSuggest(false);
            alert("You clicked outside of me!");
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
  return (
    <div ref={ref} className=' relative max-w-md sm:max-w-xl w-full flex items-center  transition duration-200   mx-auto group'>
        <div className={searchResults?.items?.length > 0 ? 'focus-within:shadow-md py-[10px] px-3 border rounded-3xl flex items-center w-full rounded-br-none rounded-bl-none' : 'focus-within:shadow-md py-[10px] px-3 border rounded-3xl flex items-center w-full'}>
            <svg className='w-5 fill-gray-400' focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
            <input value={searchInput} onChange={(e) => onChangeSearch(e)} className='outline-none px-2 flex-grow' type="text" />

            <svg className='w-6' focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285f4" d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"></path><path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path><path fill="#fbbc05" d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"></path><path fill="#ea4335" d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"></path></svg>
        </div>
        {searchResults?.items?.length > 0 && (
            <div>
                <div className="group-focus-within:shadow-lg absolute top-full z-20 bg-white p-4 pt-2 left-0 right-0  border rounded-br-3xl  rounded-bl-3xl space-y-3 border-t-0">
                    { searchResults?.items?.map((item: any, index: number) => {
                        return (
                            <div onClick={() => router.push(`/results?q=${encodeURI(item.title)}`)} key={index} className='grid grid-cols-[auto_1fr] items-center space-x-3'>
                                <SearchIcon className='h-4 text-gray-400 ' />
                                <p dangerouslySetInnerHTML={{__html: item.htmlTitle}}></p>
                            </div>
                        )
                    }) }
                
                </div>
            </div>
        )}
  </div>
  )
}

export default SearchInput