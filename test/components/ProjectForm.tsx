"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Project, ProjectFormData } from "../src/types";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Button } from "./Button";
import { projectsAPI } from "../src/lib/api";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  images: z
    .array(z.any()) // allow both File and existing URL strings
    .min(1, "At least one image is required"),
});

interface ProjectFormProps {
  project?: Project | null;
  onSuccess: (project: Project) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const categories = ["Residential", "Commercial", "Industrial", "Educational", "Healthcare"];
const locations = ["Lagos", "Abuja", "Port Harcourt", "New York", "London"];

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSuccess,
  onCancel,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      category: project?.category || "",
      location: project?.location || "",
      images: project?.images || [],
    },
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(project?.images || []);

  // Sync form images with previews
  useEffect(() => {
    setValue("images", previews);
  }, [previews, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const fileIndex = index - (previews.length - selectedFiles.length);
    if (fileIndex >= 0) {
      // remove from selectedFiles
      setSelectedFiles(selectedFiles.filter((_, i) => i !== fileIndex));
    }
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const onSubmitForm = async (data: ProjectFormData) => {
    try {
      // Only pass files for new uploads
      const filesToUpload = selectedFiles.length > 0 ? selectedFiles : undefined;

      const formData = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        images: data.images, // keep existing URLs for backend reference
      };

      const result = project
        ? await projectsAPI.update(project.id, formData, filesToUpload)
        : await projectsAPI.create(formData, filesToUpload);

      onSuccess(result.project);
    } catch (err) {
      console.error("Error submitting project:", err);
      alert("Failed to submit project. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <Input label="Title" {...register("title")} error={errors.title?.message} />
      <Textarea
        label="Description"
        {...register("description")}
        error={errors.description?.message}
        rows={4}
      />

      <div className="grid grid-cols-2 gap-4">
        <select {...register("category")} className="border rounded p-2">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select {...register("location")} className="border rounded p-2">
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2">Images</label>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        <div className="flex space-x-2 mt-2 flex-wrap">
          {previews.map((url, idx) => (
            <div key={idx} className="relative">
              <img src={url} alt="preview" className="w-20 h-20 object-cover rounded border" />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        {errors.images && <p className="text-red-600">{errors.images.message}</p>}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {project ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};
