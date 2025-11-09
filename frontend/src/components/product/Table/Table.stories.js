import Table from './Table.vue'
import TableHeader from './TableHeader.vue'
import TableRow from './TableRow.vue'
import TableCell from './TableCell.vue'

export default {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
}

// Basic Table
export const Basic = {
  render: () => ({
    components: { Table, TableHeader, TableRow, TableCell },
    template: `
      <Table>
        <TableHeader>
          <TableCell type="header">Name</TableCell>
          <TableCell type="header">Email</TableCell>
          <TableCell type="header">Role</TableCell>
        </TableHeader>
        <tbody>
          <TableRow>
            <TableCell type="leading">John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell type="leading">Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
          <TableRow>
            <TableCell type="leading">Bob Johnson</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>Editor</TableCell>
          </TableRow>
        </tbody>
      </Table>
    `,
  }),
}

// Payments Table (Wise Style! 🎯)
export const PaymentsTable = {
  render: () => ({
    components: { Table, TableHeader, TableRow, TableCell },
    template: `
      <Table>
        <TableHeader>
          <TableCell type="header">Payment</TableCell>
          <TableCell type="header">Due</TableCell>
          <TableCell type="header">Amount</TableCell>
          <TableCell type="header">Status</TableCell>
        </TableHeader>
        <tbody>
          <TableRow>
            <TableCell type="leading">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                  CP
                </div>
                <div>
                  <div class="font-semibold">Christie Pepper</div>
                  <div class="text-sm text-content-secondary">Website design</div>
                </div>
              </div>
            </TableCell>
            <TableCell>11 Oct 2024</TableCell>
            <TableCell type="currency">
              <div class="flex items-center justify-end gap-2">
                <span>3,582.00 EUR</span>
                <span class="text-xl">🇪🇺</span>
              </div>
            </TableCell>
            <TableCell type="status" status="warning">
              <div>
                <div>Overdue</div>
                <div class="text-xs opacity-75">1 day ago</div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell type="leading">
              <div class="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Michael Villa"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div class="font-semibold">Michael Villa</div>
                  <div class="text-sm text-content-secondary">Web Hosting</div>
                </div>
              </div>
            </TableCell>
            <TableCell>9 Oct 2024</TableCell>
            <TableCell type="currency">
              <div class="flex items-center justify-end gap-2">
                <span>15,000.00 GBP</span>
                <span class="text-xl">🇬🇧</span>
              </div>
            </TableCell>
            <TableCell type="status" status="error">
              <div>
                <div>Overdue</div>
                <div class="text-xs opacity-75">3 days ago</div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell type="leading">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                  IC
                </div>
                <div>
                  <div class="font-semibold">International Co.</div>
                  <div class="text-sm text-content-secondary">Brand design</div>
                </div>
              </div>
            </TableCell>
            <TableCell>28 Sept 2024</TableCell>
            <TableCell type="currency">
              <div class="flex items-center justify-end gap-2">
                <span>7,502.55 USD</span>
                <span class="text-xl">🇺🇸</span>
              </div>
            </TableCell>
            <TableCell type="status" status="success">
              <div>
                <div>Paid</div>
                <div class="text-xs opacity-75">Yesterday</div>
              </div>
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    `,
  }),
}

// Transactions Table
export const TransactionsTable = {
  render: () => ({
    components: { Table, TableHeader, TableRow, TableCell },
    template: `
      <Table>
        <TableHeader>
          <TableCell type="header">Transaction</TableCell>
          <TableCell type="header">Date</TableCell>
          <TableCell type="header">Amount</TableCell>
          <TableCell type="header">Status</TableCell>
        </TableHeader>
        <tbody>
          <TableRow>
            <TableCell type="leading">Money sent</TableCell>
            <TableCell>10 Jan 2025</TableCell>
            <TableCell type="currency" state="error">-$250.00</TableCell>
            <TableCell type="status" status="success">Completed</TableCell>
          </TableRow>
          <TableRow>
            <TableCell type="leading">Money received</TableCell>
            <TableCell>8 Jan 2025</TableCell>
            <TableCell type="currency" state="success">+$1,250.00</TableCell>
            <TableCell type="status" status="success">Completed</TableCell>
          </TableRow>
          <TableRow>
            <TableCell type="leading">Withdrawal</TableCell>
            <TableCell>5 Jan 2025</TableCell>
            <TableCell type="currency" state="error">-$500.00</TableCell>
            <TableCell type="status" status="pending">Processing</TableCell>
          </TableRow>
        </tbody>
      </Table>
    `,
  }),
}

