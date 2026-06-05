/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Reading, Meal, Task, Connection, Plugin } from './types';

// Images are bundled locally (downloaded from Unsplash) so the prototype is
// fully self-contained and offline — no hot-linking that can 404 mid-demo.
// Vite fingerprints these and emits them under the app's asset directory.
import curaPhlebotomy from './assets/marketplace/cura-phlebotomy.jpg';
import foodmanduSalad from './assets/marketplace/foodmandu-salad.jpg';
import metabolicYoga from './assets/marketplace/metabolic-yoga.jpg';
import cgmSensor from './assets/marketplace/cgm-sensor.jpg';
import himalayanGrains from './assets/marketplace/himalayan-grains.jpg';
import labDiagnostics from './assets/marketplace/lab-diagnostics.jpg';
import smartScale from './assets/marketplace/smart-scale.jpg';
import milletPorridge from './assets/marketplace/millet-porridge.jpg';

// Self-contained placeholder shown when a hot-linked image fails to load, so
// the demo never surfaces broken alt text. Inline SVG = no network needed.
export const imageFallback =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23ccfbf1'/%3E%3Cstop offset='1' stop-color='%2399f6e4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='400' fill='url(%23g)'/%3E%3Cg fill='none' stroke='%230d9488' stroke-width='14' stroke-linecap='round' stroke-linejoin='round' opacity='0.45'%3E%3Crect x='230' y='148' width='140' height='104' rx='14'/%3E%3Ccircle cx='268' cy='184' r='13'/%3E%3Cpath d='M242 240l44-38 32 27 26-21 32 32'/%3E%3C/g%3E%3C/svg%3E";

export const readingHistory: Reading[] = [
  {
    id: 'r1',
    value: 118,
    unit: 'mg/dL',
    timestamp: '2026-06-04T10:45:00Z',
    timeLabel: 'Today, 10:45 AM',
    mealContext: 'Fasting',
    status: 'In Range',
    type: 'glucose'
  },
  {
    id: 'r2',
    value: 145,
    unit: 'mg/dL',
    timestamp: '2026-06-03T19:30:00Z',
    timeLabel: 'Yesterday, 7:30 PM',
    mealContext: 'After Dinner',
    status: 'In Range',
    type: 'glucose'
  },
  {
    id: 'r3',
    value: 210,
    unit: 'mg/dL',
    timestamp: '2026-06-03T13:15:00Z',
    timeLabel: 'Yesterday, 1:15 PM',
    mealContext: 'Post-Snack',
    status: 'High',
    type: 'glucose'
  }
];

export const foodmanduMenu: Meal[] = [
  {
    id: 'm1',
    name: 'Buckwheat Dhido with Local Mustard Greens',
    chef: 'Foodmandu Organic Eat',
    price: 850,
    calories: '380 kcal',
    protein: '12g Protein',
    fiber: '15g Fiber',
    glycemicRating: 'Green',
    isNepaliSpecialty: true,
    imageAlt: 'Authentic Buckwheat Dhido served with organic rayo ko saag mustard greens',
    imageUrl: foodmanduSalad,
    description: 'Authentic Himalayan buckwheat mash served with spicy sautéed mountain rayo ko saag and traditional organic gundruk soup.'
  },
  {
    id: 'm2',
    name: 'Millet Porridge with Walnuts',
    chef: 'Kodo ko Khero Baker',
    price: 420,
    calories: '290 kcal',
    protein: '8g Protein',
    fiber: '9g Fiber',
    glycemicRating: 'Green',
    imageAlt: 'Millet porridge topped with roasted walnuts and mountain honey',
    imageUrl: milletPorridge,
    description: 'Warm, slow-cooked organic red millet (Kodo ko khero) porridge topped with premium hand-cracked walnuts and local cardamom honey.'
  }
];

