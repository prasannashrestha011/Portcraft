import { ResumeFormValues } from "@/app/types/resumeType";
import { Github, Linkedin, Mail, MapPin, Phone, User } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";

const Personal_info = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResumeFormValues>();
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-gray-700">
        <User className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-semibold text-gray-100">
          Personal Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            {...register("personalInfo.name", {
              required: "Name is required",
            })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            placeholder="e.g., Prasanna Shrestha"
          />
          {errors.personalInfo?.name && (
            <p className="text-red-400 text-sm mt-1">
              {errors.personalInfo.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Job Title *
          </label>
          <input
            {...register("personalInfo.jobTitle", {
              required: "Job title is required",
            })}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            placeholder="e.g., Senior Full-Stack Engineer"
          />
          {errors.personalInfo?.jobTitle && (
            <p className="text-red-400 text-sm mt-1">
              {errors.personalInfo.jobTitle.message}
            </p>
          )}
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            {...register("personalInfo.phone", {
              required: "Phone is required",
            })}
            className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            placeholder="+977-98XXXXXXX"
          />
          {errors.personalInfo?.phone && (
            <p className="text-red-400 text-sm mt-1">
              {errors.personalInfo.phone.message}
            </p>
          )}
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            {...register("personalInfo.email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            placeholder="prasanna@email.com"
          />
          {errors.personalInfo?.email && (
            <p className="text-red-400 text-sm mt-1">
              {errors.personalInfo.email.message}
            </p>
          )}
        </div>

        <div className="relative">
          <Linkedin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            {...register("personalInfo.linkedin")}
            className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            placeholder="linkedin.com/in/prasanna"
          />
        </div>

        <div className="relative">
          <Github className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            {...register("personalInfo.github")}
            className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            placeholder="github.com/prasanna"
          />
        </div>

        <div className="relative md:col-span-2">
          <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            {...register("personalInfo.location")}
            className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            placeholder="Kathmandu, Nepal"
          />
        </div>
      </div>
    </section>
  );
};

export default Personal_info;
