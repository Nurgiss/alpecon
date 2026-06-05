import imgPektin from '@/assets/pektin.jpg';
import imgFoodStorage from '@/assets/foodstorage.jpg';
import img4Storage from '@/assets/4 - storage.jpeg';
import img3 from '@/assets/3.jpg';
import imgDirector from '@/assets/IMG_0129.JPG';
import imgBau from '@/assets/Bau.jpeg';
import imgEgor from '@/assets/Egor.jpeg';
import imgErzhan from '@/assets/8 - Erzhan.jpeg';
import imgJuice from '@/assets/juice.jpeg';
import imgStorage from '@/assets/dd7ee0f9f3ea990275005640e6558c573eccfaa0.png';
import type { BlockType } from '@/types/blocks';

export const DIRECTION_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1651525670099-f828fb5478a5?w=800&auto=format&fit=crop',
  imgPektin,
  'https://images.unsplash.com/photo-1689650552915-d547c24fe85e?w=800&auto=format&fit=crop',
  imgFoodStorage,
  img4Storage,
  img3,
];

export const TEAM_FALLBACK_IMAGES = [imgDirector, imgBau, imgEgor, imgErzhan];

export const PROJECT_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1651525670054-279c154bc3b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  imgPektin,
  imgJuice,
  imgStorage,
  img3,
];

export function getBlockFallbackImage(type: BlockType, index: number): string {
  const lists = {
    direction: DIRECTION_FALLBACK_IMAGES,
    team: TEAM_FALLBACK_IMAGES,
    project: PROJECT_FALLBACK_IMAGES,
  };
  const list = lists[type];
  return list[index % list.length];
}

export function resolveBlockImage(type: BlockType, image: string, index: number): string {
  return image || getBlockFallbackImage(type, index);
}
