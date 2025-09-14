import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# load, clean, remove strip 8, calculate summaries/correlations, plot both the full and “strip 8 removed” results for Grain and Straw and temperature and percipitations # 

# ==== 1. LOAD DATA ====
rain_temp_data = pd.read_excel('RMS-Seas-Temp-Rain-68-22.xlsx', sheet_name='ValidatedSeasonalMetData2022')
yield_df = pd.read_csv('yield_data.csv')

# ==== 2. DATA CLEANING ====
yield_df['grain'] = pd.to_numeric(yield_df['grain'], errors='coerce')
yield_df['straw'] = pd.to_numeric(yield_df['straw'], errors='coerce')

# ==== 3. ALL DATA: AGGREGATE, MERGE, PERIODS ====
yield_yearly = yield_df.groupby('harvest_year')[['grain', 'straw']].mean().reset_index()
merged = pd.merge(
    yield_yearly,
    rain_temp_data,
    left_on='harvest_year',
    right_on='Harvest.Year',
    how='inner'
)
period1 = merged[(merged['harvest_year'] >= 1990) & (merged['harvest_year'] <= 2000)]
period2 = merged[(merged['harvest_year'] >= 2010) & (merged['harvest_year'] <= 2020)]

period1['Period'] = '1990–2000'
period2['Period'] = '2010–2020'
combined = pd.concat([period1, period2])

# ==== 4. STRIP 8 REMOVED: AGGREGATE, MERGE, PERIODS ====
yield_df_no8 = yield_df[yield_df['strip'] != 8]
yield_yearly_no8 = yield_df_no8.groupby('harvest_year')[['grain', 'straw']].mean().reset_index()
merged_no8 = pd.merge(
    yield_yearly_no8,
    rain_temp_data,
    left_on='harvest_year',
    right_on='Harvest.Year',
    how='inner'
)
period1_no8 = merged_no8[(merged_no8['harvest_year'] >= 1990) & (merged_no8['harvest_year'] <= 2000)]
period2_no8 = merged_no8[(merged_no8['harvest_year'] >= 2010) & (merged_no8['harvest_year'] <= 2020)]

period1_no8['Period'] = '1990–2000'
period2_no8['Period'] = '2010–2020'
combined_no8 = pd.concat([period1_no8, period2_no8])

# ==== 5. PLOTTING: TWO PANELS ====
fig, axs = plt.subplots(2, 4, figsize=(18, 9))

# ALL DATA
sns.boxplot(data=combined, x='Period', y='grain', ax=axs[0,0])
axs[0,0].set_title('Grain Yield\n(All Data)')
sns.boxplot(data=combined, x='Period', y='straw', ax=axs[0,1])
axs[0,1].set_title('Straw Yield\n(All Data)')
sns.boxplot(data=combined, x='Period', y='Total.Rainfall.Sum', ax=axs[0,2])
axs[0,2].set_title('Total Summer Rainfall\n(All Data)')
sns.boxplot(data=combined, x='Period', y='Mean.Temp.Sum', ax=axs[0,3])
axs[0,3].set_title('Mean Summer Temperature\n(All Data)')

# STRIP 8 REMOVED
sns.boxplot(data=combined_no8, x='Period', y='grain', ax=axs[1,0])
axs[1,0].set_title('Grain Yield\n(Strip 8 Removed)')
sns.boxplot(data=combined_no8, x='Period', y='straw', ax=axs[1,1])
axs[1,1].set_title('Straw Yield\n(Strip 8 Removed)')
sns.boxplot(data=combined_no8, x='Period', y='Total.Rainfall.Sum', ax=axs[1,2])
axs[1,2].set_title('Total Summer Rainfall\n(Strip 8 Removed)')
sns.boxplot(data=combined_no8, x='Period', y='Mean.Temp.Sum', ax=axs[1,3])
axs[1,3].set_title('Mean Summer Temperature\n(Strip 8 Removed)')

plt.suptitle('1990–2000 vs 2010–2020: All Data vs. Strip 8 Removed', fontsize=18)
plt.tight_layout(rect=[0, 0.03, 1, 0.95])
plt.show()

# Calculates correlations between grain/straw and all three insects

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from scipy.stats import zscore

# === LOAD DATA ===
rain_temp_data = pd.read_excel('RMS-Seas-Temp-Rain-68-22.xlsx', sheet_name='ValidatedSeasonalMetData2022')
yield_df = pd.read_csv('yield_data.csv')
insects_1990_2000 = pd.read_csv('RISdata_1990_2000_yearly.csv')
insects_2010_2020 = pd.read_csv('RISdata_2010_2020_yearly.csv')

