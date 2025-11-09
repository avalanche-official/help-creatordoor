import HelpArticle from './HelpArticle.vue'

export default {
  title: 'Patterns/HelpArticle',
  component: HelpArticle,
  tags: ['autodocs'],
}

// Basic Article (like the Wise example)
export const SendMoneyGuide = {
  render: () => ({
    components: { HelpArticle },
    template: `
      <HelpArticle
        title="How do I send money with Wise?"
        :breadcrumbs="[
          { label: 'Help home', href: '/help' },
          { label: 'Sending money', href: '/help/sending' },
        ]"
        intro="Sending money with Wise is simple and transparent. We'll guide you through the process step by step."
        :sections="[
          {
            id: 'sign-up',
            heading: '1. Sign up with Wise',
            content: [
              {
                type: 'paragraph',
                text: 'We\\'ll ask for your email address, and you\\'ll create a password. You can also sign up by connecting to your Google or Facebook account.',
              },
              {
                type: 'tip',
                text: 'If you already have a Wise account, go to Home on the website and choose Send money, or tap Send on the app, to set up a transfer.',
              },
            ],
          },
          {
            id: 'amount',
            heading: '2. Type in how much you\\'d like to transfer',
            content: [
              {
                type: 'paragraph',
                text: 'You can start with the amount you\\'d like to send, or how much you\\'d like your recipient to get.',
              },
              {
                type: 'tip',
                text: 'If it\\'s important that your recipient gets an exact amount, type that amount into the Recipient gets box. We\\'ll automatically tell you how much you need to send.',
              },
            ],
          },
          {
            id: 'transfer-type',
            heading: '3. Let us know what kind of transfer you\\'re making',
            content: 'If you\\'re paying in from a personal bank account, it\\'s a Personal transfer.',
          },
          {
            id: 'details',
            heading: '4. Fill in your details',
            content: 'We\\'ll ask for your personal details, like your address. We need this info to comply with finance regulations, but we\\'ll never share it.',
          },
        ]"
        :cta="{
          label: 'Send money now',
          href: '/send',
          variant: 'primary',
        }"
      />
    `,
  }),
}

// Article with Index
export const WithIndex = {
  render: () => ({
    components: { HelpArticle },
    template: `
      <HelpArticle
        title="Understanding Wise fees"
        :breadcrumbs="[
          { label: 'Help home', href: '/help' },
          { label: 'Pricing', href: '/help/pricing' },
        ]"
        intro="Wise uses the real exchange rate and charges a small, transparent fee. Here's how our pricing works and what you can expect to pay."
        :sections="[
          {
            id: 'transfer-fees',
            heading: 'Fees for sending money',
            content: 'Our fees vary depending on where you\\'re sending, how much, and how you pay. We always show you the fee upfront before you confirm your transfer.',
          },
          {
            id: 'account-fees',
            heading: 'Fees for the multi-currency account',
            content: 'Opening and holding a Wise account is free. You only pay small fees when you use it to convert currency or spend with your card.',
          },
          {
            id: 'card-fees',
            heading: 'Fees for the Wise card',
            content: 'Your first card is free. Replacement or additional cards cost a small fee. ATM withdrawals are free up to a certain limit each month.',
          },
          {
            id: 'hidden-fees',
            heading: 'No hidden fees',
            content: 'We never hide fees in the exchange rate. What you see is what you pay — always.',
          },
        ]"
      />
    `,
  }),
}

// Article without CTA
export const WithoutCTA = {
  render: () => ({
    components: { HelpArticle },
    template: `
      <HelpArticle
        title="What is a SWIFT code?"
        :breadcrumbs="[
          { label: 'Help home', href: '/help' },
          { label: 'Bank details', href: '/help/bank-details' },
        ]"
        intro="A SWIFT code is a unique identifier for banks. It's used to send money internationally."
        :sections="[
          {
            id: 'what-is-swift',
            heading: 'What SWIFT codes are used for',
            content: 'SWIFT codes identify banks when you\\'re sending money internationally. They ensure your money gets to the right place.',
          },
          {
            id: 'find-swift',
            heading: 'How to find a SWIFT code',
            content: [
              {
                type: 'paragraph',
                text: 'You can find SWIFT codes in several ways:',
              },
              {
                type: 'list',
                items: [
                  'Check your bank statement',
                  'Look on your bank\\'s website',
                  'Call your bank',
                  'Search online using your bank\\'s name and location',
                ],
              },
            ],
          },
        ]"
      />
    `,
  }),
}

