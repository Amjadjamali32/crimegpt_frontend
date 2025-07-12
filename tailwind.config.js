/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'custom-teal': '#173F5C',
        'custom-gray': '#C0C0C0',
      }
    },
  },
  safelist: [
    // Your custom colors
    'bg-custom-teal',
    'text-custom-teal',
    'border-custom-teal',
    'bg-custom-gray',
    'text-custom-gray',
    
    // Padding classes
    'p-4', 'p-6', 'p-8',
    'px-4', 'px-6', 'px-8',
    'py-4', 'py-6', 'py-8',
    'pt-24', 'pb-8',
    'pl-0', 'md:pl-64', 'lg:pl-64',
    'pr-6',
    
    // Margin classes
    'mb-8', 'mt-6',
    
    // Rounded classes
    'rounded-md', 'rounded-lg', 'rounded-full',
    
    // Space classes
    'space-y-6',
    
    // Width/Height classes
    'w-full', 'w-[95%]', 'min-h-screen',
    'max-w-4xl',
    
    // Shadow classes
    'shadow-md', 'shadow-lg', 'shadow-sm',
    
    // Font classes
    'font-inter', 'font-poppins',
    
    // Flex/grid classes
    'flex', 'flex-col', 'flex-row', 'items-center', 'justify-center',
    'grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-2', 'gap-4', 'sm:gap-6',
    
    // Other utility classes
    'relative', 'absolute', 'block', 'hidden', 'overflow-hidden'
  ],
  plugins: [],
}