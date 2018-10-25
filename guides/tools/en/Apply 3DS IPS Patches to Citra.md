# Apply 3DS IPS Patches to Citra

---
## Merging patches
---

```
Note: This method doesn't support RLE for ips
```

1. Download any IPS files you want to apply
2. Go to [the IPSPatcher.js site](https://zaksabeast.github.io/ipspatcher.js/build/)
3. Click the "Merge" button
4. Select every IPS patch you want to apply
5. Click "Open" or "Upload" (depending on your browser)
    - A file called `merged.ips` will be downloaded
6. Rename the downloaded `merged.ips` to `code.ips`

```
Note: Many patches are game and version specific, make sure to only use patches for your specific game and version!
```

---
## Using the code.ips with Citra
---

1. Right click on your game in Citra
2. Open the update directory
3. Make a new folder called `<.app file>.exefsdir`
    - For example, Ultra Moon's update would be `00000001.app.exefsdir`
4. Put the `code.ips` in the new folder