"use client";
import { useEffect, useState } from "react";
import ImageGrid from "../ImageGrid";

export default function ImageGalleryCsr() {
  const [images, setImages] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const getData = async (): Promise<void> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/random/9`);

      if (!res.ok) {
        throw new Error("Oops, sorry! No dogs for you right know...");
      }
      const data = await res.json();

      setImages(data?.message);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Oops, sorry! An unknown error occurred...");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading)
    return (
      <div className="py-5 md:py-10 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(9)].map((item, i) => (
          <div
            key={`placeholder-${i}`}
            className="rounded-md overflow-hidden h-60 md:h-80 mb-5 md:mb-0 bg-slate-800"
          ></div>
        ))}
      </div>
    );
  if (error) return <div className="py-5 md:py-10">{error}</div>;

  return <ImageGrid images={images} />;
}
