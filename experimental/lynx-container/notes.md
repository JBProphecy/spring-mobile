# Animated Content Notes

---

## Components

- <code>LynxContainer</code>

- <code>IconBar</code>
  - This element will have a fixed size and be positioned directly above or below the <code>DisplayBox</code>
- <code>IconList</code>
  - This element will occupy the least amount of width possible and the full height of <code>IconBar</code>
- <code>IconItem</code>
- <code>Icon</code>

- <code>DisplayBox</code>
  - This element will have a fixed size directly above or below the <code>IconBar</code>
- <code>DisplayList</code>
- <code>DisplayItem</code>
- <code>Display</code>

---

## Description for ChatGPT

I want to start fresh, using gestures, I've never done gestures so I need a full detailed guide of what to do and why. The goal is to essentially make two "scrollers". I'll build everything in a container called LynxContainer. The LynxContainer will have two element inside of it, IconBar and DisplayBox. The IconBar will take the full width of LynxContainer and 64px height. The DisplayBox will take the full width of LynxContainer and the rest of the height. The IconBar will have an IconList filled with IconItem. The IconBar is what will scroller, the IconList will wrap the IconItems (no limit to amount) and each IconItem will occupy say 1/5 of space. Let's say LynxContainer is 500px width, so each IconItem will occupy 100px width, meaning 5 can be visible at a time. The DisplayBox will have a very similar setup, with a DisplayList and DisplayItem, but each DisplayItem will be the full width of LynxContainer, so 500px. so if I have 10 IconItem and therefore 10 DisplayItem, the IconList should be 1000px wide and the DisplayList should be 5000px wide. I want the scroll behavior (but 100% I want to use gesture stuff), to be synced, so scrolling 100px on the IconBar (the width of one IconItem) will correlate to scrolling 500px on the DisplayBox (the width of one DisplayItem). I'm using React Native, Typescript, and the latest expo stuff, so index.tsx and _layout.tsx vs App.tsx for example. I would like a full detailed guide, explaining what to do and why, piece by piece, starting from a new expo app with the latest features.

---
