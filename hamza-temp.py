# Create decade labels for box plotting
df['decade'] = df['harvest_year'].apply(lambda x: '1990s' if 1990 <= x <= 2000 else '2010s')

# Create box plots comparing the two decades
import plotly.express as px
from plotly.subplots import make_subplots

# Variables to compare
variables = ['total_fertilizer_n_amount', 'CO2e_total_kg', 'grain', 'straw']
titles = ['Nitrogen Application (kg)', 'CO2 Emissions (kg)', 'Grain Yield (kg)', 'Straw Yield (kg)']

# Create subplots
fig = make_subplots(
    rows=2, cols=2,
    subplot_titles=titles,
    vertical_spacing=0.12,
    horizontal_spacing=0.12
)

# Add box plots for each variable
for i, (var, title) in enumerate(zip(variables, titles)):
    row = (i // 2) + 1
    col = (i % 2) + 1
    
    # Create box plot for each decade
    for decade in ['1990s', '2010s']:
        decade_data = df[df['decade'] == decade][var].dropna()
        fig.add_box(
            y=decade_data,
            name=f'{decade}',
            legendgroup=decade,
            showlegend=(i == 0),  # Only show legend for first subplot
            boxpoints='outliers',
            row=row, col=col
        )

# Update layout
fig.update_layout(
    title_text="Distribution Comparison: 1990s vs 2010s",
    height=600,
    showlegend=True,
    legend=dict(x=0.02, y=0.98)
)

# Update y-axis titles
fig.update_yaxes(title_text="kg", row=1, col=1)
fig.update_yaxes(title_text="kg CO2e", row=1, col=2)
fig.update_yaxes(title_text="kg", row=2, col=1)
fig.update_yaxes(title_text="kg", row=2, col=2)

# Set specific y-axis range for CO2 emissions to better show differences
co2_min = df['CO2e_total_kg'].min() * 0.98  # Add small buffer below minimum
co2_max = df['CO2e_total_kg'].max() * 1.02  # Add small buffer above maximum
fig.update_yaxes(range=[co2_min, co2_max], row=1, col=2)

fig.show()