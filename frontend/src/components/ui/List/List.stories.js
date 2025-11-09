import List from './List.vue'
import ListItem from './ListItem.vue'
import Card from '../../product/Card/Card.vue'

export default {
  title: 'UI/List',
  component: List,
  tags: ['autodocs'],
}

// Simple Text List
export const SimpleList = {
  render: () => ({
    components: { List, ListItem },
    template: `
      <Card class="max-w-md">
        <List>
          <ListItem>First item</ListItem>
          <ListItem>Second item</ListItem>
          <ListItem>Third item</ListItem>
          <ListItem>Fourth item</ListItem>
        </List>
      </Card>
    `,
  }),
}

// Interactive List (Clickable Items)
export const InteractiveList = {
  render: () => ({
    components: { List, ListItem },
    template: `
      <Card class="max-w-md">
        <List>
          <ListItem interactive>
            <span class="text-content-primary font-medium">Dashboard</span>
          </ListItem>
          <ListItem interactive>
            <span class="text-content-primary font-medium">Transactions</span>
          </ListItem>
          <ListItem interactive>
            <span class="text-content-primary font-medium">Recipients</span>
          </ListItem>
          <ListItem interactive>
            <span class="text-content-primary font-medium">Settings</span>
          </ListItem>
        </List>
      </Card>
    `,
  }),
}

// List with Icons
export const ListWithIcons = {
  render: () => ({
    components: { List, ListItem },
    template: `
      <Card class="max-w-md">
        <List>
          <ListItem interactive>
            <div class="flex items-center gap-3 w-full">
              <div class="w-10 h-10 bg-content-accent/10 rounded-full flex items-center justify-center text-content-accent">
                💰
              </div>
              <div class="flex-1">
                <p class="font-medium text-content-primary">Send Money</p>
                <p class="text-sm text-content-secondary">Transfer to anyone</p>
              </div>
              <span class="text-content-tertiary">→</span>
            </div>
          </ListItem>
          <ListItem interactive>
            <div class="flex items-center gap-3 w-full">
              <div class="w-10 h-10 bg-content-positive/10 rounded-full flex items-center justify-center text-content-positive">
                📊
              </div>
              <div class="flex-1">
                <p class="font-medium text-content-primary">View Balance</p>
                <p class="text-sm text-content-secondary">Check your account</p>
              </div>
              <span class="text-content-tertiary">→</span>
            </div>
          </ListItem>
          <ListItem interactive>
            <div class="flex items-center gap-3 w-full">
              <div class="w-10 h-10 bg-content-warning/10 rounded-full flex items-center justify-center text-content-warning">
                🔔
              </div>
              <div class="flex-1">
                <p class="font-medium text-content-primary">Notifications</p>
                <p class="text-sm text-content-secondary">Manage alerts</p>
              </div>
              <span class="text-content-tertiary">→</span>
            </div>
          </ListItem>
        </List>
      </Card>
    `,
  }),
}

// Transaction History List (Wise Style!)
export const TransactionList = {
  render: () => ({
    components: { List, ListItem },
    template: `
      <Card class="max-w-2xl">
        <h3 class="text-lg font-semibold text-content-primary mb-4 px-4">Recent Transactions</h3>
        <List>
          <ListItem interactive>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-content-positive/10 rounded-full flex items-center justify-center">
                  <span class="text-content-positive font-bold">↓</span>
                </div>
                <div>
                  <p class="font-medium text-content-primary">Money received</p>
                  <p class="text-sm text-content-secondary">From Jane Smith</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-content-positive">+$250.00</p>
                <p class="text-xs text-content-tertiary">Today, 2:30 PM</p>
              </div>
            </div>
          </ListItem>
          <ListItem interactive>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-content-negative/10 rounded-full flex items-center justify-center">
                  <span class="text-content-negative font-bold">↑</span>
                </div>
                <div>
                  <p class="font-medium text-content-primary">Money sent</p>
                  <p class="text-sm text-content-secondary">To John Doe</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-content-negative">-$120.50</p>
                <p class="text-xs text-content-tertiary">Yesterday, 4:15 PM</p>
              </div>
            </div>
          </ListItem>
          <ListItem interactive>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-content-accent/10 rounded-full flex items-center justify-center">
                  <span class="text-content-accent font-bold">↻</span>
                </div>
                <div>
                  <p class="font-medium text-content-primary">Currency exchange</p>
                  <p class="text-sm text-content-secondary">USD to EUR</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-content-primary">€450.00</p>
                <p class="text-xs text-content-tertiary">Dec 8, 10:20 AM</p>
              </div>
            </div>
          </ListItem>
          <ListItem interactive>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-content-positive/10 rounded-full flex items-center justify-center">
                  <span class="text-content-positive font-bold">↓</span>
                </div>
                <div>
                  <p class="font-medium text-content-primary">Salary deposit</p>
                  <p class="text-sm text-content-secondary">From Company Inc.</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-content-positive">+$3,500.00</p>
                <p class="text-xs text-content-tertiary">Dec 1, 9:00 AM</p>
              </div>
            </div>
          </ListItem>
        </List>
      </Card>
    `,
  }),
}

