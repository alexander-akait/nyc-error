import execa from 'execa';
import test from 'ava';

test.serial('should successfully run npm command `build:development`', (t) => {
    t.notThrows(execa('npm', ['run', 'build:development']));
});
