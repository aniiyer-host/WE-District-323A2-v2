# Database Seed Script

## Purpose
Pre-populates MongoDB with all club credentials and admin users for easy testing.

## What It Creates

### Admin Users (2)
- **Username**: `admin` | **Password**: `admin123`
- **Username**: `admin2` | **Password**: `admin123`

### Club Users (15) - All have password: `club123`
- `anushakti_royals` → anushakti-royals
- `belapur_club` → belapur
- `chembur_club` → chembur
- `chembur_galaxy` → chembur-galaxy
- `dronagiri_club` → dronagiri
- `girls_in_pearls` → girls-in-pearls
- `new_panvel_steel_town` → new-panvel-steel-town
- `shining_star` → shining-star
- `thane_angels` → thane-angels
- `thane_lake_city` → thane-lake-city
- `thane_stars_city` → thane-stars-city
- `uran_club` → uran
- `vasant_vihar` → vasant-vihar
- `vashi_navi_mumbai` → vashi-navi-mumbai
- `vile_parle` → vile-parle

### Club Documents (15)
Creates basic club records with placeholder data that can be edited later.

## How to Run

```bash
cd Backend
node seed.js
```

## ⚠️ Warning
This script **clears all existing users and clubs** before seeding. Comment out the `deleteMany()` lines if you want to keep existing data.

## After Seeding
You can immediately:
1. Login to frontend with any club credentials
2. Test admin dashboard with admin credentials
3. Edit club data through the dashboards
