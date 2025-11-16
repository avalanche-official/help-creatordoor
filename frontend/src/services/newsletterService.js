// src/services/newsletterService.js
import { functions, CONFIG } from '@/lib/appwrite'

export const newsletterService = {
  async subscribe(data) {
    try {
      const { email, firstName, lastName, source } = data

      if (!email || !email.includes('@')) {
        return { success: false, message: 'Bitte gib eine gültige E-Mail-Adresse ein' }
      }

      console.log('📧 Subscribing to newsletter:', email)

      const response = await functions.createExecution(
        CONFIG.klaviyoNewsletterFunctionId,
        JSON.stringify({
          // ✅ NO action = newsletter subscription
          email: email.trim(),
          firstName: firstName || '',
          lastName: lastName || '',
          source: source || 'help_center_newsletter',
        }),
        false,
      )

      const result = JSON.parse(response.responseBody)

      if (!result.success) {
        console.error('❌ Newsletter subscription failed:', result.message)
        return { success: false, message: result.message || 'Anmeldung fehlgeschlagen' }
      }

      console.log('✅ Newsletter subscription successful')
      return { success: true, message: 'Erfolgreich angemeldet!' }
    } catch (error) {
      console.error('❌ Newsletter service error:', error)
      return { success: false, message: 'Ein Fehler ist aufgetreten.' }
    }
  },
}

export default newsletterService
