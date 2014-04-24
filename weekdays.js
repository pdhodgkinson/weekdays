#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2)),
    moment = require('moment'),
    startDate = new Date(),
    cost = 30;

if (argv.s !== undefined) {
    var split = argv.s.split('/');
    startDate.setDate(split[1]);
    startDate.setMonth(split[0] - 1);
}

if (argv.c !== undefined) {
    cost = argv.c;
}

var curDate = moment(startDate);
var oneMonthAway = curDate.clone().add('months', 1);
var numWeekdays = 0;

while (curDate.isSame(oneMonthAway, 'day') === false) {
    var day = curDate.day();
    if (day > 0 && day < 6) {
        numWeekdays++;
    }
    curDate.add('days', 1);
}

console.log('Num weekdays between ' + moment(startDate).format('ll') +
    ' to ' + oneMonthAway.format('ll') + ': ' +  numWeekdays);
console.log('Cost at $' + cost + ' per weekday: $' + numWeekdays * cost);