import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

interface Image {
  id: string;
  url: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await axiosClient.get("/images");
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    }
    fetchImages();
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      <div className="gallery">
        {images.map((image) => (
          <div key={image.id}>
            {/* <img src={image.url} alt="Uploaded" /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
