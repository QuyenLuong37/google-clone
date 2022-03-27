import Link from 'next/link';
import React from 'react';
import { SearchResult } from '../models/SearchResult';


function SearchResultItem({link, title, htmlSnippet}: SearchResult) {
  return (
    <div>
        <div className="text-gray-600 line-clamp-1">{link}</div>
        <Link href={link} passHref={true}>
            <div className='text-xl text-[#1a0dbe] transition duration-200 hover:underline cursor-pointer'>{title}</div>
        </Link>
        <div className="line-camp-2" dangerouslySetInnerHTML={{__html: htmlSnippet}}></div>
    </div>
  )
}

export default SearchResultItem