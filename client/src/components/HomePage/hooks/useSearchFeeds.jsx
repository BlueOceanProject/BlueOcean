import React, { useState, useEffect } from "react";
import axios from "axios";
const url = '';
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

    axios
      .get(`/feeds?userName=${query}&pageNum=${pageNum}`, {
        cancelToken: new CancelToken((c) => (cancel = c))
      })
      .then((res) => {
        setFeeds((prev) => {
          return [...new Set([...prev, ...res.data])];
        });
        setHasMore(res.data.length > 0);
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
