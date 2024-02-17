---
title: 'Using IPS Patches with Luma and Citra'
description: 'Use game patches for instant text, no outlines, and extra fun'
slug: 'misc-3ds-ips-luma-citra'
subCategory: '3DS'
---

## Using IPS files with Luma

- You will need Luma3DS installed on your 3DS for this.
  - Instructions for installing Luma3DS: https://3ds.hacks.guide/

1. Find your game's title ID [using 3dsdb](http://www.3dsdb.com/)
2. Put your code.ips patch at `/luma/titles/_title ID_/code.ips`

For example, Ultra Moon would be `/luma/title/00040000001B5100/code.ips`

## Using IPS files with Citra

1. Right-click your game in Citra
2. Select "Open Mods Location" to open the mods folder
3. Copy your `code.ips` into the mods folder 

## Merging patches with IPSPatcher.js

```
Note: Some IPS patches use a feature called 'RLE' where one byte is repeated multiple times.  This method does not support RLE.
```

1. Download any IPS files you want to apply
2. Go to [the IPSPatcher.js site](https://zaksabeast.github.io/ipspatcher.js/build/)
3. Click the "Merge" button
4. Select every IPS patch you want to apply
5. Click "Open" or "Upload" (depending on your browser)
   - A file called `merged.ips` will be downloaded
6. Rename the downloaded `merged.ips` to `code.ips`
