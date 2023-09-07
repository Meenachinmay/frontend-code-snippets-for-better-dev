import { useEffect, useState } from "react";

export const useFetchProducts = () => {
  const [titles, setTitles] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          switch (res.status) {
            case 400:
              setError("Bad Request");
              break;
            case 401:
              setError("Unauthorized");
              break;
            case 404:
              setError("Not Found");
              break;
            case 500:
              setError("Internal Server Error");
              break;
            default:
              setError(`Unknown error: ${res.status}`);
              break;
          }
          return; // Ensure the function returns if the response is not ok
        }
        return res.json();
      })
      .then((res) => {
        if (res && res.products) {
          const newTitles = res.products.map((product) => ({
            id: product.id,
            title: product.title,
          }));
          setTitles(newTitles);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { titles, loading, error };
};
