import { Code } from "lucide-react";
import { useFormContext } from "react-hook-form";

const TechnicalSkills = () => {
  const { register } = useFormContext();
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-gray-700">
        <Code className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-semibold text-gray-100">
          Technical Expertise
        </h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Languages
          </label>
          <input
            {...register("skills.languages")}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            placeholder="JavaScript (ES6+), TypeScript, Go, Python, SQL, GraphQL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Frontend
          </label>
          <input
            {...register("skills.frontend")}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            placeholder="React.js, Next.js, Redux, Tailwind CSS, Material-UI, Webpack, Vite"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Backend
          </label>
          <input
            {...register("skills.backend")}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            placeholder="Node.js, Express.js, NestJS, GraphQL, REST APIs, Microservices"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Database & Cloud
          </label>
          <input
            {...register("skills.databaseCloud")}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            placeholder="PostgreSQL, MongoDB, Redis, AWS (EC2, S3, Lambda), Docker, Kubernetes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tools & Practices
          </label>
          <input
            {...register("skills.toolsPractices")}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
            placeholder="Git, Jenkins, Jest, Cypress, Agile/Scrum, TDD, Code Review"
          />
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
