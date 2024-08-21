import { useEffect, useState } from "react";
import { getToken, useAuth } from "../contexts/auth/authContext";



const dateReviver = (key: string, value: string) => {
  return value;
};

export const reqGet = async <T>(url: string): Promise<[T | null, Error | null]> => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
      }
      return res.json();
    })
    .then((data: T) => [data, null] as [T, null]) // Retorna o objeto do tipo T e null para o erro
    .catch((err: Error) => {
      console.error("Erro na requisição GET:", err);
      return [null, err]; // Retorna null para o objeto e o erro
    });
};
export const reqDelete = async <T>(url: string): Promise<[T | null, Error | null]> => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
      }
      return res.json();
    })
    .then((data: T) => [data, null] as [T, null]) // Retorna o objeto do tipo T e null para o erro
    .catch((err: Error) => {
      console.error("Erro na requisição GET:", err);
      return [null, err]; // Retorna null para o objeto e o erro
    });
};

export const useGet = <T>(
  url: string,
): [T | null, Error | null] => {
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

export const reqPost = async <T>(url: string, body: any): Promise<[T | null, Error | null]> => {
  return fetch(`${import.meta.env.VITE_BASE_URL}/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body,
  })
    .then((res) => res.json())
    .then((data: T) => [data, null] as [T, null])
    .catch((err: Error) => {
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
