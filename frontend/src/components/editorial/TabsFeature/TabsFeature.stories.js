import TabsFeature from './TabsFeature.vue'

export default {
  title: 'Editorial/TabsFeature',
  component: TabsFeature,
  tags: ['autodocs'],
}

// Default Example (like the screenshot)
export const Default = {
  render: () => ({
    components: { TabsFeature },
    template: `
      <TabsFeature
        headline="For big money transfers at life's big moments"
        :tabs="[
          {
            value: 'property',
            label: 'Property purchase',
            title: 'Selling in one country to buy a home in another',
            description: 'If you\\'re selling up overseas to fund buying a home in your country of residence, our team of experts are ready to help. We regularly work with people who want to safely move big money from one country to another so they can complete a property purchase.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=1000&fit=crop&q=80',
            alt: 'A woman holding a Wise card on a city street',
            buttons: [
              { label: 'Learn more', href: '#' }
            ]
          },
          {
            value: 'inheritance',
            label: 'Early inheritance',
            title: 'Receiving funds from family abroad',
            description: 'Moving money across borders for family support or early inheritance can be complex. Our platform makes it simple and transparent, ensuring your funds arrive safely and quickly with competitive exchange rates.',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1000&fit=crop&q=80',
            alt: 'Family members discussing financial matters',
            buttons: [
              { label: 'Get started', href: '#' }
            ]
          },
          {
            value: 'stock',
            label: 'Stock option',
            title: 'Converting stock options to your home currency',
            description: 'Cashing out stock options from international companies? Transfer large amounts with confidence using our secure platform designed for significant financial transactions.',
            image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=1000&fit=crop&q=80',
            alt: 'Person reviewing stock portfolio on laptop',
            buttons: [
              { label: 'Learn more', href: '#' }
            ]
          }
        ]"
        imagePosition="left"
      />
    `,
  }),
}

// Business Use Cases
export const BusinessUseCases = {
  render: () => ({
    components: { TabsFeature },
    template: `
      <TabsFeature
        headline="Powerful solutions for your business"
        :tabs="[
          {
            value: 'payroll',
            label: 'Global payroll',
            title: 'Pay your international team with ease',
            description: 'Manage payroll for employees across multiple countries. Send payments in local currencies quickly and affordably, ensuring your team gets paid on time, every time.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=1000&fit=crop&q=80',
            alt: 'Business professional working on laptop',
            buttons: [
              { label: 'Explore payroll', href: '#' },
              { label: 'Contact sales', href: '#' }
            ]
          },
          {
            value: 'suppliers',
            label: 'Supplier payments',
            title: 'Pay international suppliers efficiently',
            description: 'Streamline your supply chain with fast, low-cost international payments. Pay suppliers in their local currency and track all transactions in one place.',
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=1000&fit=crop&q=80',
            alt: 'Warehouse with inventory and supplies',
            buttons: [
              { label: 'Learn more', href: '#' }
            ]
          },
          {
            value: 'expenses',
            label: 'Business expenses',
            title: 'Manage team expenses globally',
            description: 'Issue company cards to your team and manage international business expenses with full visibility and control over spending.',
            image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&h=1000&fit=crop&q=80',
            alt: 'Person using business card for payment',
            buttons: [
              { label: 'Get started', href: '#' }
            ]
          }
        ]"
        imagePosition="right"
      />
    `,
  }),
}

