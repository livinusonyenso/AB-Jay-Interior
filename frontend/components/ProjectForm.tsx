"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Project, ProjectFormData } from "../src/types";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Button } from "./Button";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  images: z
    .array(z.string().url("Invalid URL"))
    .min(1, "At least one image is required"),
});

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const categories = [
  "Residential",
  "Commercial",
  "Industrial",
  "Educational",
  "Healthcare",
];

const locations = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "New York",
  "London",
];

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          title: project.title,
          description: project.description,
          category: project.category,
          location: project.location,
          images: project.images,
        }
      : {
          title: "",
          description: "",
          category: "",
          location: "",
          images: [""],
        },
  });

  const [localPreviews, setLocalPreviews] = useState<string[]>([]);
  const images = watch("images");

  const addImageField = () => {
    setValue("images", [...images, ""]);
  };

  const removeImageField = (index: number) => {
    setValue("images", images.filter((_, i) => i !== index));
    setLocalPreviews(localPreviews.filter((_, i) => i !== index));
  };

  const updateImageField = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setValue("images", newImages);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setValue("images", [...images, previewUrl]);
    setLocalPreviews([...localPreviews, previewUrl]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <Input
        label="Project Title"
        {...register("title")}
        error={errors.title?.message}
        placeholder="Enter project title"
      />

      {/* Description */}
      <Textarea
        label="Description"
        {...register("description")}
        error={errors.description?.message}
        placeholder="Describe the project..."
        rows={4}
      />

      {/* Category + Location */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            {...register("category")}
            defaultValue=""
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <select
            {...register("location")}
            defaultValue=""
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>
      </div>

      {/* Images */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Project Images
        </label>

        {images.map((image, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Input
              value={image}
              onChange={(e) => updateImageField(index, e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1"
            />
            {image && (
              <img
                src={image}
                alt="preview"
                className="w-16 h-16 rounded object-cover border"
              />
            )}
            {images.length > 1 && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => removeImageField(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={addImageField}
            size="sm"
          >
            Add Image URL
          </Button>

          <label className="cursor-pointer bg-gray-100 border border-gray-300 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-200">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {errors.images && (
          <p className="text-sm text-red-600">
            At least one valid image is required
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {project ? "Update Project" : "Create Project"}
        </Button>
      </div>
    </form>
  );
};
