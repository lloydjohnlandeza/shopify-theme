/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        'my-orange': 'hsl(26, 100%, 55%)',
        'my-pale-orange': 'hsl(25, 100%, 94%)',
        'my-very-dark-blue': 'hsl(220, 13%, 13%)',
        'my-dark-grayish-blue': 'hsl(219, 9%, 45%)',
        'my-grayish-blue': 'hsl(220, 14%, 75%)',
        'my-light-grayish-blue': 'hsl(223, 64%, 98%)',
        'my-white': 'hsl(0, 0%, 100%)',
        'my-black': 'hsl(0, 0%, 0%)'
      },
      fontFamily: {
        'kumbh-sans': "'kumbh-sans'",
      },
    },
  },
  plugins: [],
  content: ["./**/*.liquid"],
}

