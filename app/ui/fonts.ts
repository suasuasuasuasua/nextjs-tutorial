import { Inter, Lusitana } from 'next/font/google';

// We can import some font using the next/font API from google
// for example, we can grab a subset of the font we'd like to load
export const inter = Inter({
  subsets: ["latin"]
});

export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: "700"
})