// Article with Lists
export const WithLists = {
  render: () => ({
    components: { HelpArticle },
    template: `
      <HelpArticle
        title="How do I get verified?"
        :breadcrumbs="[
          { label: 'Help home', href: '/help' },
          { label: 'Verification', href: '/help/verification' },
        ]"
        intro="Verification helps us keep your account secure and comply with financial regulations. Here's what you need to know."
        :sections="[
          {
            id: 'why-verify',
            heading: 'Why we verify accounts',
            content: 'We verify your identity to prevent fraud and comply with international financial regulations. It\\'s a legal requirement for money transfer services.',
          },
          {
            id: 'documents',
            heading: 'What documents you\\'ll need',
            content: [
              {
                type: 'paragraph',
                text: 'We typically need:',
              },
              {
                type: 'ordered-list',
                items: [
                  'A government-issued photo ID (passport, driver\\'s license, or national ID card)',
                  'Proof of address (bank statement, utility bill, or government letter)',
                  'A selfie or photo of yourself (for some accounts)',
                ],
              },
            ],
          },
          {
            id: 'upload',
            heading: 'How to upload documents',
            content: [
              {
                type: 'paragraph',
                text: 'Follow these steps:',
              },
              {
                type: 'ordered-list',
                items: [
                  'Go to your account settings',
                  'Click on "Verification"',
                  'Upload clear photos of your documents',
                  'Wait for our team to review (usually takes 1-2 business days)',
                ],
              },
              {
                type: 'tip',
                text: 'Make sure your photos are clear and all corners of the document are visible.',
              },
            ],
          },
        ]"
        :cta="{
          label: 'Upload documents',
          href: '/verification/upload',
          variant: 'primary',
        }"
      />
    `,
  }),
}

// Simple Article (2 sections, no index)
export const Simple = {
  render: () => ({
    components: { HelpArticle },
    template: `
      <HelpArticle
        title="How do I cancel my transfer?"
        :breadcrumbs="[
          { label: 'Help home', href: '/help' },
          { label: 'Transfers', href: '/help/transfers' },
        ]"
        intro="You can cancel your transfer if we haven't already processed it."
        :sections="[
          {
            id: 'when-cancel',
            heading: 'When you can cancel',
            content: 'You can cancel before we send your money to your recipient. Once we\\'ve sent it, we can\\'t cancel it.',
          },
          {
            id: 'how-cancel',
            heading: 'How to cancel',
            content: 'Go to your transfer in the app or website, and click \\'Cancel transfer\\'. We\\'ll refund you in 1-2 business days.',
          },
        ]"
      />
    `,
  }),
}

// Full Featured Article
export const FullFeatured = {
  render: () => ({
    components: { HelpArticle },
    template: `
      <HelpArticle
        title="Tips for getting started with Wise"
        :breadcrumbs="[
          { label: 'Help home', href: '/help' },
          { label: 'Getting started', href: '/help/getting-started' },
        ]"
        intro="Welcome to Wise! Here are some tips to help you get the most out of your account. We've designed everything to be simple, fast, and transparent."
        :sections="[
          {
            id: 'setup',
            heading: 'Set up your account properly',
            content: [
              {
                type: 'paragraph',
                text: 'Take a few minutes to complete your profile. This helps us verify your account faster and gives you access to all features.',
              },
              {
                type: 'list',
                items: [
                  'Add your full legal name',
                  'Verify your email address',
                  'Upload your ID documents',
                  'Add your phone number for security',
                ],
              },
            ],
          },
          {
            id: 'recipients',
            heading: 'Add your recipients',
            content: 'Save your regular recipients to make future transfers faster. You\\'ll only need to enter their details once.',
          },
          {
            id: 'notifications',
            heading: 'Turn on notifications',
            content: [
              {
                type: 'paragraph',
                text: 'Stay updated on your transfers by enabling notifications. You\\'ll know exactly when:',
              },
              {
                type: 'list',
                items: [
                  'Your money is converted',
                  'Your transfer is on its way',
                  'Your recipient gets the money',
                ],
              },
            ],
          },
          {
            id: 'card',
            heading: 'Order your Wise card',
            content: 'With a Wise card, you can spend in 40+ currencies at the real exchange rate. Order yours in the app.',
          },
          {
            id: 'app',
            heading: 'Download the mobile app',
            content: 'Manage everything on the go with our iOS and Android apps. Send money, track transfers, and spend with your card.',
          },
        ]"
        :cta="{
          label: 'Complete your profile',
          href: '/profile/setup',
          variant: 'primary',
        }"
      />
    `,
  }),
}

// Privacy & Security Article (No breadcrumbs)
export const NoBreadcrumbs = {
  render: () => ({
    components: { HelpArticle },
    template: `
      <HelpArticle
        title="How we keep your money safe"
        intro="Your security is our top priority. We use multiple layers of protection to keep your money and information safe."
        :sections="[
          {
            id: 'regulation',
            heading: 'We\\'re regulated and licensed',
            content: 'Wise is authorized and regulated by financial authorities in every country we operate. Your money is protected by law.',
          },
          {
            id: 'encryption',
            heading: 'Bank-level encryption',
            content: 'We use 256-bit encryption to protect your data — the same security used by major banks.',
          },
          {
            id: 'two-factor',
            heading: 'Two-factor authentication',
            content: 'Add an extra layer of security with two-factor authentication. We\\'ll send a code to your phone whenever you log in.',
          },
        ]"
        :cta="{
          label: 'Enable two-factor authentication',
          href: '/security/2fa',
          variant: 'primary',
        }"
      />
    `,
  }),
}
