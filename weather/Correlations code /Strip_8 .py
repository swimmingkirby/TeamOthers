# We'll use your 'cleaned_yield_data.xlsx' as the original yield file (since it has 'strip').
# Use 'Merged_Yearly_Data' from the climate file for weather values.

# Load yield data with strip info
yield_path = "/mnt/data/cleaned_yield_data.xlsx"
yield_df = pd.read_excel(yield_path)

# Load climate data (weather per year)
climate_path = "/mnt/data/4a6895ae-920d-4b6f-9f93-2c7eb685a732.xlsx"
climate_df = pd.read_excel(climate_path, sheet_name='Merged_Yearly_Data')

# 1. Filter for strip 8 only
yield_8 = yield_df[yield_df['strip'] == 8].copy()
# Remove non-numeric values in 'grain' and 'straw' columns if any
yield_8['grain'] = pd.to_numeric(yield_8['grain'], errors='coerce')
yield_8['straw'] = pd.to_numeric(yield_8['straw'], errors='coerce')

# 2. Group by year (mean per year for strip 8)
yearly_8 = yield_8.groupby('harvest_year')[['grain', 'straw']].mean().reset_index()

# 3. Merge with climate data (match year)
merged_8 = pd.merge(yearly_8, climate_df[['Harvest.Year', 'Total.Rainfall.Sum', 'Mean.Temp.Sum', 'Period']], 
                    left_on='harvest_year', right_on='Harvest.Year', how='inner')

# 4. Filter for the two periods
period1 = merged_8[merged_8['Period'] == '1990–2000']
period2 = merged_8[merged_8['Period'] == '2010–2020']
combined_8 = pd.concat([period1, period2])

# 5. Plot
fig, axs = plt.subplots(1, 4, figsize=(18, 5))

sns.boxplot(data=combined_8, x='Period', y='grain', ax=axs[0])
axs[0].set_title('Grain Yield (Strip 8)')

sns.boxplot(data=combined_8, x='Period', y='straw', ax=axs[1])
axs[1].set_title('Straw Yield (Strip 8)')

sns.boxplot(data=combined_8, x='Period', y='Total.Rainfall.Sum', ax=axs[2])
axs[2].set_title('Summer Rainfall (Strip 8)')

sns.boxplot(data=combined_8, x='Period', y='Mean.Temp.Sum', ax=axs[3])
axs[3].set_title('Summer Temperature (Strip 8)')

plt.suptitle('1990–2000 vs 2010–2020: Strip 8 Only', fontsize=18)
plt.tight_layout(rect=[0, 0.03, 1, 0.95])
plt.show()

# Strip 8 only # 
# Merge with yearly insect data (3 species) # 
# Calculate and plot the correlation matrix between grain, straw, and all 3 insects # 

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

#  1. LOAD DATA 
yield_df = pd.read_excel("cleaned_yield_data.xlsx")
insects_1990_2000 = pd.read_csv("RISdata_1990_2000_yearly.csv")
insects_2010_2020 = pd.read_csv("RISdata_2010_2020_yearly.csv")

#  2. FILTER TO STRIP 8 ONLY 
yield_df['grain'] = pd.to_numeric(yield_df['grain'], errors='coerce')
yield_df['straw'] = pd.to_numeric(yield_df['straw'], errors='coerce')
yield8 = yield_df[yield_df['strip'] == 8].copy()

#  3. AGGREGATE TO YEARLY MEAN FOR STRIP 8 
yield8_yearly = yield8.groupby('harvest_year')[['grain', 'straw']].mean().reset_index()

# 4. PIVOT INSECT DATA TO GET COLUMNS FOR EACH SPECIES 
insect_pivot_90s = insects_1990_2000.pivot_table(
    index='Year', columns='Insect', values='Total', aggfunc='sum'
).reset_index()
insect_pivot_10s = insects_2010_2020.pivot_table(
    index='Year', columns='Insect', values='Total', aggfunc='sum'
).reset_index()

#  5. MERGE YIELD AND INSECT DATA FOR EACH PERIOD 
merged_90s = pd.merge(
    yield8_yearly, insect_pivot_90s, left_on='harvest_year', right_on='Year', how='inner'
)
merged_10s = pd.merge(
    yield8_yearly, insect_pivot_10s, left_on='harvest_year', right_on='Year', how='inner'
)

#  6. CALCULATE CORRELATION MATRICES 
cols = ['grain', 'straw', 'Metopolophium dirhodum', 'Rhopalosiphum padi', 'Sitobion avenae']
corr_90s = merged_90s[cols].corr()
corr_10s = merged_10s[cols].corr()

#  7. PLOT HEATMAPS 
fig, axs = plt.subplots(1, 2, figsize=(16, 6))

sns.heatmap(corr_90s, annot=True, cmap='coolwarm', fmt=".2f", ax=axs[0])
axs[0].set_title("Correlation Matrix (Strip 8 Only)\n1990–2000")
axs[0].set_xlabel("Variables (1990–2000)")
axs[0].set_ylabel("Variables (1990–2000)")

sns.heatmap(corr_10s, annot=True, cmap='coolwarm', fmt=".2f", ax=axs[1])
axs[1].set_title("Correlation Matrix (Strip 8 Only)\n2010–2020")
axs[1].set_xlabel("Variables (2010–2020)")
axs[1].set_ylabel("Variables (2010–2020)")

plt.tight_layout()
plt.show()


import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# (Assume previous code: data loading, strip 8 filtering, pivoting, and merging as above)

#  Now, get each period separately
cols = ['grain', 'straw', 'Metopolophium dirhodum', 'Rhopalosiphum padi', 'Sitobion avenae']

corr_90s = merged_90s[cols].corr()
corr_10s = merged_10s[cols].corr()

fig, axs = plt.subplots(1, 2, figsize=(16, 6))

sns.heatmap(corr_90s, annot=True, cmap='coolwarm', fmt=".2f", ax=axs[0])
axs[0].set_title("Correlation (Strip 8 Only)\n1990–2000")
axs[0].set_xlabel("Variables")
axs[0].set_ylabel("Variables")

sns.heatmap(corr_10s, annot=True, cmap='coolwarm', fmt=".2f", ax=axs[1])
axs[1].set_title("Correlation (Strip 8 Only)\n2010–2020")
axs[1].set_xlabel("Variables")
axs[1].set_ylabel("Variables")

plt.tight_layout()
plt.show()

