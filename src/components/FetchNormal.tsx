import { useFetchProducts } from "../hooks/useFetchProducts";

export function FetchNormal() {
  const { titles, loading, error } = useFetchProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div>
        {titles.map((title) => (
          <p
            style={{
              padding: "5px",
              backgroundColor: "gray",
              fontSize: "15px",
              width: "auto",
              margin: "auto",
            }}
            key={title.id}
          >
            {title.title}
          </p>
        ))}
      </div>
    </>
  );
}