// Personal Finance Features
export const PersonalFinance = {
  render: () => ({
    components: { TabsFeature },
    template: `
      <TabsFeature
        headline="Manage your money across borders"
        :tabs="[
          {
            value: 'transfer',
            label: 'Money transfer',
            title: 'Send money internationally',
            description: 'Transfer money abroad quickly and securely. Get the real exchange rate with low, transparent fees. Your money arrives in hours or days, depending on the currency.',
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=1000&fit=crop&q=80',
            alt: 'Person using phone to send money',
            buttons: [
              { label: 'Send money', href: '#' }
            ]
          },
          {
            value: 'account',
            label: 'Multi-currency account',
            title: 'Hold money in 40+ currencies',
            description: 'Open account details in multiple currencies. Hold, receive, and manage money like a local in countries around the world.',
            image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=1000&fit=crop&q=80',
            alt: 'Wise debit card on table',
            buttons: [
              { label: 'Open account', href: '#' }
            ]
          },
          {
            value: 'card',
            label: 'Debit card',
            title: 'Spend abroad without hidden fees',
            description: 'Use your Wise card to spend in 150+ countries. Always get the real exchange rate with low fees, and withdraw cash from ATMs worldwide.',
            image: 'https://images.unsplash.com/photo-1580458148391-8b7edf674c95?w=800&h=1000&fit=crop&q=80',
            alt: 'Woman using Wise card at ATM',
            buttons: [
              { label: 'Order card', href: '#' }
            ]
          }
        ]"
        imagePosition="left"
      />
    `,
  }),
}

// Travel Scenarios
export const TravelScenarios = {
  render: () => ({
    components: { TabsFeature },
    template: `
      <TabsFeature
        headline="Travel smarter with Wise"
        :tabs="[
          {
            value: 'vacation',
            label: 'Vacation',
            title: 'Enjoy your holiday without money worries',
            description: 'Load your account with multiple currencies before you travel. Pay like a local and avoid expensive tourist exchange rates and hidden bank fees.',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=1000&fit=crop&q=80',
            alt: 'Traveler with luggage at airport',
            buttons: [
              { label: 'Plan your trip', href: '#' }
            ]
          },
          {
            value: 'student',
            label: 'Study abroad',
            title: 'Student-friendly international banking',
            description: 'Pay tuition fees, rent, and living expenses abroad without the high costs. Get local account details for work payments and manage your budget in multiple currencies.',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=1000&fit=crop&q=80',
            alt: 'Student studying with laptop',
            buttons: [
              { label: 'Learn more', href: '#' }
            ]
          },
          {
            value: 'expat',
            label: 'Living abroad',
            title: 'Banking made easy for expats',
            description: 'Receive your salary, pay bills, and send money home. Hold money in your home currency and your new local currency in one account.',
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop&q=80',
            alt: 'Expat working remotely in cafe',
            buttons: [
              { label: 'Get started', href: '#' }
            ]
          }
        ]"
        imagePosition="right"
      />
    `,
  }),
}

// Without Buttons
export const WithoutButtons = {
  render: () => ({
    components: { TabsFeature },
    template: `
      <TabsFeature
        headline="Short and snappy title"
        :tabs="[
          {
            value: 'option1',
            label: 'Property purchase',
            title: 'Short and snappy title',
            description: 'Secondary copy can go here to further explain the feature or benefit. It should be fairly short as to not overwhelm the user, but long enough to accurately explain the feature.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=1000&fit=crop&q=80',
            alt: 'A woman holding a Wise card on a city street'
          },
          {
            value: 'option2',
            label: 'Early inheritance',
            title: 'Another compelling headline',
            description: 'More information about this particular feature or use case. Keep it concise but informative to maintain user engagement.',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=1000&fit=crop&q=80',
            alt: 'Family members discussing financial matters'
          }
        ]"
        imagePosition="left"
      />
    `,
  }),
}

// Two Tabs Minimum
export const TwoTabs = {
  render: () => ({
    components: { TabsFeature },
    template: `
      <TabsFeature
        headline="Compare your options"
        :tabs="[
          {
            value: 'personal',
            label: 'Personal',
            title: 'For individuals and families',
            description: 'Send money internationally, hold multiple currencies, and spend abroad with the Wise card. Perfect for personal use, travel, and managing money across borders.',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1000&fit=crop&q=80',
            alt: 'Person using Wise app on phone',
            buttons: [
              { label: 'Get started', href: '#' }
            ]
          },
          {
            value: 'business',
            label: 'Business',
            title: 'For companies and freelancers',
            description: 'Manage international payroll, pay suppliers globally, and receive payments from clients worldwide. Built for businesses of all sizes.',
            image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&h=1000&fit=crop&q=80',
            alt: 'Business team collaborating',
            buttons: [
              { label: 'Explore business', href: '#' }
            ]
          }
        ]"
        imagePosition="right"
      />
    `,
  }),
}
