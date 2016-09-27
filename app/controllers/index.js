import Ember from 'ember';

export default Ember.Controller.extend({
  amount: 200000,
  rate: 5,
  years: 30,

  monthlyPayment: Ember.computed('amount', 'years', 'rate', function() {
    return this.get('amount') * (this.get('rate') / 1200) / (1 - Math.pow(1 / (1 + this.get('rate') / 1200), this.get('years') * 12));
  }),

  data: Ember.computed('amount', 'years', 'rate', function() {
    const monthlyRatePct = this.get('rate') / 1200;

    let balance = this.get('amount');
    let balances = [balance];
    let partial;

    for (let year = 0; year < this.get('years'); year++) {
      let interestYearly = 0;
      for (let month = 1; month <= 12; month++) {
        const interestMonth = balance * monthlyRatePct;
        interestYearly += interestMonth;
        balance -= this.get('monthlyPayment') - interestMonth;

        if (balance <= 0) {
          balance = 0;
          if (partial === undefined && month !== 12) {
            partial = month;
          }
        }
      }

      balances.push(balance);
      if (partial) {
        partial = 0;
      }
    }
    console.log(balances);
    return balances;
  }),
});
