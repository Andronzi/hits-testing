/*
Koko loves to eat bananas.
There are n piles of bananas, the ith pile has piles[i] bananas.
The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k.
Each hour, she chooses some pile of bananas 
and eats k bananas from that pile.
If the pile has less than k bananas, she eats all of 
them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish 
eating all the bananas before the guards return.

Return the minimum integer k such that she can eat 
all the bananas within h hours.

Input: piles = [3,6,7,11], h = 8
Output: 4

Input: piles = [30,11,23,4,20], h = 5
Output: 30

Input: piles = [30,11,23,4,20], h = 6
Output: 23
*/

const minEatingSpeed = function (piles: number[], h: number) {
  if (h < piles.length || h > 1_000_000_000) {
    throw new Error("The value of the clock must not be less than the length of the array");
  }

  if (piles.length > 1_000_000_000 || piles.length < 1) {
    throw new Error("Array length limits violated");
  }

  let [left, right] = [1, Math.max(...piles)];

  while (left < right) {
    const mid = (left + right) >> 1;
    const hourSpent = getHourSpent(mid, piles);

    const isTargetGreater = h < hourSpent;
    if (isTargetGreater) left = mid + 1;

    const isTargetLess = hourSpent <= h;
    if (isTargetLess) right = mid;
  }
  
    return right;
  };
  
  const getHourSpent = (mid: number, piles: number[], hourSpent = 0) => {
    for (const pile of piles) {
      if (pile < 1 || pile > 1_000_000_000) {
        throw new Error("The value of the piece does not satisfy the constraint");
      }
      // for example pile = 10 and mid = 2 => hourSpent = 5
      hourSpent += Math.ceil(pile / mid);
    }
  
    return hourSpent;
  };
  
export default minEatingSpeed;