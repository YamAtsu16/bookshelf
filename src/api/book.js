import axios from "axios";

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error.response.data.msg || '時間をおいてお試しください。');
});

const ENDPOINT_URL = "http://localhost:8080/api/book";

const bookApi = {

  async get(id) {
    const result = await axios.get(ENDPOINT_URL + "/" + id);
    return result.data;
  },
  async getAll() {
    const result = await axios.get(ENDPOINT_URL);
    return result.data;
  },
  async post(book) {
    const result = await axios.post(ENDPOINT_URL, book);
    return result.data;
  },
  async delete(book) {
    const result = await axios.delete(ENDPOINT_URL + "/" + book._id);
    return result.data;
  },
  async patch(book) {
    const result = await axios.patch(ENDPOINT_URL + "/", book);
    return result.data;
  },
};

export default bookApi;