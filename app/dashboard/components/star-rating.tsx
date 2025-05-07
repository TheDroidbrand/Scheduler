import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
}

export function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, i) => {
        const starValue = i + 1
        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              starValue <= rating
                ? "fill-yellow-400 text-yellow-400"
                : starValue <= rating + 0.5
                  ? "fill-yellow-400 text-yellow-400" // For half stars, we could use a more complex solution
                  : "text-gray-300"
            }`}
          />
        )
      })}
    </div>
  )
}
