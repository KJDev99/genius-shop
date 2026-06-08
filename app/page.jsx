import Hero from '@/components/home/hero'
import HeroBest from '@/components/home/hero-best'
import HeroCatalog from '@/components/home/hero-catalog'
import HeroServices from '@/components/home/hero-services'
import HomeAbout from '@/components/home/home-about'
import HomeConsultation from '@/components/home/home-consultation'
import HomeNews from '@/components/home/home-news'
import HomeReiwvs from '@/components/home/home-reiwvs'
import HomeVideo from '@/components/home/home-video'
import React from 'react'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata('home')

export default function home() {
  return (
    <div>
      <Hero />
      <HeroServices />
      <HeroBest />
      <HeroCatalog />
      <HomeReiwvs />
      <HomeVideo />
      <HomeNews />
      <HomeAbout />
      <HomeConsultation />
    </div>
  )
}
