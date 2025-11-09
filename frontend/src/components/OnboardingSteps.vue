<template>
  <div class="min-h-screen">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[calc(100vh-120px)]">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"
        ></div>
        <p class="text-neutral-600">{{ loadingMessage }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="flex items-center justify-center min-h-[calc(100vh-200px)] px-4 py-8">
      <div class="w-full max-w-lg">
        <!-- Step 1: Profile & Personal Info -->
        <div v-if="currentStep === 1" class="p-8">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-neutral-900 mb-2 text-left">
              {{ $t('onboarding.setup_profile') }}
            </h1>
            <p class="text-neutral-600 text-left">{{ $t('onboarding.setup_profile_subtitle') }}</p>
          </div>

          <form @submit="handleStep1Submit">
            <!-- Profile Picture Upload -->
            <div class="mb-6">
              <label class="block text-md font-medium text-neutral-900 rounded-full mb-3 w-fit">{{
                $t('onboarding.profile_picture')
              }}</label>
              <div class="flex items-center space-x-6">
                <div class="relative">
                  <div
                    v-if="profilePicturePreview || formData.profilePicture"
                    class="w-20 h-20 rounded-full overflow-hidden bg-white"
                  >
                    <img
                      :src="profilePicturePreview || getProfilePictureUrl(formData.profilePicture)"
                      alt="Profile"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    v-else
                    class="w-20 h-20 rounded-full bg-white flex items-center justify-center"
                  >
                    <svg class="w-8 h-8 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      />
                    </svg>
                  </div>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="handleFileSelect"
                    class="hidden"
                  />
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="cursor-pointer absolute -bottom-1 -right-1 w-6 h-6 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xs hover:bg-neutral-700"
                  >
                    <BsPlusLg class="w-3 h-3" />
                  </button>
                </div>
                <div class="flex-1">
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="cursor-pointer text-sm text-neutral-600 hover:text-neutral-800"
                  >
                    {{
                      profilePicturePreview
                        ? $t('onboarding.change_photo')
                        : $t('onboarding.upload_photo')
                    }}
                  </button>
                  <p class="text-xs text-neutral-500 mt-1">
                    {{ $t('onboarding.photo_requirements') }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Name -->
            <div class="mb-4">
              <label class="block text-md font-medium text-neutral-900 rounded-full mb-3 w-fit">{{
                $t('onboarding.full_name')
              }}</label>
              <input
                v-model="formData.name"
                type="text"
                class="bg-white w-full px-4 py-3 rounded-2xl focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                :placeholder="$t('onboarding.full_name_placeholder')"
              />
            </div>

            <!-- About -->
            <div class="mb-4">
              <label class="block text-md font-medium text-neutral-900 rounded-full mb-3 w-fit">{{
                $t('onboarding.about')
              }}</label>
              <textarea
                v-model="formData.about"
                rows="3"
                class="bg-white w-full px-4 py-3 rounded-2xl focus:ring-neutral-900 focus:border-transparent resize-none"
                :placeholder="$t('onboarding.about_placeholder')"
              ></textarea>
            </div>

            <!-- Website URL -->
            <div class="mb-8">
              <label class="block text-md font-medium text-neutral-900 rounded-full mb-3 w-fit">{{
                $t('onboarding.website_url')
              }}</label>
              <input
                v-model="formData.websiteUrl"
                type="url"
                class="bg-white w-full px-4 py-3 rounded-2xl focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                :placeholder="$t('onboarding.website_placeholder')"
              />
            </div>

            <!-- Navigation -->
            <div class="flex justify-between items-center">
              <button
                type="button"
                @click="skipOnboarding"
                class="cursor-pointer text-neutral-500 hover:text-neutral-700 font-medium"
              >
                {{ $t('onboarding.skip_for_now') }}
              </button>
              <button
                type="submit"
                class="cursor-pointer bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                {{ $t('onboarding.continue') }}
              </button>
            </div>
          </form>
        </div>

        <!-- Step 2: Country Selection -->
        <div v-if="currentStep === 2" class="p-8">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-neutral-900 mb-2 text-left">
              {{ $t('onboarding.where_located') }}
            </h1>
            <p class="text-neutral-600 text-left">{{ $t('onboarding.where_located_subtitle') }}</p>
          </div>

          <form @submit="handleStep2Submit">
            <!-- Country Selection -->
            <div class="mb-8">
              <label class="block text-md font-medium text-neutral-900 rounded-full mb-3 w-fit">{{
                $t('onboarding.select_country')
              }}</label>
              <div class="relative">
                <button
                  type="button"
                  @click="showCountryDropdown = !showCountryDropdown"
                  class="cursor-pointer w-full bg-white px-4 py-4 rounded-2xl text-left focus-none flex items-center justify-between"
                >
                  <div v-if="selectedCountry" class="flex items-center space-x-3">
                    <span class="text-2xl">{{ selectedCountry.flag }}</span>
                    <span>{{ selectedCountry.name }}</span>
                  </div>
                  <span v-else class="text-neutral-500">{{ $t('onboarding.choose_country') }}</span>
                  <svg class="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>

                <!-- Country Dropdown -->
                <div
                  v-if="showCountryDropdown"
                  class="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-2xl shadow-lg z-10 max-h-96 overflow-y-auto"
                >
                  <div class="overflow-y-auto">
                    <button
                      v-for="country in filteredCountries"
                      :key="country.code"
                      type="button"
                      @click="selectCountry(country)"
                      class="cursor-pointer w-full px-4 py-3 text-left hover:bg-neutral-50 flex items-center space-x-3"
                    >
                      <span class="text-xl">{{ country.flag }}</span>
                      <span>{{ country.name }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex justify-between items-center">
              <button
                type="button"
                @click="goToPreviousStep"
                class="cursor-pointer text-neutral-500 hover:text-neutral-700 font-medium"
              >
                ← {{ $t('onboarding.back') }}
              </button>
              <button
                type="submit"
                :disabled="!selectedCountry"
                class="cursor-pointer bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ $t('onboarding.continue') }}
              </button>
            </div>
          </form>
        </div>

        <!-- Step 3: How did you hear about us -->
        <div v-if="currentStep === 3" class="p-8">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-neutral-900 mb-2 text-left">
              {{ $t('onboarding.how_hear_about_us') }}
            </h1>
            <p class="text-neutral-600 text-left">
              {{ $t('onboarding.how_hear_about_us_subtitle') }}
            </p>
          </div>

          <form @submit="handleFinalSubmit">
            <!-- Hear About Us Options -->
            <div class="mb-8">
              <div class="space-y-3">
                <button
                  v-for="option in translatedHearAboutUsOptions"
                  :key="option.key"
                  type="button"
                  @click="selectHearAboutUs(option.key)"
                  :class="[
                    'cursor-pointer bg-white w-full px-4 py-4 rounded-2xl border text-left transition-colors',
                    formData.hearAboutUs === option.key
                      ? 'border-neutral-900 bg-black text-white'
                      : 'border-neutral-200 hover:border-neutral-300',
                  ]"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex justify-between items-center mb-4 sm:mb-0">
              <button
                type="button"
                @click="goToPreviousStep"
                class="cursor-pointer text-neutral-500 hover:text-neutral-700 font-medium"
              >
                ← {{ $t('onboarding.back') }}
              </button>
              <button
                type="submit"
                :disabled="!formData.hearAboutUs"
                class="cursor-pointer bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ $t('onboarding.complete_setup') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Bottom Progress Steps -->
    <div class="fixed bottom-0 left-0 right-0 bg-white px-4 py-6">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center">
          <div class="flex space-x-2 flex-1">
            <div
              v-for="step in 3"
              :key="step"
              :class="[
                'h-1 rounded-full transition-colors flex-1',
                step <= currentStep ? 'bg-neutral-900' : 'bg-neutral-200',
              ]"
            ></div>
          </div>
          <span class="ml-4 text-sm text-neutral-500">{{
            $t('onboarding.step_progress', { current: currentStep, total: 3 })
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n' // 👈 Add this import
import { databaseService } from '@/lib/database.js'
import { storageService } from '@/lib/storage.js'
import { authService } from '@/lib/auth.js'
import { countries, hearAboutUsOptions } from '@/data/countries.js'
import { BsPlusLg } from '@kalimahapps/vue-icons'

import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth.js'

const router = useRouter()
const { t } = useI18n() // 👈 Get translation function
const { user, userProfile, updateUserProfile } = useAuth()

// Get user info from auth store instead of props
const currentStep = ref(1)
const loading = ref(false)
const loadingMessage = ref('')

const formData = reactive({
  profilePicture: null,
  name: '',
  about: '',
  websiteUrl: '',
  country: '',
  countryName: '',
  hearAboutUs: '',
})

// Profile picture handling
const profilePicturePreview = ref('')
const selectedFile = ref(null)

// Country selection
const showCountryDropdown = ref(false)
const countrySearch = ref('')
const selectedCountry = ref(null)

const filteredCountries = computed(() => {
  if (!countrySearch.value) return countries
  return countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.value.toLowerCase()),
  )
})

// 👇 Translated hear about us options
const translatedHearAboutUsOptions = computed(() => {
  return [
    { key: 'search_engine', label: t('onboarding.hear_search_engine') },
    { key: 'social_media', label: t('onboarding.hear_social_media') },
    { key: 'friend_referral', label: t('onboarding.hear_friend_referral') },
    { key: 'online_ad', label: t('onboarding.hear_online_ad') },
    { key: 'blog_article', label: t('onboarding.hear_blog_article') },
    { key: 'other', label: t('onboarding.hear_other') },
  ]
})

// Load existing user profile on mount
onMounted(async () => {
  if (!user.value) {
    router.push('/signin')
    return
  }

  try {
    if (userProfile.value) {
      // Pre-fill form with existing data
      Object.assign(formData, {
        profilePicture: userProfile.value.profilePicture || null,
        name: userProfile.value.name || '',
        about: userProfile.value.about || '',
        websiteUrl: userProfile.value.websiteUrl || '',
        country: userProfile.value.country || '',
        countryName: userProfile.value.countryName || '',
        hearAboutUs: userProfile.value.hearAboutUs || '',
      })

      // Set selected country if exists
      if (formData.country) {
        selectedCountry.value = countries.find((c) => c.code === formData.country)
      }
    }
  } catch (error) {
    console.error('Error loading user profile:', error)
  }
})

// File handling
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert(t('onboarding.file_too_large'))
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert(t('onboarding.select_image_file'))
      return
    }

    selectedFile.value = file

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePicturePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const getProfilePictureUrl = (fileId) => {
  if (fileId) {
    return storageService.getFilePreview(fileId)
  }
  return ''
}

