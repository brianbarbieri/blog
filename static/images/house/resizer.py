from PIL import Image
import os

folder = "static/images/house/other"
# MAX_WIDTH = 1200
MAX_WIDTH = 120
NAME = "small"

for filename in os.listdir(folder):
    if filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif")):
        input_path = os.path.join(folder, filename)
        if "_small" in filename or "_med" in filename:
            continue
        name, ext = os.path.splitext(filename)
        output_path = os.path.join(folder, f"{name}_{NAME}{ext}")

        with Image.open(input_path) as img:
            width, height = img.size

            if width > MAX_WIDTH:
                new_height = int((MAX_WIDTH / width) * height)
                img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)

            img.save(output_path)

print("Done")