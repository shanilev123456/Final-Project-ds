# Ground Vision

This project is an end-to-end solution for predicting land prices (price per square meter) for private and low-density construction tenders in Israel, based on open data from the Israel Land Authority (רמ"י) and environmental factors from OSM (OpenStreetMap).

## Table of Contents

- [Project Overview](#project-overview)
- [Data Collection](#data-collection)
- [Data Enrichment](#data-enrichment)
- [Data Cleaning & Preprocessing](#data-cleaning--preprocessing)
- [Modeling & Training](#modeling--training)
- [Evaluation](#evaluation)
- [Prediction API & Usage](#prediction-api--usage)
- 
---

## Project Overview

The goal of this project is to create an automated pipeline for collecting, enriching, and predicting land prices in Israel, with a focus on lots for private homes in government tenders.  
The pipeline includes:

- **Web scraping** of tender data from the Israel Land Authority (רמ"י) website using Selenium.
- **Geospatial enrichment** by fetching coordinates for each lot via govmap.gov.il.
- **Environmental feature extraction** (distance to kindergartens, schools, parks, etc.) using OSM.
- **Data cleaning, normalization, and one-hot/embedding encoding** for categorical features.
- **Building a deep neural network** (PyTorch) with city embedding for price prediction.
- **Evaluation and visualization** of model results.

---

## Data Collection

1. **Scraping Israel Land Authority Tenders:**  
   - Uses Selenium to automate advanced search and scrape all relevant lots (מכרזים) and attributes.
   - Extracted fields: region, city, purpose, status, area, final price, development cost, winner, date fields, etc.

2. **Geocoding Blocks:**  
   - For each unique "Block" (גוש), govmap.gov.il is queried to fetch (X, Y) coordinates.
   - Coordinates are used for further spatial enrichment.

---

## Data Enrichment

- **OSM-based Features:**  
  For each unique coordinate, environmental features are extracted using OSMNX:
  - Distance to nearest kindergarten, school, university, bus stop, train station, park, mall, supermarket, beach, and place of worship.
  - Binary indicators if such amenities exist within a specified radius.

---

## Data Cleaning & Preprocessing

- Remove invalid or missing records (e.g., no price, no area, no coordinates).
- Filter outliers (5th and 95th percentile) for price and area.
- One-hot encoding for block, committee year/month, region, etc.
- Map city names to integer indices for embedding.
- Normalize all numeric features (min-max scaling).
- Split into train/validation/test sets with stratification by city.
- Save all preprocessing mappings to JSON.

---

## Modeling & Training

- Model: Deep Multi-Layer Perceptron (MLP) in PyTorch with city embedding layer.
- **Inputs:** normalized features + city index.
- **Output:** predicted normalized price per m² (denormalized for evaluation).
- **Loss:** Huber loss.
- **Optimization:** AdamW, ReduceLROnPlateau, early stopping.
- Save best model weights for inference.

---

## Evaluation

- Metrics: MAE, MSE, R², MAPE, MedianAE, accuracy within ±10/20/30%.
- Plots: loss curves, prediction error histograms, residuals, predicted vs actual.
- Exports: Excel with all predictions and errors (including high-error samples).

---

## Prediction API & Usage

- Functions provided to normalize new inputs, map cities, and generate price predictions for any given feature set.
- Predict price for a specific lot or for new data (including city embedding).
