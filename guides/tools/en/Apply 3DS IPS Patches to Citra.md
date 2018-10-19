# Apply 3DS IPS Patches to Citra

---
## Getting your game's code.bin
---

1. Boot your 3DS into GodMode9
2. Click "SYSNAND SD"
3. Click "title"
4. Click the first half of your game's title ID
5. Click the second half of your game's title ID
6. Click the `content` folder
7. On the top screen, click on the `.app` file
8. On the bottom screen, click `NCCH image options...`
9. Click `Extract .code`
    - Your `.code` file is in `gm9/out/titleID.code`
    - For example, Ultra Moon's update would be `0004000E001B5100.code`
10. Get the `.code` file to your computer using an SD reader or FTP

Here is an example of what to click for Ultra Moon's update (title ID `0004000E001B5100`):
```
SYSNAND SD -> title -> 0004000E -> 001B5100 -> content -> 00000001.app -> NCCH image options... -> Extract .code
```

---
## Applying the patch
---

1. Download any IPS files you want to apply
2. Go to [the IPSPatcher.js site](https://zaksabeast.github.io/ipspatcher.js/build/)
3. Click the "Patch" button
4. Select your `.code` file and every IPS patch you to to apply
5. Click "Open" or "Upload" (depending on your browser)
    - A file called `patched.bin` will be downloaded
6. Rename the downloaded `patched.bin` to `code.bin`

---
## Using the patched code.bin
---

1. Right click on your game in Citra
2. Open the update directory
3. Make a new folder called `<.app file>.exefsdir`
    - For example, Ultra Moon's update would be `00000001.app.exefsdir`
4. Put the patched `code.bin` in the new folder