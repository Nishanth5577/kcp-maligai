import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import TodaysOffers from '../components/home/TodaysOffers';
import BestSellers from '../components/home/BestSellers';
import FreshArrivals from '../components/home/FreshArrivals';
import FestivalBanner from '../components/home/FestivalBanner';
import WhyChooseUs from '../components/home/WhyChooseUs';
import StoreGallery from '../components/home/StoreGallery';
import Testimonials from '../components/home/Testimonials';
import StoreLocation from '../components/home/StoreLocation';
import FAQ from '../components/home/FAQ';
import Newsletter from '../components/home/Newsletter';

export default function Home() {
  return (
    <div className="page-transition">
      <HeroSection />
      <CategoriesSection />
      <FestivalBanner />
      <TodaysOffers />
      <BestSellers />
      <FreshArrivals />
      <WhyChooseUs />
      <StoreGallery />
      <Testimonials />
      <StoreLocation />
      <FAQ />
      <Newsletter />
    </div>
  );
}
