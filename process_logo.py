from PIL import Image
import numpy as np

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

input_path = 'public/images/logo_clean.png'
output_path = 'public/images/logo_final.png'

# Project Colors
PRIMARY_COLOR = hex_to_rgb('#13ecda')  # Turquoise
DARK_COLOR = hex_to_rgb('#0d1b1a')     # Dark Charcoal

img = Image.open(input_path).convert("RGBA")
data = np.array(img)

# Unpack channels
r, g, b, a = data.T

# LOGIC UPDATE: Instead of just removing white, let's remove anything "light".
# If the user sees "transparent patterns", it's likely a light gray/white checkerboard.
# We will define "Background" as anything with high brightness.

# Calculate brightness
brightness = 0.299 * r + 0.587 * g + 0.114 * b

# Threshold: Anything brighter than 200 is considered background (white is 255, light gray is ~200-240)
# This will effectively cut out the checkerboard if it exists as light pixels.
background_mask = (brightness > 220).T

# Apply Transparency to background
data[..., 3][background_mask] = 0

# Now Recolor the content (Dark pixels)
# Dark text is usually very dark, brightness < 100
content_mask = (brightness < 150).T & (data[..., 3] > 0)

# We want to be careful not to destroy the anti-aliasing (edges).
# Simplest way for a sharp logo: Force colors on the mask.
data[..., 0][content_mask] = DARK_COLOR[0]
data[..., 1][content_mask] = DARK_COLOR[1]
data[..., 2][content_mask] = DARK_COLOR[2]

# If there were any teal/primary colors originally, we should try to preserve or map them.
# The original prompt mentioned "make it transparent", "change colors".
# If the whole thing is just text, Dark Charcoal is safest. 
# If there's an icon that should be Turquoise, we need to know. 
# Assuming the "icon" might be lighter?
# Let's just stick to Dark Charcoal for the main text/shape for now as it's the safest "logo" color.
# If the user wants specific parts teal, that's harder without segmentation, 
# but often logos are single color or two distinct colors. 
# Let's try to detect "not dark but not background" for Teal.

# Detect "Teal-ish" or "Color" candidate? (High saturation?)
# For now, let's map EVERYTHING valid to Dark Charcoal to be safe and clean, 
# unless it's clearly distinct.
# The user said "change the colors... according to our project design".
# Let's make the main text Dark.

new_img = Image.fromarray(data)
new_img.save(output_path)

print(f"Processed logo saved to {output_path}")
