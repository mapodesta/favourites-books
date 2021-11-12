import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = () => {
  const [info, setInfo] = useState([]);

  const [dataPagination, setDataPagination] = useState([]);
  const [toPagination, setToPagination] = useState(6);

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await axios.get(
  //       'https://hn.algolia.com/api/v1/search_by_date?query=angular&hitsPerPage=24'
  //     );
  //     setInfo(data.data.hits);
  //     setDataPagination(data.data.hits.slice(0, 6));
  //   };

  //   getData();
  // }, []);

  const handleChangePage = (value) => {
    if (parseInt(value) === 1) {
      setToPagination(6);
      return setDataPagination(info.slice(0, 6));
    }
    setDataPagination(info.slice(toPagination, value * 6));
    setToPagination(value * 6);
  };

  const handleChangeName = async (value) => {
    if (value === 'react') {
      localStorage.setItem('selected', value);
      const data = await axios.get(
        ' https://hn.algolia.com/api/v1/search_by_date?query=reactjs&hitsPerPage=24'
      );
      setInfo(data.data.hits);
      setDataPagination(data.data.hits.slice(0, 6));
    }

    if (value === 'angular') {
      localStorage.setItem('selected', value);
      const data = await axios.get(
        ' https://hn.algolia.com/api/v1/search_by_date?query=angular&hitsPerPage=24'
      );
      setInfo(data.data.hits);
      return setDataPagination(data.data.hits.slice(0, 6));
    }

    if (value === 'vuejs') {
      localStorage.setItem('selected', value);
      const data = await axios.get(
        ' https://hn.algolia.com/api/v1/search_by_date?query=vuejs&hitsPerPage=24'
      );
      setInfo(data.data.hits);
      return setDataPagination(data.data.hits.slice(0, 6));
    }
  };
  return {
    info,
    dataPagination,
    handleChangeName,
    handleChangePage,
  };
};

export default useFetch;