# === DATA CLEANING ===
yield_df['grain'] = pd.to_numeric(yield_df['grain'], errors='coerce')
yield_df['straw'] = pd.to_numeric(yield_df['straw'], errors='coerce')

# --- All data ---
yield_yearly = yield_df.groupby('harvest_year')[['grain', 'straw']].mean().reset_index()
merged = pd.merge(yield_yearly, rain_temp_data, left_on='harvest_year', right_on='Harvest.Year', how='inner')
period1 = merged[(merged['harvest_year'] >= 1990) & (merged['harvest_year'] <= 2000)]
period2 = merged[(merged['harvest_year'] >= 2010) & (merged['harvest_year'] <= 2020)]
period1['Period'] = '1990–2000'
period2['Period'] = '2010–2020'
combined = pd.concat([period1, period2])

# --- Strip 8 removed ---
yield_df_no8 = yield_df[yield_df['strip'] != 8]
yield_yearly_no8 = yield_df_no8.groupby('harvest_year')[['grain', 'straw']].mean().reset_index()
merged_no8 = pd.merge(yield_yearly_no8, rain_temp_data, left_on='harvest_year', right_on='Harvest.Year', how='inner')
period1_no8 = merged_no8[(merged_no8['harvest_year'] >= 1990) & (merged_no8['harvest_year'] <= 2000)]
period2_no8 = merged_no8[(merged_no8['harvest_year'] >= 2010) & (merged_no8['harvest_year'] <= 2020)]
period1_no8['Period'] = '1990–2000'
period2_no8['Period'] = '2010–2020'
combined_no8 = pd.concat([period1_no8, period2_no8])

# === 8-PANEL BOXPLOT ===
fig, axs = plt.subplots(2, 4, figsize=(18, 9))
# All data
sns.boxplot(data=combined, x='Period', y='grain', ax=axs[0,0]); axs[0,0].set_title('Grain Yield\n(All Data)')
sns.boxplot(data=combined, x='Period', y='straw', ax=axs[0,1]); axs[0,1].set_title('Straw Yield\n(All Data)')
sns.boxplot(data=combined, x='Period', y='Total.Rainfall.Sum', ax=axs[0,2]); axs[0,2].set_title('Total Summer Rainfall\n(All Data)')
sns.boxplot(data=combined, x='Period', y='Mean.Temp.Sum',

#bar chart of yearly aphid abundance (with three species, one plot, all years)
import pandas as pd
import matplotlib.pyplot as plt

# === LOAD DATA ===
insects_1990_2000 = pd.read_csv('RISdata_1990_2000_yearly.csv')
insects_2010_2020 = pd.read_csv('RISdata_2010_2020_yearly.csv')

# === PIVOT TO SPECIES COLUMNS ===
def tidy_insect_table(df):
    pivot = df.pivot_table(
        index='Year', columns='Insect', values='Total', aggfunc='sum'
    ).reset_index()
    # Make sure columns are in correct order and fill NAs with 0
    for sp in ["Metopolophium dirhodum", "Rhopalosiphum padi", "Sitobion avenae"]:
        if sp not in pivot.columns:
            pivot[sp] = 0
    pivot = pivot[['Year', "Metopolophium dirhodum", "Rhopalosiphum padi", "Sitobion avenae"]]
    return pivot

tidy_90_00 = tidy_insect_table(insects_1990_2000)
tidy_10_20 = tidy_insect_table(insects_2010_2020)

# === COMBINE ALL YEARS ===
all_years = pd.concat([tidy_90_00, tidy_10_20], ignore_index=True)
all_years = all_years.sort_values('Year').reset_index(drop=True)
all_years = all_years.set_index('Year')

# === BAR CHART ===
species_color = {
    "Metopolophium dirhodum": "tab:blue",
    "Rhopalosiphum padi": "tab:green",
    "Sitobion avenae": "tab:purple"
}
ax = all_years.plot(
    kind="bar",
    figsize=(15, 6),
    width=0.85,
    color=[species_color[s] for s in all_years.columns]
)
ax.set_title("Yearly Abundance of Aphid Species (1990–2020)")
ax.set_ylabel("Aphid Count")
ax.set_xlabel("Year")
ax.set_xticklabels(all_years.index, rotation=45)
ax.legend([
    "Metopolophium dirhodum (Rose-grain aphid)",
    "Rhopalosiphum padi (Bird cherry-oat aphid)",
    "Sitobion avenae (English grain aphid)"
])
plt.tight_layout()
plt.show()
