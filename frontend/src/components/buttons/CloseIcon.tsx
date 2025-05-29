import { useState } from "react";
import React from "react";

export default function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  // prettier-ignore
  const [currentVariant, setCurrentVariant] = useState<'normal' | 'hover' | 'click'> ('normal');
  let fillOpacity;
  let strokeWidth;
  let svgHeight = 22;
  let viewBoxValue = "0 0 23 22";

  switch (currentVariant) {
    case "normal":
      fillOpacity = 0.5;
      strokeWidth = 1;
      break;
    case "hover":
      fillOpacity = 1;
      strokeWidth = 1;
      break;
    case "click":
      fillOpacity = 1;
      strokeWidth = 1.5;
      svgHeight = 23;
      viewBoxValue = "0 0 23 23";
      break;

    default:
      fillOpacity = 0.5;
      strokeWidth = 1;
      break;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBoxValue}
      width={props.width || 23}
      height={props.height || svgHeight}
      fill="none"
      onMouseEnter={() => setCurrentVariant("hover")}
      onMouseLeave={() => setCurrentVariant("normal")}
      onMouseDown={() => setCurrentVariant("click")}
      onMouseUp={() => setCurrentVariant("hover")}
      {...props}
    >
      <ellipse
        cx={11.5}
        cy={11.109}
        fill="#FC551A"
        fillOpacity={fillOpacity}
        stroke="#1A1D09"
        strokeWidth={strokeWidth}
        rx={10.5}
        ry={10.109}
        transform="rotate(-45 11.5 11.109)"
      />
      <path
        fill="#1A1D09"
        fillRule="evenodd"
        d="m11.513 11.83 2.697 2.696.707-.707-2.697-2.697 2.829-2.828-.707-.708-2.829 2.829L8.79 7.692l-.707.707 2.723 2.723-2.828 2.828.707.708z"
        clipRule="evenodd"
      />
    </svg>
  );
}
