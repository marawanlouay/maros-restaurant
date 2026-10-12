
import qrcode

# Restaurant website URL
website_url = "https://marawanlouay.github.io/maros-restaurant/"

# Create QR Code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=12,
    border=4
)

qr.add_data(website_url)
qr.make(fit=True)

# Generate QR Code image
image = qr.make_image(
    fill_color="#29211D",
    back_color="white"
)

# Save QR Code
image.save("maros-restaurant-qr.png")

print("QR Code created successfully!")
