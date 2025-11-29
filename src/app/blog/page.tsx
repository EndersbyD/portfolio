"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  DocumentTextIcon,
  CalendarIcon,
  ArrowLeftIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  fileName: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check");
      const data = await response.json();
      setIsAdmin(data.isAdmin);
    } catch (error) {
      setIsAdmin(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateContent = (html: string, maxLength: number = 150) => {
    const text = html.replace(/<[^>]*>/g, "");
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors mb-4"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Portfolio
            </Link>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Blog
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
              Thoughts, insights, and technical articles
            </p>
          </div>
          {!checkingAuth && isAdmin && (
            <a
              href="/admin"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Admin Portal
            </a>
          )}
        </div>


        {/* Blog Posts */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-300">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-16 w-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-2">
              No blog posts yet
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              Upload a Word document to create your first post
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {truncateContent(post.content)}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

