/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Reading {
  id: string;
  value: number;
  unit: string;
  timestamp: string;
  timeLabel: string; // e.g., "Today, 10:45 AM"
  mealContext: 'Fasting' | 'After Dinner' | 'Post-Snack' | 'Pre-Meal' | 'General';
  status: 'In Range' | 'High' | 'Low';
  type: 'glucose' | 'insulin' | 'hba1c';
}

export interface Meal {
  id: string;
  name: string;
  chef: string;
  price: number;
  calories: string;
  protein: string;
  fiber: string;
  glycemicRating: 'Green' | 'Amber' | 'Red';
  isNepaliSpecialty?: boolean;
  imageAlt: string;
  imageUrl: string;
  description: string;
}

export interface Task {
  id: string;
  title: string;
  timeStr?: string;
  completed: boolean;
  hasInfo?: boolean;
  infoTitle?: string;
  infoDetail?: string;
}

export interface Connection {
  id: string;
  name: string;
  type: 'clinic' | 'family';
  lastSync: string;
  active: boolean;
  summaryOnly?: boolean;
}

export interface Plugin {
  id: string;
  name: string;
  provider: string;
  priceTag: string;
  imageUrl: string;
  imageAlt: string;
  isTrending?: boolean;
  category: 'clinics' | 'coaches' | 'devices' | 'nutrition';
}

export type ActiveScreen = 
  | 'onboarding'
  | 'blood-sugar-trends' 
  | 'cgm-setup' 
  | 'home-dashboard' 
  | 'privacy' 
  | 'prescriptions' 
  | 'doctor-profile' 
  | 'camera' 
  | 'ai-food-sheet' 
  | 'ai-lab-sheet' 
  | 'marketplace' 
  | 'foodmandu-detail';
