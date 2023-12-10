export const shimmerAnimation = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .shimmer {
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: shimmer;
    animation-timing-function: linear;
    background: linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%);
    background-size: 800px 104px;
    position: relative;
  }
`;

export const getOrderListClasses = ({ isOpen }) => {
  const baseClasses = "transition-opacity duration-500 ease-in-out";
  if (isOpen) {
    return `${baseClasses} opacity-100 visible`;
  } else {
    return `${baseClasses} opacity-0 invisible`;
  }
};