export const clinicianChecklistTasks: Task[] = [
  {
    id: 't1',
    title: 'Morning Fasting Check',
    completed: true,
    hasInfo: true,
    infoTitle: 'Doctor Suggestion',
    infoDetail: 'Check immediately upon waking. Target: 70 - 100 mg/dL'
  },
  {
    id: 't2',
    title: 'Post-Breakfast Reading',
    completed: true,
    hasInfo: true,
    infoTitle: 'Doctor Suggestion',
    infoDetail: 'Check 2 hours after the first bite of your morning Thakali set or buckwheat pancake.'
  },
  {
    id: 't3',
    title: 'Evening Insulin Dose',
    timeStr: '18:00',
    completed: false,
    hasInfo: true,
    infoTitle: 'Insulin Glargine Refill',
    infoDetail: 'Dosage prescribed: 12 units at bedtime. Sync active with your on-device insulin vault.'
  },
  {
    id: 't4',
    title: 'Daily Log Review',
    completed: false,
    hasInfo: false
  }
];

export const localConnections: Connection[] = [
  {
    id: 'c1',
    name: 'Kathmandu Endo Clinic',
    type: 'clinic',
    lastSync: 'Last sync 2m ago',
    active: true
  },
  {
    id: 'c2',
    name: 'Family (Emergency)',
    type: 'family',
    lastSync: 'Summaries only',
    active: true,
    summaryOnly: true
  }
];

export const marketplacePlugins: Plugin[] = [
  {
    id: 'p1',
    name: 'Cura Health Home Phlebotomy & HbA1c',
    provider: 'Cura Health Nepal',
    priceTag: 'Rs. 1,200 / session',
    imageUrl: curaPhlebotomy,
    imageAlt: 'Cura health professional doing blood draw at home in Kathmandu',
    isTrending: true,
    category: 'clinics'
  },
  {
    id: 'p2',
    name: 'Foodmandu Diabetes-Safe Lunch Plan',
    provider: 'Foodmandu',
    priceTag: 'Rs. 5,500 / month',
    imageUrl: foodmanduSalad,
    imageAlt: 'Foodmandu healthy low-glycemic medical menu subscription package',
    isTrending: true,
    category: 'nutrition'
  },
  {
    id: 'p3',
    name: 'Metabolic Yoga & Kundalini Breathing',
    provider: 'Aarogyam Yoga Pathshala',
    priceTag: 'Rs. 4,000 / month',
    imageUrl: metabolicYoga,
    imageAlt: 'Traditional yoga session with breathing exercises in Kathmandu',
    category: 'coaches'
  },
  {
    id: 'p4',
    name: 'Siddhartha 14-Day CGM Sensor Pack',
    provider: 'Siddhartha Medical Devices',
    priceTag: 'Rs. 9,400',
    imageUrl: cgmSensor,
    imageAlt: 'Wearable health tracking continuous glucose monitor sensor device',
    category: 'devices'
  },
  {
    id: 'p5',
    name: 'Organic Phapar & Kodo Flour Bundle (5kg)',
    provider: 'Mustang Agro-Foods',
    priceTag: 'Rs. 1,600',
    imageUrl: himalayanGrains,
    imageAlt: 'Himalayan organic grains and high altitude buckwheat',
    category: 'nutrition'
  },
  {
    id: 'p6',
    name: 'Kanti Endocrinology Diagnostic Suite',
    provider: 'Kanti Health Labs, Lalitpur',
    priceTag: 'Rs. 3,500 / panel',
    imageUrl: labDiagnostics,
    imageAlt: 'Medical lab diagnostics equipment suite',
    category: 'clinics'
  },
  {
    id: 'p7',
    name: 'Bajra Phapar-ko-Roti Daily Morning Delivery',
    provider: 'Bajra Bakery, Patan',
    priceTag: 'Rs. 350 / day',
    imageUrl: himalayanGrains,
    imageAlt: 'Fresh high fiber buckwheat flatbread breakfast delivered to home',
    category: 'nutrition'
  },
  {
    id: 'p8',
    name: 'Nepal Diabetic-Care Smart Scale',
    provider: 'Siddhartha Medical Devices',
    priceTag: 'Rs. 4,800',
    imageUrl: smartScale,
    imageAlt: 'Clinically calibrated body mass smart scale with Bluetooth connection',
    category: 'devices'
  }
];
