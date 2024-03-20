import type { SVGProps } from "react";
const SvgHamburgerLight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.5 10H17.5M2.5 5H17.5M2.5 15H17.5"
      stroke="#0D0E0F"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SvgHamburgerLight;
