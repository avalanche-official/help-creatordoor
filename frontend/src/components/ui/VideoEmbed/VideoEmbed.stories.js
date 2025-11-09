import VideoEmbed from './VideoEmbed.vue'

export default {
  title: 'Editorial/VideoEmbed',
  component: VideoEmbed,
  tags: ['autodocs'],
}

// Light Theme (like the screenshot)
export const LightTheme = {
  render: () => ({
    components: { VideoEmbed },
    template: `
      <VideoEmbed
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        posterImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop&q=80"
        posterAlt="Woman working on laptop in a design studio"
        buttonLabel="Watch video"
        theme="light"
      />
    `,
  }),
}

// Neutral Theme
export const NeutralTheme = {
  render: () => ({
    components: { VideoEmbed },
    template: `
      <VideoEmbed
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        posterImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop&q=80"
        posterAlt="Woman working on laptop in a design studio"
        buttonLabel="Watch video"
        theme="neutral"
      />
    `,
  }),
}

// Forest Green Theme
export const ForestGreenTheme = {
  render: () => ({
    components: { VideoEmbed },
    template: `
      <VideoEmbed
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        posterImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop&q=80"
        posterAlt="Woman working on laptop in a design studio"
        buttonLabel="Watch video"
        theme="forest-green"
      />
    `,
  }),
}

// Customer Story
export const CustomerStory = {
  render: () => ({
    components: { VideoEmbed },
    template: `
      <VideoEmbed
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        posterImage="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&h=900&fit=crop&q=80"
        posterAlt="Business owner sharing their Wise success story"
        buttonLabel="Watch story"
        theme="light"
      />
    `,
  }),
}

// Product Demo
export const ProductDemo = {
  render: () => ({
    components: { VideoEmbed },
    template: `
      <VideoEmbed
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        posterImage="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=900&fit=crop&q=80"
        posterAlt="Wise app demonstration on mobile device"
        buttonLabel="Watch demo"
        theme="neutral"
      />
    `,
  }),
}

// How It Works
export const HowItWorks = {
  render: () => ({
    components: { VideoEmbed },
    template: `
      <VideoEmbed
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        posterImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&q=80"
        posterAlt="Explanation of how Wise works"
        buttonLabel="Learn how"
        theme="forest-green"
      />
    `,
  }),
}

// Team Interview
export const TeamInterview = {
  render: () => ({
    components: { VideoEmbed },
    template: `
      <VideoEmbed
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        posterImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&h=900&fit=crop&q=80"
        posterAlt="Interview with Wise team member"
        buttonLabel="Watch interview"
        theme="light"
      />
    `,
  }),
}

// Company Culture
export const CompanyCulture = {
  render: () => ({
    components: { VideoEmbed },
    template: `
      <VideoEmbed
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        posterImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&h=900&fit=crop&q=80"
        posterAlt="Wise company culture and team collaboration"
        buttonLabel="See our culture"
        theme="neutral"
      />
    `,
  }),
}

// Testimonial Video
export const TestimonialVideo = {
  render: () => ({
    components: { VideoEmbed },
    template: `
      <VideoEmbed
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        posterImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=900&fit=crop&q=80"
        posterAlt="Customer testimonial about using Wise"
        buttonLabel="Watch testimonial"
        theme="forest-green"
      />
    `,
  }),
}

// Tutorial Video
export const TutorialVideo = {
  render: () => ({
    components: { VideoEmbed },
    template: `
      <VideoEmbed
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        posterImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=900&fit=crop&q=80"
        posterAlt="Step-by-step tutorial for using Wise"
        buttonLabel="Watch tutorial"
        theme="light"
      />
    `,
  }),
}

// Vimeo Example
export const VimeoVideo = {
  render: () => ({
    components: { VideoEmbed },
    template: `
      <VideoEmbed
        videoUrl="https://player.vimeo.com/video/76979871?autoplay=1"
        posterImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop&q=80"
        posterAlt="Professional video content"
        buttonLabel="Watch now"
        theme="neutral"
      />
    `,
  }),
}
