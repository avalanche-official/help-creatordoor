import PromoCard from './PromoCard.vue'
import CircularButton from '../../product/CircularButtons/CircularButton.vue'

export default {
  title: 'UI/PromoCard',
  component: PromoCard,
  tags: ['autodocs'],
}

// Basic Promo Card
export const Basic = {
  render: () => ({
    components: { PromoCard },
    template: `
      <div class="max-w-4xl">
        <PromoCard
          title="DIGITAL"
          description="A card that lives online and works anywhere. Easy, secure, and always on hand."
          badge="Free"
        />
      </div>
    `,
  }),
}

// With Image
export const WithImage = {
  render: () => ({
    components: { PromoCard },
    template: `
      <div class="max-w-4xl">
        <PromoCard
          title="Get your Wise card"
          description="Spend in 150+ countries at the real exchange rate with no hidden fees."
          image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
          badge="Free delivery"
        />
      </div>
    `,
  }),
}

// With Circular Button Action (Wise Style!)
export const WithCircularButton = {
  render: () => ({
    components: { PromoCard, CircularButton },
    template: `
      <div class="max-w-4xl">
        <PromoCard
          title="DIGITAL"
          description="A card that lives online and works anywhere. Easy, secure, and always on hand."
          badge="Free"
        >
          <template #action>
            <CircularButton
              icon="→"
              label="Learn more"
              type="default"
              priority="primary"
              size="md"
            />
          </template>
        </PromoCard>
      </div>
    `,
  }),
}

// Clickable Card
export const ClickableCard = {
  render: () => ({
    components: { PromoCard },
    data() {
      return {
        clicked: false,
      }
    },
    template: `
      <div>
        <div class="max-w-4xl">
          <PromoCard
            title="Multi-currency account"
            description="Hold and convert 40+ currencies at the real exchange rate."
            badge="Popular"
            clickable
            @click="clicked = true"
          />
        </div>

        <p v-if="clicked" class="mt-4 p-3 bg-content-positive/10 rounded-lg text-sm">
          Card clicked!
        </p>
      </div>
    `,
  }),
}

// Card Grid (Desktop Layout)
export const CardGrid = {
  render: () => ({
    components: { PromoCard, CircularButton },
    template: `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <PromoCard
          title="DIGITAL"
          description="A card that lives online and works anywhere. Easy, secure, and always on hand."
          badge="Free"
        >
          <template #action>
            <CircularButton icon="→" label="Learn more" />
          </template>
        </PromoCard>

        <PromoCard
          title="PHYSICAL"
          description="A contactless debit card for everyday spending. Works everywhere Mastercard is accepted."
          badge="£5 one-time"
        >
          <template #action>
            <CircularButton icon="→" label="Learn more" />
          </template>
        </PromoCard>

        <PromoCard
          title="BUSINESS"
          description="Manage company expenses with corporate cards for your team."
          badge="New"
        >
          <template #action>
            <CircularButton icon="→" label="Learn more" />
          </template>
        </PromoCard>
      </div>
    `,
  }),
}

// Product Features (Wise Style!)
export const ProductFeatures = {
  render: () => ({
    components: { PromoCard, CircularButton },
    template: `
      <div>
        <h2 class="text-2xl font-semibold mb-6 text-content-primary">Choose your card</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PromoCard
            title="Digital card"
            description="A card that lives online and works anywhere. Easy, secure, and always on hand."
            image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
            badge="Free"
          >
            <template #action>
              <CircularButton icon="→" label="Get digital card" />
            </template>
          </PromoCard>

          <PromoCard
            title="Physical card"
            description="A contactless debit card for everyday spending in 150+ countries."
            image="https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=400&h=300&fit=crop"
            badge="£5 delivery"
          >
            <template #action>
              <CircularButton icon="→" label="Order card" />
            </template>
          </PromoCard>
        </div>
      </div>
    `,
  }),
}

// With Action Link
export const WithActionLink = {
  render: () => ({
    components: { PromoCard },
    template: `
      <div class="max-w-4xl">
        <PromoCard
          title="Invite friends"
          description="Get £50 when you invite 3 friends who each transfer £200 or more."
          badge="Limited time"
          action="Learn more"
        />
      </div>
    `,
  }),
}

