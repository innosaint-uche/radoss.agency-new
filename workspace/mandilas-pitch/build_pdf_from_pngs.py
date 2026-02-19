#!/usr/bin/env python3
from pathlib import Path
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

png_dir = Path('/Users/radossagency/Documents/Web-Projects/new-radoss.agency/tmp/pdfs/slides-png')
out_pdf = Path('/Users/radossagency/Documents/Web-Projects/new-radoss.agency/output/pdf/mandilas_radoss_pitch_2026-02-19.pdf')
out_pdf.parent.mkdir(parents=True, exist_ok=True)

files = sorted(png_dir.glob('slide-*.png'))
if not files:
    raise SystemExit('No PNG slide files found')

# 10in x 5.625in in points
pw, ph = 720, 405
c = canvas.Canvas(str(out_pdf), pagesize=(pw, ph))

for fp in files:
    img = ImageReader(str(fp))
    iw, ih = img.getSize()
    scale = min(pw / iw, ph / ih)
    dw, dh = iw * scale, ih * scale
    x = (pw - dw) / 2
    y = (ph - dh) / 2
    c.drawImage(img, x, y, width=dw, height=dh, preserveAspectRatio=True, mask='auto')
    c.showPage()

c.save()
print(f'Wrote {out_pdf} with {len(files)} pages')
