import Popover from './Popover.vue'

export default {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
}

// Basic Popover
export const Basic = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="flex items-center gap-2">
          <span>Hover over the icon</span>
          <Popover
            content="This is some helpful information that provides extra context."
          />
        </div>
      </div>
    `,
  }),
}

// With Title (Definition)
export const WithTitle = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="flex items-center gap-2">
          <span>What is a SWIFT code?</span>
          <Popover
            title="SWIFT code"
            content="A SWIFT code is an international bank code that identifies particular banks worldwide. It's used when transferring money between banks."
          />
        </div>
      </div>
    `,
  }),
}

// Different Placements
export const Placements = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center min-h-[600px]">
        <div class="grid grid-cols-2 gap-12">
          <div class="flex items-center gap-2">
            <span>Top placement</span>
            <Popover
              placement="top"
              content="This popover appears above the trigger button."
            />
          </div>

          <div class="flex items-center gap-2">
            <span>Bottom placement</span>
            <Popover
              placement="bottom"
              content="This popover appears below the trigger button."
            />
          </div>

          <div class="flex items-center gap-2">
            <span>Left placement</span>
            <Popover
              placement="left"
              content="This popover appears to the left of the trigger button."
            />
          </div>

          <div class="flex items-center gap-2">
            <span>Right placement</span>
            <Popover
              placement="right"
              content="This popover appears to the right of the trigger button."
            />
          </div>
        </div>
      </div>
    `,
  }),
}

// Guaranteed Rate (Wise Style!)
export const GuaranteedRate = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="flex items-center gap-2">
          <span class="font-medium">Guaranteed rate</span>
          <Popover
            title="Guaranteed rate"
            content="You'll get this rate as long as we receive your 10 EUR within the next 51 hours."
            placement="top"
          />
        </div>
      </div>
    `,
  }),
}

// Transfer Fee Explanation
export const TransferFeeExplanation = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="p-6 bg-white border border-border-default rounded-lg max-w-4xl">
          <div class="flex items-center justify-between mb-4">
            <span class="text-content-secondary">Transfer fee</span>
            <div class="flex items-center gap-2">
              <span class="font-semibold">£2.50</span>
              <Popover
                content="This covers our costs of processing your transfer. There are no hidden fees."
                max-width="280px"
              />
            </div>
          </div>

          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <span class="text-content-secondary">Exchange rate</span>
              <Popover
                title="Real exchange rate"
                content="This is the mid-market rate. We don't add any markup - you get the same rate you see on Google."
                max-width="280px"
              />
            </div>
            <span class="font-semibold">1.2456</span>
          </div>

          <div class="border-t pt-4 flex items-center justify-between">
            <span class="font-medium">Total to pay</span>
            <span class="text-xl font-bold">£502.50</span>
          </div>
        </div>
      </div>
    `,
  }),
}

// Account Types with Definitions
export const AccountTypesWithDefinitions = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center min-h-[500px]">
        <div class="max-w-4xl space-y-4">
          <div class="p-4 bg-white border border-border-default rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold">Personal account</h3>
                <Popover
                  title="Personal account"
                  content="For personal use - send, spend and receive money for everyday transactions."
                  placement="right"
                />
              </div>
              <span class="text-sm text-content-positive">Free</span>
            </div>
            <p class="text-sm text-content-secondary">
              Send money to 80+ countries
            </p>
          </div>

          <div class="p-4 bg-white border border-border-default rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold">Business account</h3>
                <Popover
                  title="Business account"
                  content="For companies and freelancers - manage international payments and hold multiple currencies."
                  placement="right"
                />
              </div>
              <span class="text-sm text-content-positive">Free</span>
            </div>
            <p class="text-sm text-content-secondary">
              Batch payments and accounting integrations
            </p>
          </div>
        </div>
      </div>
    `,
  }),
}

// Form with Help Text
export const FormWithHelpText = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center min-h-[500px]">
        <div class="max-w-4xl w-full p-6 bg-white border border-border-default rounded-lg">
          <h2 class="text-xl font-semibold mb-6">Add recipient</h2>

          <div class="space-y-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <label class="text-sm font-medium">IBAN</label>
                <Popover
                  title="IBAN"
                  content="International Bank Account Number - a unique code that identifies your recipient's bank account."
                  placement="right"
                  max-width="250px"
                />
              </div>
              <input
                type="text"
                placeholder="GB29 NWBK 6016 1331 9268 19"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <div class="flex items-center gap-2 mb-2">
                <label class="text-sm font-medium">SWIFT/BIC code</label>
                <Popover
                  title="SWIFT/BIC"
                  content="A code that identifies your recipient's bank internationally. Usually 8-11 characters."
                  placement="right"
                  max-width="250px"
                />
              </div>
              <input
                type="text"
                placeholder="NWBKGB2L"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// With Custom Trigger
export const WithCustomTrigger = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center min-h-[400px]">
        <Popover
          content="This popover is triggered by a custom button."
          placement="top"
        >
          <template #trigger>
            <button class="px-4 py-2 bg-content-accent text-white rounded-lg hover:opacity-90">
              Click me
            </button>
          </template>
        </Popover>
      </div>
    `,
  }),
}

// Long Content
export const LongContent = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="flex items-center gap-2">
          <span>Multi-currency account</span>
          <Popover
            title="Multi-currency account"
            content="Hold and manage money in over 40 currencies. Convert between them at the real exchange rate whenever you need to. Perfect for people who live, work, or travel internationally."
            max-width="320px"
          />
        </div>
      </div>
    `,
  }),
}

// Multiple Popovers
export const MultiplePopovers = {
  render: () => ({
    components: { Popover },
    template: `
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="space-y-4 max-w-4xl">
          <div class="flex items-center justify-between p-3 bg-background-elevated rounded-lg">
            <div class="flex items-center gap-2">
              <span>Low fees</span>
              <Popover
                content="Save up to 8x compared to traditional banks."
                placement="right"
              />
            </div>
            <span class="text-content-positive">✓</span>
          </div>

          <div class="flex items-center justify-between p-3 bg-background-elevated rounded-lg">
            <div class="flex items-center gap-2">
              <span>Fast transfers</span>
              <Popover
                content="Most transfers arrive within 1-2 business days."
                placement="right"
              />
            </div>
            <span class="text-content-positive">✓</span>
          </div>

          <div class="flex items-center justify-between p-3 bg-background-elevated rounded-lg">
            <div class="flex items-center gap-2">
              <span>Real exchange rate</span>
              <Popover
                title="Mid-market rate"
                content="The exchange rate you see on Google. No markup, no hidden fees."
                placement="right"
              />
            </div>
            <span class="text-content-positive">✓</span>
          </div>
        </div>
      </div>
    `,
  }),
}
