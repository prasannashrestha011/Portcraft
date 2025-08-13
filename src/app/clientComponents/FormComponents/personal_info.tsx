"use client";
import { FormType } from "@/app/types/formType";
import React from "react";
import { useFormContext } from "react-hook-form";

const Personal_Info = () => {
  const { register } = useFormContext<FormType>();

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            {...register("name")}
            type="text"
            placeholder="Full Name"
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Role
          </label>
          <input
            id="role"
            {...register("role")}
            type="text"
            placeholder="Role (e.g., Frontend Developer)"
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <h3 className="text-lg font-medium text-white mb-3">Social Links</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="githubURL"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            GitHub URL
          </label>
          <input
            id="githubURL"
            {...register("socialLinks.githubURL")}
            type="url"
            placeholder="GitHub URL (optional)"
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="linkedinURL"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            LinkedIn URL
          </label>
          <input
            id="linkedinURL"
            {...register("socialLinks.linkedinURL")}
            type="url"
            placeholder="LinkedIn URL (optional)"
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Personal_Info;
