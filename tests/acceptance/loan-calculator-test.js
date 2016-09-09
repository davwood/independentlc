import { test } from 'qunit';
import moduleForAcceptance from 'independentlc/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | loan calculator');

test('visiting /', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('h1').text(), 'Independent Loan Calculator', 'shows the correct app title');
  });
});
