import chalk from 'chalk';
import minimist from 'minimist';
import qs from 'qs';
import yargs from 'yargs';

yargs();
minimist();
console.log(chalk.red(qs.parse('foo[bar]=baz')));
