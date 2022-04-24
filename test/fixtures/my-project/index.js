import chalk from 'chalk';
import qs from 'qs';

console.log(chalk.red(qs.parse('foo[bar]=baz')));
