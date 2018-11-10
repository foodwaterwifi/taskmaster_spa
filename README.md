Design Decisions:

1. The titles and descriptions of tasks can't be changed once they are created.

It wasn't specified in the description that these had to be modifiable. However, everything else about the task is. This really came down to how much time I had to put into adding the additional page and routing for a dedicated task update page.

2. The logged-in user's tasks are displayed on the right side of the page and on the user's profile.

This wasn't explicitly asked for, but I've lost points on both of the previous assignments for not having the feature, so I implemented it. I guess it's a useful feature for a task managing app to have.

3. Validation on both the server side and web side.

This time around I added server-side validation for the time working in minutes being a multiple of 15, and for the password confirmation. I mostly followed Nat's examples for implementing the argon2 password system.

4. Drop-down login menu.

It looks cool. I also changed the register link from a button to something that looks like a link.

5. Links to user profiles and task pages in the tables.

This makes the website easier to navigate.

6. My Profile tab.

Again, easier navigation.

7. Emoji, and some unicode checkboxes.

They make the demo app feel more complete.
