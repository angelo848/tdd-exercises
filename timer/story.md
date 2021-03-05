## Use Case

throttle returns a function which is called at most once in a specified time period. 

It takes as input the function to throttle and the period. 


If the period is less or equal than zero, then no throttle is applied.