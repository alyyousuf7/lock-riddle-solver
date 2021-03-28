# Lock Riddle Solver

Have you seen these riddles before?
Solve these riddle with NodeJS!

| Riddle 1 | Riddle 2 |
| -- | -- |
| ![Riddle 1](https://user-images.githubusercontent.com/14050128/112767776-07e2ca00-9032-11eb-92d8-3c91028ae9df.png) | ![Riddle 2](https://user-images.githubusercontent.com/14050128/112767822-3fea0d00-9032-11eb-86cd-e08e28758609.png) |

## How to use?
### Install deps
```bash
$ yarn Install
```

### Run the solver
```bash
yarn ts-node index.ts [hints 1] [hint 2] [hint 3] ...
```

Each hint consists of two parts: `[digits of the hint] [hint type code]`.

For example, if the hint says: "9285 - One number is correct but wrong placed", this is how you pass it to the CLI: `9285 1cpw`.

The following table explains each type of hint:

| Hint type code | Hint type description
| -- | --
| `1cpw` | One digit is correct, but placed wrong
| `1cpc` | One digit is correct, and placed correctly
| `2cpw` | Two digits are correct, but placed wrong
| `aw` | All digits are wrong, and placed wrong

Yes, these riddles only contains these 4 types of hints!

---

## Examples
To solve the first riddle in the README:
```bash
$ yarn ts-node index.ts 9285 1cpw 1937 2cpw 5201 1cpc 6507 aw 8524 2cpw
```

To solve the second riddle in the README:
```bash
$ yarn ts-node index.ts 682 1cpc 614 1cpw 206 2cpw 738 aw 380 1cpw
```

---

### Why does it return an array?
Some riddles have multiple correct answers.

### Can I generate new riddles with this tool?
Sort of, yes. Just pass random hint combinations to the tool.

### Why is the code so bad / Why did you write this?
I never intended to push it to GitHub. I wrote this code in an hour a year back when COVID was really new. My friends and I were passing our time solving these riddles during lockdown, but I wanted to be a smart-ass! :D lol

---

That's all folks.
