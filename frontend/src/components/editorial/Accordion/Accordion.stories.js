import Accordion from './Accordion.vue'

export default {
  title: 'Editorial/Accordion',
  component: Accordion,
  tags: ['autodocs'],
}

// Basic Accordion (like Wise FAQ example)
export const WiseFAQ = {
  render: () => ({
    components: { Accordion },
    template: `
      <div class="max-w-4xl mx-auto p-8">
        <h2 class="text-4xl font-bold text-content-primary mb-8 uppercase tracking-tight" style="font-family: var(--font-heading);">
          LET'S ANSWER SOME OF<br />YOUR QUESTIONS
        </h2>
        <Accordion :items="faqItems" />
      </div>
    `,
    data() {
      return {
        faqItems: [
          {
            id: 1,
            question: 'How much does it cost to get US dollar account details?',
            answer:
              "It's free to get US dollar account details with Wise. You can receive USD without any fees. However, there may be small fees when you convert currencies or use certain features.",
          },
          {
            id: 2,
            question: 'What is an IBAN?',
            answer:
              "IBAN (which stands for International Bank Account Number) is an internationally agreed code made up of up to 34 letters and numbers which helps banks make sure that international transfers are processed correctly. In just a few letters and numbers, the IBAN captures all of the country, bank, and account details you need to send or receive money internationally. This system is used throughout Europe, and also recognised in some areas of the Middle East, North Africa and the Caribbean. Find IBAN examples for every country where it's used.",
          },
          {
            id: 3,
            question: 'What is an international money transfer?',
            answer:
              'An international money transfer is when you send money from one country to another. This typically involves currency conversion and can be done through banks or money transfer services like Wise.',
          },
          {
            id: 4,
            question: "What's the best way to send money abroad?",
            answer:
              'The best way depends on speed, cost, and convenience. Wise offers transparent pricing with the real exchange rate, making it a cost-effective option for international transfers.',
          },
        ],
      }
    },
  }),
}

// Single Item Open by Default
export const DefaultOpen = {
  render: () => ({
    components: { Accordion },
    template: `
      <div class="max-w-4xl mx-auto">
        <h3 class="text-2xl font-semibold text-content-primary mb-6">
          Getting Started FAQs
        </h3>
        <Accordion :items="items" :default-open="1" />
      </div>
    `,
    data() {
      return {
        items: [
          {
            id: 1,
            question: 'How do I create an account?',
            answer:
              'Click the "Sign up" button and enter your email address. You can also sign up using Google or Facebook.',
          },
          {
            id: 2,
            question: 'What documents do I need?',
            answer:
              "You'll need a government-issued photo ID (passport, driver's license, or national ID card) and proof of address (bank statement or utility bill).",
          },
          {
            id: 3,
            question: 'How long does verification take?',
            answer:
              "Verification typically takes 1-2 business days. We'll email you once your account is verified.",
          },
        ],
      }
    },
  }),
}

// Allow Multiple Items Open
export const MultipleOpen = {
  render: () => ({
    components: { Accordion },
    template: `
      <div class="max-w-4xl mx-auto">
        <h3 class="text-2xl font-semibold text-content-primary mb-6">
          Account Settings
        </h3>
        <Accordion :items="items" :allow-multiple="true" />
      </div>
    `,
    data() {
      return {
        items: [
          {
            id: 1,
            question: 'How do I change my email address?',
            answer:
              'Go to Settings > Personal details > Email. Enter your new email and verify it.',
          },
          {
            id: 2,
            question: 'How do I change my password?',
            answer:
              'Go to Settings > Security > Password. Enter your current password and then your new password.',
          },
          {
            id: 3,
            question: 'How do I enable two-factor authentication?',
            answer:
              'Go to Settings > Security > Two-factor authentication. Follow the steps to set it up using your phone.',
          },
        ],
      }
    },
  }),
}

// With HTML Content
export const WithHTMLContent = {
  render: () => ({
    components: { Accordion },
    template: `
      <div class="max-w-4xl mx-auto">
        <h3 class="text-2xl font-semibold text-content-primary mb-6">
          Transfer Information
        </h3>
        <Accordion :items="items" />
      </div>
    `,
    data() {
      return {
        items: [
          {
            id: 1,
            question: 'What payment methods can I use?',
            answer: `
              <p class="mb-3">You can pay for your transfer using:</p>
              <ul class="list-disc pl-5 space-y-2">
                <li>Bank transfer (ACH, wire transfer)</li>
                <li>Debit card</li>
                <li>Credit card (additional fees may apply)</li>
                <li>Apple Pay or Google Pay</li>
              </ul>
            `,
          },
          {
            id: 2,
            question: 'How long does a transfer take?',
            answer: `
              <p class="mb-3">Transfer times vary by route and payment method:</p>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Instant transfers:</strong> Within seconds (selected routes)</li>
                <li><strong>Fast transfers:</strong> Within hours</li>
                <li><strong>Standard transfers:</strong> 1-2 business days</li>
              </ul>
              <p class="mt-3">We'll always show you the estimated delivery time before you confirm.</p>
            `,
          },
          {
            id: 3,
            question: 'Are there any limits on how much I can send?',
            answer: `
              <p class="mb-3">Yes, limits depend on:</p>
              <ul class="list-disc pl-5 space-y-2">
                <li>Your verification level</li>
                <li>The currency you're sending</li>
                <li>Your location</li>
              </ul>
              <p class="mt-3">You can view your limits in your account settings.</p>
            `,
          },
        ],
      }
    },
  }),
}