// Country selection
const selectCountry = (country) => {
  selectedCountry.value = country
  formData.country = country.code
  formData.countryName = country.name
  showCountryDropdown.value = false
  countrySearch.value = ''
}

// Hear about us selection
const selectHearAboutUs = (option) => {
  formData.hearAboutUs = option
}

// Step navigation
const goToPreviousStep = () => {
  currentStep.value--
}

// Form submissions
const handleStep1Submit = async (e) => {
  e.preventDefault()

  loading.value = true
  loadingMessage.value = t('onboarding.uploading_picture')

  try {
    let profilePictureId = formData.profilePicture

    // Upload new profile picture if selected
    if (selectedFile.value) {
      const uploadedFile = await storageService.uploadProfilePicture(selectedFile.value)
      profilePictureId = uploadedFile.$id

      // Delete old profile picture if exists
      if (formData.profilePicture) {
        await storageService.deleteFile(formData.profilePicture)
      }
    }

    // Update user profile
    const updateData = {
      profilePicture: profilePictureId,
      name: formData.name,
      about: formData.about,
      websiteUrl: formData.websiteUrl,
    }

    await databaseService.updateUserProfile(userProfile.value.$id, updateData)
    formData.profilePicture = profilePictureId
    currentStep.value = 2
  } catch (error) {
    console.error('Error updating profile:', error)
    alert(t('onboarding.error_updating_profile') + ': ' + error.message)
  } finally {
    loading.value = false
  }
}

