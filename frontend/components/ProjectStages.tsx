import React from "react";
import { motion } from "framer-motion";

interface ProjectImage {
  id: number;
  title: string;
  imageUrl: string;
}

interface ProjectShowcaseProps {
  images: ProjectImage[];
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ images }) => {
  return (
    <section className="w-full py-12 px-6 bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl shadow-lg mt-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
        Projects in Process
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <motion.div
            key={img.id}
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden rounded-xl shadow-md"
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-3">
              {/* <p className="font-semibold">{img.title}</p> */}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
