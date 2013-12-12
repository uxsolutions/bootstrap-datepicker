# Nodeunit tests

Yes, it's weird to have a test directory as well as a tests directory. This directory contains nodeunit tests that are run from the command line with:

    $ npm test

The tests in the tests dir are browser unit tests that happen to be run headless with PhantomJS. These tests verify that our build tests run correctly, so they necessarily use different technology.

The test/tests naming is something that can (and should) be worked out.