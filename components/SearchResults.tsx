import { Pagination } from "antd";
import React from "react";
import { SearchResult } from "../models/SearchResult";
import SearchResultItem from "./SearchResultItem";
import SearchResultItemImage from "./SearchResultItemImage";

function SearchResults({ searchResults, type }: any) {
  return (
    <>
      <div className="text-gray-500 text-xs">
        About {searchResults?.searchInformation?.formattedTotalResults} (
        {searchResults?.searchInformation?.formattedSearchTime} seconds)
      </div>
      {searchResults?.items?.length > 0 ? (
        type === "webpage" ? (
          <div className="space-y-8 mt-3 max-w-2xl">
            {searchResults?.items?.map((item: SearchResult, index: number) => {
              return <SearchResultItem key={index} {...item} />;
            })}
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {searchResults?.items?.map((item: SearchResult, index: number) => {
              return <SearchResultItemImage key={index} {...item} />;
            })}
          </div>
        )
      ) : null}
    </>
  );
}

export default SearchResults;