// Features Showcase
export const FeaturesShowcase = {
  render: () => ({
    components: { PromoCard },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PromoCard
          title="Low fees"
          description="Save up to 8x compared to banks. No hidden charges, no surprises."
          badge="Save money"
          action="See pricing"
        />

        <PromoCard
          title="Fast transfers"
          description="Most transfers arrive within 1-2 business days. Some arrive instantly."
          badge="Quick"
          action="Learn more"
        />

        <PromoCard
          title="Real exchange rate"
          description="Get the same rate you see on Google. We never markup the exchange rate."
          badge="Transparent"
          action="How it works"
        />
      </div>
    `,
  }),
}

// Stacked Mobile Layout
export const StackedMobile = {
  render: () => ({
    components: { PromoCard, CircularButton },
    template: `
      <div class="max-w-4xl space-y-4">
        <PromoCard
          title="Send money"
          description="Transfer money to 80+ countries at the real exchange rate."
          badge="Popular"
        >
          <template #action>
            <CircularButton icon="→" label="Send now" />
          </template>
        </PromoCard>

        <PromoCard
          title="Get paid"
          description="Receive money from abroad with local bank details in 10 currencies."
          badge="Free"
        >
          <template #action>
            <CircularButton icon="→" label="Get details" />
          </template>
        </PromoCard>

        <PromoCard
          title="Hold money"
          description="Keep and manage money in 40+ currencies in your Wise account."
          badge="Multi-currency"
        >
          <template #action>
            <CircularButton icon="→" label="Open account" />
          </template>
        </PromoCard>
      </div>
    `,
  }),
}

// Without Badge
export const WithoutBadge = {
  render: () => ({
    components: { PromoCard, CircularButton },
    template: `
      <div class="max-w-4xl">
        <PromoCard
          title="Travel money card"
          description="Spend abroad like a local. No foreign transaction fees, ever."
        >
          <template #action>
            <CircularButton icon="→" label="Get started" />
          </template>
        </PromoCard>
      </div>
    `,
  }),
}

// Long Content (Accessibility)
export const LongContent = {
  render: () => ({
    components: { PromoCard, CircularButton },
    template: `
      <div class="max-w-4xl">
        <PromoCard
          title="International Business Account with Multi-Currency Support"
          description="Manage your global business finances with ease. Hold, send, and receive money in over 40 currencies with the real exchange rate. No hidden fees, no surprises. Perfect for international businesses and freelancers working with clients worldwide."
          badge="Business"
        >
          <template #action>
            <CircularButton icon="→" label="Learn more" />
          </template>
        </PromoCard>
      </div>
    `,
  }),
}

// All Variants
export const AllVariants = {
  render: () => ({
    components: { PromoCard, CircularButton },
    template: `
      <div class="space-y-8">
        <!-- Basic -->
        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">Basic Card</h3>
          <div class="max-w-4xl">
            <PromoCard
              title="Title only"
              description="Simple card with just title and description."
            />
          </div>
        </div>

        <!-- With Badge -->
        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">With Badge</h3>
          <div class="max-w-4xl">
            <PromoCard
              title="With badge"
              description="Card with a badge label for highlighting status."
              badge="Free"
            />
          </div>
        </div>

        <!-- With Action Button -->
        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">With Circular Button</h3>
          <div class="max-w-4xl">
            <PromoCard
              title="With action"
              description="Card with a circular button for navigation."
              badge="Popular"
            >
              <template #action>
                <CircularButton icon="→" label="Go" />
              </template>
            </PromoCard>
          </div>
        </div>

        <!-- With Image -->
        <div>
          <h3 class="text-sm font-semibold mb-3 text-content-secondary">With Image</h3>
          <div class="max-w-4xl">
            <PromoCard
              title="With image"
              description="Card with a featured image at the top."
              image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
              badge="Featured"
            >
              <template #action>
                <CircularButton icon="→" label="View" />
              </template>
            </PromoCard>
          </div>
        </div>
      </div>
    `,
  }),
}
