import TextDisclaimer from './TextDisclaimer.vue'

export default {
  title: 'Editorial/TextDisclaimer',
  component: TextDisclaimer,
  tags: ['autodocs'],
}

// Light Theme (default)
export const LightTheme = {
  render: () => ({
    components: { TextDisclaimer },
    template: `
      <TextDisclaimer
        theme="light"
        content="* Eligible customers must opt in to the interest feature. Participants will have the balance of their USD funds held in their Wise Account "swept" into a Federal Deposit Insurance Corporation ("FDIC") insured interest-bearing account at one or more participating banks (each, a "Program Bank") that will hold and pay interest on the deposit funds. For a complete list of Program Banks, please see Appendix 1 of the <strong><a href='#'>Program Agreement</a></strong>. For more information on FDIC insurance coverage, please visit <strong><a href='#'>www.FDIC.gov</a></strong>. Customers are responsible for monitoring their total assets at each of the Program Banks to determine the extent of available FDIC insurance coverage in accordance with FDIC rules. The Program is not intended to be a long-term investment option, checking or savings account, investment contract or security."
      />
    `,
  }),
}

// Neutral Theme
export const NeutralTheme = {
  render: () => ({
    components: { TextDisclaimer },
    template: `
      <TextDisclaimer
        theme="neutral"
        content="* Eligible customers must opt in to the interest feature. Participants will have the balance of their USD funds held in their Wise Account "swept" into a Federal Deposit Insurance Corporation ("FDIC") insured interest-bearing account at one or more participating banks (each, a "Program Bank") that will hold and pay interest on the deposit funds. For a complete list of Program Banks, please see Appendix 1 of the <strong><a href='#'>Program Agreement</a></strong>. For more information on FDIC insurance coverage, please visit <strong><a href='#'>www.FDIC.gov</a></strong>. Customers are responsible for monitoring their total assets at each of the Program Banks to determine the extent of available FDIC insurance coverage in accordance with FDIC rules. The Program is not intended to be a long-term investment option, checking or savings account, investment contract or security."
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { TextDisclaimer },
    template: `
      <TextDisclaimer
        theme="forest-green"
        content="* Eligible customers must opt in to the interest feature. Participants will have the balance of their USD funds held in their Wise Account "swept" into a Federal Deposit Insurance Corporation ("FDIC") insured interest-bearing account at one or more participating banks (each, a "Program Bank") that will hold and pay interest on the deposit funds. For a complete list of Program Banks, please see Appendix 1 of the <strong><a href='#'>Program Agreement</a></strong>. For more information on FDIC insurance coverage, please visit <strong><a href='#'>www.FDIC.gov</a></strong>. Customers are responsible for monitoring their total assets at each of the Program Banks to determine the extent of available FDIC insurance coverage in accordance with FDIC rules. The Program is not intended to be a long-term investment option, checking or savings account, investment contract or security."
      />
    `,
  }),
}

// Regulatory Disclaimer
export const RegulatoryDisclaimer = {
  render: () => ({
    components: { TextDisclaimer },
    template: `
      <TextDisclaimer
        theme="light"
        content="** Wise Payments Limited is authorised by the Financial Conduct Authority under the Electronic Money Regulations 2011, Firm Reference 900507, for the issuing of electronic money. Wise is not a bank and your Wise account is not a bank account. The funds in your Wise account are safeguarded in accordance with regulations. This means your money is held separately from our own funds and cannot be used for our business expenses. In the unlikely event that Wise becomes insolvent, we will return your money in accordance with the applicable safeguarding regulations. For more information, please visit our <strong><a href='#'>Legal page</a></strong>."
      />
    `,
  }),
}

// Investment Disclaimer
export const InvestmentDisclaimer = {
  render: () => ({
    components: { TextDisclaimer },
    template: `
      <TextDisclaimer
        theme="neutral"
        content="* Past performance is not indicative of future results. The value of investments can go down as well as up, and you may get back less than you invested. Investment returns are not guaranteed. Wise does not provide investment advice and this information should not be considered as such. Please consult with a qualified financial advisor before making any investment decisions. For full terms and conditions, please refer to our <strong><a href='#'>Investment Terms</a></strong>."
      />
    `,
  }),
}

// Multi-paragraph Disclaimer
export const MultiParagraphDisclaimer = {
  render: () => ({
    components: { TextDisclaimer },
    template: `
      <TextDisclaimer
        theme="light"
        content="<p>* Exchange rates shown are for illustrative purposes only and may not reflect actual rates at the time of your transfer. Actual rates may vary based on market conditions, transfer amount, and payment method.</p><p>** Fees apply for certain services and may vary by country, currency, and payment method. For a complete breakdown of fees, please visit our <strong><a href='#'>Pricing page</a></strong>.</p><p>*** Wise is a regulated financial institution and complies with all applicable laws and regulations in the jurisdictions in which we operate. For more information about our regulatory status, please visit our <strong><a href='#'>Legal page</a></strong>.</p>"
      />
    `,
  }),
}

// Short Legal Notice
export const ShortLegalNotice = {
  render: () => ({
    components: { TextDisclaimer },
    template: `
      <TextDisclaimer
        theme="forest-green"
        content="* Subject to terms and conditions. Offer available to new customers only. Promotional rates may apply. Standard fees and charges will apply after the promotional period ends. See <strong><a href='#'>full terms</a></strong> for details."
      />
    `,
  }),
}

// Terms and Conditions
export const TermsAndConditions = {
  render: () => ({
    components: { TextDisclaimer },
    template: `
      <TextDisclaimer
        theme="neutral"
        content="By using this service, you agree to our <strong><a href='#'>Terms of Service</a></strong> and <strong><a href='#'>Privacy Policy</a></strong>. Your personal data will be processed in accordance with applicable data protection laws. We may use cookies and similar technologies to improve your experience. For more information, see our <strong><a href='#'>Cookie Policy</a></strong>. If you have any questions or concerns, please contact our <strong><a href='#'>Customer Support</a></strong> team."
      />
    `,
  }),
}

// Risk Warning
export const RiskWarning = {
  render: () => ({
    components: { TextDisclaimer },
    template: `
      <TextDisclaimer
        theme="light"
        content="** RISK WARNING: Trading foreign exchange and contracts for difference on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade foreign exchange or any other financial instrument, you should carefully consider your investment objectives, level of experience, and risk appetite. You should be aware of all the risks associated with foreign exchange trading and seek advice from an independent financial advisor if you have any doubts."
      />
    `,
  }),
}

// Data Protection Notice
export const DataProtectionNotice = {
  render: () => ({
    components: { TextDisclaimer },
    template: `
      <TextDisclaimer
        theme="forest-green"
        content="Your privacy is important to us. We collect and process personal data in accordance with the General Data Protection Regulation (GDPR) and other applicable data protection laws. You have the right to access, correct, delete, or restrict the processing of your personal data. For more information about how we handle your data, please review our <strong><a href='#'>Privacy Policy</a></strong> or contact our Data Protection Officer at <strong><a href='mailto:privacy@wise.com'>privacy@wise.com</a></strong>."
      />
    `,
  }),
}
