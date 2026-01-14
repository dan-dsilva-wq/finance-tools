import { MortgageInputs, MortgageResults, AmortizationRow } from '@/types';

export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const { propertyPrice, deposit, depositType, interestRate, termYears, monthlyOverpayment = 0 } = inputs;

  // Calculate deposit amount
  const depositAmount = depositType === 'percentage'
    ? (propertyPrice * deposit) / 100
    : deposit;

  // Calculate loan amount
  const loanAmount = propertyPrice - depositAmount;

  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12;

  // Total number of months
  const totalMonths = termYears * 12;

  // Calculate base monthly payment using amortization formula
  // M = P * [r(1+r)^n] / [(1+r)^n - 1]
  let baseMonthlyPayment: number;
  if (monthlyRate === 0) {
    baseMonthlyPayment = loanAmount / totalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    baseMonthlyPayment = loanAmount * (monthlyRate * factor) / (factor - 1);
  }

  // Generate amortization schedule
  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;
  let totalInterest = 0;
  let month = 0;

  while (balance > 0.01 && month < totalMonths * 2) {
    month++;

    // Calculate interest for this month
    const interestPayment = balance * monthlyRate;
    totalInterest += interestPayment;

    // Calculate principal payment
    const totalPayment = Math.min(baseMonthlyPayment + monthlyOverpayment, balance + interestPayment);
    const principalPayment = totalPayment - interestPayment;

    // Update balance
    balance = Math.max(0, balance - principalPayment);

    schedule.push({
      month,
      payment: Math.round(totalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      balance: Math.round(balance * 100) / 100,
    });

    // Break if balance is paid off
    if (balance <= 0) break;
  }

  const totalCost = depositAmount + schedule.reduce((sum, row) => sum + row.payment, 0);

  return {
    loanAmount: Math.round(loanAmount * 100) / 100,
    monthlyPayment: Math.round(baseMonthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    payoffMonths: schedule.length,
    schedule,
  };
}

export function getPayoffDate(months: number): Date {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date;
}

export function formatPayoffDate(months: number, locale: string): string {
  const date = getPayoffDate(months);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long'
  }).format(date);
}
