import React, { useState, useEffect, useRef, useCallback } from 'react';
import FeedListItem from './FeedListItem.jsx';
import useSearchFeed from './hooks/useSearchFeeds.jsx';

const Feed = () => {
  const [query, setQuery] = useState('');
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, error, feeds, hasMore } = useSearchFeed(query, pageNum);

  const observer = useRef();
  const lastFeedElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setPageNum(1);
  };

  return (
    <>
      <div className="search-bar">
        <input type="text" placeholder="Search users..." onChange={handleSearchChange} value={query} />
      </div>

      {feeds.map((feed, i) => {
        if (feeds.length === i + 1) {
          return (
            <div key={i} ref={lastFeedElementRef}>
              <FeedListItem key={i} feed={feed} />
            </div>
          );
        } else {
          return <div key={i}>
            <FeedListItem key={i} feed={feed} />
          </div>;
        }
      }

      )}
      <div>{isLoading && "Loading..."}</div>
      <div>{error && "Error..."}</div>
    </>
  );
}

export default Feed;