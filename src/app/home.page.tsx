import { PageComponent } from "rasengan";
const Home: PageComponent = () => {
  return <main></main>;
};

Home.path = "/";
Home.metadata = {
  title: "Summy - Home - Summerize your life with AI and remember it forever",
  description: "Generate a summary of everything you've ever done.",
};

export default Home;
