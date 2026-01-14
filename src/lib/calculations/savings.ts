import { SavingsInputs, SavingsResults, SavingsYearRow } from '@/types';

export function calculateSavings(inputs: SavingsInputs): SavingsResults {
  const { initialDeposit, monthlyContribution, annualInterestRate, years, compoundingFrequency } = inputs;

  // Determine compounding periods per year
  const periodsPerYear = compoundingFrequency === 'monthly' ? 12
    : compoundingFrequency === 'quarterly' ? 4
    : 1;

  // Rate per compounding period
  const ratePerPeriod = (annualInterestRate / 100) / periodsPerYear;

  // Months per compounding period
  const monthsPerPeriod = 12 / periodsPerYear;

  const schedule: SavingsYearRow[] = [];
  let balance = initialDeposit;
  let totalContributions = initialDeposit;
  let totalInterestEarned = 0;

  for (let year = 1; year <= years; year++) {
    const startBalance = balance;
    let yearlyInterest = 0;
    let yearlyContributions = 0;

    // Process each compounding period in the year
    for (let period = 0; period < periodsPerYear; period++) {
      // Add monthly contributions for this period
      const periodContributions = monthlyContribution * monthsPerPeriod;
      balance += periodContributions;
      yearlyContributions += periodContributions;
      totalContributions += periodContributions;

      // Calculate and add interest
      const periodInterest = balance * ratePerPeriod;
      balance += periodInterest;
      yearlyInterest += periodInterest;
      totalInterestEarned += periodInterest;
    }

    schedule.push({
      year,
      startBalance: Math.round(startBalance * 100) / 100,
      contributions: Math.round(yearlyContributions * 100) / 100,
      interestEarned: Math.round(yearlyInterest * 100) / 100,
      endBalance: Math.round(balance * 100) / 100,
    });
  }

  return {
    finalBalance: Math.round(balance * 100) / 100,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
    schedule,
  };
}