const handleStep2Submit = async (e) => {
  e.preventDefault()

  loading.value = true
  loadingMessage.value = t('onboarding.saving_location')

  try {
    await databaseService.updateUserProfile(userProfile.value.$id, {
      country: formData.country,
      countryName: formData.countryName,
    })

    currentStep.value = 3
  } catch (error) {
    console.error('Error updating country:', error)
    alert(t('onboarding.error_saving_location') + ': ' + error.message)
  } finally {
    loading.value = false
  }
}

const handleFinalSubmit = async (e) => {
  e.preventDefault()

  loading.value = true
  loadingMessage.value = t('onboarding.completing_setup')

  try {
    const updatedProfile = await databaseService.updateUserProfile(userProfile.value.$id, {
      hearAboutUs: formData.hearAboutUs,
    })

    // Mark onboarding as complete
    const finalProfile = await databaseService.completeOnboarding(userProfile.value.$id)

    // Update auth store
    updateUserProfile(finalProfile)

    // Navigate to dashboard
    router.push('/members')
  } catch (error) {
    console.error('Error completing onboarding:', error)
    alert(t('onboarding.error_completing_setup') + ': ' + error.message)
  } finally {
    loading.value = false
  }
}

const skipOnboarding = async () => {
  try {
    const finalProfile = await databaseService.completeOnboarding(userProfile.value.$id)
    updateUserProfile(finalProfile)
    router.push('/')
  } catch (error) {
    console.error('Error skipping onboarding:', error)
  }
}
</script>
