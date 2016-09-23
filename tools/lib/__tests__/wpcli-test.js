import test from 'ava';
import wpcli from '../wpcli';

test.serial('should successfully run npm command `wp cli version`', (t) => {
    wpcli({
        args: ['cli', 'version']
    });
});

test.serial('should unsuccessfully if command not exist', (t) => {
    t.throws(wpcli({
        args: ['cli', 'versions']
    }));
});
