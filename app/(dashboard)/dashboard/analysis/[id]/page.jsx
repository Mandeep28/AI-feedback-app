"use client";

import { Suspense, useEffect, useState } from "react";
import { FileAudio, FileVideo, User, Bot, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

function getFileIcon(filename) {
  if (!filename) return FileAudio;

  const ext = filename.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "mp4":
    case "avi":
    case "mov":
    case "wmv":
    case "flv":
    case "webm":
      return FileVideo;
    case "mp3":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "m4a":
      return FileAudio;
    default:
      return FileAudio;
  }
}

function AnalysisContent() {
  const params = useParams();
  console.log("params --> ", params);
  const router = useRouter();

  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(
          `/api/dashboard/insights/${params.id}`
        );
        console.log("Analysis data:", response.data.data);
        debugger;
        setAnalysisData(response.data.data);
      } catch (error) {
        console.error("Error fetching analysis data:", error);
        debugger;

        if (error.response?.status === 404) {
          router.push("/not-found");
        } else {
          router.push("/");
        }
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchAnalysisData();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !analysisData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Failed to load analysis data</p>
          <Link
            href="/dashboard"
            className="text-primary hover:underline mt-2 inline-block"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const FileIcon = getFileIcon(analysisData.file?.name);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-semibold">Interview Analysis</h1>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="flex gap-4 min-w-1/2 max-w-2xl">
            <div className="flex-1 space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                {/* File Upload */}
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                    <a href={analysisData.attachment?.secure} target="_blank" rel="noopener noreferrer" className="p-2 bg-muted/20 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                        <FileIcon className="w-6 h-6 text-primary" />
                    </a>
                    <div className="flex-1">
                        <div className="font-medium text-sm">
                            {analysisData.attachment?.name}.{analysisData.attachment?.format}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {analysisData.attachment?.format} •{" "}
                            {analysisData.attachment?.bytes
                                ? `${(analysisData.attachment.bytes / (1024 * 1024)).toFixed(2)} MB`
                                : ""}
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">You are a:</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          analysisData.chat.userType === "candidate"
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {analysisData.chat.userType === "candidate" && (
                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                        )}
                      </div>
                      <span className="text-sm">Candidate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          analysisData.chat.userType === "recruiter"
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {analysisData.chat.userType === "recruiter" && (
                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                        )}
                      </div>
                      <span className="text-sm">Recruiter</span>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                {analysisData.chat.additionalInfo ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Additional Information:
                    </label>
                    <div className="p-3 bg-background rounded-lg border text-sm">
                      {analysisData.chat.additionalInfo}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Response */}
        <div className="flex justify-start">
          <div className="flex gap-4 max-w-2xl">
                        <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-cyan-50 dark:from-purple-950/20 dark:to-cyan-950/20 rounded-lg p-4 border space-y-6">
                {/* Overall Score */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">
                      Overall Interview Score
                    </h3>
                    <div className="text-2xl font-bold text-primary">
                      {analysisData.chat.result?.overallRating}/10
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${analysisData.chat.result?.overallRating * 10}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Strengths and Improvements */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {analysisData.chat.result?.strengths.map(
                        (strength, index) => (
                          <li
                            key={index}
                            className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2"
                          >
                            <span className="text-green-500 mt-1">•</span>
                            {strength}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                    <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {analysisData.chat.result?.improvements.map(
                        (improvement, index) => (
                          <li
                            key={index}
                            className="text-sm text-orange-700 dark:text-orange-300 flex items-start gap-2"
                          >
                            <span className="text-orange-500 mt-1">•</span>
                            {improvement}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Detailed Feedback */}
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <h3 className="font-semibold mb-3">Detailed Feedback</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {analysisData.chat.result?.detailedFeedback}
                  </p>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {analysisData.chat.result?.recommendations.map(
                      (recommendation, index) => (
                        <li
                          key={index}
                          className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2"
                        >
                          <span className="text-blue-500 mt-1">•</span>
                          {recommendation}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalysisPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <AnalysisContent params={params} />
    </Suspense>
  );
}
