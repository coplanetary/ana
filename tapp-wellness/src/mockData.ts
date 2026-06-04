/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Reading, Meal, Task, Connection, Plugin } from './types';

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
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600', // Beautiful salad/food image as hotlink placeholder
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
    imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=600', // Grain porridge oatmeal placeholder
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
    imageUrl: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Cura health professional doing blood draw at home in Kathmandu',
    isTrending: true,
    category: 'clinics'
  },
  {
    id: 'p2',
    name: 'Foodmandu Diabetes-Safe Lunch Plan',
    provider: 'Foodmandu',
    priceTag: 'Rs. 5,500 / month',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Foodmandu healthy low-glycemic medical menu subscription package',
    isTrending: true,
    category: 'nutrition'
  },
  {
    id: 'p3',
    name: 'Metabolic Yoga & Kundalini Breathing',
    provider: 'Aarogyam Yoga Pathshala',
    priceTag: 'Rs. 4,000 / month',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Traditional yoga session with breathing exercises in Kathmandu',
    category: 'coaches'
  },
  {
    id: 'p4',
    name: 'Siddhartha 14-Day CGM Sensor Pack',
    provider: 'Siddhartha Medical Devices',
    priceTag: 'Rs. 9,400',
    imageUrl: 'https://images.unsplash.com/photo-1510017808632-95f08e030633?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Wearable health tracking continuous glucose monitor sensor device',
    category: 'devices'
  },
  {
    id: 'p5',
    name: 'Organic Phapar & Kodo Flour Bundle (5kg)',
    provider: 'Mustang Agro-Foods',
    priceTag: 'Rs. 1,600',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Himalayan organic grains and high altitude buckwheat',
    category: 'nutrition'
  },
  {
    id: 'p6',
    name: 'Kanti Endocrinology Diagnostic Suite',
    provider: 'Kanti Health Labs, Lalitpur',
    priceTag: 'Rs. 3,500 / panel',
    imageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Medical lab diagnostics equipment suite',
    category: 'clinics'
  },
  {
    id: 'p7',
    name: 'Bajra Phapar-ko-Roti Daily Morning Delivery',
    provider: 'Bajra Bakery, Patan',
    priceTag: 'Rs. 350 / day',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Fresh high fiber buckwheat flatbread breakfast delivered to home',
    category: 'nutrition'
  },
  {
    id: 'p8',
    name: 'Nepal Diabetic-Care Smart Scale',
    provider: 'Siddhartha Medical Devices',
    priceTag: 'Rs. 4,800',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
    imageAlt: 'Clinically calibrated body mass smart scale with Bluetooth connection',
    category: 'devices'
  }
];
