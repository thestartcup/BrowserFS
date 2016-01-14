var fs = require('fs'),
    path = require('path'),
    assert = require('wrapped-assert'),
    Buffer = require('buffer').Buffer;

module.exports = function() {
  var rootFS = fs.getRootFS();
  if (!rootFS.isReadOnly()) {
    // Ensure we cannot remove directories that are non-empty.
    fs.mkdir('/rmdirTest', function(e) {
      assert(!e);
      fs.mkdir('/rmdirTest/rmdirTest2', function(e) {
        assert(!e);
        fs.rmdir('/rmdirTest', function(e) {
          assert(!!e, "Invariant failed: Successfully removed a non-empty directory.");
          assert(e.code === "ENOTEMPTY");
        });
      });
    });
  }
};