// Pricing FAQs
export const PricingFAQs = {
  render: () => ({
    components: { Accordion },
    template: `
      <div class="max-w-4xl mx-auto">
        <h3 class="text-2xl font-semibold text-content-primary mb-6">
          Pricing & Fees
        </h3>
        <Accordion :items="items" />
      </div>
    `,
    data() {
      return {
        items: [
          {
            id: 1,
            question: 'How much does Wise cost?',
            answer:
              'Our fees vary depending on the amount you send, the currencies involved, and how you pay. We always show you the exact fee before you confirm your transfer.',
          },
          {
            id: 2,
            question: 'What exchange rate do you use?',
            answer:
              'We use the mid-market exchange rate — the real exchange rate you see on Google. We never add a markup to the exchange rate.',
          },
          {
            id: 3,
            question: 'Are there any hidden fees?',
            answer:
              'No. We show you all fees upfront before you confirm your transfer. What you see is what you pay.',
          },
          {
            id: 4,
            question: 'How do your fees compare to banks?',
            answer:
              'Banks typically add a 3-5% markup to the exchange rate, which acts as a hidden fee. Wise uses the real exchange rate and charges a small, transparent fee — usually saving you money.',
          },
        ],
      }
    },
  }),
}

// Security FAQs
export const SecurityFAQs = {
  render: () => ({
    components: { Accordion },
    template: `
      <div class="max-w-4xl mx-auto">
        <h3 class="text-2xl font-semibold text-content-primary mb-6">
          Security & Safety
        </h3>
        <Accordion :items="items" />
      </div>
    `,
    data() {
      return {
        items: [
          {
            id: 1,
            question: 'Is Wise safe to use?',
            answer:
              'Yes. Wise is authorized and regulated by financial authorities around the world. We use bank-level security to protect your money and information.',
          },
          {
            id: 2,
            question: 'How is my money protected?',
            answer:
              "Your money is held in segregated accounts with top-tier banks. This means your money is kept separate from Wise's operating funds and is protected even if something happens to Wise.",
          },
          {
            id: 3,
            question: 'What security measures do you have?',
            answer:
              'We use 256-bit encryption, two-factor authentication, and continuous fraud monitoring to keep your account secure.',
          },
        ],
      }
    },
  }),
}

// Short Questions (Mobile Optimized)
export const MobileOptimized = {
  render: () => ({
    components: { Accordion },
    template: `
      <div class="max-w-4xl mx-auto">
        <h3 class="text-xl font-semibold text-content-primary mb-4">
          Quick Answers
        </h3>
        <Accordion :items="items" />
      </div>
    `,
    data() {
      return {
        items: [
          {
            id: 1,
            question: 'Is there a mobile app?',
            answer: 'Yes! Download the Wise app for iOS or Android.',
          },
          {
            id: 2,
            question: 'Can I cancel a transfer?',
            answer:
              'Yes, if we haven\'t sent your money yet. Go to your transfer and click "Cancel".',
          },
          {
            id: 3,
            question: 'Do you have customer support?',
            answer: '24/7 support via chat, email, and phone.',
          },
          {
            id: 4,
            question: 'What currencies do you support?',
            answer: 'We support 50+ currencies across 80+ countries.',
          },
        ],
      }
    },
  }),
}

// Complete Page Example
export const CompletePage = {
  render: () => ({
    components: { Accordion },
    template: `
      <div class="min-h-screen bg-lightbeige py-12 px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Header -->
          <div class="text-center mb-12">
            <h1 class="text-5xl font-bold text-content-primary mb-4 uppercase tracking-tight" style="font-family: var(--font-heading);">
              LET'S ANSWER SOME OF<br />YOUR QUESTIONS
            </h1>
            <p class="text-lg text-content-secondary">
              Can't find what you're looking for? <a href="/help" class="text-content-accent underline">Visit our help center</a>
            </p>
          </div>

          <!-- Accordion -->
          <div class="bg-white rounded-lg shadow-sm">
            <Accordion :items="faqItems" />
          </div>

          <!-- CTA -->
          <div class="text-center mt-12">
            <a
              href="/signup"
              class="inline-flex items-center justify-center px-8 py-4 bg-content-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors"
            >
              Get started with Wise
            </a>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        faqItems: [
          {
            id: 1,
            question: 'How much does it cost to get US dollar account details?',
            answer:
              "It's free to get US dollar account details with Wise. You can receive USD without any fees. However, there may be small fees when you convert currencies or use certain features.",
          },
          {
            id: 2,
            question: 'What is an IBAN?',
            answer:
              'IBAN (which stands for International Bank Account Number) is an internationally agreed code made up of up to 34 letters and numbers which helps banks make sure that international transfers are processed correctly. In just a few letters and numbers, the IBAN captures all of the country, bank, and account details you need to send or receive money internationally. This system is used throughout Europe, and also recognised in some areas of the Middle East, North Africa and the Caribbean.',
          },
          {
            id: 3,
            question: 'What is an international money transfer?',
            answer:
              'An international money transfer is when you send money from one country to another. This typically involves currency conversion and can be done through banks or money transfer services like Wise.',
          },
          {
            id: 4,
            question: "What's the best way to send money abroad?",
            answer:
              'The best way depends on speed, cost, and convenience. Wise offers transparent pricing with the real exchange rate, making it a cost-effective option for international transfers.',
          },
          {
            id: 5,
            question: 'How do I track my transfer?',
            answer:
              "You can track your transfer in real-time through the Wise app or website. We'll send you notifications at every stage of your transfer.",
          },
          {
            id: 6,
            question: 'Is Wise regulated?',
            answer:
              'Yes, Wise is regulated by financial authorities in every country we operate. Your money is protected by law and held in segregated accounts.',
          },
        ],
      }
    },
  }),
}
