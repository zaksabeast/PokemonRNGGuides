# Using IPS Patches with Luma and Citra

---
## Using IPS files with Luma
---

1. Find your game's title ID [using 3dsdb](http://www.3dsdb.com/)
2. Put your code.ips patch at `/luma/titles/<first half of title ID>/<second half of title ID>/code.ips`

For example, Ultra Moon would be `/luma/title/00040000/001B5100/code.ips`

---
## Using IPS files with Citra
---

1. Right click on your game in Citra
2. Open the update directory
3. Make a new folder called `<.app file>.exefsdir`
    - For example, Ultra Moon's update would be `00000001.app.exefsdir`
4. Put the `code.ips` in the new folder

---
## Merging patches with IPSPatcher.js
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
