# PokeWar

Click here to deploy: https://combative-light.surge.sh/

You can also view the backend code here: https://github.com/dlmarshall3/pw-backend

## Project description

When I first started this project a month ago (as of 5/20/2022), I didn't know what I was getting myself into. I figured it'd be fun to make a game for my son, considering he loves playing War with his mother, and he also loves Pokemon. Seemed like a no-brainer. However, once I actually got into the process of writing the code, I realized: **there is a lot more to do than I expected.** There are still a lot of things I would like to do, which I'll cover in the future goals below, but ultimately, I'm proud of what I was able to accomplish here. And my son enjoyed it, which is the most important thing.

## How the game works

It's almost identical to the game of War, except the whole...Pokemon thing. Each turn, two Pokemon will face off, and the Pokemon with the highest stats wins. There are type advantages that come into play (more on that below), so what looks like a surefire win at first may turn into something different a few seconds later. The player with the higher-stats Pokemon wins both, and the next turn begins. However, if both Pokemon have the same stats after the types are considered, War is declared, both players draw two more Pokemon, and the process repeats. Whoever gets all of the Pokemon (or whoever has the most if three wars are declared) wins!

## Challenges

Factoring in responsive design when you aren't relying on a framework like Vue or React can be tough. I didn't want to use Bootstrap, but in the end, to account for as many devices as possible with minimal work, it made the most sense. Also, handling the type advantages is something that I am still weighing out how to handle properly. For example, some Pokemon have 4x weaknesses compared to your typical 2x, which is something I plan on changing when I eventually refactor this with Vue. As a result, there are a few match-ups where it doesn't quite work, because of dual-type Pokemon, but I would wager 90% of the match-ups will be correct.

## Thank you

I feel like I'm always thanking the same people each time, but specifically Jesse, Dane, Dave M, Robin and Phil: you all were incredibly helpful in the testing and feedback stages. Maya: thank you for helping me test a few devices that I didn't have handy! Responsive design testing can be tough when you don't regularly use a smartphone. Also, I am very indebted to my Carmigo coworkers for everything I've learned on the job to help me even be able to finish this project. It's been a labor of love, but I mean, look at this:

<img src='/assets/jasper1.jpg' width='50%'>

Totally worth it.

Which brings me to finally thanking my family, for putting up with my nerdery and re-ignited love for coding. 

I promise it's going to be worth it.
