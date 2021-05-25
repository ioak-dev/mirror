/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const searchUnsplash = async (
  searchText: string,
  pageNo: number,
  rowsPerPage: number
) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?per_page=${rowsPerPage}&orientation=landscape&page=${pageNo}&query=${searchText}`,
    {
      headers: {
        Authorization: 'Client-ID swQKFuCohwOG71WlCYdPexknSgQr9M39sFmmPxb5Udc',
      },
    }
  );
  return {
    results: response.data.results,
    total: response.data.total,
    totalPages: response.data.total_pages,
    currentPage: pageNo,
  };
};
