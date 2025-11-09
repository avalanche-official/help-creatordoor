import TextStack from './TextStack.vue'

export default {
  title: 'Editorial/TextStack',
  component: TextStack,
  tags: ['autodocs'],
}

// Light Theme (like the screenshot)
export const LightTheme = {
  render: () => ({
    components: { TextStack },
    template: `
      <TextStack
        headline="BEST WAYS TO SEND MONEY INTERNATIONALLY"
        :items="[
          {
            title: 'PISP',
            description: '<strong>PISP (Payment Initiation Service Provider)</strong> payments are instructions you give Wise to make a bank transfer directly from your bank account — without having to leave our app and log in to your online banking. This option is as cheap as a manual bank transfer, but it isn\\'t supported by all banks yet.'
          },
          {
            title: 'Bank Transfer',
            description: 'Bank transfers are usually the cheapest option when it comes to funding your international money transfer with Wise. Bank transfers can be slower than debit or credit cards, but they usually give you the best value for your money. <a href="#">Read more how to use bank transfers as a payment option</a>.'
          },
          {
            title: 'Swift',
            description: 'Using <strong>Swift</strong> to fund your transfer usually means that your transfer will take longer and be more expensive, as your bank will charge a fee. You should also bear in mind that other correspondent banks in between may also deduct their handling fees. Your bank should be able to advise on those fees.'
          },
          {
            title: 'Debit Card',
            description: 'Paying by debit card is usually instant, but your bank may charge a fee for this payment method. Check with your bank about any fees before choosing this option.'
          },
          {
            title: 'Credit Card',
            description: 'Credit card payments are processed quickly, but they typically come with higher fees. Your credit card provider may also treat this as a cash advance, which could incur additional charges.'
          }
        ]"
        theme="light"
        :initialVisibleCount="3"
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { TextStack },
    template: `
      <TextStack
        headline="BEST WAYS TO SEND MONEY INTERNATIONALLY"
        :items="[
          {
            title: 'PISP',
            description: '<strong>PISP (Payment Initiation Service Provider)</strong> payments are instructions you give Wise to make a bank transfer directly from your bank account — without having to leave our app and log in to your online banking. This option is as cheap as a manual bank transfer, but it isn\\'t supported by all banks yet.'
          },
          {
            title: 'Bank Transfer',
            description: 'Bank transfers are usually the cheapest option when it comes to funding your international money transfer with Wise. Bank transfers can be slower than debit or credit cards, but they usually give you the best value for your money. <a href="#">Read more how to use bank transfers as a payment option</a>.'
          },
          {
            title: 'Swift',
            description: 'Using <strong>Swift</strong> to fund your transfer usually means that your transfer will take longer and be more expensive, as your bank will charge a fee. You should also bear in mind that other correspondent banks in between may also deduct their handling fees. Your bank should be able to advise on those fees.'
          },
          {
            title: 'Debit Card',
            description: 'Paying by debit card is usually instant, but your bank may charge a fee for this payment method. Check with your bank about any fees before choosing this option.'
          }
        ]"
        theme="forest-green"
        :initialVisibleCount="3"
      />
    `,
  }),
}

// FAQ Example
export const FAQ = {
  render: () => ({
    components: { TextStack },
    template: `
      <TextStack
        headline="FREQUENTLY ASKED QUESTIONS"
        :items="[
          {
            title: 'How long do transfers take?',
            description: 'Most transfers are completed within 24 hours. However, the exact time depends on the currencies involved and the payment method you choose. Some transfers can arrive in seconds, while others may take a few days.'
          },
          {
            title: 'What are the fees?',
            description: 'We charge a small, transparent fee for each transfer. The exact fee depends on the amount you\\'re sending, the currencies involved, and how you pay. You\\'ll always see the total cost upfront before you confirm your transfer. <a href="#">View our pricing</a>.'
          },
          {
            title: 'Is my money safe?',
            description: 'Yes. We\\'re regulated by the <strong>Financial Conduct Authority (FCA)</strong> in the UK, and your money is safeguarded in accordance with regulations. This means your funds are held separately from our own company funds.'
          },
          {
            title: 'How do I track my transfer?',
            description: 'You can track your transfer in real-time using our app or website. We\\'ll send you notifications at each stage of the transfer, so you always know where your money is.'
          },
          {
            title: 'What currencies do you support?',
            description: 'We support over 50 currencies and can send money to more than 80 countries. You can also hold money in your Wise account in multiple currencies.'
          }
        ]"
        theme="light"
        :initialVisibleCount="3"
      />
    `,
  }),
}

// Product Features
export const ProductFeatures = {
  render: () => ({
    components: { TextStack },
    template: `
      <TextStack
        headline="WISE ACCOUNT FEATURES"
        :items="[
          {
            title: 'Multi-currency account',
            description: 'Hold and manage money in 50+ currencies. Get local bank details for 10 currencies including GBP, EUR, USD, AUD, and more. Receive payments like a local without the fees.'
          },
          {
            title: 'Debit card',
            description: 'Spend in 150+ countries with the real exchange rate. Withdraw cash from ATMs worldwide with low fees. Order your card for a one-time fee and start spending abroad without hidden charges.'
          },
          {
            title: 'Business features',
            description: 'Get batch payments, accounting integrations, and multi-user access. Pay employees and suppliers globally. Perfect for freelancers, small businesses, and large enterprises.'
          }
        ]"
        theme="light"
        :initialVisibleCount="3"
      />
    `,
  }),
}

// Comparison Guide
export const ComparisonGuide = {
  render: () => ({
    components: { TextStack },
    template: `
      <TextStack
        headline="WISE VS TRADITIONAL BANKS"
        :items="[
          {
            title: 'Exchange rates',
            description: 'Wise uses the <strong>real mid-market rate</strong> — the same rate you see on Google. Banks typically add a markup of 3-6% on top of the exchange rate, which means you get less money for your transfer.'
          },
          {
            title: 'Fees',
            description: 'We charge a small, upfront fee that you can see before you transfer. Banks often hide their fees in the exchange rate markup, making it hard to know what you\\'re really paying. <a href="#">Compare our fees</a>.'
          },
          {
            title: 'Speed',
            description: 'Most Wise transfers complete within 24 hours, and many arrive in seconds. Traditional bank transfers can take 3-5 business days or longer, especially for international transfers.'
          },
          {
            title: 'Transparency',
            description: 'You always know exactly what you\\'re paying and when your money will arrive. Banks rarely provide this level of transparency, making it difficult to understand the true cost of your transfer.'
          }
        ]"
        theme="forest-green"
        :initialVisibleCount="2"
      />
    `,
  }),
}

// All Items Visible
export const AllItemsVisible = {
  render: () => ({
    components: { TextStack },
    template: `
      <TextStack
        headline="PAYMENT METHODS"
        :items="[
          {
            title: 'Bank Transfer',
            description: 'The most cost-effective way to fund your Wise transfer. Simply transfer money from your bank account to your Wise account.'
          },
          {
            title: 'Debit Card',
            description: 'Quick and convenient. Your transfer is processed immediately, though your bank may charge a small fee.'
          },
          {
            title: 'Credit Card',
            description: 'Instant processing but higher fees. Your credit card provider may also charge cash advance fees.'
          }
        ]"
        theme="light"
        :initialVisibleCount="5"
      />
    `,
  }),
}
