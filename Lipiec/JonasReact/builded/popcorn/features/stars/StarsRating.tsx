import { useState } from "react";
import { FullStar } from "./FullStar";
import { EmptyStar } from "./EmptyStar";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

type StarsRatingProps = {
  maxRating?: number;
  color?: string;
  size?: number;
  onSetRating?: (rating: number) => void;
};

export const StarsRating = ({
  maxRating = 10,
  color = "#fcc419",
  size = 48,
  onSetRating,
}: StarsRatingProps) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span
            style={starStyle}
            onClick={() => {
              setRating(i + 1);
              onSetRating?.(i + 1);
            }}
            onMouseEnter={() => setTempRating(i + 1)}
            onMouseLeave={() => setTempRating(0)}
          >
            {tempRating >= i + 1 || rating >= i + 1 ? (
              <FullStar color={color} />
            ) : (
              <EmptyStar color={color} />
            )}
          </span>
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
};
