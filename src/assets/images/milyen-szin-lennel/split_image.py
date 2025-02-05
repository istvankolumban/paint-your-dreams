from PIL import Image

# Load the image
image = Image.open('src/assets/images/milyen-szin-lennel/1-fejezet_page-0002.jpg')

# Get image dimensions
width, height = image.size

# Calculate the width of each split image
split_width = width // 2

# Split the image into two equal parts
left_image = image.crop((0, 0, split_width, height))
right_image = image.crop((split_width, 0, width, height))

# Save the split images
left_image.save('src/assets/images/milyen-szin-lennel/1-fejezet_page-0002_left.jpg')
right_image.save('src/assets/images/milyen-szin-lennel/1-fejezet_page-0002_right.jpg')