// Settings List
export const SettingsList = {
  render: () => ({
    components: { List, ListItem },
    template: `
      <Card class="max-w-md">
        <h3 class="text-lg font-semibold text-content-primary mb-4 px-4">Account Settings</h3>
        <List>
          <ListItem interactive>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-3">
                <span class="text-xl">👤</span>
                <span class="text-content-primary font-medium">Profile</span>
              </div>
              <span class="text-content-tertiary">→</span>
            </div>
          </ListItem>
          <ListItem interactive>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-3">
                <span class="text-xl">🔒</span>
                <span class="text-content-primary font-medium">Security</span>
              </div>
              <span class="text-content-tertiary">→</span>
            </div>
          </ListItem>
          <ListItem interactive>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-3">
                <span class="text-xl">🔔</span>
                <span class="text-content-primary font-medium">Notifications</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-content-positive">On</span>
                <span class="text-content-tertiary">→</span>
              </div>
            </div>
          </ListItem>
          <ListItem interactive disabled>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-3">
                <span class="text-xl">💳</span>
                <span class="text-content-primary font-medium">Payment Methods</span>
              </div>
              <span class="text-content-tertiary">→</span>
            </div>
          </ListItem>
        </List>
      </Card>
    `,
  }),
}

// List Without Dividers
export const NoDividers = {
  render: () => ({
    components: { List, ListItem },
    template: `
      <Card class="max-w-md">
        <List :divided="false" spacing="sm">
          <ListItem interactive>
            <span class="text-content-primary">Item without dividers</span>
          </ListItem>
          <ListItem interactive>
            <span class="text-content-primary">Clean and minimal</span>
          </ListItem>
          <ListItem interactive>
            <span class="text-content-primary">Perfect for navigation</span>
          </ListItem>
        </List>
      </Card>
    `,
  }),
}

// Recipients List
export const RecipientsList = {
  render: () => ({
    components: { List, ListItem },
    template: `
      <Card class="max-w-md">
        <h3 class="text-lg font-semibold text-content-primary mb-4 px-4">Saved Recipients</h3>
        <List>
          <ListItem interactive>
            <div class="flex items-center gap-3 w-full">
              <div class="w-12 h-12 bg-gradient-to-br from-content-accent to-content-positive rounded-full flex items-center justify-center text-white font-bold">
                JS
              </div>
              <div class="flex-1">
                <p class="font-medium text-content-primary">Jane Smith</p>
                <p class="text-sm text-content-secondary">jane@example.com</p>
              </div>
              <span class="text-content-tertiary">→</span>
            </div>
          </ListItem>
          <ListItem interactive>
            <div class="flex items-center gap-3 w-full">
              <div class="w-12 h-12 bg-gradient-to-br from-content-positive to-content-warning rounded-full flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div class="flex-1">
                <p class="font-medium text-content-primary">John Doe</p>
                <p class="text-sm text-content-secondary">john@example.com</p>
              </div>
              <span class="text-content-tertiary">→</span>
            </div>
          </ListItem>
          <ListItem interactive>
            <div class="flex items-center gap-3 w-full">
              <div class="w-12 h-12 bg-gradient-to-br from-content-negative to-content-accent rounded-full flex items-center justify-center text-white font-bold">
                AB
              </div>
              <div class="flex-1">
                <p class="font-medium text-content-primary">Alice Brown</p>
                <p class="text-sm text-content-secondary">alice@example.com</p>
              </div>
              <span class="text-content-tertiary">→</span>
            </div>
          </ListItem>
        </List>
      </Card>
    `,
  }),
}
