import { format } from "date-fns";

const categoryColors = {
  placement: "bg-green-100 text-green-800",
  examination: "bg-blue-100 text-blue-800",
  scholarship: "bg-yellow-100 text-yellow-800",
  admin: "bg-purple-100 text-purple-800",
  other: "bg-gray-100 text-gray-800",
};

// Subtle pastel colors for priority dot
const priorityColors = {
  high: "bg-red-500",
  medium: "bg-orange-500",
  low: "bg-blue-500",
};

const EmailCard = ({ email }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 cursor-pointer rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 p-5 mb-4 bg-white transition-all duration-200 relative"
    >
      {/* Left: priority dot + From + Summary */}
      <div className="flex flex-col sm:flex-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${priorityColors[email.priority] || "bg-gray-200"}`}
            title={`Priority: ${email.priority || "low"}`}
          />
          <span className="text-base font-semibold text-neutral-900 truncate">
            {email.from}
          </span>
        </div>

        <span className="text-sm text-neutral-500 mt-1 line-clamp-2">
          <span className="font-semibold">Summary:</span> {email.summary}
        </span>
      </div>

      {/* Right: Date + Category */}
      <div className="flex flex-row sm:flex-col sm:items-end justify-between gap-2 sm:gap-1 mt-2 sm:mt-0">
        <span className="text-sm text-neutral-500 whitespace-nowrap">
          {format(new Date(email.date), "MMM d, yyyy HH:mm")}
        </span>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-full whitespace-nowrap ${
            categoryColors[email.category] || "bg-gray-100 text-gray-800"
          }`}
        >
          {email.category}
        </span>
      </div>
    </div>
  );
};

export default EmailCard;
