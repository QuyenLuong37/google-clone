import { Pagination, Tabs } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import SearchInput from "../components/SearchInput";
import { PhotographIcon, SearchIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { searchInputState, searchResultsState } from "../state/searchAtom";
import { getSearchResults } from "../libs/search";
import SearchResults from "../components/SearchResults";
const { TabPane } = Tabs;
function Results() {
  const router = useRouter();
  const [searchInput, setSearchInput]: any = useRecoilState(searchInputState);
  const [searchResults, setSearchResults]: any = useRecoilState(searchResultsState);
  const [tabSelected, setTabSelected] = useState('webpage');
  const [pageIndex, setPageIndex] = useState(1);
  useEffect(() => {
    setPageIndex(1);
      if (router.query.q) {
        setSearchInput(decodeURI(router.query.q as any))
        getSearchResults(router.query.q as string, 0).then(res => {
          setSearchResults(res)
        })
      }
  }, [router.query, setSearchInput]);


  async function changeTab(tabIndex: string) {
      setTabSelected(+tabIndex === 1 ? 'webpage' : 'image');
      if (+tabIndex === 1) {
          if (searchInput) {
              const data = await getSearchResults(searchInput, 0);
              setSearchResults(data);
          }
      } else {
        if (searchInput) {
            const data = await getSearchResults(searchInput, 0, 'image');
            setSearchResults(data);
        }
      }
  }

    const pageChange = async (page: any) => {
        console.log('page: ', page)
        setPageIndex(page);
        if (tabSelected === 'image') {
            const data = await getSearchResults(searchInput, (page - 1) * 10 + 1, tabSelected);
            setSearchResults(data);
        } else {
            const data = await getSearchResults(searchInput, (page - 1) * 10 + 1);
            setSearchResults(data);
        }
    }
  return (
    <div className="pb-10">
      <div className="grid grid-cols-2 items-center py-6 px-6 pb-0">
        {/* Header */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-6">
          <div className="flex">
            <Image
              className=" w-24"
              src="/googlelogo.png"
              width={92}
              height={30}
              alt="x"
            />
          </div>
          <SearchInput />
        </div>

        <div className="flex justify-end">
          <Avatar />
        </div>
      </div>

      <div className="mt-3 pb-6">
        <Tabs size="small" defaultActiveKey="1" onChange={(tabIndex: string) => changeTab(tabIndex)}>
          <TabPane
            tab={
              <span className="flex items-center space-x-2">
                <SearchIcon className="h-5"/>
                <span>All</span>
              </span>
            }
            key="1"
          >
            <SearchResults searchResults={searchResults} type='webpage' />
          </TabPane>
          <TabPane
            tab={
              <span className="flex items-center space-x-2">
                <PhotographIcon className="h-5 " />
                <span>Image</span>
              </span>
            }
            key="2"
          >
            <SearchResults searchResults={searchResults} type='image' />
          </TabPane>
        </Tabs>
      </div>
      

      <div className="mt-5 text-center">
        <Pagination current={pageIndex} showSizeChanger={false} pageSizeOptions={[10]} onChange={(e) => pageChange(e)} defaultCurrent={1} total={searchResults?.searchInformation?.totalResults ?? 0} />
      </div>
    </div>
  );
}

export default Results;
