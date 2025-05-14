import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function Gallery() {
const [images, setImages] = useState([]);
const [isOpen, setIsOpen] = useState(false);
const [index, setIndex] = useState(0);
const [loading, setLoading] = useState(false);
const [progress, setProgress] = useState(0);

const handleImageUpload = (e) => {
setLoading(true);
setProgress(0);

```
const files = Array.from(e.target.files);
const totalFiles = files.length;
let uploaded = 0;

const newImages = files.map((file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      uploaded++;
      setProgress(Math.floor((uploaded / totalFiles) * 100));
      resolve({ src: reader.result });
    };
    reader.readAsDataURL(file);
  });
});

Promise.all(newImages).then((imgs) => {
  setImages((prev) => [...prev, ...imgs]);
  setLoading(false);
});
```

};

const openLightbox = (i) => {
setIndex(i);
setIsOpen(true);
};

const deleteImage = (i) => {
const updated = [...images];
updated.splice(i, 1);
setImages(updated);
};

return ( <div className="p-6 max-w-6xl mx-auto"> <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Image Gallery</h1>


  {loading && (
    <div className="mb-6">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2">{progress}% uploaded...</p>
    </div>
  )}

  {/* گالری عکس‌ها */}
  <div
    className="
      flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6
      overflow-x-auto sm:overflow-visible
      scrollbar-hide
    "
  >
    {/* باکس افزودن عکس */}
    <label className="relative flex flex-col items-center justify-center shrink-0 w-64 sm:w-auto h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition group">
      <span className="text-6xl text-gray-500">+</span>
      <span className="absolute bottom-4 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
        Click to upload
      </span>
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageUpload}
        disabled={loading}
      />
    </label>

    {/* نمایش تصاویر */}
    {images.map((img, i) => (
      <div
        key={i}
        onClick={() => openLightbox(i)}
        className="relative shrink-0 w-64 sm:w-auto h-64 overflow-hidden rounded-lg border border-gray-300 shadow-sm group cursor-pointer"
      >
        {/* دکمه حذف */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // جلوگیری از باز شدن لایت‌باکس
            deleteImage(i);
          }}
          className="absolute top-2 right-2 z-20 text-black text-xl hover:scale-125 transition"
          title="Delete"
        >
          &times;
        </button>

        <img
          src={img.src}
          alt={`Gallery ${i}`}
          className="w-full h-full object-cover rounded-lg"
        />

        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </div>
    ))}
  </div>

  {/* لایت‌باکس */}
  {isOpen && (
    <Lightbox
      open={isOpen}
      close={() => setIsOpen(false)}
      slides={images}
      index={index}
      plugins={[Thumbnails, Fullscreen]}
    />
  )}
</div>


);
}

