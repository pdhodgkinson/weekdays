#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2)),
    moment = require('moment'),
    startDate = moment(),
    endDate = moment(),
    cost = 30;

var parseInputDate = function (date, arg) {
    'use strict';
    var split = arg.split('/');
    date.date(split[1]);
    date.month(split[0] - 1);
};

if (argv.s !== undefined) {
    parseInputDate(startDate, argv.s);
}

if (argv.e !== undefined) {
    parseInputDate(endDate, argv.e);
} else {
    endDate = startDate.clone().add('months', 1);
}

if (argv.c !== undefined) {
    cost = argv.c;
}

var curDate = startDate.clone();
var numWeekdays = 0;

while (curDate.isSame(endDate, 'day') === false) {
    var day = curDate.day();
    if (day > 0 && day < 6) {
        numWeekdays++;
    }
    curDate.add('days', 1);
}

console.log('Num weekdays between ' + startDate.format('ll') +
    ' to ' + endDate.format('ll') + ': ' +  numWeekdays);
console.log('Cost at $' + cost + ' per weekday: $' + numWeekdays * cost);