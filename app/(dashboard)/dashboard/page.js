"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Upload, FileAudio, FileVideo, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import axiosClient from "@/lib/axiosClient"
import axios from "axios"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [userType, setUserType] = useState("candidate")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter()

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Check file type
    const allowedTypes = ["audio/", "video/"]
    const isValidType = allowedTypes.some((type) => file.type.startsWith(type))

    if (!isValidType) {
      toast.warning("Invalid file type", {
        description: "Please select an audio or video file.",
      })
      return
    }

    // Check file size (300MB limit)
    if (file.size > 300 * 1024 * 1024) {
      toast.error("File too large", {
        description: "Please select a file smaller than 300MB.",
      })
      return
    }

    setSelectedFile(file)

    setIsUploading(true)
    try {
      // Simulate upload API call
      const { data: resData } = await axiosClient.get("/api/dashboard/upload", { params: { fileType: file.type } });


      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", resData.apiKey);
      formData.append("timestamp", resData.timestamp);
      formData.append("signature", resData.signature);
      formData.append("folder", resData.folder);
      formData.append("public_id", resData.publicId);
      formData.append("type", "authenticated");

      // upload files to cloudinary
      const { data: uploadResponse } = await axios.post(resData.uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFile(uploadResponse);

      // toast.success("File uploaded successfully", {
      //   description: `${file.name} has been uploaded.`,
      // })

    } catch (error) {
      toast.error("Upload failed", {
        description: "There was an error uploading your file.",
      })

      setSelectedFile(null)
      setFile(null)
    }
    finally {
      setIsUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setFile(null)
    setIsUploading(false)
  }

  const handleSubmit = async (e) => {
    try {
      setSubmitting(true);
      e.preventDefault()
      if (!selectedFile) {
        toast.warning("No file selected", {
          description: "Please select a file to analyze."
        })
        return
      }

      if (!file) {
        toast.warning("No file uploaded", {
          description: "Please upload a file to analyze."
        })
        return
      }

      const { data: resData } = await axiosClient.post("/api/dashboard/insights", {
        userType,
        additionalInfo,
        publicId: file.public_id,
        resourceType: file.resource_type,
        type: file.type,
        secureUrl: file.secure_url,
        format: file.format,
        name: file.original_filename,
        bytes: file.bytes,
      })

      router.push(`/dashboard/analysis/${resData.chat._id}`)

    } catch (error) {
      console.error("Error submitting analysis:", error);
      toast.error("Analysis failed", {
        description: "There was an error analyzing your interview.",
      })

    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="h-7 w-7 text-primary" />
              <span className="text-lg font-bold text-foreground font-space-grotesk">InsightsAI</span>
            </Link>
            <Button
              className='cursor-pointer'
              onClick={() => {
                Cookies.remove("accessToken");
                router.push("/");
              }}>
              Sign Out
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex flex-col h-[calc(100vh-64px)]">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2 font-space-grotesk">Welcome to InsightsAI</h1>
              <p className="text-muted-foreground">
                Upload your interview recording and get AI-powered insights to improve your performance.
              </p>
            </div>

            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="file-upload" className="text-sm font-medium">
                      Upload Interview Recording
                    </Label>
                    <div className="relative">
                      <input
                        id="file-upload"
                        type="file"
                        accept="audio/*,video/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={isUploading}
                      />

                      {!selectedFile ? (
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/20 rounded-lg cursor-pointer hover:border-primary/40 transition-colors bg-primary/5 hover:bg-primary/10"
                        >
                          <Upload className="h-8 w-8 text-primary mb-2" />
                          <span className="text-sm font-medium text-foreground">Choose audio or video file</span>
                          <span className="text-xs text-muted-foreground">Maximum size: 300MB</span>
                        </label>
                      ) : (
                        <div className="flex items-center justify-between p-4 border-2 border-primary/20 rounded-lg bg-primary/5">
                          <div className="flex items-center space-x-3">
                            <a href={file?.secure_url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center space-x-2">
                              {selectedFile.type.startsWith("audio/") ? (
                                <FileAudio className="h-6 w-6 text-primary" />
                              ) : (
                                <FileVideo className="h-6 w-6 text-primary" />
                              )}

                            </a>
                            <div>
                              <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          {isUploading ? (
                            <Loader2 className="h-5 w-5 text-primary animate-spin" />
                          ) : (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={handleRemoveFile}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Are you a:</Label>
                    <RadioGroup
                      value={userType}
                      onValueChange={setUserType}
                      className="flex space-x-6"
                    >
                      {/* Candidate Option */}
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="candidate"
                          id="candidate"
                          className="h-5 w-5 border-2 border-gray-400 text-blue-600 rounded-full"
                        />
                        <Label
                          htmlFor="candidate"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Candidate
                        </Label>
                      </div>

                      {/* Recruiter Option */}
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="recruiter"
                          id="recruiter"
                          className="h-5 w-5 border-2 border-gray-400 text-blue-600 rounded-full"
                        />
                        <Label
                          htmlFor="recruiter"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Recruiter
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>



                  <div className="space-y-2">
                    <Label htmlFor="additional-info" className="text-sm font-medium">
                      Additional Information
                    </Label>
                    <Textarea
                      id="additional-info"
                      placeholder="Provide any additional context about the interview (optional)..."
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={!selectedFile || isUploading || submitting}>
                    {(isUploading || submitting) ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {isUploading ? "Uploading..." : "Analyzing..."}
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Analyze and get insights
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}