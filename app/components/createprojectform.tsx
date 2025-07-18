"use client";

import { useState } from "react";
import { X, Upload, ArrowRight } from "lucide-react";
import { useAccount } from "wagmi";
import { createProject, uploadFile } from "@/lib/api";

interface CreateProjectFormProps {
  onClose: () => void;
}

export default function CreateProjectForm({ onClose }: CreateProjectFormProps) {
  const { address } = useAccount();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [goal, setGoal] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      setError("Please connect your wallet first");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      let imageUrl = "";
      if (image) {
        const uploadResult = await uploadFile(image);
        imageUrl = uploadResult.fileUrl;
      }

      await createProject({
        title,
        description,
        category,
        goal: parseFloat(goal),
        creatorAddress: address,
        image: imageUrl,
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0" />
      <div
        role="dialog"
        className="fixed z-50 bg-background shadow-lg transition ease-in-out duration-500 inset-y-0 right-0 h-full border-l slide-in-from-right w-full sm:max-w-xl md:max-w-2xl overflow-auto"
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="flex flex-col space-y-2 text-center sm:text-left p-6 border-b">
            <h2 className="text-lg font-semibold text-foreground">Create New Project (1/3)</h2>
            <p className="text-sm text-muted-foreground">Set up your project basics and visual identity.</p>
          </div>

          {/* Body */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-6">
              {error && (
                <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Project Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium leading-none">
                  Project Title <span className="text-destructive">*</span>
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Your creative project title"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                />
              </div>

              {/* Short Pitch */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium leading-none">
                  Short Pitch <span className="text-destructive">*</span>
                  <span className="text-xs text-muted-foreground ml-2">(0/500 chars)</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project and what backers will receive"
                  maxLength={500}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-24"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium leading-none">
                  Category <span className="text-destructive">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="movies">Movies</option>
                  <option value="books">Books</option>
                  <option value="albums">Albums</option>
                  <option value="art">Art</option>
                </select>
              </div>

              {/* Funding Goal */}
              <div className="space-y-2">
                <label htmlFor="goal" className="text-sm font-medium leading-none">
                  Funding Goal (ETH) <span className="text-destructive">*</span>
                </label>
                <input
                  id="goal"
                  type="number"
                  step="0.01"
                  min="0"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Enter funding goal in ETH"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                />
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Cover Image/Icon <span className="text-destructive">*</span>
                </label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {image ? image.name : "Upload cover image or icon"}
                  </p>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.svg"
                    id="coverImage"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="coverImage"
                    className="cursor-pointer inline-flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Select File
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Project"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
}
