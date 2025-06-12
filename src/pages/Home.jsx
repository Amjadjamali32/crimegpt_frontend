import Carousel from "../components/Home Components/Carousel";
import Content_section from "../components/Home Components/Content_section";
import Features from "../components/Home Components/Features";
import FeedbackForm from "../components/Home Components/Feedback";
import Hero from "../components/Home Components/Hero";
import Testimonials from "../components/Home Components/Testimonials";

const Home = () => {
  return (
    <>
      <Carousel />
      <Hero />
      <Features />
      <Content_section />
      <Testimonials />
      <FeedbackForm />
    </>
  );
};

export default Home;
