export interface MortgageInputs {
  propertyPrice: number;
  deposit: number;
  depositType: 'amount' | 'percentage';
  interestRate: number;
  termYears: number;
  monthlyOverpayment?: number;
}

export interface MortgageResults {
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  payoffMonths: number;
  schedule: AmortizationRow[];
}

export interface AmortizationRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  defaultMortgageTermYears: number;
  defaultDepositPct: number;
  defaultRate: number;
}

export interface Scenario {
  id: string;
  tool: 'mortgage' | 'savings' | 'inflation';
  country_code: string;
  params: MortgageInputs;
  created_at: string;
  last_accessed_at: string;
  views: number;
}
