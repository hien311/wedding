<script setup lang="ts">
import AppNav from '~/components/AppNav.vue'
import HeroSection from '~/components/HeroSection.vue'
import CountdownSection from '~/components/CountdownSection.vue'
import StorySection from '~/components/StorySection.vue'
import EventSection from '~/components/EventSection.vue'
import FamilySection from '~/components/FamilySection.vue'
import GallerySection from '~/components/GallerySection.vue'
import GuestFormSection from '~/components/GuestFormSection.vue'
import SiteFooter from '~/components/SiteFooter.vue'
import CurtainIntro from '~/components/CurtainIntro.vue'

useReveal()
useResetScrollOnEntry()
</script>

<template>
  <div class="page">
    <CurtainIntro />
    <AppNav />
    <main>
      <HeroSection />
      <CountdownSection />
      <StorySection />
      <EventSection />
      <FamilySection />
      <GallerySection />
      <GuestFormSection />
    </main>
    <SiteFooter />
  </div>
</template>
