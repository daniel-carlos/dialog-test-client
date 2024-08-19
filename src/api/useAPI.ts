import { useEffect, useState } from "react";
import { getToken, useMe } from "../contexts/user/meContext";



const dateReviver = (key: string, value: string) => {
  return value;
};

export const reqGet = async (url: string): Promise<any> => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/${url}`, {
    ...{
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    },
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error("Erro na requisição GET:", err);
      throw err; // Rejeita a promessa com o erro
    });
};

export const useGet = <T>(
  url: string,
): [T | null, Error | null] => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log("PQP");
    
    fetch(`${import.meta.env.VITE_BASE_URL}/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err));
  }, [url]);

  return [data, error];
};

export const reqPost = async (url: string, body: any): Promise<any> => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/${url}`, {
    ...{
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    },
    body,
    method: "POST",
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error("Erro na requisição POST:", err);
      throw err; // Rejeita a promessa com o erro
    });
};

export const usePost = <T>(
  url: string,
  body: any
): [T | null, Error | null] => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/${url}`, {
      ...{
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }, body
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err));
  }, [url, body]);

  return [data, error];
};

export const usePut = <T>(
  url: string,
  body: BodyInit
): [T | null, Error | null] => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/${url}`, {
      ...{
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }, body
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err));
  }, [url, body]);

  return [data, error];
};

export const usePatch = <T>(
  url: string,
  body: BodyInit
): [T | null, Error | null] => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/${url}`, {
      ...{
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }, body
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err));
  }, [url, body]);

  return [data, error];
};

export const useDelete = <T>(url: string): [T | null, Error | null] => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err));
  }, [url]);

  return [data, error];
};
