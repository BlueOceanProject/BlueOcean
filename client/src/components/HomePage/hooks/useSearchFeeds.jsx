import React, { useState, useEffect } from "react";
import axios from "axios";

function useSearchFeeds(query, pageNum) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setFeeds([]);
  }, [query]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let cancel;

    setIsLoading(true);
    setError(false);

    // TODO: change the get url
    axios
      .get(`https://openlibrary.org/search.json?q=${query}&page=${pageNum}`, {
        cancelToken: new CancelToken((c) => (cancel = c))
      })
      .then((res) => {
        setFeeds((prev) => {
          // TODO: change map res.data.docs
          return [...new Set([...prev, ...res.data.docs.map((d) => d.title)])];
        });
        setHasMore(res.data.docs.length > 0);
        setIsLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(err);
      });

    return () => cancel();
  }, [query, pageNum]);

  return { isLoading, error, feeds, hasMore };
}

export default useSearchFeeds;
