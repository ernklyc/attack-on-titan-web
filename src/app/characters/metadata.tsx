import { Metadata } from 'next';
import { textContent } from '@/data/textContent'; // Import textContent

export const metadata: Metadata = {
  title: textContent.charactersPage.metadata.title, // Use textContent
  description: textContent.charactersPage.metadata.description, // Use textContent
  keywords: textContent.charactersPage.metadata.keywords, // Use textContent
  openGraph: {
    title: textContent.charactersPage.metadata.openGraph.title, // Use textContent
    description: textContent.charactersPage.metadata.openGraph.description, // Use textContent
    images: textContent.charactersPage.metadata.openGraph.images, // Use textContent
  },
};