# UMA GitHub Pages Template

This repository is a static GitHub Pages template for the group **UMA**.

## Structure

- `docs/index.html`: home page
- `docs/assignments/assignment-1.html`: Assignment 1 page
- `docs/assignments/assignment-2.html` to `assignment-4.html`: placeholder pages for future assignments
- `docs/assets/config.js`: group info and all links in one place
- `docs/assets/style.css`: styling
- `docs/assets/main.js`: rendering logic

## How to publish on GitHub Pages

### Option A: Publish from the `docs` folder on `main`

1. Create a new GitHub repository.
2. Upload everything in this folder to that repository.
3. Go to **Settings -> Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/docs**.
6. Save.

### Option B: Put this template at repository root

If you prefer publishing from the repository root instead of `/docs`, move every file inside `docs/` to the root of the repository and set the Pages source to `/`.

## How to update links later

Open `docs/assets/config.js` and replace the empty strings in each assignment's `links` section.

Example:

```js
links: {
  demoVideo: 'https://... ',
  presentationVideo: 'https://youtube.com/...',
  code: 'https://github.com/...',
  presentationContent: 'https://drive.google.com/...'
}
```

## Notes

- Placeholder pages for Assignment 2 to Assignment 4 are included so you can keep the landing page structure now.
- If your course ends up using a different number of assignments, simply add or remove entries in `docs/assets/config.js`.
