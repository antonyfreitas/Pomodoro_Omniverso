from PIL import Image

# Carrega a imagem original que você salvou
img = Image.open("icone_original.png")

# Cria e salva a versão menor
img_192 = img.resize((192, 192))
img_192.save("icone-192.png")

# Cria e salva a versão maior
img_512 = img.resize((512, 512))
img_512.save("icone-512.png")

print("Ícones dimensionados e prontos para o GitHub!")