// Team Members
export const TeamMembers = {
  render: () => ({
    components: { Table, TableHeader, TableRow, TableCell },
    template: `
      <Table>
        <TableHeader>
          <TableCell type="header">Member</TableCell>
          <TableCell type="header">Email</TableCell>
          <TableCell type="header">Role</TableCell>
          <TableCell type="header">Access</TableCell>
        </TableHeader>
        <tbody>
          <TableRow>
            <TableCell type="leading">
              <div class="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="Sarah Connor"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <span>Sarah Connor</span>
              </div>
            </TableCell>
            <TableCell>sarah@company.com</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell type="status" status="success">Full</TableCell>
          </TableRow>
          <TableRow>
            <TableCell type="leading">
              <div class="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=5"
                  alt="John Matrix"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <span>John Matrix</span>
              </div>
            </TableCell>
            <TableCell>john@company.com</TableCell>
            <TableCell>Editor</TableCell>
            <TableCell type="status" status="info">Limited</TableCell>
          </TableRow>
          <TableRow>
            <TableCell type="leading">
              <div class="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=8"
                  alt="Ellen Ripley"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <span>Ellen Ripley</span>
              </div>
            </TableCell>
            <TableCell>ellen@company.com</TableCell>
            <TableCell>Viewer</TableCell>
            <TableCell type="status" status="pending">Pending</TableCell>
          </TableRow>
        </tbody>
      </Table>
    `,
  }),
}

// With States
export const WithStates = {
  render: () => ({
    components: { Table, TableHeader, TableRow, TableCell },
    template: `
      <Table>
        <TableHeader>
          <TableCell type="header">Description</TableCell>
          <TableCell type="header">Value</TableCell>
          <TableCell type="header">Status</TableCell>
        </TableHeader>
        <tbody>
          <TableRow>
            <TableCell type="leading">Success example</TableCell>
            <TableCell type="currency" state="success">+$1,500.00</TableCell>
            <TableCell type="status" status="success">Approved</TableCell>
          </TableRow>
          <TableRow>
            <TableCell type="leading">Error example</TableCell>
            <TableCell type="currency" state="error">-$250.00</TableCell>
            <TableCell type="status" status="error">Failed</TableCell>
          </TableRow>
          <TableRow>
            <TableCell type="leading">Pending example</TableCell>
            <TableCell type="currency">$750.00</TableCell>
            <TableCell type="status" status="pending">Processing</TableCell>
          </TableRow>
          <TableRow>
            <TableCell type="leading">Warning example</TableCell>
            <TableCell type="currency">$100.00</TableCell>
            <TableCell type="status" status="warning">Review</TableCell>
          </TableRow>
        </tbody>
      </Table>
    `,
  }),
}

// Clickable Rows
export const ClickableRows = {
  render: () => ({
    components: { Table, TableHeader, TableRow, TableCell },
    data() {
      return {
        clicked: null,
      }
    },
    template: `
      <div>
        <Table>
          <TableHeader>
            <TableCell type="header">Invoice</TableCell>
            <TableCell type="header">Client</TableCell>
            <TableCell type="header">Amount</TableCell>
          </TableHeader>
          <tbody>
            <TableRow clickable @click="clicked = 'INV-001'">
              <TableCell type="leading">INV-001</TableCell>
              <TableCell>Acme Corp</TableCell>
              <TableCell type="currency">$2,500.00</TableCell>
            </TableRow>
            <TableRow clickable @click="clicked = 'INV-002'">
              <TableCell type="leading">INV-002</TableCell>
              <TableCell>TechStart Ltd</TableCell>
              <TableCell type="currency">$1,800.00</TableCell>
            </TableRow>
            <TableRow clickable @click="clicked = 'INV-003'">
              <TableCell type="leading">INV-003</TableCell>
              <TableCell>GlobalInc</TableCell>
              <TableCell type="currency">$5,200.00</TableCell>
            </TableRow>
          </tbody>
        </Table>

        <p v-if="clicked" class="mt-4 text-sm text-content-secondary">
          You clicked: <strong>{{ clicked }}</strong>
        </p>
        <p v-else class="mt-4 text-sm text-content-secondary">
          Click a row to see the clicked value
        </p>
      </div>
    `,
  }),
}

// Empty State
export const EmptyState = {
  render: () => ({
    components: { Table, TableHeader, TableRow, TableCell },
    template: `
      <Table>
        <TableHeader>
          <TableCell type="header">Transaction</TableCell>
          <TableCell type="header">Date</TableCell>
          <TableCell type="header">Amount</TableCell>
          <TableCell type="header">Status</TableCell>
        </TableHeader>
        <tbody>
          <TableRow>
            <td colspan="4" class="py-12 text-center">
              <div class="text-content-secondary">
                <div class="text-4xl mb-3">📭</div>
                <div class="font-medium mb-1">No transactions yet</div>
                <div class="text-sm">Your transactions will appear here</div>
              </div>
            </td>
          </TableRow>
        </tbody>
      </Table>
    `,
  }),
}
