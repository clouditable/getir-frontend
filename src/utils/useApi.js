import axios from "axios";

export const useAPI = () => {
  const token = JSON.parse(localStorage.getItem("getir-token"));

  const defaultHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const customFetch = ({
    endpoint,
    method = "GET",
    body = {},
    headers = defaultHeader,
    responseType,
  }) => {
    const baseUrl = "https://getirbackendapi.herokuapp.com/api";
    let url = `${baseUrl}/${endpoint}`;

    const options = {
      method,
      headers,
    };

    if (Object.keys(body).length) options.data = JSON.stringify(body);
    if (responseType) options.responseType = responseType;

    return axios(url, options)
      .then((response) => {
        let data = null;
        if (response.data.status) {
          data = response.data;
        } else {
        }

        return data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const get = ({ endpoint, id, query, token }) => {
    const url = `${endpoint}${
      id ? `/${id}${query ? `?${query}` : ""}` : `${query ? `?${query}` : ""}`
    }`;

    if (token) {
      defaultHeader.Authorization = `Bearer ${token}`;
    }
    return customFetch({ endpoint: url });
  };

  const post = ({ endpoint, body = {} }) => {
    if (!Object.keys(body).length)
      throw new Error("to make a post you must provide a  body");

    return customFetch({ endpoint, method: "POST", body });
  };

  const put = ({ endpoint, id, body = {}, token }) => {
    if (!id && !body)
      throw new Error("to make a put you must provide the id and the   body");
    if (token) {
      defaultHeader.Authorization = `Bearer ${token}`;
    }

    const url = `${endpoint}${id ? `/${id}` : ""}`;
    return customFetch({
      endpoint: url,
      method: "PUT",
      body,
      headers: defaultHeader,
    });
  };

  const del = ({ endpoint, id, query }) => {
    if (!id)
      throw new Error("to make a delete you must provide the id and the body");
    const url = `${endpoint}${
      id ? `/${id}${query ? `?${query}` : ""}` : `${query ? `?${query}` : ""}`
    }`;

    return customFetch({ endpoint: url, method: "DELETE" });
  };

  return {
    get,
    post,
    put,
    del,
  };
};
