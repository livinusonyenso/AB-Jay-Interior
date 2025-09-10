"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { Project, ProjectFormData } from "../src/types"
import { Input } from "./Input"
import { Textarea } from "./Textarea"
import { Button } from "./Button"
import { useProjects } from "../hooks/useProjects"

interface ProjectFormProps {
  project?: Project | null
  onSuccess: (project: Project) => void
  onCancel: () => void
}

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  images: z
    .array(z.any()) // allow both File and existing URL strings
    .min(1, "At least one image is required"),
})

const categories = ["Residential", "Commercial", "Industrial", "Educational", "Healthcare"]
const locations = ["Lagos", "Abuja", "Port Harcourt", "New York", "London"]

export const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSuccess, onCancel }) => {
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
  })

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>(project?.images || [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { createProject, updateProject, fetchProjects } = useProjects()

  // Sync form images with previews
  useEffect(() => {
    setValue("images", previews)
  }, [previews, setValue])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    setSelectedFiles((prev) => [...prev, ...files])

    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setPreviews((prev) => [...prev, ...newPreviews])
  }

  const removeImage = (index: number) => {
    const fileIndex = index - (previews.length - selectedFiles.length)
    if (fileIndex >= 0) {
      // remove from selectedFiles
      setSelectedFiles(selectedFiles.filter((_, i) => i !== fileIndex))
    }
    setPreviews(previews.filter((_, i) => i !== index))
  }

const onSubmitForm = async (data: ProjectFormData) => {
  setIsSubmitting(true)
  try {
    // Only pass files for new uploads
    const filesToUpload = selectedFiles.length > 0 ? selectedFiles : undefined

    // ✅ Only include real image URLs if editing, not previews
    const existingUrls = project ? project.images : []

    const formData = {
      title: data.title,
      description: data.description,
      category: data.category,
      location: data.location,
      images: existingUrls, // keep only backend-ready URLs
    }

    const result = project
      ? await updateProject(project.id, formData, filesToUpload)
      : await createProject(formData, filesToUpload)

    // Refresh the projects list to show the new/updated project
    await fetchProjects()
    
    onSuccess(result.project)
  } catch (err) {
    console.error("Error submitting project:", err)
    alert("Failed to submit project. Check console for details.")
  } finally {
    setIsSubmitting(false)
  }
}


  return (
   <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
  {/* Title */}
 <Input 
  label="Title" 
  {...register("title")} 
  error={errors.title?.message} 
  className="border border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
/>

<Textarea 
  label="Description" 
  {...register("description")} 
  error={errors.description?.message} 
  rows={4}
  className="border border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
/>

  {/* Category & Location */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <select
      {...register("category")}
      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    >
      <option value="">Select Category</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>

    <select
      {...register("location")}
      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
    >
      <option value="">Select Location</option>
      {locations.map((loc) => (
        <option key={loc} value={loc}>{loc}</option>
      ))}
    </select>
  </div>

  {/* Images */}
  <div>
    <label className="block mb-2 text-gray-700 font-medium">Images</label>
    <input 
      type="file" 
      multiple 
      accept="image/*" 
      onChange={handleFileChange} 
      className="block w-full text-sm text-gray-600"
    />
    <div className="flex flex-wrap gap-3 mt-3">
      {previews.map((url, idx) => (
        <div key={idx} className="relative group">
          <img 
            src={url || "/placeholder.svg"} 
            alt="preview" 
            className="w-24 h-24 object-cover rounded-lg border shadow-sm transition-transform transform hover:scale-105"
          />
          <button
            type="button"
            onClick={() => removeImage(idx)}
            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            ×
          </button>
        </div>
      ))}
    </div>
    {errors.images && <p className="text-red-600 mt-1">{errors.images.message}</p>}
  </div>

  {/* Action Buttons */}
  <div className="flex justify-end space-x-3">
    <Button 
      type="button" 
      variant="secondary" 
      onClick={onCancel}
      className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
    >
      Cancel
    </Button>
    <Button 
      type="submit" 
      loading={isSubmitting}
      className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
    >
      {project ? "Update" : "Create"}
    </Button>
  </div>
</form>

  )
}
