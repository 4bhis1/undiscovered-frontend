import React, {useEffect} from 'react';

const useFetch = url => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setData(json);
        setError(null);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return {data, error, loading};
};

export default useFetch;
