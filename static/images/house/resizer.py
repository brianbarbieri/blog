from PIL import Image
import os

folder = "./other"
MAX_WIDTH = 150

for filename in os.listdir(folder):
    if filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif")):
        input_path = os.path.join(folder, filename)

        name, ext = os.path.splitext(filename)
        output_path = os.path.join(folder, f"{name}_small{ext}")

        with Image.open(input_path) as img:
            width, height = img.size

            if width > MAX_WIDTH:
                new_height = int((MAX_WIDTH / width) * height)
                img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)

            img.save(output_path)

print("Done")