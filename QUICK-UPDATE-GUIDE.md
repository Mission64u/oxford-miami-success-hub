# Quick Update Cheat Sheet

Most routine updates happen in **club-data.js**.

## Someone completes a Pathways level
1. Increase the corresponding `completed` number in `education`.
2. Add an object to `achievements`.
3. If appropriate, set a related stamp's `earned` value to `true`.

## Membership count changes
Edit the `Membership Goal` metric. For example:

```js
value: "14 / 18"
```

## Change invitation text
Edit the `text` and `subject` values in `invitations`.

## Change website address
Edit:

```js
website: "https://YOUR-USERNAME.github.io/oxford-miami-success-hub/"
```

## Celebrate a member
Put the member's achievement last in the `achievements` list. The site will use that item for:
- "Celebrate Latest Achievement"
- confetti
- fanfare
- social celebration banner download
