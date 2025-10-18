"use client";
export default function Pagination({
  totalPages = 5,
  currentPage,
  onPageChange,
}: {
  totalPages?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4 py-10 ">
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const isActive = currentPage === page;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              transition-all duration-300
              ${isActive
                ? "w-16 h-5 rounded-full bg-gray-200"
                : "w-5 h-5 rounded-full border-2 border-gray-300 hover:border-gray-100"}
            `}
          />
        );
      })}
    </div>
  );
}
