import React from "react";
import { motion } from "framer-motion";

interface Celebrity {
  id: number;
  name: string;
  imageUrl: string;
}

interface CelebrityGalleryProps {
  celebrities: Celebrity[];
  layout?: "grid" | "carousel"; // flexible layout
}

export const CelebrityGallery: React.FC<CelebrityGalleryProps> = ({
  celebrities,
  layout = "grid",
}) => {
  return (
    <section className="w-full py-12 px-6 bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
        Recognized By
      </h2>

      {layout === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {celebrities.map((celebrity) => (
            <motion.div
              key={celebrity.id}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-xl shadow-md bg-white"
            >
              <img
                src={celebrity.imageUrl}
                alt={celebrity.name}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              />
              <p className="text-center text-blue-600 font-semibold py-2">
                {/* {celebrity.name} */}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {celebrities.map((celebrity) => (
            <motion.div
              key={celebrity.id}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 w-48 rounded-xl shadow-md bg-white"
            >
              <img
                src={celebrity.imageUrl}
                alt={celebrity.name}
                className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 hover:scale-110"
              />
              <p className="text-center text-green-600 font-semibold py-2">
                {celebrity.name}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};
