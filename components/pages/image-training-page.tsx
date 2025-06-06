"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Plus, Play, Pause, Download, Trash2, Edit, Eye, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function ImageTrainingPage() {
  const [activeTab, setActiveTab] = useState("new")
  const [modelName, setModelName] = useState("")
  const [description, setDescription] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  // Mock data for existing LoRA models
  const [loraModels] = useState([
    {
      id: 1,
      name: "Portrait Style v2",
      description: "High-quality portrait generation with artistic flair",
      status: "completed",
      progress: 100,
      createdAt: "2024-01-15",
      images: 45,
      downloads: 234,
    },
    {
      id: 2,
      name: "Cyberpunk Aesthetic",
      description: "Futuristic cyberpunk style for characters and environments",
      status: "training",
      progress: 67,
      createdAt: "2024-01-20",
      images: 32,
      downloads: 0,
    },
    {
      id: 3,
      name: "Watercolor Art",
      description: "Soft watercolor painting style",
      status: "failed",
      progress: 0,
      createdAt: "2024-01-18",
      images: 28,
      downloads: 0,
    },
  ])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(files)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "training":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-400/20 text-green-400"
      case "training":
        return "bg-yellow-400/20 text-yellow-400"
      case "failed":
        return "bg-red-400/20 text-red-400"
      default:
        return "bg-gray-400/20 text-gray-400"
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[28px] font-semibold text-white mb-2">Image Training</h1>
        <p className="text-[#A1A1A1]">Create and manage your custom LoRA models for personalized image generation</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-8 bg-[#111111] rounded-lg p-1">
        <button
          onClick={() => setActiveTab("new")}
          className={`flex-1 px-4 py-2 rounded-md text-[14px] font-medium transition-colors ${
            activeTab === "new" ? "bg-white text-black" : "text-[#A1A1A1] hover:text-white"
          }`}
        >
          New LoRA Training
        </button>
        <button
          onClick={() => setActiveTab("management")}
          className={`flex-1 px-4 py-2 rounded-md text-[14px] font-medium transition-colors ${
            activeTab === "management" ? "bg-white text-black" : "text-[#A1A1A1] hover:text-white"
          }`}
        >
          LoRA Management
        </button>
      </div>

      {/* New LoRA Training Section */}
      {activeTab === "new" && (
        <div className="space-y-6">
          <Card className="bg-[#111111] border-[#333333]">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New LoRA Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Model Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-[14px] font-medium mb-2">Model Name</label>
                  <Input
                    placeholder="Enter model name..."
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    className="bg-black border-[#333333] text-white placeholder:text-[#A1A1A1]"
                  />
                </div>
                <div>
                  <label className="block text-white text-[14px] font-medium mb-2">Training Steps</label>
                  <Input
                    placeholder="1000"
                    type="number"
                    className="bg-black border-[#333333] text-white placeholder:text-[#A1A1A1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-[14px] font-medium mb-2">Description</label>
                <Textarea
                  placeholder="Describe your model's style and purpose..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-black border-[#333333] text-white placeholder:text-[#A1A1A1] min-h-[100px]"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-white text-[14px] font-medium mb-2">Training Images</label>
                <div className="border-2 border-dashed border-[#333333] rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-[#A1A1A1] mx-auto mb-4" />
                  <p className="text-white mb-2">Drag and drop your images here, or click to browse</p>
                  <p className="text-[#A1A1A1] text-[13px] mb-4">Upload 20-100 high-quality images (JPG, PNG, WebP)</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="bg-white text-black hover:bg-white/90">Choose Files</Button>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <p className="text-white text-[14px] font-medium mb-2">Uploaded Files ({uploadedFiles.length})</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {uploadedFiles.slice(0, 8).map((file, index) => (
                        <div key={index} className="bg-black rounded-lg p-2 text-center">
                          <div className="w-full h-20 bg-[#333333] rounded mb-2 flex items-center justify-center">
                            <span className="text-[#A1A1A1] text-[12px]">{file.name.slice(0, 10)}...</span>
                          </div>
                        </div>
                      ))}
                      {uploadedFiles.length > 8 && (
                        <div className="bg-black rounded-lg p-2 text-center flex items-center justify-center">
                          <span className="text-[#A1A1A1] text-[12px]">+{uploadedFiles.length - 8} more</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Training Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white text-[14px] font-medium mb-2">Learning Rate</label>
                  <Input
                    placeholder="0.0001"
                    type="number"
                    step="0.0001"
                    className="bg-black border-[#333333] text-white placeholder:text-[#A1A1A1]"
                  />
                </div>
                <div>
                  <label className="block text-white text-[14px] font-medium mb-2">Batch Size</label>
                  <Input
                    placeholder="4"
                    type="number"
                    className="bg-black border-[#333333] text-white placeholder:text-[#A1A1A1]"
                  />
                </div>
                <div>
                  <label className="block text-white text-[14px] font-medium mb-2">Resolution</label>
                  <select className="w-full px-3 py-2 bg-black border border-[#333333] rounded-md text-white">
                    <option value="512">512x512</option>
                    <option value="768">768x768</option>
                    <option value="1024">1024x1024</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="bg-white text-black hover:bg-white/90 flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Start Training
                </Button>
                <Button variant="outline" className="border-[#333333] text-white hover:bg-white/10">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* LoRA Management Section */}
      {activeTab === "management" && (
        <div className="space-y-4">
          {loraModels.map((model) => (
            <Card key={model.id} className="bg-[#111111] border-[#333333]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white text-[16px] font-medium">{model.name}</h3>
                      <Badge className={getStatusColor(model.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(model.status)}
                          {model.status}
                        </div>
                      </Badge>
                    </div>
                    <p className="text-[#A1A1A1] text-[14px] mb-3">{model.description}</p>
                    <div className="flex items-center gap-6 text-[13px] text-[#A1A1A1]">
                      <span>Created: {model.createdAt}</span>
                      <span>Images: {model.images}</span>
                      <span>Downloads: {model.downloads}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-[#A1A1A1] hover:text-white hover:bg-white/10">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-[#A1A1A1] hover:text-white hover:bg-white/10">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {model.status === "completed" && (
                      <Button variant="ghost" size="icon" className="text-[#A1A1A1] hover:text-white hover:bg-white/10">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {model.status === "training" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#A1A1A1]">Training Progress</span>
                      <span className="text-white">{model.progress}%</span>
                    </div>
                    <Progress value={model.progress} className="h-2" />
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-[#A1A1A1] hover:text-white hover:bg-white/10">
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                        <Trash2 className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
