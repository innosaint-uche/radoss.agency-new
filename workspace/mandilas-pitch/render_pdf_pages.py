#!/usr/bin/env python3
from pathlib import Path
import pypdfium2 as pdfium
from PIL import Image, ImageOps, ImageDraw

pdf_path = Path('/Users/radossagency/Documents/Web-Projects/new-radoss.agency/output/pdf/mandilas_radoss_pitch_2026-02-19.pdf')
out_dir = Path('/Users/radossagency/Documents/Web-Projects/new-radoss.agency/tmp/pdfs/pdf-pages')
out_dir.mkdir(parents=True, exist_ok=True)

pdf = pdfium.PdfDocument(str(pdf_path))
for i in range(len(pdf)):
    page = pdf[i]
    bitmap = page.render(scale=2.0)
    pil_img = bitmap.to_pil()
    pil_img.save(out_dir / f'page-{i+1:02d}.png')

# contact sheet
files = sorted(out_dir.glob('page-*.png'))
thumb_w, thumb_h = 360, 203
cols = 4
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * (thumb_w + 20) + 20, rows * (thumb_h + 46) + 20), '#0b0f18')
draw = ImageDraw.Draw(sheet)

for idx, fp in enumerate(files):
    r = idx // cols
    c = idx % cols
    x = 20 + c * (thumb_w + 20)
    y = 20 + r * (thumb_h + 46)
    im = Image.open(fp).convert('RGB')
    im = ImageOps.contain(im, (thumb_w, thumb_h))
    frame = Image.new('RGB', (thumb_w, thumb_h), '#111827')
    frame.paste(im, ((thumb_w - im.width)//2, (thumb_h - im.height)//2))
    sheet.paste(frame, (x, y))
    draw.rectangle([x, y, x + thumb_w, y + thumb_h], outline='#374151', width=2)
    draw.text((x, y + thumb_h + 8), f'Slide {idx+1}', fill='#d1d5db')

sheet_path = Path('/Users/radossagency/Documents/Web-Projects/new-radoss.agency/tmp/pdfs/pdf-contact-sheet.png')
sheet.save(sheet_path)
print(f'Rendered {len(files)} pages to {out_dir}')
print(f'Contact sheet: {sheet_path}')
