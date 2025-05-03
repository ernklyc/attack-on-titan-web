/**
 * Type definitions for Attack on Titan characters and related data
 */

/**
 * Character interface representing the structure of character data from the API
 */
export interface Character {
  id: number;
  name: string;
  img: string;
  alias: string[];
  species: string[];
  gender: string;
  age: number | null;
  height: string | null;
  relatives: { family: string; members: string[] }[];
  birthplace: string | null;
  residence: string | null;
  status: string;
  occupation: string | null;
  groups: { name: string; sub_groups: string[] }[];
  roles: string[];
  episodes: string[];
}

/**
 * API response structure for paginated character data
 */
export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next_page: string | null;
    prev_page: string | null;
  };
  results: Character[];
}

/**
 * Filter parameters for character search and filtering
 */
export interface FilterParams {
  name?: string;
  status?: string;
  gender?: string;
  occupation?: string;
  page?: number;
}

/**
 * Animation variants for framer-motion
 */
export const animationVariants = {
  pageInitial: { opacity: 0 },
  pageAnimate: { opacity: 1 },
  pageExit: { opacity: 0 },
  
  cardInitial: { opacity: 0, y: 20 },
  cardAnimate: { opacity: 1, y: 0 },
  cardExit: { opacity: 0, y: -10 },
  
  fadeIn: { opacity: 0, y: 10 },
  fadeInVisible: { opacity: 1, y: 0 },
  
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
};