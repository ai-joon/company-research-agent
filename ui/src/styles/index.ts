export const colorAnimation = `
@keyframes colorTransition {
  0% { stroke: #468BFF; }
  15% { stroke: #8FBCFA; }
  30% { stroke: #468BFF; }
  45% { stroke: #FE363B; }
  60% { stroke: #FF9A9D; }
  75% { stroke: #FDBB11; }
  90% { stroke: #F6D785; }
  100% { stroke: #468BFF; }
}

.animate-colors {
  animation: colorTransition 8s ease-in-out infinite;
  animation-fill-mode: forwards;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Add transition for smoother color changes */
.loader-icon {
  transition: stroke 1s ease-in-out;
}
`;

export const dmSansStyle = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
  
  /* Apply DM Sans globally */
  body {
    font-family: 'DM Sans', sans-serif;
  }
`;

export const glassStyle = {
  base: "backdrop-filter backdrop-blur-lg bg-white/80 border border-gray-200 shadow-xl",
  card: "backdrop-filter backdrop-blur-lg bg-white/80 border border-gray-200 shadow-xl rounded-2xl p-6",
  input: "backdrop-filter backdrop-blur-lg bg-white/80 border border-gray-200 shadow-xl pl-10 w-full rounded-lg py-3 px-4 text-gray-900 focus:border-[#468BFF]/50 focus:outline-none focus:ring-1 focus:ring-[#468BFF]/50 placeholder-gray-400 bg-white/80 shadow-none"
};

export const fadeInAnimation = {
  fadeIn: "transition-all duration-300 ease-in-out",
  writing: "animate-pulse",
  colorTransition: colorAnimation
}; 