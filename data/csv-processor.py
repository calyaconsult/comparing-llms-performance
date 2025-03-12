import csv
import json
import yaml
import pandas as pd

# Define the input CSV file name
input_csv = "products.csv"

# Read the CSV file into a Pandas DataFrame
df = pd.read_csv(input_csv)

# Clean and process the 'Unit Price' column
df['Unit Price'] = df['Unit Price'].replace('[\$,]', '', regex=True).astype(float)

# Example: Display summary statistics of product prices
summary = df.describe()
print(summary)

# Example: Filter and display all electronics products
electronics = df[df['Category'] == 'Electronics']
print(electronics)

# Save the cleaned data to a new CSV file
output_csv = "processed_products.csv"
df.to_csv(output_csv, index=False)
print(f"Processed data saved to {output_csv}")

# Convert to JSON tree structure
json_data = {}
for _, row in df.iterrows():
    category = row['Category']
    product_id = row['Product ID']
    if category not in json_data:
        json_data[category] = {}
    json_data[category][product_id] = {"name": row['Product'], "price": row['Unit Price']}

# Save JSON output
output_json = "products.json"
with open(output_json, "w") as json_file:
    json.dump(json_data, json_file, indent=4)
print(f"JSON data saved to {output_json}")

# Convert to YAML
output_yaml = "products.yaml"
with open(output_yaml, "w") as yaml_file:
    yaml.dump(json_data, yaml_file, default_flow_style=False)
print(f"YAML data saved to {output_yaml}")

# Convert to Mermaid
output_mermaid = "products.mmd"
orientation = "LR" # or: "TD"
mermaid_data = f"graph {orientation};\n"
for categ, products in json_data.items():
    category = categ.replace(' ','_') # for Mermaid processors that don't support spaces in categories
    mermaid_data += f"    {category}[[{category}]];\n"
    for product_id, details in products.items():
        mermaid_data += f"    {category} --> {product_id}({details['name']} - ${details['price']});\n"

with open(output_mermaid, "w") as mermaid_file:
    mermaid_file.write(mermaid_data)
print(f"Mermaid data saved to {output_mermaid}")
